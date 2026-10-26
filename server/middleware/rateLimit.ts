/**
 * Minimal best-effort rate limit for the public AI-facing surface (/mcp,
 * /api/public/*). In-memory, per-process only — under pm2 cluster this is
 * "per worker", not a strict global limit. Good enough to blunt accidental
 * hammering for a pilot; a real limiter (reverse proxy / CDN / shared store)
 * is recommended before wider exposure, see docs/ai-access.md.
 */

interface Bucket {
  count: number;
  windowStart: number;
}

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 60;
const RATE_LIMITED_PREFIXES = ["/mcp", "/api/public/"];

const buckets: Map<string, Bucket> = (globalThis as any).__oyoyRateLimitBuckets ?? new Map();
(globalThis as any).__oyoyRateLimitBuckets = buckets;

// Only trust X-Forwarded-For when explicitly told the app sits behind a
// known reverse proxy; otherwise an attacker could spoof the header to
// dodge the per-IP bucket.
const TRUST_PROXY = process.env.TRUST_PROXY === "1";

export default defineEventHandler((event) => {
  const pathname = getRequestURL(event).pathname;
  if (!RATE_LIMITED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(prefix))) {
    return;
  }

  const ip = getRequestIP(event, { xForwardedFor: TRUST_PROXY }) ?? "unknown";
  const now = Date.now();
  const bucket = buckets.get(ip);

  if (!bucket || now - bucket.windowStart > WINDOW_MS) {
    buckets.set(ip, { count: 1, windowStart: now });
    return;
  }

  bucket.count += 1;
  if (bucket.count > MAX_REQUESTS_PER_WINDOW) {
    setResponseHeader(event, "Retry-After", Math.ceil((bucket.windowStart + WINDOW_MS - now) / 1000));
    throw createError({ statusCode: 429, statusMessage: "Too Many Requests" });
  }
});
