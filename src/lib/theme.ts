import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import type { StyleFunctionProps } from "@chakra-ui/theme-tools";

// Define the color mode config
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// Define the color palette
const colors = {
  brand: {
    50: "#E6F2FF",
    100: "#CCE5FF",
    200: "#99CBFF",
    300: "#66B2FF",
    400: "#3399FF",
    500: "#007FFF", // Primary blue
    600: "#0066CC",
    700: "#004C99",
    800: "#003366",
    900: "#001933",
  },
  accent: {
    50: "#FFECE6",
    100: "#FFD9CC",
    200: "#FFB399",
    300: "#FF8C66",
    400: "#FF6633",
    500: "#FF4000", // Primary orange accent
    600: "#CC3300",
    700: "#992600",
    800: "#661A00",
    900: "#330D00",
  },
  success: {
    500: "#0CAF60", // Green for success
  },
  warning: {
    500: "#FFB020", // Amber for warnings
  },
  error: {
    500: "#E93C3C", // Red for errors
  },
  neutral: {
    50: "#F7F7F9",
    100: "#E8E8EC",
    200: "#D1D1D9",
    300: "#B9B9C6",
    400: "#A2A2B3",
    500: "#8A8A9F",
    600: "#71718E",
    700: "#5D5D7A",
    800: "#2C2C3B",
    900: "#151520",
  },
};

// Define semantic tokens
const semanticTokens = {
  colors: {
    "bg.app": {
      default: "white",
      _dark: "neutral.900",
    },
    "bg.panel": {
      default: "neutral.50",
      _dark: "neutral.800",
    },
    "text.primary": {
      default: "neutral.900",
      _dark: "white",
    },
    "text.secondary": {
      default: "neutral.600",
      _dark: "neutral.300",
    },
    "border.subtle": {
      default: "neutral.200",
      _dark: "neutral.700",
    },
  },
};

// Define the custom components
const components = {
  Button: {
    baseStyle: {
      fontWeight: "600",
      borderRadius: "md",
    },
    variants: {
      solid: {
        bg: "brand.500",
        color: "white",
        _hover: {
          bg: "brand.600",
        },
      },
      outline: {
        borderColor: "brand.500",
        color: "brand.500",
        _hover: {
          bg: "brand.50",
        },
      },
      ghost: {
        color: "brand.500",
        _hover: {
          bg: "brand.50",
        },
      },
      accent: {
        bg: "accent.500",
        color: "white",
        _hover: {
          bg: "accent.600",
        },
      },
    },
    defaultProps: {
      variant: "solid",
    },
  },
  Heading: {
    baseStyle: {
      fontWeight: "700",
      color: "text.primary",
    },
  },
  Text: {
    baseStyle: {
      color: "text.primary",
    },
    variants: {
      secondary: {
        color: "text.secondary",
      },
    },
  },
  Card: {
    baseStyle: {
      container: {
        bg: "white",
        boxShadow: "sm",
        borderRadius: "lg",
        overflow: "hidden",
        _dark: {
          bg: "neutral.800",
        },
      },
    },
  },
};

// Define other theme customizations
const styles = {
  global: {
    body: {
      bg: "bg.app",
      color: "text.primary",
    },
  },
};

// Define fonts
const fonts = {
  heading: "'Inter', sans-serif",
  body: "'Inter', sans-serif",
};

// Define the radii
const radii = {
  sm: "4px",
  md: "6px",
  lg: "8px",
  xl: "12px",
  "2xl": "16px",
};

// Extend the theme
const theme = extendTheme({
  config,
  colors,
  semanticTokens,
  components,
  styles,
  fonts,
  radii,
});

export default theme;
