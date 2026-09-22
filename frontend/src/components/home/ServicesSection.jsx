import React from "react";
import { useNavigate } from "react-router-dom";
import { SERVICES } from "../../lib/content";
import SectionHeading from "../common/SectionHeading";
import * as Icons from "lucide-react";

export default function ServicesSection() {
  const navigate = useNavigate();

  return (
    <section className="bg-surface-base py-20 lg:py-32">
      <div className="section-pad mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="WHAT WE MANUFACTURE"
          title="Every Format. Every Finish."
          titleItalic="Every Scale."
          sub="Thirteen product categories. Infinite customization possibilities. One manufacturer that gets it right every time."
          className="mb-20"
        />

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = Icons[service.icon];
            return (
              <div
                key={service.num}
                onClick={() => navigate("/services")}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); navigate("/services"); } }}
                role="button"
                tabIndex={0}
                className="group relative overflow-hidden rounded-sm border-t-2 border-gold/30 bg-surface-elevated p-10 shadow-lg transition-all duration-300 hover:border-gold hover:-translate-y-1.5 cursor-pointer min-h-[300px] flex flex-col"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="absolute top-8 right-10 font-serif text-7xl font-light text-ink/[0.04]">
                  {service.num}
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6">
                    {Icon && <Icon className="w-10 h-10 text-gold stroke-1.5 mb-4 transition-transform duration-300 group-hover:scale-110" />}
                    <h3 className="text-lg font-semibold text-ink">{service.title}</h3>
                  </div>

                  <div className="h-px bg-gradient-to-r from-gold to-transparent w-0 group-hover:w-10 transition-all duration-300 mb-4" />

                  <p className="text-sm text-ink/60 leading-relaxed flex-grow">{service.desc}</p>

                  {service.detail && (
                    <p className="text-xs text-ink/45 mb-4 mt-4">{service.detail}</p>
                  )}

                  <p className="text-xs text-gold mt-4 flex items-center gap-2 transition-all duration-300 group-hover:gap-3">
                    Explore <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
