export type ColorScheme =
  | "purple"
  | "blue"
  | "green"
  | "orange"
  | "rose"
  | "violet"
  | "custom";

export type ThemeRadius = "none" | "sm" | "md" | "lg" | "xl";

export type ThemeStyle = "default" | "new-york";

export interface ThemeColors {
  primary: string;
  primaryForeground: string;
  ring: string;
}

export interface ColorPreset {
  name: string;
  label: string;
  colors: ThemeColors;
}

export const radiusOptions: { value: ThemeRadius; label: string; cssValue: string }[] = [
  { value: "none", label: "None", cssValue: "0" },
  { value: "sm", label: "Small", cssValue: "0.3rem" },
  { value: "md", label: "Medium", cssValue: "0.5rem" },
  { value: "lg", label: "Large", cssValue: "0.75rem" },
  { value: "xl", label: "Extra Large", cssValue: "1rem" },
];

export const styleOptions: { value: ThemeStyle; label: string; description: string }[] = [
  { value: "default", label: "Default", description: "Classic shadcn/ui style" },
  { value: "new-york", label: "New York", description: "Sharp edges, bolder colors" },
];

export const colorPresets: Record<Exclude<ColorScheme, "custom">, ColorPreset> = {
  purple: {
    name: "purple",
    label: "Purple",
    colors: {
      primary: "262 83% 58%",
      primaryForeground: "210 40% 98%",
      ring: "262 83% 58%",
    },
  },
  blue: {
    name: "blue",
    label: "Blue",
    colors: {
      primary: "221 83% 53%",
      primaryForeground: "210 40% 98%",
      ring: "221 83% 53%",
    },
  },
  green: {
    name: "green",
    label: "Green",
    colors: {
      primary: "142 76% 36%",
      primaryForeground: "210 40% 98%",
      ring: "142 76% 36%",
    },
  },
  orange: {
    name: "orange",
    label: "Orange",
    colors: {
      primary: "24 95% 53%",
      primaryForeground: "210 40% 98%",
      ring: "24 95% 53%",
    },
  },
  rose: {
    name: "rose",
    label: "Rose",
    colors: {
      primary: "346 77% 50%",
      primaryForeground: "210 40% 98%",
      ring: "346 77% 50%",
    },
  },
  violet: {
    name: "violet",
    label: "Violet",
    colors: {
      primary: "263 70% 50%",
      primaryForeground: "210 40% 98%",
      ring: "263 70% 50%",
    },
  },
};

export const colorSchemeOptions = Object.keys(colorPresets) as Exclude<
  ColorScheme,
  "custom"
>[];
