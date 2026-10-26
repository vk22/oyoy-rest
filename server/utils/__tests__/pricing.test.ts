import { describe, expect, it } from "vitest";
import { parsePrice } from "../pricing";

describe("parsePrice", () => {
  it("parses plain numeric strings as fixed", () => {
    expect(parsePrice("4.9")).toEqual({ price: 4.9, pricingType: "fixed" });
    expect(parsePrice("23.5")).toEqual({ price: 23.5, pricingType: "fixed" });
    expect(parsePrice("100")).toEqual({ price: 100, pricingType: "fixed" });
  });

  it("parses 'Market price' (any case/spacing) as market with no price", () => {
    expect(parsePrice("Market price")).toEqual({ price: null, pricingType: "market" });
    expect(parsePrice("market  price")).toEqual({ price: null, pricingType: "market" });
    expect(parsePrice("MARKET PRICE")).toEqual({ price: null, pricingType: "market" });
  });

  it("parses 'From X' as from with the given starting price", () => {
    expect(parsePrice("From 15")).toEqual({ price: 15, pricingType: "from" });
    expect(parsePrice("from 15.9")).toEqual({ price: 15.9, pricingType: "from" });
  });

  it("treats empty, missing or unrecognized values as unknown", () => {
    expect(parsePrice("")).toEqual({ price: null, pricingType: "unknown" });
    expect(parsePrice(undefined)).toEqual({ price: null, pricingType: "unknown" });
    expect(parsePrice(null)).toEqual({ price: null, pricingType: "unknown" });
    expect(parsePrice("ask staff")).toEqual({ price: null, pricingType: "unknown" });
  });

  it("accepts a finite numeric value directly as fixed", () => {
    expect(parsePrice(12.9)).toEqual({ price: 12.9, pricingType: "fixed" });
  });

  it("never turns a non-fixed price into a number other than null", () => {
    for (const raw of ["Market price", "", undefined, "ask staff"]) {
      const { price, pricingType } = parsePrice(raw);
      if (pricingType !== "fixed" && pricingType !== "from") {
        expect(price).toBeNull();
      }
    }
  });
});
