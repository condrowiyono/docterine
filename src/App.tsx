import { useLayoutEffect } from "react";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { applyColorSchemeToDom } from "@/lib/colorScheme";
import { writeBorderRadiusToDom } from "@/lib/borderRadius";
import { writeFontScaleToDom } from "@/lib/fontScale";
import { useThemeStore } from "@/store/useThemeStore";
import { router } from "./router";
import "./App.css";

function ThemeDomSync() {
  const fontScale = useThemeStore((s) => s.fontScale);
  const borderRadiusRem = useThemeStore((s) => s.borderRadiusRem);
  const colorScheme = useThemeStore((s) => s.colorScheme);

  useLayoutEffect(() => {
    writeFontScaleToDom(fontScale);
    writeBorderRadiusToDom(borderRadiusRem);
    applyColorSchemeToDom(colorScheme);
  }, [fontScale, borderRadiusRem, colorScheme]);

  useLayoutEffect(() => {
    if (colorScheme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyColorSchemeToDom("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [colorScheme]);

  return null;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeDomSync />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
