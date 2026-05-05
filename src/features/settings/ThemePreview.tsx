import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

import type { ColorScheme } from "@/lib/colorScheme";

interface ThemePreviewProps {
  type: ColorScheme;
  selected: boolean;
  onClick: () => void;
}

function AppIllustration({ type }: { type: ColorScheme }) {
  const isDark = type === "dark";
  const isSystem = type === "system";

  const bg = isDark ? "#1f1f21" : "#f5f6f8";
  const titlebar = isDark ? "#151517" : "#ffffff";
  const sidebar = isDark ? "#151517" : "#ffffff";
  const dot1 = "#ff5f57";
  const dot2 = "#febc2e";
  const dot3 = "#28c840";
  const line1 = isDark ? "#5f6369" : "#a7abb2";
  const lineBg = isDark ? "#2a2a2d" : "#ffffff";
  const rightBg = isDark ? "#1f1f21" : "#f5f6f8";

  return (
    <svg viewBox="0 0 168 102" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full rounded-md overflow-hidden">
      {isSystem ? (
        <>
          {/* Left half light */}
          <rect x="0" y="0" width="84" height="102" fill="#f5f6f8" />
          {/* Right half dark */}
          <rect x="84" y="0" width="84" height="102" fill="#1f1f21" />
          {/* Titlebar light */}
          <rect x="0" y="0" width="84" height="18" fill="#ffffff" />
          {/* Titlebar dark */}
          <rect x="84" y="0" width="84" height="18" fill="#151517" />
          {/* Traffic lights */}
          <circle cx="10" cy="9" r="2.5" fill={dot1} />
          <circle cx="18" cy="9" r="2.5" fill={dot2} />
          <circle cx="26" cy="9" r="2.5" fill={dot3} />
          {/* Sidebar light */}
          <rect x="0" y="18" width="40" height="84" fill="#ffffff" />
          {/* Content lines light */}
          <rect x="50" y="28" width="14" height="12" rx="2" fill="#a7abb2" />
          <rect x="50" y="46" width="28" height="10" rx="2" fill="#ffffff" />
          <rect x="50" y="62" width="22" height="10" rx="2" fill="#ffffff" />
          <rect x="50" y="78" width="25" height="10" rx="2" fill="#ffffff" />
          {/* Sidebar dark */}
          <rect x="84" y="18" width="40" height="84" fill="#151517" />
          {/* Content lines dark */}
          <rect x="134" y="28" width="14" height="12" rx="2" fill="#5f6369" />
          <rect x="134" y="46" width="28" height="10" rx="2" fill="rgba(255,255,255,0.08)" />
          <rect x="134" y="62" width="22" height="10" rx="2" fill="rgba(255,255,255,0.08)" />
          <rect x="134" y="78" width="25" height="10" rx="2" fill="rgba(255,255,255,0.08)" />
        </>
      ) : (
        <>
          <rect width="168" height="102" fill={bg} />
          {/* Titlebar */}
          <rect width="168" height="18" fill={titlebar} />
          {/* Traffic lights */}
          <circle cx="10" cy="9" r="2.5" fill={dot1} />
          <circle cx="18" cy="9" r="2.5" fill={dot2} />
          <circle cx="26" cy="9" r="2.5" fill={dot3} />
          {/* Sidebar */}
          <rect y="18" width="40" height="84" fill={sidebar} />
          {/* Content area */}
          <rect x="50" y="18" width="118" height="84" fill={rightBg} />
          {/* Lines */}
          <rect x="58" y="28" width="14" height="12" rx="2" fill={line1} />
          <rect x="58" y="46" width="72" height="10" rx="2" fill={lineBg} />
          <rect x="58" y="62" width="58" height="10" rx="2" fill={lineBg} />
          <rect x="58" y="78" width="65" height="10" rx="2" fill={lineBg} />
        </>
      )}
    </svg>
  );
}

export function ThemePreview({ type, selected, onClick }: ThemePreviewProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-48 rounded-xl border-2 border-border bg-card p-2.5 font-bold text-muted-foreground",
        selected && "border-primary text-primary ring-1 ring-primary/10"
      )}
    >
      <AppIllustration type={type} />
      <div className="flex h-7 items-end justify-center">
        <div className="flex items-center justify-center gap-1 text-sm">
          {type === "system" && <Monitor className="size-3.5" />}
          {type === "light" && <Sun className="size-3.5" />}
          {type === "dark" && <Moon className="size-3.5" />}
          <span className="capitalize">{type}</span>
        </div>
      </div>
    </button>
  );
}
