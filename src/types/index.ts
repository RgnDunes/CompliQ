// Color blindness simulation types
export type ColorBlindnessType =
  | "protanopia"
  | "deuteranopia"
  | "tritanopia"
  | "achromatopsia"
  | "normal";

// Accessibility simulation types
export type SimulationType =
  | "colorBlindness"
  | "keyboardNavigation"
  | "screenReader"
  | "lowVision"
  | "contrast";

// Accessibility issue severity
export type IssueSeverity = "critical" | "serious" | "moderate" | "minor";

// Accessibility issue
export interface AccessibilityIssue {
  id: string;
  element: HTMLElement | null;
  selector: string;
  message: string;
  severity: IssueSeverity;
  impact: string;
  help: string;
  helpUrl?: string;
  tags: string[];
  fixes?: string[];
}

// Accessibility report
export interface AccessibilityReport {
  score: number;
  issues: AccessibilityIssue[];
  passedRules: number;
  totalRules: number;
}

// URL Input type
export interface UrlInput {
  url: string;
  isValid: boolean;
  isLoading: boolean;
}

// App state
export interface AppState {
  currentSimulation: SimulationType | null;
  colorBlindnessType: ColorBlindnessType;
  showHighlights: boolean;
  keyboardNavigationActive: boolean;
  screenReaderActive: boolean;
  lowVisionActive: boolean;
  urlInput: UrlInput;
  accessibilityReport: AccessibilityReport | null;
}
