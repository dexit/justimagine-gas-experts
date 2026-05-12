import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Mode = "light" | "dark";

function getInitial(): Mode {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function ThemeToggle() {
  const [mode, setMode] = useState<Mode>(getInitial);

  useEffect(() => {
    const root = document.documentElement;
    if (mode === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    try {
      localStorage.setItem("theme", mode);
    } catch {}
  }, [mode]);

  return (
    <button
      type="button"
      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
      aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/50 text-foreground/80 hover:text-accent hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-smooth"
    >
      {mode === "dark" ? (
        <Sun className="h-4 w-4 animate-in zoom-in-50 rotate-in-180 duration-500" />
      ) : (
        <Moon className="h-4 w-4 animate-in zoom-in-50 rotate-in-90 duration-500" />
      )}
    </button>
  );
}
