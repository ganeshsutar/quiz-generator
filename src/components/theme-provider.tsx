import { createContext, useContext, useEffect, useState } from "react";
import {
  ColorScheme,
  ThemeColors,
  ThemeRadius,
  ThemeStyle,
  colorPresets,
  radiusOptions,
} from "@/lib/theme-presets";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultColorScheme?: ColorScheme;
  defaultRadius?: ThemeRadius;
  defaultStyle?: ThemeStyle;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  customColors: ThemeColors | null;
  setCustomColors: (colors: ThemeColors) => void;
  radius: ThemeRadius;
  setRadius: (radius: ThemeRadius) => void;
  style: ThemeStyle;
  setStyle: (style: ThemeStyle) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  colorScheme: "purple",
  setColorScheme: () => null,
  customColors: null,
  setCustomColors: () => null,
  radius: "md",
  setRadius: () => null,
  style: "default",
  setStyle: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

const THEME_STORAGE_KEY = "quiz-generator-theme";
const COLOR_SCHEME_STORAGE_KEY = "quiz-generator-color-scheme";
const CUSTOM_COLORS_STORAGE_KEY = "quiz-generator-custom-colors";
const RADIUS_STORAGE_KEY = "quiz-generator-radius";
const STYLE_STORAGE_KEY = "quiz-generator-style";

function applyColorsToDom(colors: ThemeColors) {
  const root = document.documentElement;
  root.style.setProperty("--primary", colors.primary);
  root.style.setProperty("--primary-foreground", colors.primaryForeground);
  root.style.setProperty("--ring", colors.ring);
}

function applyRadiusToDom(radius: ThemeRadius) {
  const root = document.documentElement;
  const radiusOption = radiusOptions.find((r) => r.value === radius);
  if (radiusOption) {
    root.style.setProperty("--radius", radiusOption.cssValue);
  }
}

function applyStyleToDom(style: ThemeStyle) {
  const root = document.documentElement;
  root.classList.remove("style-default", "style-new-york");
  root.classList.add(`style-${style}`);
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  defaultColorScheme = "purple",
  defaultRadius = "md",
  defaultStyle = "default",
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

  const [radius, setRadiusState] = useState<ThemeRadius>(() => {
    const stored = localStorage.getItem(RADIUS_STORAGE_KEY);
    return (stored as ThemeRadius) || defaultRadius;
  });

  const [style, setStyleState] = useState<ThemeStyle>(() => {
    const stored = localStorage.getItem(STYLE_STORAGE_KEY);
    return (stored as ThemeStyle) || defaultStyle;
  });

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

  // Apply radius
  useEffect(() => {
    applyRadiusToDom(radius);
  }, [radius]);

  // Apply style
  useEffect(() => {
    applyStyleToDom(style);
  }, [style]);

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

  const setRadius = (newRadius: ThemeRadius) => {
    localStorage.setItem(RADIUS_STORAGE_KEY, newRadius);
    setRadiusState(newRadius);
  };

  const setStyle = (newStyle: ThemeStyle) => {
    localStorage.setItem(STYLE_STORAGE_KEY, newStyle);
    setStyleState(newStyle);
  };

  const value = {
    theme,
    setTheme,
    colorScheme,
    setColorScheme,
    customColors,
    setCustomColors,
    radius,
    setRadius,
    style,
    setStyle,
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
