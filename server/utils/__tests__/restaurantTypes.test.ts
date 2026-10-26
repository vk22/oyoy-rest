import { describe, expect, it } from "vitest";
import { searchMenuInputSchema, searchMenuQueryStringSchema } from "../restaurantTypes";

describe("searchMenuInputSchema (MCP tool input)", () => {
  it("accepts an empty object (no filters)", () => {
    expect(searchMenuInputSchema.safeParse({}).success).toBe(true);
  });

  it("rejects a query longer than 200 characters", () => {
    const result = searchMenuInputSchema.safeParse({ query: "a".repeat(201) });
    expect(result.success).toBe(false);
  });

  it("rejects a negative maxPrice", () => {
    expect(searchMenuInputSchema.safeParse({ maxPrice: -1 }).success).toBe(false);
  });

  it("rejects a non-finite maxPrice", () => {
    expect(searchMenuInputSchema.safeParse({ maxPrice: Number.POSITIVE_INFINITY }).success).toBe(false);
  });

  it("rejects a limit above 50 or below 1", () => {
    expect(searchMenuInputSchema.safeParse({ limit: 51 }).success).toBe(false);
    expect(searchMenuInputSchema.safeParse({ limit: 0 }).success).toBe(false);
  });

  it("accepts a limit of exactly 50", () => {
    expect(searchMenuInputSchema.safeParse({ limit: 50 }).success).toBe(true);
  });
});

describe("searchMenuQueryStringSchema (REST query string)", () => {
  it("coerces numeric query-string values", () => {
    const result = searchMenuQueryStringSchema.safeParse({ maxPrice: "25", limit: "10" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.maxPrice).toBe(25);
      expect(result.data.limit).toBe(10);
    }
  });

  it("rejects a non-numeric maxPrice", () => {
    expect(searchMenuQueryStringSchema.safeParse({ maxPrice: "free" }).success).toBe(false);
  });

  it("treats an empty query string object as a valid empty search", () => {
    expect(searchMenuQueryStringSchema.safeParse({}).success).toBe(true);
  });
});
