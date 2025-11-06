import { createSystem } from "@chakra-ui/react";

// Only override colors; keep everything else from Chakra defaults
const customColors = {
  primary: {
    50: { value: "#eef2ff" },
    100: { value: "#e0e7ff" },
    200: { value: "#c7d2fe" },
    300: { value: "#a5b4fc" },
    400: { value: "#818cf8" },
    500: { value: "#6366f1" },
    600: { value: "#4f46e5" },
    700: { value: "#4338ca" },
    800: { value: "#3730a3" },
    900: { value: "#312e81" },
  },
  // Example extra brand color; add or rename as needed
  brand: {
    50: { value: "#eff6ff" },
    100: { value: "#dbeafe" },
    200: { value: "#bfdbfe" },
    300: { value: "#93c5fd" },
    400: { value: "#60a5fa" },
    500: { value: "#3b82f6" },
    600: { value: "#2563eb" },
    700: { value: "#1d4ed8" },
    800: { value: "#1e40af" },
    900: { value: "#1e3a8a" },
  },
};

export const appSystem = createSystem({
  theme: {
    // Override only colors; keep all other defaults from Chakra
    tokens: {
      colors: customColors as any,
    },
  },
});


