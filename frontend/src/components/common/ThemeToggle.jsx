import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

/* A labelled light/dark switch sized for inline toolbars (used by the
   machinery and FAQ display consoles). */
export function ThemePill({ testId = "theme-pill", className = "" }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      data-testid={testId}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light theme" : "Dark theme"}
      className={`flex h-8 items-center gap-1.5 border border-border-soft bg-surface-base px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-secondary transition-all duration-300 hover:border-gold/60 hover:text-gold-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${className}`}
    >
      {isDark ? <Moon size={12} /> : <Sun size={12} />}
      {isDark ? "Dark" : "Light"}
    </button>
  );
}

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border-soft bg-surface-elevated text-ink/70 transition-all duration-300 hover:border-gold hover:text-gold-ink hover:bg-surface-hover"
    >
      <Sun
        size={16}
        className={`absolute transition-all duration-300 ${
          isDark ? "opacity-0 scale-0 rotate-90" : "opacity-100 scale-100 rotate-0"
        }`}
      />
      <Moon
        size={16}
        className={`absolute transition-all duration-300 ${
          isDark ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-0 -rotate-90"
        }`}
      />
    </button>
  );
}
