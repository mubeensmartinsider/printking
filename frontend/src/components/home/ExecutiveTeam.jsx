import React, { useRef } from "react";
import { Linkedin, ArrowUpRight } from "lucide-react";
import { TEAM, CEO } from "../../lib/content";
import { useReveal, useStagger } from "../../lib/animations";

function ExecCard({ m }) {
  const photoRef = useRef(null);

  const onMove = (e) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - card.left) / card.width - 0.5;
    const y = (e.clientY - card.top) / card.height - 0.5;
    if (photoRef.current) {
      photoRef.current.style.transform = `translate(${-x * 12}px, ${-y * 12}px) scale(1.06)`;
    }
  };
  const onLeave = () => {
    if (photoRef.current) photoRef.current.style.transform = "translate(0,0) scale(1)";
  };

  return (
    <article
      data-exec
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="exec-card group flex flex-col overflow-hidden"
    >
      {/* Photo slot — EXEC PHOTO: replace placeholder with <img> */}
      <div className="relative aspect-[7/8] overflow-hidden bg-[#0d0f1e]">
        <div ref={photoRef} className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out">
          <div className="grain absolute inset-0 opacity-[0.05]" />
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(120% 80% at 50% 20%, rgba(201,168,76,0.12), transparent 60%)" }}
          />
          <span className="display relative text-6xl text-gold/30">{m.initials}</span>
        </div>
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(transparent 55%, #07080f)" }} />
        <span className="absolute bottom-3 left-4 label text-platinum/40">Photo pending</span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <span className="label text-gold">{m.role}</span>
        <h3 className="mt-2 text-lg font-semibold text-platinum">{m.name}</h3>
        <span className="my-4 block h-px w-10 bg-gold/60" />
        <p className="display flex-1 text-[15px] italic leading-snug text-platinum/65">“{m.quote}”</p>
        <div className="mt-6 flex gap-3">
          <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex h-8 items-center gap-1.5 border border-white/10 px-3 text-[11px] text-platinum/70 transition-colors hover:border-gold hover:text-gold">
            LinkedIn <Linkedin size={12} />
          </a>
          <a href="/contact" className="inline-flex h-8 items-center gap-1.5 border border-white/10 px-3 text-[11px] text-platinum/70 transition-colors hover:border-gold hover:text-gold">
            Contact <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function ExecutiveTeam() {
  const headRef = useReveal();
  const gridRef = useStagger("[data-exec]", { stagger: 0.1, y: 80 });

  return (
    <section data-testid="team-section" className="relative bg-obsidian py-28">
      <div className="section-pad mx-auto max-w-[1400px]">
        <div ref={headRef} className="mb-8 max-w-3xl">
          <span className="label text-gold">{TEAM.eyebrow}</span>
          <h2 className="display mt-6 text-4xl leading-[1.08] text-platinum sm:text-5xl">{TEAM.headline}</h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-platinum/55">{TEAM.sub}</p>
        </div>

        {/* CEO pull quote */}
        <div className="mb-16 border-l-2 border-gold/50 pl-6">
          <p className="display max-w-2xl text-2xl italic leading-snug text-platinum/80">“{CEO.quote}”</p>
          <p className="label mt-4 text-platinum/50">{CEO.name} · {CEO.title}</p>
        </div>

        <div
          ref={gridRef}
          className="flex gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-6"
        >
          {TEAM.members.map((m) => (
            <div key={m.name} className="w-[260px] flex-none md:w-auto">
              <ExecCard m={m} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
