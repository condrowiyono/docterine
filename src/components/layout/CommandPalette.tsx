import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Box,
  Database,
  HardDrive,
  Layers,
  Network,
  Palette,
  Settings,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useUIStore } from "@/store/useUIStore";
import s from "./CommandPalette.module.css";

const commands = [
  {
    id: "settings",
    label: "Settings",
    helper: "Open application settings",
    icon: Settings,
    path: "/settings",
  },
  {
    id: "theme",
    label: "Theme Colors",
    helper: "Change color scheme (light)",
    icon: Palette,
    path: "/settings",
  },
  {
    id: "containers",
    label: "Containers",
    helper: "Go to containers list",
    icon: Box,
    path: "/containers",
  },
  {
    id: "images",
    label: "Images",
    helper: "Go to images list",
    icon: Layers,
    path: "/images",
  },
  {
    id: "volumes",
    label: "Volumes",
    helper: "Go to volumes list",
    icon: HardDrive,
    path: "/volumes",
  },
  {
    id: "networks",
    label: "Networks",
    helper: "Go to networks list",
    icon: Network,
    path: "/networks",
  },
  {
    id: "engines",
    label: "Engines",
    helper: "Go to engines list",
    icon: Database,
    path: "/engines",
  },
];

export function CommandPalette() {
  const { commandOpen, setCommandOpen } = useUIStore();
  const navigate = useNavigate();

  return (
    <CommandDialog
      open={commandOpen}
      onOpenChange={setCommandOpen}
      className={s.dialog}
      showCloseButton={false}
    >
      <Command shouldFilter={false} className={s.shell}>
        <CommandInput
          placeholder="Search containers, images, volumes, networks, engines..."
          autoFocus
        />
        <CommandList className={s.list}>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            {commands.map((command) => {
              const Icon = command.icon;
              return (
                <CommandItem
                  key={command.id}
                  value={command.label}
                  onSelect={() => {
                    navigate({ to: command.path as "/engines" });
                    setCommandOpen(false);
                  }}
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
                    <Icon />
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <strong className="text-base font-bold text-foreground">
                      {command.label}
                    </strong>
                    <small className="text-sm font-medium text-muted-foreground">
                      {command.helper}
                    </small>
                  </span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
