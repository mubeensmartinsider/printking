import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "../../lib/content";
import Icon from "../common/Icon";
import { useReveal, useStagger } from "../../lib/animations";

function BentoCard({ s, onClick }) {
  const large = s.size === "large";
  return (
    <article
      data-svc
      data-testid={`service-card-${s.num}`}
      onClick={onClick}
      className={`group relative flex cursor-pointer flex-col justify-between overflow-hidden border-t-2 border-white/[0.06] bg-[linear-gradient(145deg,#1c1814,#241f1a)] p-7 transition-all duration-[400ms] ease-out hover:-translate-y-2 hover:border-gold ${
        large ? "sm:col-span-2 sm:row-span-2 p-9" : ""
      }`}
    >
      {/* ghost numeral */}
      <span className="display pointer-events-none absolute -right-1 -top-6 select-none leading-none text-white/[0.06] transition-colors duration-[400ms] group-hover:text-white/[0.10]"
        style={{ fontSize: large ? 120 : 72 }}>
        {s.num}
      </span>

      <div className="relative">
        <Icon name={s.icon} size={large ? 38 : 32} strokeWidth={1.5} className="text-gold" />
      </div>

      <div className="relative mt-6">
        <h3 className={`font-semibold text-platinum ${large ? "text-2xl" : "text-[18px]"}`}>{s.title}</h3>
        <span className="mt-3 block h-px w-5 bg-gold transition-all duration-[400ms] group-hover:w-12" />
        <p className={`mt-4 leading-relaxed text-platinum/55 ${large ? "text-sm max-w-md" : "text-[13px]"}`}>{s.desc}</p>
        {large && s.detail && (
          <p className="mt-3 text-[11px] uppercase tracking-wide text-platinum/40">{s.detail}</p>
        )}
        <span className="mt-5 inline-flex translate-y-1 items-center gap-1.5 text-[11px] text-gold opacity-0 transition-all duration-[400ms] group-hover:translate-y-0 group-hover:opacity-100">
          Explore <ArrowRight size={13} />
        </span>
      </div>
    </article>
  );
}

export default function ServicesSection() {
  const headRef = useReveal();
  const gridRef = useStagger("[data-svc]", { stagger: 0.06, y: 40 });
  const navigate = useNavigate();

  return (
    <section data-testid="services-section" className="bg-obsidian py-28">
      <div className="section-pad mx-auto max-w-[1400px]">
        <div ref={headRef} className="mb-16 max-w-2xl">
          <span className="label text-gold">WHAT WE MANUFACTURE</span>
          <h2 className="display mt-6 text-4xl font-light leading-[1.08] text-platinum sm:text-5xl lg:text-[56px]">
            Every Format. Every Finish.
            <br />
            <span className="italic">Every Scale.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-platinum/55">
            Thirteen product categories. Infinite customization possibilities. One manufacturer
            that gets it right every time.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid auto-rows-[minmax(190px,auto)] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 [grid-auto-flow:dense]"
        >
          {SERVICES.map((s) => (
            <BentoCard key={s.num} s={s} onClick={() => navigate("/services")} />
          ))}
        </div>
      </div>
    </section>
  );
}
