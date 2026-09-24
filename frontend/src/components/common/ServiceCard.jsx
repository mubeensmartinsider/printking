import React from "react";
import { ArrowRight } from "lucide-react";

export default function ServiceCard({ service, onClick, className = "" }) {
  return (
    <article
      data-testid={`service-card-${service.num}`}
      onClick={onClick}
      onKeyDown={(e) => { if (onClick && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); onClick(e); } }}
      role="button"
      tabIndex={0}
      className={`group relative flex h-full min-h-[60vh] cursor-pointer flex-col justify-between overflow-hidden border border-border-soft bg-surface-elevated p-9 transition-colors duration-500 hover:bg-surface-hover ${className}`}
    >
      {/* Ghost number */}
      <span className="display pointer-events-none absolute -right-2 -top-10 select-none text-[180px] leading-none text-ink/[0.04]">
        {service.num}
      </span>

      <div className="relative">
        <span className="label text-gold">SERVICE / {service.num}</span>
      </div>

      <div className="relative">
        <h3 className="display text-3xl text-ink sm:text-4xl">{service.title}</h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/55">{service.desc}</p>
        <span className="mt-7 inline-flex items-center gap-2 text-sm text-gold">
          Explore
          <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1.5" />
        </span>
      </div>

      <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
    </article>
  );
}
