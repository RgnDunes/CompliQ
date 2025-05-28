import { describe, it, expect, beforeEach } from "vitest";
import { generateScreenReaderText } from "./accessibility";

// We're mocking DOM elements since we can't test with actual DOM in the unit tests
// These tests focus on the utility functions that don't require a full DOM

describe("Accessibility Utilities", () => {
  describe("generateScreenReaderText", () => {
    // Create a mock element
    let mockElement: HTMLElement;

    beforeEach(() => {
      mockElement = document.createElement("button");
      mockElement.textContent = "Click me";
    });

    it("should generate basic text from element content", () => {
      const text = generateScreenReaderText(mockElement);
      expect(text).toContain("Click me");
    });

    it("should include aria-label when present", () => {
      mockElement.setAttribute("aria-label", "Submit form");
      const text = generateScreenReaderText(mockElement);
      expect(text).toContain("Submit form");
    });

    it("should include role information", () => {
      const text = generateScreenReaderText(mockElement);
      expect(text).toContain("button");
    });

    it("should include state information", () => {
      mockElement.setAttribute("aria-expanded", "true");
      const text = generateScreenReaderText(mockElement);
      expect(text).toContain("expanded");
    });

    it("should include disabled state", () => {
      mockElement.setAttribute("disabled", "");
      const text = generateScreenReaderText(mockElement);
      expect(text).toContain("disabled");
    });
  });
});
