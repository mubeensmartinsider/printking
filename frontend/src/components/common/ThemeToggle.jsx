import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border-soft bg-surface-elevated text-ink/70 transition-all duration-300 hover:border-gold hover:text-gold hover:bg-surface-hover"
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
