/** Global UI text scale; multiplies every `--text-*` token in `App.css` @theme. */

export const FONT_SCALE_STORAGE_KEY = "docterine-font-scale";

export const FONT_SCALE_MIN = 0.8;
export const FONT_SCALE_MAX = 1.1;
export const DEFAULT_FONT_SCALE = 0.9;

function clampScale(n: number): number {
  return Math.min(FONT_SCALE_MAX, Math.max(FONT_SCALE_MIN, n));
}

export function clampFontScale(n: number): number {
  return clampScale(n);
}

/** Map settings slider 0–100 to scale; 50 = default (0.9), 0 = smallest, 100 = largest. */
export function fontScaleFromSlider(slider: number): number {
  const s = Math.min(100, Math.max(0, slider));
  if (s <= 50) {
    return FONT_SCALE_MIN + (s / 50) * (DEFAULT_FONT_SCALE - FONT_SCALE_MIN);
  }
  return DEFAULT_FONT_SCALE + ((s - 50) / 50) * (FONT_SCALE_MAX - DEFAULT_FONT_SCALE);
}

export function sliderFromFontScale(scale: number): number {
  const x = clampScale(scale);
  if (x <= DEFAULT_FONT_SCALE) {
    const span = DEFAULT_FONT_SCALE - FONT_SCALE_MIN;
    if (span <= 0) return 0;
    return ((x - FONT_SCALE_MIN) / span) * 50;
  }
  const span = FONT_SCALE_MAX - DEFAULT_FONT_SCALE;
  if (span <= 0) return 100;
  return 50 + ((x - DEFAULT_FONT_SCALE) / span) * 50;
}

export function fontScaleLabel(scale: number): string {
  if (scale < 0.86) return "Small";
  if (scale > 1.02) return "Large";
  return "Default";
}

export function readStoredFontScale(): number {
  if (typeof window === "undefined") return DEFAULT_FONT_SCALE;
  try {
    const raw = localStorage.getItem(FONT_SCALE_STORAGE_KEY);
    if (raw == null) return DEFAULT_FONT_SCALE;
    const n = Number.parseFloat(raw);
    if (!Number.isFinite(n)) return DEFAULT_FONT_SCALE;
    return clampScale(n);
  } catch {
    return DEFAULT_FONT_SCALE;
  }
}

export function writeFontScaleToDom(scale: number): void {
  document.documentElement.style.setProperty("--app-font-scale", String(clampScale(scale)));
}

export function persistFontScale(scale: number): void {
  try {
    localStorage.setItem(FONT_SCALE_STORAGE_KEY, String(clampScale(scale)));
  } catch {
    /* ignore quota / private mode */
  }
}
