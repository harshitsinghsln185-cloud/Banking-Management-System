import { toPaise, toRupees, formatINR, assertValidPaise } from "@/lib/money";

describe("Money utility", () => {
  describe("toPaise & toRupees rounding and conversion", () => {
    it("converts standard rupee amounts to paise safely", () => {
      expect(toPaise(10.1)).toBe(1010);
      expect(toPaise(10.1)).toBe(1010);
      expect(toPaise(0)).toBe(0);
      expect(toPaise(100)).toBe(10000);
      expect(toPaise(0.01)).toBe(1);
    });

    it("safely rounds fractional paise (e.g. 10.105 rupees rounds to 1011 paise)", () => {
      expect(toPaise(10.105)).toBe(1011);
      expect(toPaise(10.104)).toBe(1010);
      expect(toPaise(99.999)).toBe(10000);
    });

    it("converts paise to rupees accurately", () => {
      expect(toRupees(1010)).toBe(10.1);
      expect(toRupees(0)).toBe(0);
      expect(toRupees(10000)).toBe(100);
      expect(toRupees(1)).toBe(0.01);
    });
  });

  describe("formatINR", () => {
    it("formats amounts in Indian Rupees (en-IN locale)", () => {
      const formatted = formatINR(1010);
      // Clean non-breaking spaces for universal comparison
      const normalized = formatted.replace(/\u00a0/g, " ");
      expect(normalized).toContain("₹");
      expect(normalized).toContain("10.10");

      const zeroFormatted = formatINR(0).replace(/\u00a0/g, " ");
      expect(zeroFormatted).toContain("₹");
      expect(zeroFormatted).toContain("0.00");

      // 100,000 rupees = 10,000,000 paise (1 Lakh)
      const lakhFormatted = formatINR(10000000).replace(/\u00a0/g, " ");
      expect(lakhFormatted).toContain("1,00,000.00");
    });
  });

  describe("assertValidPaise & invalid inputs", () => {
    it("passes for non-negative safe integers", () => {
      expect(() => assertValidPaise(0)).not.toThrow();
      expect(() => assertValidPaise(100)).not.toThrow();
      expect(() => assertValidPaise(Number.MAX_SAFE_INTEGER)).not.toThrow();
    });

    it("throws for negative numbers", () => {
      expect(() => assertValidPaise(-1)).toThrow("Invalid paise amount");
      expect(() => toPaise(-10)).toThrow("Invalid rupees amount");
      expect(() => toRupees(-50)).toThrow("Invalid paise amount");
      expect(() => formatINR(-100)).toThrow("Invalid paise amount");
    });

    it("throws for floating point paise amounts", () => {
      expect(() => assertValidPaise(10.5)).toThrow("Invalid paise amount");
      expect(() => toRupees(10.5)).toThrow("Invalid paise amount");
      expect(() => formatINR(10.5)).toThrow("Invalid paise amount");
    });

    it("throws for non-numeric or invalid number inputs", () => {
      expect(() => assertValidPaise(NaN)).toThrow();
      expect(() => assertValidPaise(Infinity)).toThrow();
      expect(() => assertValidPaise("100")).toThrow();
      expect(() => assertValidPaise(null)).toThrow();
      expect(() => assertValidPaise(undefined)).toThrow();
      expect(() => toPaise(NaN)).toThrow();
      expect(() => toPaise(Infinity)).toThrow();
    });
  });
});
