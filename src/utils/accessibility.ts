import axe from "axe-core";
import type {
  AccessibilityIssue,
  AccessibilityReport,
  IssueSeverity,
} from "../types";

/**
 * Run an accessibility audit on the current document
 * @returns A promise that resolves to an AccessibilityReport
 */
export const runAccessibilityAudit = async (): Promise<AccessibilityReport> => {
  try {
    // Run the axe analysis
    const results = await axe.run(document);

    // Transform the violations into our format
    const issues: AccessibilityIssue[] = results.violations
      .map((violation) => {
        // Map axe impact to our severity levels
        const severityMap: Record<string, IssueSeverity> = {
          critical: "critical",
          serious: "serious",
          moderate: "moderate",
          minor: "minor",
        };

        // For each node that has this violation, create an issue
        return violation.nodes.map((node) => ({
          id: `${violation.id}-${Math.random().toString(36).substring(2, 9)}`,
          element: document.querySelector(node.target.join(" ")),
          selector: node.target.join(" "),
          message: violation.help,
          severity: severityMap[violation.impact] || "moderate",
          impact: violation.impact,
          help: violation.help,
          helpUrl: violation.helpUrl,
          tags: violation.tags,
          fixes: node.failureSummary ? [node.failureSummary] : [],
        }));
      })
      .flat();

    // Calculate a score (0-100)
    // Formula: (passed rules / total rules) * 100
    const passedRules = results.passes.length;
    const totalRules =
      passedRules + results.violations.length + results.incomplete.length;
    const score = Math.round((passedRules / totalRules) * 100);

    return {
      score,
      issues,
      passedRules,
      totalRules,
    };
  } catch (error) {
    console.error("Error running accessibility audit:", error);
    return {
      score: 0,
      issues: [],
      passedRules: 0,
      totalRules: 0,
    };
  }
};

/**
 * Detect elements that might have keyboard navigation issues
 * @returns An array of elements with potential keyboard navigation issues
 */
export const detectKeyboardNavigationIssues = (): HTMLElement[] => {
  const interactive = document.querySelectorAll<HTMLElement>(
    'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  const potentialIssues: HTMLElement[] = [];

  interactive.forEach((element) => {
    // Check if element is visible
    const style = window.getComputedStyle(element);
    const isVisible =
      style.display !== "none" &&
      style.visibility !== "hidden" &&
      element.offsetWidth > 0 &&
      element.offsetHeight > 0;

    // Check if element has a focus indicator style
    const hasFocusStyle = element.matches(":focus-visible");

    // Check if element has a tabindex that's not appropriate
    const tabIndex = element.getAttribute("tabindex");
    const hasInvalidTabIndex =
      tabIndex !== null &&
      parseInt(tabIndex) < 0 &&
      !element.hasAttribute("aria-hidden");

    // Add to potential issues if there are problems
    if (isVisible && (!hasFocusStyle || hasInvalidTabIndex)) {
      potentialIssues.push(element);
    }
  });

  return potentialIssues;
};

/**
 * Generate screen reader text for an element
 * @param element The element to generate text for
 * @returns The text that would be read by a screen reader
 */
export const generateScreenReaderText = (element: HTMLElement): string => {
  // Start with the accessible name
  let text =
    element.getAttribute("aria-label") ||
    element.getAttribute("alt") ||
    element.textContent ||
    "";

  // Add role information
  const role = element.getAttribute("role") || getImplicitRole(element);
  if (role) {
    text = `${role}: ${text}`;
  }

  // Add state information
  if (element.hasAttribute("aria-expanded")) {
    text +=
      element.getAttribute("aria-expanded") === "true"
        ? " (expanded)"
        : " (collapsed)";
  }

  if (element.hasAttribute("aria-checked")) {
    text +=
      element.getAttribute("aria-checked") === "true"
        ? " (checked)"
        : " (not checked)";
  }

  if (element.hasAttribute("aria-required")) {
    text +=
      element.getAttribute("aria-required") === "true" ? " (required)" : "";
  }

  if (
    element.hasAttribute("disabled") ||
    element.getAttribute("aria-disabled") === "true"
  ) {
    text += " (disabled)";
  }

  return text.trim();
};

/**
 * Get the implicit ARIA role of an element
 * @param element The element to get the role for
 * @returns The implicit role
 */
const getImplicitRole = (element: HTMLElement): string => {
  const tagName = element.tagName.toLowerCase();

  // Map of common elements to their implicit roles
  const roleMap: Record<string, string> = {
    a: element.hasAttribute("href") ? "link" : "",
    button: "button",
    h1: "heading",
    h2: "heading",
    h3: "heading",
    h4: "heading",
    h5: "heading",
    h6: "heading",
    img: "img",
    input: getInputRole(element),
    ul: "list",
    ol: "list",
    li: "listitem",
    nav: "navigation",
    main: "main",
    footer: "contentinfo",
    header: "banner",
    aside: "complementary",
    section: "region",
    article: "article",
    dialog: "dialog",
    menu: "menu",
  };

  return roleMap[tagName] || "";
};

/**
 * Get the implicit role for input elements based on their type
 * @param element The input element
 * @returns The implicit role
 */
const getInputRole = (element: HTMLElement): string => {
  if (element.tagName.toLowerCase() !== "input") return "";

  const type = (element as HTMLInputElement).type;
  const roleMap: Record<string, string> = {
    checkbox: "checkbox",
    radio: "radio",
    range: "slider",
    button: "button",
    text: "textbox",
    email: "textbox",
    tel: "textbox",
    url: "textbox",
    password: "textbox",
    search: "searchbox",
  };

  return roleMap[type] || "textbox";
};
