export type ColorScheme =
  | "purple"
  | "blue"
  | "green"
  | "orange"
  | "rose"
  | "violet"
  | "custom";

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
