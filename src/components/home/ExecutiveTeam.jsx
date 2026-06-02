import React from "react";
import { LEADERSHIP } from "../../lib/content";
import { useReveal, useStagger } from "../../lib/animations";

/* Gold L-shaped corner brackets (CSS only) */
const Brackets = () => (
  <>
    <span className="pointer-events-none absolute -left-3 -top-3 h-10 w-10 border-l border-t border-gold/70" />
    <span className="pointer-events-none absolute -bottom-3 -right-3 h-10 w-10 border-b border-r border-gold/70" />
  </>
);

/* Editorial portrait placeholder — swap inner div for <img> */
function Portrait({ initials, label, ratio = "aspect-[3/4]" }) {
  return (
    <div className={`relative ${ratio} w-full overflow-hidden bg-graphite`}>
      <div className="grain absolute inset-0 opacity-[0.05]" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(120% 80% at 50% 25%, rgba(197,160,90,0.10), transparent 62%)" }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="display text-7xl text-gold/25">{initials}</span>
      </div>
      <span className="absolute bottom-3 left-4 label text-platinum/35">{label}</span>
    </div>
  );
}

function Signature({ children }) {
  return <span className="display block text-[28px] italic text-gold">{children}</span>;
}

export default function ExecutiveTeam() {
  const headRef = useReveal();
  const ceoRef = useReveal({ y: 50 });
  const mdRef = useReveal({ y: 50 });
  const headsRef = useStagger("[data-head]", { stagger: 0.1, y: 50 });
  const { ceo, md, heads } = LEADERSHIP;

  return (
    <section data-testid="team-section" className="relative overflow-hidden bg-obsidian py-28">
      <div className="section-pad mx-auto max-w-[1400px]">
        {/* Section header */}
        <div ref={headRef} className="mb-20 max-w-3xl">
          <span className="label text-gold">{LEADERSHIP.eyebrow}</span>
          <h2 className="display mt-6 text-4xl leading-[1.08] text-platinum sm:text-5xl">
            {LEADERSHIP.headline[0]} <span className="italic">{LEADERSHIP.headline[1]}</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-platinum/55">{LEADERSHIP.sub}</p>
        </div>

        {/* ── ZONE A — CEO ── */}
        <div ref={ceoRef} className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <span className="display pointer-events-none absolute -bottom-6 left-0 select-none text-[120px] leading-none text-white/[0.03] sm:text-[160px]">MESSAGE</span>
          {/* CEO PHOTO: Muhammad Shafiq Chaudhry — replace inner placeholder with <img> */}
          <div className="relative">
            <Brackets />
            <Portrait initials="MS" label="CEO · Photo pending" />
            <div className="mt-6">
              <h3 className="text-xl font-medium text-platinum">{ceo.name}</h3>
              <span className="label mt-1 block text-gold">{ceo.title}</span>
            </div>
          </div>

          <div className="relative">
            <span className="label text-gold">{ceo.eyebrow}</span>
            <h3 className="display mt-5 text-3xl font-light leading-snug text-platinum sm:text-[42px]">{ceo.headline}</h3>
            <div className="mt-7 space-y-4">
              {ceo.paragraphs.map((p, i) => (
                <p key={i} className="text-[15px] leading-[1.8] text-platinum/60">{p}</p>
              ))}
            </div>
            <div className="mt-8">
              <span className="label text-platinum/40">Best Regards</span>
              <Signature>{ceo.signature}</Signature>
              <span className="label mt-2 block text-platinum/50">{ceo.name} · {ceo.title}</span>
            </div>
          </div>
        </div>

        <div className="my-20 h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        {/* ── ZONE B — Managing Director (mirrored) ── */}
        <div ref={mdRef} className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <span className="display pointer-events-none absolute -bottom-6 right-0 select-none text-[110px] leading-none text-white/[0.03] sm:text-[150px]">VISION</span>
          <div className="order-2 lg:order-1">
            <span className="label text-gold">{md.eyebrow}</span>
            <h3 className="display mt-5 text-3xl font-light leading-snug text-platinum sm:text-4xl">{md.headline}</h3>
            <div className="mt-7 space-y-4">
              {md.paragraphs.map((p, i) => (
                <p key={i} className="text-[15px] leading-[1.8] text-platinum/60">{p}</p>
              ))}
            </div>
            <div className="mt-8">
              <Signature>{md.signature}</Signature>
              <span className="display mt-1 block text-lg italic text-platinum/70">{md.signoff}</span>
              <span className="label mt-2 block text-platinum/50">{md.name} · {md.title}</span>
            </div>
          </div>
          {/* MD PHOTO: Naveed Ehsan — replace inner placeholder with <img> */}
          <div className="relative order-1 lg:order-2">
            <Brackets />
            <Portrait initials="NE" label="MD · Photo pending" />
            <div className="mt-6">
              <h3 className="text-xl font-medium text-platinum">{md.name}</h3>
              <span className="label mt-1 block text-gold">{md.title}</span>
            </div>
          </div>
        </div>

        <div className="my-20 h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        {/* ── ZONE C — Department Heads ── */}
        <div className="mb-12">
          <span className="label text-gold">THE MANAGEMENT TEAM</span>
          <h3 className="display mt-4 text-3xl text-platinum sm:text-4xl">Department Heads</h3>
        </div>
        <div ref={headsRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {heads.map((m) => (
            <article key={m.name} data-head className="exec-card group overflow-hidden">
              {/* HEAD PHOTO: {m.name} — replace inner placeholder with <img> */}
              <div className="relative">
                <Portrait initials={m.initials} label="Photo pending" ratio="aspect-[4/3]" />
                <span className="absolute bottom-3 left-3 bg-gold px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-obsidian">
                  {m.role}
                </span>
              </div>
              <div className="p-6">
                <h4 className="text-base font-semibold text-platinum">{m.name}</h4>
                <span className="label mt-1 block text-gold">{m.role}</span>
                <span className="my-4 block h-px w-6 bg-gold/60" />
                <p className="text-[13px] leading-[1.7] text-platinum/55">{m.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
