import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {
  AppState,
  AccessibilityReport,
  ColorBlindnessType,
  SimulationType,
} from "../types";

const initialState: AppState = {
  currentSimulation: null,
  colorBlindnessType: "normal",
  showHighlights: false,
  keyboardNavigationActive: false,
  screenReaderActive: false,
  lowVisionActive: false,
  urlInput: {
    url: "",
    isValid: false,
    isLoading: false,
  },
  accessibilityReport: null,
};

type AppActions = {
  setCurrentSimulation: (simulationType: SimulationType | null) => void;
  setColorBlindnessType: (type: ColorBlindnessType) => void;
  toggleHighlights: () => void;
  toggleKeyboardNavigation: () => void;
  toggleScreenReader: () => void;
  toggleLowVision: () => void;
  setUrl: (url: string) => void;
  setUrlValidity: (isValid: boolean) => void;
  setUrlLoading: (isLoading: boolean) => void;
  setAccessibilityReport: (report: AccessibilityReport | null) => void;
  resetState: () => void;
};

export const useAppStore = create<AppState & AppActions>()(
  devtools(
    (set) => ({
      ...initialState,

      setCurrentSimulation: (simulationType) =>
        set({ currentSimulation: simulationType }),

      setColorBlindnessType: (type) => set({ colorBlindnessType: type }),

      toggleHighlights: () =>
        set((state) => ({ showHighlights: !state.showHighlights })),

      toggleKeyboardNavigation: () =>
        set((state) => ({
          keyboardNavigationActive: !state.keyboardNavigationActive,
        })),

      toggleScreenReader: () =>
        set((state) => ({ screenReaderActive: !state.screenReaderActive })),

      toggleLowVision: () =>
        set((state) => ({ lowVisionActive: !state.lowVisionActive })),

      setUrl: (url) =>
        set((state) => ({
          urlInput: { ...state.urlInput, url },
        })),

      setUrlValidity: (isValid) =>
        set((state) => ({
          urlInput: { ...state.urlInput, isValid },
        })),

      setUrlLoading: (isLoading) =>
        set((state) => ({
          urlInput: { ...state.urlInput, isLoading },
        })),

      setAccessibilityReport: (report) => set({ accessibilityReport: report }),

      resetState: () => set(initialState),
    }),
    { name: "compliq-store" }
  )
);
