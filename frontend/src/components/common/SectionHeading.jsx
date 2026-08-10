import React from "react";
import { useReveal } from "../../lib/animations";

/* Reusable section heading — eyebrow label + display headline + sub */
export default function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "left",
  light = false,
  className = "",
}) {
  const ref = useReveal();
  const alignCls = align === "center" ? "text-center mx-auto items-center" : "items-start";
  const titleColor = light ? "text-obsidian" : "text-platinum";
  const subColor = light ? "text-obsidian/60" : "text-platinum/55";

  return (
    <div ref={ref} className={`flex max-w-2xl flex-col gap-2 ${alignCls} ${className}`}>
      {eyebrow && <span className="label text-gold">{eyebrow}</span>}
      <h2 className={`display text-balance text-4xl sm:text-5xl lg:text-[52px] ${titleColor}`}>
        {title}
      </h2>
      {sub && <p className={`max-w-xl text-base leading-relaxed ${subColor}`}>{sub}</p>}
    </div>
  );
}
