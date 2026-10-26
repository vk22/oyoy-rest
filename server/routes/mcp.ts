import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import type { Restaurant, SearchMenuResult } from "~~/server/utils/restaurantTypes";
import {
  bookingLinkSchema,
  restaurantSchema,
  searchMenuInputSchema,
  searchMenuResultSchema,
} from "~~/server/utils/restaurantTypes";

/**
 * Remote MCP endpoint, Streamable HTTP transport, official TS SDK.
 *
 * Runs stateless: a fresh McpServer + transport per HTTP request
 * (sessionIdGenerator: undefined), so there is no in-memory session map to
 * accidentally share across concurrent clients or pm2 cluster workers. The
 * three tools call server/utils/restaurantRepository directly (the same
 * functions used by the REST routes), not HTTP, so data stays consistent.
 */

const READ_ONLY_ANNOTATIONS = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
} as const;

function summarizeRestaurant(restaurant: Restaurant): string {
  const hours = restaurant.weeklyOpeningHours
    ? "Opening hours are available."
    : "Opening hours are not confirmed yet.";
  const missing = restaurant.missingFields.length
    ? ` Unconfirmed fields: ${restaurant.missingFields.join(", ")}.`
    : "";
  return (
    `${restaurant.name}, ${restaurant.address ?? "address unconfirmed"}. ` +
    `${hours} This tool does not check table availability. Menu: ${restaurant.canonicalUrl}full-menu, ` +
    `booking: ${restaurant.bookingUrl}.${missing}`
  );
}

function summarizeSearch(result: SearchMenuResult): string {
  if (!result.items.length) {
    return "No published menu items matched the given filters.";
  }
  const lines = result.items.map((item) => {
    const price =
      item.pricingType === "fixed"
        ? `€${item.price}`
        : item.pricingType === "from"
          ? `from €${item.price}`
          : item.pricingType === "market"
            ? "market price"
            : "price unavailable";
    return `${item.name} (${item.category}) — ${price}`;
  });
  const budgetNote = result.excludedByBudget.length
    ? ` ${result.excludedByBudget.length} item(s) were excluded from the budget filter because their price is not a fixed amount.`
    : "";
  return `${lines.join("; ")}.${budgetNote}`;
}

function buildMcpServer() {
  const server = new McpServer(
    { name: "oyoy-restaurant", version: "1.0.0" },
    { capabilities: { tools: {} } },
  );

  server.registerTool(
    "get_restaurant_info",
    {
      title: "Get restaurant info",
      description:
        "Returns verified OyOy Restaurant details (address, phone, email, geo, timezone Europe/Malta, " +
        "cuisines, booking link, source URL, last-updated timestamp) and a list of fields that are not " +
        "yet confirmed, such as opening hours. Does not compute or imply table availability.",
      outputSchema: restaurantSchema.shape,
      annotations: { ...READ_ONLY_ANNOTATIONS, title: "Get restaurant info" },
    },
    async () => {
      const restaurant = await getRestaurantInfo();
      return {
        content: [{ type: "text" as const, text: summarizeRestaurant(restaurant) }],
        structuredContent: restaurant,
      };
    },
  );

  server.registerTool(
    "search_menu",
    {
      title: "Search menu",
      description:
        "Deterministic, case-insensitive search over the published OyOy Restaurant menu and wine list " +
        "(no LLM involved). Optional filters: query (matches name/description/category, max 200 chars), " +
        "category (must match an existing menu section name — an unknown category is a documented error, " +
        "not a silent empty/default result), maxPrice (only matches items with a fixed price; items priced " +
        "'from', 'market' or unknown are reported in excludedByBudget with a reason instead of being " +
        "silently dropped or falsely included), limit (default 20, max 50). Draft and unavailable items " +
        "are always excluded. An empty result is returned honestly, not as an error.",
      inputSchema: searchMenuInputSchema.shape,
      outputSchema: searchMenuResultSchema.shape,
      annotations: { ...READ_ONLY_ANNOTATIONS, title: "Search menu" },
    },
    async (args) => {
      const result = await searchMenuItems(args);
      return {
        content: [{ type: "text" as const, text: summarizeSearch(result) }],
        structuredContent: result,
      };
    },
  );

  server.registerTool(
    "get_booking_link",
    {
      title: "Get booking link",
      description:
        "Returns the canonical OyOy Restaurant booking link (/reservations, provider TheFork, " +
        "bookingMode external, canCheckAvailability false). The assistant must tell the user that " +
        "availability and completion of the booking happen in the TheFork widget itself — this tool " +
        "never creates, confirms, modifies or cancels a reservation, and has no fabricated time slots " +
        "or confirmation numbers.",
      outputSchema: bookingLinkSchema.shape,
      annotations: { ...READ_ONLY_ANNOTATIONS, title: "Get booking link" },
    },
    async () => {
      const booking = getBookingLink();
      return {
        content: [{ type: "text" as const, text: `${booking.disclaimer} Booking link: ${booking.bookingUrl}` }],
        structuredContent: booking,
      };
    },
  );

  return server;
}

const configuredOrigins = (process.env.MCP_ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

export default defineEventHandler(async (event) => {
  const server = buildMcpServer();
  const transport = new StreamableHTTPServerTransport({
    // Stateless: no session id, no server-side session map to share across
    // concurrent clients or cluster workers.
    sessionIdGenerator: undefined,
    ...(configuredOrigins.length ? { allowedOrigins: configuredOrigins } : {}),
  });

  event.node.res.on("close", () => {
    void transport.close();
    void server.close();
  });

  await server.connect(transport);
  await transport.handleRequest(event.node.req, event.node.res);
});
