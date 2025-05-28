import { describe, it, expect } from "vitest";
import {
  simulateColorBlindness,
  calculateContrastRatio,
  meetsContrastStandard,
} from "./colorBlindness";

describe("Color Blindness Utilities", () => {
  describe("simulateColorBlindness", () => {
    it("should return the same color for normal vision", () => {
      const result = simulateColorBlindness("#ff0000", "normal");
      expect(result).toBe("#ff0000");
    });

    it("should transform colors for protanopia", () => {
      const result = simulateColorBlindness("#ff0000", "protanopia");
      // We're not testing the exact result as it depends on the color-blind library
      expect(result).not.toBe("#ff0000");
    });
  });

  describe("calculateContrastRatio", () => {
    it("should calculate correct contrast ratio between black and white", () => {
      const ratio = calculateContrastRatio("#000000", "#ffffff");
      expect(ratio).toBeCloseTo(21, 0); // We expect around 21:1 for black/white
    });

    it("should calculate low contrast for similar colors", () => {
      const ratio = calculateContrastRatio("#333333", "#444444");
      expect(ratio).toBeLessThan(3);
    });
  });

  describe("meetsContrastStandard", () => {
    it("should pass AA standard for large text with 3:1 ratio", () => {
      expect(meetsContrastStandard(3, "AA", true)).toBe(true);
    });

    it("should fail AA standard for normal text with 3:1 ratio", () => {
      expect(meetsContrastStandard(3, "AA", false)).toBe(false);
    });

    it("should pass AAA standard for normal text with 7:1 ratio", () => {
      expect(meetsContrastStandard(7, "AAA", false)).toBe(true);
    });
  });
});
