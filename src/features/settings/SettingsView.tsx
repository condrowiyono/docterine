import { useState } from "react";
import {
  Box,
  Boxes,
  CircleGauge,
  List,
  Palette,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Type,
  Zap,
} from "lucide-react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import {
  borderRadiusLabel,
  radiusRemFromSlider,
  sliderFromRadiusRem,
} from "@/lib/borderRadius";
import {
  fontScaleFromSlider,
  fontScaleLabel,
  sliderFromFontScale,
} from "@/lib/fontScale";
import { useThemeStore } from "@/store/useThemeStore";
import { SettingRow } from "./SettingRow";
import { ThemePreview } from "./ThemePreview";

const settingsNav = [
  { id: "general", label: "General", icon: Settings, tone: "neutral" },
  { id: "appearance", label: "Appearance", icon: Palette, tone: "blue" },
  { id: "layout", label: "App Layout", icon: PanelLeftOpen, tone: "neutral" },
  { id: "tree", label: "File Tree", icon: Boxes, tone: "green" },
  { id: "sidebar", label: "Sidebar", icon: PanelLeftClose, tone: "orange" },
  { id: "scheme", label: "Color Scheme", icon: Palette, tone: "cyan" },
  { id: "about", label: "About", icon: CircleGauge, tone: "neutral" },
] as const;

const sectionTitle =
  "mb-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground";
const card = "overflow-hidden rounded-xl border bg-card";

export function SettingsView() {
  const [activeSection, setActiveSection] = useState("appearance");
  const colorScheme = useThemeStore((s) => s.colorScheme);
  const setColorScheme = useThemeStore((s) => s.setColorScheme);
  const fontScale = useThemeStore((s) => s.fontScale);
  const setFontScale = useThemeStore((s) => s.setFontScale);
  const borderRadiusRem = useThemeStore((s) => s.borderRadiusRem);
  const setBorderRadiusRem = useThemeStore((s) => s.setBorderRadiusRem);
  const roundnessSlider = [Math.round(sliderFromRadiusRem(borderRadiusRem))];
  const fontSizeSlider = [Math.round(sliderFromFontScale(fontScale))];
  const [animation, setAnimation] = useState([92]);
  const [elevation, setElevation] = useState([6]);
  const [density, setDensity] = useState("comfortable");

  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="flex flex-1 min-w-0 gap-1"
    >
      <ResizablePanel
        defaultSize={280}
        minSize={240}
        maxSize={360}
        className="flex flex-col overflow-hidden rounded-xl border bg-card"
      >
        <div className="flex min-h-16 items-center px-4 py-3.5">
          <h1 className="m-0 text-lg font-bold leading-none text-foreground">
            Settings
          </h1>
        </div>
        <div className="flex flex-col border-t border-border">
          {settingsNav.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={cn(
                  "flex h-11 items-center gap-2.5 border-0 border-b border-border bg-transparent px-3.5 text-left",
                  activeSection === item.id && "settings-nav-item is-selected",
                )}
                onClick={() => setActiveSection(item.id)}
              >
                <span className={cn("settings-icon", item.tone)}>
                  <Icon />
                </span>
                <span className="text-base font-normal text-foreground">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel className="overflow-hidden rounded-xl border">
        <main className="h-full overflow-auto p-8">
          <section className="mb-5">
            <h2 className={sectionTitle}>Application Theme</h2>
            <div className="flex gap-3.5">
              {(["system", "light", "dark"] as const).map((item) => (
                <ThemePreview
                  key={item}
                  type={item}
                  selected={colorScheme === item}
                  onClick={() => setColorScheme(item)}
                />
              ))}
            </div>
          </section>

          <section className="mb-5">
            <h2 className={sectionTitle}>Border Radius</h2>
            <div className={card}>
              <SettingRow
                icon={Box}
                title="Roundness"
                subtitle={borderRadiusLabel(borderRadiusRem)}
                tone="orange"
              >
                <span className="shrink-0 text-xs font-medium text-muted-foreground">
                  Sharp
                </span>
                <Slider
                  className="min-w-24 max-w-24 flex-1"
                  value={roundnessSlider}
                  onValueChange={(v) =>
                    setBorderRadiusRem(radiusRemFromSlider(v[0] ?? 50))
                  }
                />
                <span className="shrink-0 text-xs font-medium text-muted-foreground">
                  Round
                </span>
              </SettingRow>
            </div>
          </section>

          <section className="mb-5">
            <h2 className={sectionTitle}>Font Size</h2>
            <div className={card}>
              <SettingRow
                icon={Type}
                title="UI Font Size"
                subtitle={fontScaleLabel(fontScale)}
                tone="cyan"
              >
                <span className="shrink-0 text-xs font-medium text-muted-foreground">
                  Small
                </span>
                <Slider
                  className="min-w-24 max-w-24 flex-1"
                  value={fontSizeSlider}
                  onValueChange={(v) =>
                    setFontScale(fontScaleFromSlider(v[0] ?? 50))
                  }
                />
                <span className="shrink-0 text-xs font-medium text-muted-foreground">
                  Large
                </span>
              </SettingRow>
            </div>
          </section>

          <section className="mb-5">
            <h2 className={sectionTitle}>Animation</h2>
            <div className={card}>
              <SettingRow
                icon={Zap}
                title="Animation speed"
                subtitle="Slow"
                tone="yellow"
              >
                <span className="shrink-0 text-xs font-medium text-muted-foreground">
                  Off
                </span>
                <Slider
                  className="min-w-24 max-w-24 flex-1"
                  value={animation}
                  onValueChange={setAnimation}
                />
                <span className="shrink-0 text-xs font-medium text-muted-foreground">
                  Slow
                </span>
              </SettingRow>
            </div>
          </section>

          <section className="mb-5">
            <h2 className={sectionTitle}>Visual Style</h2>
            <div className={card}>
              <SettingRow
                icon={List}
                title="Density"
                subtitle="Scales padding and gaps; element heights stay fixed"
                tone="green"
              >
                <ToggleGroup
                  type="single"
                  value={density}
                  onValueChange={(v) => v && setDensity(v)}
                  variant="outline"
                  size="sm"
                >
                  <ToggleGroupItem value="compact">Compact</ToggleGroupItem>
                  <ToggleGroupItem value="default">Default</ToggleGroupItem>
                  <ToggleGroupItem value="comfortable">
                    Comfortable
                  </ToggleGroupItem>
                </ToggleGroup>
              </SettingRow>
              <Separator />
              <SettingRow
                icon={Box}
                title="Elevation"
                subtitle="Off"
                tone="orange"
              >
                <span className="shrink-0 text-xs font-medium text-muted-foreground">
                  Off
                </span>
                <Slider
                  className="min-w-24 max-w-24 flex-1"
                  value={elevation}
                  onValueChange={setElevation}
                />
                <span className="shrink-0 text-xs font-medium text-muted-foreground">
                  Strong
                </span>
              </SettingRow>
            </div>
          </section>
        </main>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
