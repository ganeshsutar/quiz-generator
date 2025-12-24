import { createContext, useContext, useEffect, useState } from "react";
import {
  ColorScheme,
  ThemeColors,
  colorPresets,
} from "@/lib/theme-presets";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultColorScheme?: ColorScheme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  customColors: ThemeColors | null;
  setCustomColors: (colors: ThemeColors) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  colorScheme: "purple",
  setColorScheme: () => null,
  customColors: null,
  setCustomColors: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

const THEME_STORAGE_KEY = "quiz-generator-theme";
const COLOR_SCHEME_STORAGE_KEY = "quiz-generator-color-scheme";
const CUSTOM_COLORS_STORAGE_KEY = "quiz-generator-custom-colors";

function applyColorsToDom(colors: ThemeColors) {
  const root = document.documentElement;
  root.style.setProperty("--primary", colors.primary);
  root.style.setProperty("--primary-foreground", colors.primaryForeground);
  root.style.setProperty("--ring", colors.ring);
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  defaultColorScheme = "purple",
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return (stored as Theme) || defaultTheme;
  });

  const [colorScheme, setColorSchemeState] = useState<ColorScheme>(() => {
    const stored = localStorage.getItem(COLOR_SCHEME_STORAGE_KEY);
    return (stored as ColorScheme) || defaultColorScheme;
  });

  const [customColors, setCustomColorsState] = useState<ThemeColors | null>(
    () => {
      const stored = localStorage.getItem(CUSTOM_COLORS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    }
  );

  // Apply theme mode (light/dark)
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  // Apply color scheme
  useEffect(() => {
    if (colorScheme === "custom" && customColors) {
      applyColorsToDom(customColors);
    } else if (colorScheme !== "custom") {
      const preset = colorPresets[colorScheme];
      if (preset) {
        applyColorsToDom(preset.colors);
      }
    }
  }, [colorScheme, customColors]);

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    setThemeState(newTheme);
  };

  const setColorScheme = (scheme: ColorScheme) => {
    localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, scheme);
    setColorSchemeState(scheme);
  };

  const setCustomColors = (colors: ThemeColors) => {
    localStorage.setItem(CUSTOM_COLORS_STORAGE_KEY, JSON.stringify(colors));
    setCustomColorsState(colors);
    setColorScheme("custom");
  };

  const value = {
    theme,
    setTheme,
    colorScheme,
    setColorScheme,
    customColors,
    setCustomColors,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
