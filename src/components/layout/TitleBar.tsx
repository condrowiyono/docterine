import {
  ArrowLeft,
  ArrowRight,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/store/useUIStore";
import s from "./TitleBar.module.css";

export function TitleBar() {
  const { sidebarCollapsed, toggleSidebar, setCommandOpen } = useUIStore();

  return (
    <header className={s.titlebar}>
      <div className={s.left}>
        <div className={s.trafficSpace} data-tauri-drag-region />
        <Button
          variant="ghost"
          size="icon-sm"
          className={s.chromeButton}
          onClick={toggleSidebar}
        >
          {sidebarCollapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
        </Button>
        <Button variant="ghost" size="icon-sm" className={s.chromeButton}>
          <ArrowLeft />
        </Button>
        <Button variant="ghost" size="icon-sm" className={s.chromeButton}>
          <ArrowRight />
        </Button>
        <div className={s.leftFill} data-tauri-drag-region />
      </div>

      <button className={s.search} onClick={() => setCommandOpen(true)}>
        <Search />
        <span>Search</span>
        <kbd>⌘K</kbd>
      </button>

      <div className={s.spacer} data-tauri-drag-region />
    </header>
  );
}
