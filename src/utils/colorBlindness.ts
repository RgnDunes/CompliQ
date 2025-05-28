import type { ColorBlindnessType } from "../types";
import * as colorBlind from "color-blind";
import convert from "color-convert";

/**
 * Transforms a color using the specified color blindness type
 * @param hexColor The hex color to transform (e.g. "#ff0000")
 * @param type The type of color blindness to simulate
 * @returns The transformed hex color
 */
export const simulateColorBlindness = (
  hexColor: string,
  type: ColorBlindnessType
): string => {
  if (type === "normal") {
    return hexColor;
  }

  try {
    // Ensure the hex color starts with #
    const formattedHex = hexColor.startsWith("#") ? hexColor : `#${hexColor}`;

    switch (type) {
      case "protanopia":
        return colorBlind.protanopia(formattedHex);
      case "deuteranopia":
        return colorBlind.deuteranopia(formattedHex);
      case "tritanopia":
        return colorBlind.tritanopia(formattedHex);
      case "achromatopsia":
        return colorBlind.achromatopsia(formattedHex);
      default:
        return formattedHex;
    }
  } catch (error) {
    console.error("Error simulating color blindness:", error);
    return hexColor;
  }
};

/**
 * Calculates the contrast ratio between two colors
 * @param hexColor1 First hex color
 * @param hexColor2 Second hex color
 * @returns The contrast ratio (1-21)
 */
export const calculateContrastRatio = (
  hexColor1: string,
  hexColor2: string
): number => {
  try {
    // Convert hex to RGB
    const rgb1 = convert.hex.rgb(hexColor1.replace("#", ""));
    const rgb2 = convert.hex.rgb(hexColor2.replace("#", ""));

    // Calculate relative luminance
    const luminance1 = calculateRelativeLuminance(rgb1);
    const luminance2 = calculateRelativeLuminance(rgb2);

    // Calculate contrast ratio
    const lighter = Math.max(luminance1, luminance2);
    const darker = Math.min(luminance1, luminance2);

    return (lighter + 0.05) / (darker + 0.05);
  } catch (error) {
    console.error("Error calculating contrast ratio:", error);
    return 1; // Return minimum ratio if calculation fails
  }
};

/**
 * Calculates the relative luminance of an RGB color
 * @param rgb RGB array [r, g, b]
 * @returns The relative luminance
 */
const calculateRelativeLuminance = (rgb: number[]): number => {
  // Convert RGB to sRGB
  const sRGB = rgb.map((channel) => {
    const value = channel / 255;
    return value <= 0.03928
      ? value / 12.92
      : Math.pow((value + 0.055) / 1.055, 2.4);
  });

  // Calculate luminance using the formula
  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
};

/**
 * Checks if a contrast ratio meets WCAG standards
 * @param ratio The contrast ratio
 * @param level The WCAG level to check against ('AA' or 'AAA')
 * @param isLargeText Whether the text is large (≥18pt or ≥14pt bold)
 * @returns Whether the contrast meets the standard
 */
export const meetsContrastStandard = (
  ratio: number,
  level: "AA" | "AAA" = "AA",
  isLargeText = false
): boolean => {
  if (level === "AA") {
    return isLargeText ? ratio >= 3 : ratio >= 4.5;
  } else {
    return isLargeText ? ratio >= 4.5 : ratio >= 7;
  }
};
