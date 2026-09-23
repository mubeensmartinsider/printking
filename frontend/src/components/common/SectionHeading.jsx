import React from "react";
import { useReveal } from "../../lib/animations";

export default function SectionHeading({
  eyebrow,
  title,
  titleItalic,
  sub,
  align = "left",
  className = "",
}) {
  const ref     = useReveal();
  const centered = align === "center";

  return (
    <div ref={ref} className={`flex max-w-2xl flex-col gap-2 ${centered ? "text-center mx-auto items-center" : "items-start"} ${className}`}>
      {eyebrow && (
        <span className="label text-gold">{eyebrow}</span>
      )}
      <h2 className="display text-balance text-4xl sm:text-5xl lg:text-[52px] text-ink leading-[1.08]">
        {title}
        {titleItalic && <span className="italic"> {titleItalic}</span>}
      </h2>
      {sub && (
        <p className={`max-w-xl text-base leading-relaxed text-ink-secondary ${centered ? "mt-2" : ""}`}>{sub}</p>
      )}
    </div>
  );
}
