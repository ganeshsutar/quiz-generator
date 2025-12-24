import { useState } from "react";
import { Palette, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/theme-provider";
import {
  colorPresets,
  colorSchemeOptions,
  ColorScheme,
} from "@/lib/theme-presets";
import { hexToHsl, hslToHex } from "@/lib/color-utils";
import { cn } from "@/lib/utils";

export function ThemeCustomizer() {
  const [open, setOpen] = useState(false);
  const { colorScheme, setColorScheme, customColors, setCustomColors } =
    useTheme();

  const handlePresetSelect = (scheme: Exclude<ColorScheme, "custom">) => {
    setColorScheme(scheme);
  };

  const handleCustomColorChange = (hex: string) => {
    const hsl = hexToHsl(hex);
    setCustomColors({
      primary: hsl,
      primaryForeground: "210 40% 98%",
      ring: hsl,
    });
  };

  const currentCustomHex = customColors
    ? hslToHex(customColors.primary)
    : "#7c3aed";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Customize theme">
          <Palette className="h-5 w-5" />
          <span className="sr-only">Customize theme</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Customize Theme</DialogTitle>
          <DialogDescription>
            Choose a preset color scheme or create your own custom theme.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Preset Color Schemes */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Color Scheme</Label>
            <div className="grid grid-cols-3 gap-3">
              {colorSchemeOptions.map((scheme) => {
                const preset = colorPresets[scheme];
                const isSelected = colorScheme === scheme;

                return (
                  <button
                    key={scheme}
                    onClick={() => handlePresetSelect(scheme)}
                    className={cn(
                      "relative flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all hover:bg-accent",
                      isSelected
                        ? "border-primary bg-accent"
                        : "border-transparent"
                    )}
                  >
                    <div
                      className="h-8 w-8 rounded-full border-2 border-muted shadow-sm"
                      style={{
                        backgroundColor: `hsl(${preset.colors.primary})`,
                      }}
                    />
                    <span className="text-xs font-medium">{preset.label}</span>
                    {isSelected && (
                      <Check className="absolute right-1.5 top-1.5 h-3.5 w-3.5 text-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Custom Color Picker */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Custom Color</Label>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={currentCustomHex}
                  onChange={(e) => handleCustomColorChange(e.target.value)}
                  className="h-10 w-14 cursor-pointer rounded-md border border-input bg-transparent p-1"
                  title="Pick a custom primary color"
                />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Primary Color</p>
                  <p className="text-xs text-muted-foreground">
                    Used for buttons, links, and accents
                  </p>
                </div>
              </div>
            </div>
            {colorScheme === "custom" && (
              <p className="text-xs text-muted-foreground">
                Custom color is active
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
