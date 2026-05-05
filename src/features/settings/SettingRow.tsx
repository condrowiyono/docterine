import { Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface SettingRowProps {
  icon: typeof Settings;
  title: string;
  subtitle: string;
  tone: string;
  children: React.ReactNode;
}

export function SettingRow({ icon: Icon, title, subtitle, tone, children }: SettingRowProps) {
  return (
    <div className="flex min-h-16 items-center justify-between gap-3.5 px-4.5 py-2.5">
      <div className="flex shrink-0 items-center gap-3.5">
        <div className={cn("setting-icon", tone)}>
          <Icon />
        </div>
        <div className="flex flex-col gap-0.5">
          <strong className="text-sm font-normal text-foreground">{title}</strong>
          <span className="text-xs font-medium text-muted-foreground">{subtitle}</span>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 items-center justify-end gap-3">{children}</div>
    </div>
  );
}
