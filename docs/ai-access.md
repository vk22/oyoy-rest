# AI / MCP access — OyOy Restaurant

Status: pilot implementation, **not deployed to production**. This document
is the result of the audit and implementation described in
`oyoy-ai-mcp-spec.md` (2026-10-25/26).

## 1. Architecture and data source

The site is Nuxt 3.8 (Vue 3, Vuetify), deployed as a single Nitro/Node
process (pm2 cluster, `ecosystem.config.js` → `.output/server/index.mjs`),
with content in MongoDB via Mongoose (`server/models/*`). The `.env`/`.env.local`
checked into this working copy point at the real production Atlas cluster —
there is no separate staging database.

Key finding from the audit: the homepage already had real menu/company data,
but it never reached the server-rendered HTML because
`pages/index.vue` wraps `<MenuIndex>` in `<ClientOnly>`, which — by design —
never renders on the server. The menu itself is **not** PDF/image based; it's
already structured in MongoDB (`Menu` collection: section → `content[]` of
`{title, ingredients, price, type}`, grouped by `category: 'food'|'drinks'`).
A `MenuPDF` collection also exists (optional PDF fallback, currently backed by
Vercel Blob URLs) and is unaffected by this work.

### Single data layer

All new code goes through one place: `server/utils/restaurantRepository.ts`.
It is the only module that calls Mongoose (`Company.findOne()`,
`Menu.find({published:true})`), and it feeds everything through the pure,
unit-tested functions in `server/utils/restaurantData.ts` and
`server/utils/pricing.ts`:

- `getRestaurantInfo()` — used by `GET /api/public/restaurant` and the MCP
  `get_restaurant_info` tool.
- `searchMenuItems(input)` — used by `GET /api/public/menu` and the MCP
  `search_menu` tool. Bounded: `limit` default 20, max 50.
- `getFullMenuCatalog()` — used only by `GET /api/public/menu/full`, which
  backs the `/full-menu` page. Not bounded, not part of the AI-search
  contract (see §3).
- `getBookingLink()` — used by `GET /api/public/restaurant`'s `bookingUrl`
  and the MCP `get_booking_link` tool.

Because every channel (HTML, REST, MCP) calls the same functions, the same
menu item always has the same price/currency/unit everywhere.

### Why `/full-menu` and not `/menu`

The spec's working name for the new page was `/menu`. The repo already has
`public/menu/` (static files: `main-menu.pdf`, `wine-list.pdf`, `wine-list.jpg`,
etc., legacy assets — the currently-active PDF-menu feature uses Vercel Blob
URLs instead, per `GET /api/menu-pdf`). Nitro's static file server resolves a
bare `/menu` request as a directory and 301-redirects to `/menu/` **before**
Nuxt's own page router runs, so a page at `/menu` is unreachable. Rather than
move/break those existing static files (possibly linked externally), the new
page lives at **`/full-menu`**. All JSON-LD, the REST `sourceUrl`s, the
sitemap entry and the Footer link use `/full-menu` consistently.

## 2. Content update rules

- **Menu/prices/sections**: edit via the existing admin UI (`/admin/menu`),
  same as today. No new admin UI or database was built (per spec §4). The
  `price` field is still a free-text string; it's parsed deterministically by
  `server/utils/pricing.ts`:
  - a plain number (`"4.9"`) → `pricingType: "fixed"`
  - `"Market price"` (case/spacing-insensitive) → `pricingType: "market"`, `price: null`
  - `"From 15"` → `pricingType: "from"`, `price: 15` (starting price)
  - anything else / empty → `pricingType: "unknown"`, `price: null`
- **Item ids are derived, not stored**: `` `${sectionId}:${index}` ``, because
  the CMS stores menu items as a plain array with no per-item `_id`.
  **Reordering or deleting items in the admin UI changes those ids.** If a
  client (MCP/REST consumer) is expected to cache item ids across edits, this
  is a known limitation — flagged here rather than hidden.
- **`updatedAt`**: `Menu` and `Company` schemas now have `{ timestamps: true }`
  (the only schema change made). Existing documents will show
  `updatedAt: null` until they're next saved through the admin UI — that's
  the honest "unknown", not a bug. Once an editor saves a menu section or the
  company record, `updatedAt` starts reflecting real edits.
- **Opening hours**: there is no source for this anywhere in the repo, DB, or
  UI. `weeklyOpeningHours` is `null` and listed in `missingFields`
  everywhere. See §7 for what's needed from the owner.
- **Dietary tags / allergens**: the CMS has an unused, unmaintained `type`
  field on menu items (`"Seafood" | "Meat" | "Vegetarian" | "drinks"` seen in
  the data) that is **not exposed in the admin UI** and so can't be trusted
  or kept up to date. It is not surfaced as `dietaryTags`/`allergens` in any
  API — those fields are always `"unknown"`. Do not infer dietary safety from
  dish names or descriptions (per spec).

## 3. REST contracts

Base URL in this doc: `http://localhost:3100` (local dev port used during
verification). Replace with the real deployed origin once published.

### `GET /api/public/restaurant`

```
curl -s http://localhost:3100/api/public/restaurant
```

```json
{
  "success": true,
  "data": {
    "id": "oyoy-restaurant",
    "name": "OyOy Restaurant",
    "description": "Mediterranean restaurant with views on Spinola Bay, St Julian's, Malta.",
    "canonicalUrl": "https://oyoyrestaurant.com/",
    "address": "94 Triq Spinola St, Saint Julian's, Malta",
    "geo": { "latitude": 35.919872, "longitude": 14.492764 },
    "telephone": "+356 7778 8007",
    "email": "info@oyoyrest.com2",
    "timezone": "Europe/Malta",
    "cuisines": ["Mediterranean"],
    "currency": "EUR",
    "weeklyOpeningHours": null,
    "specialOpeningHours": [],
    "features": [],
    "bookingUrl": "https://oyoyrestaurant.com/reservations",
    "socialLinks": ["https://www.instagram.com/...", "https://www.facebook.com/...", "https://www.tiktok.com/..."],
    "updatedAt": null,
    "sourceUrl": "https://oyoyrestaurant.com/",
    "missingFields": ["weeklyOpeningHours", "specialOpeningHours", "features"]
  },
  "sourceUrl": "https://oyoyrestaurant.com/",
  "updatedAt": null
}
```

That `"info@oyoyrest.com2"` email is the real value currently stored in the
live `Company` document — not a transcription error in this doc. Flagged in
§7 for the owner to fix.

### `GET /api/public/menu`

Bounded search/filter contract — this is what the MCP `search_menu` tool
mirrors exactly.

| Param | Type | Rule |
| --- | --- | --- |
| `query` | string | optional, ≤200 chars, case-insensitive substring match on name/description/category |
| `category` | string | optional, must match an existing published section name (case-insensitive); unknown value → `400` |
| `maxPrice` | number | optional, finite, ≥0; only matches `pricingType: "fixed"` items |
| `limit` | integer | optional, default 20, max 50 |

```
curl -s "http://localhost:3100/api/public/menu?maxPrice=25"
```

```json
{
  "success": true,
  "data": {
    "items": [ { "id": "...", "name": "...", "category": "Red Wine", "price": 25, "pricingType": "fixed", "...": "..." } ],
    "appliedFilters": { "limit": 20, "maxPrice": 25 },
    "excludedByBudget": [
      { "id": "66b20b93eca6cef5c4790b0a:3", "name": "Fresh Whole Fish of The Day", "reason": "pricingType is \"market\", so a fixed price under the budget cannot be confirmed" }
    ],
    "sourceUrl": "https://oyoyrestaurant.com/full-menu",
    "updatedAt": null
  },
  "sourceUrl": "https://oyoyrestaurant.com/full-menu",
  "updatedAt": null
}
```

Error examples (verified against the running dev server):

```
curl -s "http://localhost:3100/api/public/menu?category=Desserts"
→ 400 { "data": { "error": "unknown_category", "availableCategories": ["Main Course", "Red Wine", "Hot Starters"] } }

curl -s "http://localhost:3100/api/public/menu?maxPrice=-1"
→ 400 { "data": { "error": "invalid_query", "issues": [{"message":"maxPrice must not be negative", ...}] } }

curl -s "http://localhost:3100/api/public/menu?query=zzzznoresult"
→ 200 { "data": { "items": [], "excludedByBudget": [] } }
```

`/api/public/menu` and `/api/public/menu/full` are **not** added to
`sitemap.xml` and are not meant for crawling — only `/full-menu` (the HTML
page) is.

### `GET /api/public/menu/full` (page support only, not an AI-search contract)

No filters, no limit — the complete published catalog grouped by
menu (`food`/`drinks`) → category → item. Exists only so `/full-menu` can
render the entire real menu in SSR HTML; not documented as part of the
search/MCP surface and intentionally omitted from the "public API" framing
above.

## 4. Running MCP locally + MCP Inspector

```
yarn install
dotenv -e .env.local -- nuxt dev          # serves /mcp on the same Nitro process
```

Verified against the running dev server (`http://localhost:3100/mcp`) with
the real MCP Inspector CLI (no browser needed):

```
npx @modelcontextprotocol/inspector --cli http://localhost:3100/mcp \
  --transport http --method tools/list
# → 3 tools, schemas validate: 0 errors, 11 portability warnings
# (nullable fields use JSON Schema `type: [x, "null"]`; legal but some
# providers that require single-type schemas, e.g. Gemini function
# declarations, may be stricter — noted, not fixed, since it's valid JSON
# Schema and the primary target clients handle it fine)

npx @modelcontextprotocol/inspector --cli http://localhost:3100/mcp \
  --transport http --method tools/call --tool-name get_booking_link

npx @modelcontextprotocol/inspector --cli http://localhost:3100/mcp \
  --transport http --method tools/call --tool-name search_menu --tool-arg maxPrice=25
```

Both calls returned real `structuredContent` built from the live database
(see §3 examples — they came from these exact runs).

For the interactive web UI instead: `npx @modelcontextprotocol/inspector`
(no `--cli`), then point it at `http://localhost:3100/mcp` with transport
"Streamable HTTP".

## 5. Connecting a real MCP client

This pilot was verified with the official TypeScript SDK's own client
(`@modelcontextprotocol/sdk/client/streamableHttp.js`) and the MCP Inspector
CLI above — both against `http://localhost:3100/mcp`.

**Connecting Claude (or any remote-connector client) requires a public HTTPS
URL** — `localhost` is not reachable from a cloud client. Since production
is not deployed in this pilot, that step was not performed; only the
protocol itself was verified locally, honestly, as allowed by the spec's
acceptance criteria. Once a real HTTPS URL exists:

- **Claude Code**: `claude mcp add --transport http oyoy-restaurant https://<real-domain>/mcp`
  (see Claude Code's current `mcp` command docs — the exact flags can change
  between releases, so check `claude mcp add --help` against the installed
  version before relying on this).
- **Claude.ai / Claude Desktop**: Settings → Connectors → Add custom
  connector → enter the HTTPS `/mcp` URL. This requires a plan/workspace tier
  that supports custom connectors — if the account used doesn't have that
  tier, this is the limitation, not a server-side bug.

No conversational-scenario test against a live chat client was performed in
this pilot — only the protocol-level (`initialize`/`tools/list`/`tools/call`)
checks above. This is called out explicitly as a skipped check, not silently
assumed to work.

## 5a. A real build-breaking dependency conflict found and fixed

`@modelcontextprotocol/sdk` depends on `zod-to-json-schema`, which yarn
classic installed as a **nested** `zod@4.6.7` (under
`node_modules/zod-to-json-schema/node_modules/zod`) alongside the project's
existing top-level `zod@3.25.x`. Nitro's production build (`nuxt build`)
traces and bundles dependencies into `.output/server/node_modules`, and it
collapsed both copies into one `zod` folder using the v4 package's files —
which don't ship a root `index.js`/`index.cjs` the same way v3 does. The
result: `node .output/server/index.mjs` crashed immediately with
`ERR_MODULE_NOT_FOUND ... zod/index.js`, i.e. **the production build was
unusable** until this was fixed.

Fix: pinned a single `zod` version across the whole dependency tree via
yarn's `resolutions` field in `package.json`:

```json
"resolutions": { "zod": "^3.25.0" }
```

`zod-to-json-schema`'s own peer range (`^3.25.28 || ^4`) accepts 3.25.x, so
this doesn't fight any real requirement — it just removes the duplicate.
After `yarn install` + rebuild, `node .output/server/index.mjs` starts
cleanly and `/api/public/restaurant`, `/full-menu` and `/mcp` (verified via
the real MCP Inspector CLI, `tools/list` → 0 errors) all work against the
actual production bundle, not just `nuxt dev`.

## 6. Runtime, reverse proxy, caching, limits, env

- **Hosting**: same Nitro/Node process as the rest of the site (pm2 cluster).
  No separate process, no reverse-proxy change required for this pilot.
- **Transport**: `/mcp` runs the Streamable HTTP transport in **stateless**
  mode (`sessionIdGenerator: undefined`) — a fresh `McpServer` + transport
  per HTTP request, so there is no in-memory session map that could leak
  across concurrent clients or pm2 workers.
- **Origin validation**: set `MCP_ALLOWED_ORIGINS` (comma-separated) in the
  deployed environment to the real public origin(s) if/when known, to enable
  the SDK's origin allow-list. Left unset in this pilot (dev/localhost has no
  fixed origin); unset means origin checking is off, same safety posture as
  not having touched it. No wildcard CORS is set anywhere.
- **Rate limiting**: `server/middleware/rateLimit.ts` — best-effort, in-memory,
  per-process, 60 requests/60s per IP on `/mcp` and `/api/public/*`. Under
  pm2 cluster this is **per worker**, not a strict global limit — adequate
  to blunt accidental hammering for a pilot, not a substitute for a real
  limiter (reverse proxy / CDN / shared store) before wider exposure. Only
  trusts `X-Forwarded-For` when `TRUST_PROXY=1` is set in env.
- **Timeouts/body size**: relies on the existing Node/Nitro/pm2 defaults —
  no custom timeout or body-size limit was added for `/mcp` beyond that.
  Flagged as an open item, not silently declared "handled".
- **Caching**: none added. All reads are direct Mongoose queries through the
  shared repository; `event.context.mongoUnavailable` (existing pattern,
  `server/middleware/mongodb.js`) now also covers `/api/public/*` and `/mcp`,
  so a DB outage returns an honest empty/unknown payload instead of a hang or
  a 500.
- **Env vars** (examples, no real values):
  ```
  MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
  MCP_ALLOWED_ORIGINS=https://oyoyrestaurant.com
  TRUST_PROXY=1
  ```

## 7. Unverified content & external profiles to check

**Blocking before any public claim about hours:**
- `weeklyOpeningHours` / `specialOpeningHours` — no source anywhere found.
  Needs the real hours from the owner before this can ever be non-null.

**Data-quality issues found in the live DB during this pilot (not fixed,
flagged for the owner):**
- `Company.email` is currently `"info@oyoyrest.com2"` (trailing stray `2`) —
  looks like a data-entry typo, surfaced verbatim by `/api/public/restaurant`
  and the MCP tool because the spec requires not inventing/correcting data
  silently.
- The live `Menu` collection currently has far fewer published sections
  (Main Course, Hot Starters, Red Wine) than the `dump/oyoy.menus.json`
  snapshot committed in the repo (which also had Crudo, Cold Starters,
  Pasta, Champagne/Sparkling/White/Rosé wine). That dump is a point-in-time
  export, not necessarily current — the live DB is authoritative and was
  used for every example in this document.

**External profiles that may disagree with the above (spec explicitly says
not to copy from them, only to flag for owner review):**
- Google Business Profile / Google Maps listing for "OyOy Bar"/"OyOy
  Restaurant" (hours, phone, photos)
- TripAdvisor, Facebook, Instagram, TikTok business info
- Any food-delivery or reservation aggregator pages mentioning OyOy

**Features not claimed**: `features` (e.g. terrace, sea view) is left empty
rather than inferred from marketing copy ("180 degree views on Spinola
Bay") — the spec is explicit that only confirmed structured facts go here.

## 8. Deploy / rollback

Production deployment is a separate action for the owner — **not performed
as part of this pilot**. When ready:

0. **Build-hang fix (required for CI/host build runners, e.g. Vercel)**:
   `nuxt build` prerenders `/reservations` and `/reservation-confirmed`
   (`routeRules` in `nuxt.config.ts`), which connect to MongoDB through
   `server/middleware/mongodb.js`. The MongoDB driver keeps background
   topology-monitor sockets open for the life of that connection — it never
   errors, it just never lets the build process exit on its own. A plain
   terminal run still *looks* finished once it prints
   `[nitro] ✔ You can preview this build using node .output/server/index.mjs`,
   but an automated build runner that waits for the process to actually exit
   (Vercel's `vercel build` included) will hang indefinitely and eventually
   time out. Fixed in `nuxt.config.ts` via a `hooks['nitro:init']` hook that
   calls `mongoose.disconnect()` right after Nitro's `prerender:done` hook
   fires — verified locally: `nuxt build` now exits with code 0 on its own
   (confirmed by running the build command directly, not through a pipe).
   This only runs during the build's prerender step, not at request-serving
   runtime, so it doesn't affect the deployed server's normal DB connection
   handling.
1. `git diff main` / review the PR for this branch.
2. Standard project deploy path (pm2 reload behind `.output/server/index.mjs`,
   per `ecosystem.config.js`), after `yarn build`.
3. Set `MCP_ALLOWED_ORIGINS` and (if the real proxy is known) `TRUST_PROXY`
   in the production env before/at deploy time.
4. Smoke-test `/full-menu`, `/api/public/restaurant`, `/api/public/menu`,
   `/mcp` (via Inspector CLI against the real HTTPS URL) immediately after.
5. **Rollback**: `git revert` the merge commit (or redeploy the previous
   release with pm2) — no DB migration was performed beyond the additive
   `timestamps: true` schema option, which is safe to leave in place even if
   the application code is rolled back.

## 9. What was NOT built (by design, per spec)

- No `check_availability` / `create_reservation` MCP tools, no TheFork iframe
  automation, no undocumented widget API calls.
- No new database, no new admin editor for allergens/dietary tags/hours.
- No changes to Nuxt/Vuetify or other unrelated dependency versions.
- No production deployment, no pushes to external profiles (Google,
  Instagram, Facebook, TikTok), no real reservations created.
