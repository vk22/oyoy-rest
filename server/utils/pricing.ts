import type { PricingType } from "./restaurantTypes";

export interface ParsedPrice {
  price: number | null;
  pricingType: PricingType;
}

const MARKET_PRICE_RE = /^market\s*price$/i;
const FROM_PRICE_RE = /^from\s+(\d+(?:\.\d+)?)/i;
const FIXED_PRICE_RE = /^\d+(?:\.\d+)?$/;

/**
 * Deterministic, DB-schema-agnostic price parsing. The `price` field in the
 * CMS is a free-text string ("4.9", "Market price", ...) with no currency or
 * pricing-type column, so this is the single place that decides how a raw
 * value maps to { price, pricingType } for HTML, REST and MCP alike.
 */
export function parsePrice(raw: unknown): ParsedPrice {
  if (typeof raw === "number" && Number.isFinite(raw)) {
    return { price: raw, pricingType: "fixed" };
  }

  if (typeof raw !== "string") {
    return { price: null, pricingType: "unknown" };
  }

  const trimmed = raw.trim();
  if (!trimmed) {
    return { price: null, pricingType: "unknown" };
  }

  if (FIXED_PRICE_RE.test(trimmed)) {
    return { price: Number.parseFloat(trimmed), pricingType: "fixed" };
  }

  if (MARKET_PRICE_RE.test(trimmed)) {
    return { price: null, pricingType: "market" };
  }

  const fromMatch = trimmed.match(FROM_PRICE_RE);
  if (fromMatch) {
    return { price: Number.parseFloat(fromMatch[1]), pricingType: "from" };
  }

  return { price: null, pricingType: "unknown" };
}
