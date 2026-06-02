import React from "react";
import { useNavigate } from "react-router-dom";
import { SERVICES } from "../../lib/content";
import SectionHeading from "../common/SectionHeading";
import * as Icons from "lucide-react";

export default function ServicesSection() {
  const navigate = useNavigate();

  return (
    <section className="bg-obsidian py-20 lg:py-32">
      <div className="section-pad mx-auto max-w-7xl">
        {/* Section header */}
        <SectionHeading
          eyebrow="WHAT WE MANUFACTURE"
          title="Every Format. Every Finish."
          titleItalic="Every Scale."
          sub="Thirteen product categories. Infinite customization possibilities. One manufacturer that gets it right every time."
          className="mb-20"
        />

        {/* Services Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = Icons[service.icon];
            
            return (
              <div 
                key={service.num}
                onClick={() => navigate("/services")}
                className="group relative overflow-hidden rounded-lg border-t-2 border-gold/30 bg-gradient-to-b from-graphite to-graphite-dark p-8 shadow-lg transition-all duration-400 hover:border-gold/100 hover:shadow-[0_0_32px_rgba(197,160,90,0.2)] hover:-translate-y-2 cursor-pointer min-h-[300px] flex flex-col"
              >
                {/* Ghost numeral */}
                <div className="absolute top-6 right-8 font-serif text-6xl font-light text-platinum/6">
                  {service.num}
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon + Title */}
                  <div className="mb-6">
                    {Icon && <Icon className="w-8 h-8 text-gold stroke-1.5 mb-4" />}
                    <h3 className="text-lg font-semibold text-platinum">{service.title}</h3>
                  </div>

                  {/* Gold rule */}
                  <div className="h-px bg-gradient-to-r from-gold to-transparent w-0 group-hover:w-8 transition-all duration-300 mb-4"></div>

                  {/* Description */}
                  <p className="text-sm text-platinum/65 leading-relaxed flex-grow">{service.desc}</p>

                  {/* Detail copy */}
                  {service.detail && (
                    <p className="text-xs text-platinum/50 mb-4 mt-4">{service.detail}</p>
                  )}

                  {/* Explore link */}
                  <p className="text-xs text-gold mt-4">Explore →</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
