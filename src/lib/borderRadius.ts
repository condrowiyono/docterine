/** Global corner radius; `--radius-lg` and shadcn radii in `App.css` derive from this. */

export const BORDER_RADIUS_STORAGE_KEY = "docterine-border-radius";

/** Rem values applied to `document.documentElement.style.setProperty('--radius', …)`. */
export const RADIUS_MIN_REM = 0.125;
export const RADIUS_MAX_REM = 1.25;
export const DEFAULT_RADIUS_REM = 0.75;

function clampRadiusRem(n: number): number {
  return Math.min(RADIUS_MAX_REM, Math.max(RADIUS_MIN_REM, n));
}

export function clampBorderRadiusRem(n: number): number {
  return clampRadiusRem(n);
}

/** Slider 0–100 → rem; 50 = default (0.75rem). */
export function radiusRemFromSlider(slider: number): number {
  const s = Math.min(100, Math.max(0, slider));
  if (s <= 50) {
    return RADIUS_MIN_REM + (s / 50) * (DEFAULT_RADIUS_REM - RADIUS_MIN_REM);
  }
  return DEFAULT_RADIUS_REM + ((s - 50) / 50) * (RADIUS_MAX_REM - DEFAULT_RADIUS_REM);
}

export function sliderFromRadiusRem(rem: number): number {
  const x = clampRadiusRem(rem);
  if (x <= DEFAULT_RADIUS_REM) {
    const span = DEFAULT_RADIUS_REM - RADIUS_MIN_REM;
    if (span <= 0) return 0;
    return ((x - RADIUS_MIN_REM) / span) * 50;
  }
  const span = RADIUS_MAX_REM - DEFAULT_RADIUS_REM;
  if (span <= 0) return 100;
  return 50 + ((x - DEFAULT_RADIUS_REM) / span) * 50;
}

export function borderRadiusLabel(rem: number): string {
  if (rem < 0.45) return "Sharp";
  if (rem > 1.0) return "Round";
  return "Default";
}

export function readStoredBorderRadiusRem(): number {
  if (typeof window === "undefined") return DEFAULT_RADIUS_REM;
  try {
    const raw = localStorage.getItem(BORDER_RADIUS_STORAGE_KEY);
    if (raw == null) return DEFAULT_RADIUS_REM;
    const n = Number.parseFloat(raw);
    if (!Number.isFinite(n)) return DEFAULT_RADIUS_REM;
    return clampRadiusRem(n);
  } catch {
    return DEFAULT_RADIUS_REM;
  }
}

export function writeBorderRadiusToDom(rem: number): void {
  const v = clampRadiusRem(rem);
  document.documentElement.style.setProperty("--radius", `${v}rem`);
}

export function persistBorderRadiusRem(rem: number): void {
  try {
    localStorage.setItem(BORDER_RADIUS_STORAGE_KEY, String(clampRadiusRem(rem)));
  } catch {
    /* ignore */
  }
}
