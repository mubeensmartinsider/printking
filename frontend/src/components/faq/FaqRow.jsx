import React from "react";
import { ChevronDown } from "lucide-react";

/* ============================================================
   FaqRow — one question/answer pair, used by the browse and
   list views. Theme-aware throughout.
   ============================================================ */
export default function FaqRow({ q, a, index, isOpen, onToggle, testId }) {
  return (
    <div
      className={`border bg-surface-elevated transition-colors duration-300 ${
        isOpen ? "border-gold/45" : "border-border-soft hover:border-gold/30"
      }`}
    >
      <h3>
        <button
          type="button"
          onClick={onToggle}
          data-testid={testId}
          aria-expanded={isOpen}
          className="group flex w-full items-start justify-between gap-4 px-4 py-3.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
        >
          <span className="flex items-start gap-3">
            {index !== undefined && (
              <span className="mt-0.5 hidden w-6 flex-none text-[11px] tracking-[0.18em] text-ink-tertiary sm:block">
                {String(index + 1).padStart(2, "0")}
              </span>
            )}
            <span
              className={`text-sm font-medium leading-snug transition-colors duration-300 sm:text-[15px] ${
                isOpen ? "text-gold-ink" : "text-ink group-hover:text-gold-ink"
              }`}
            >
              {q}
            </span>
          </span>
          <ChevronDown
            size={15}
            className={`mt-0.5 flex-none text-gold-ink transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </h3>

      <div
        className={`grid overflow-hidden transition-all duration-500 ease-lux ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <p className="border-t border-border-soft px-4 py-3.5 text-sm leading-relaxed text-ink-secondary sm:pl-[3.25rem]">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}
