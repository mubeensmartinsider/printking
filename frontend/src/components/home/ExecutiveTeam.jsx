import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { LEADERSHIP } from "../../lib/content";
import SectionHeading from "../common/SectionHeading";
import { useStagger } from "../../lib/animations";
import use3DTilt from "../../lib/use3DTilt";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";

/* Square portrait — falls back to initials */
function Portrait({ person, className = "" }) {
  const initials = person.initials
    || person.name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  return (
    <div className={`relative aspect-square overflow-hidden bg-surface-primary ${className}`}>
      {person.img ? (
        <img
          src={person.img}
          alt={person.name}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      ) : (
        <>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="display text-3xl text-gold-ink/30">{initials}</span>
          </div>
          <span className="absolute bottom-1.5 left-2 label text-[9px] text-ink/35">{initials}</span>
        </>
      )}
    </div>
  );
}

function LeaderCard({ person }) {
  const [open, setOpen] = useState(false);
  const { ref, glareRef, onMove, onLeave } = use3DTilt({ max: 10, scale: 1.025 });

  return (
    <>
      <article
        data-leader
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative flex h-full flex-col rounded-sm border border-border-soft bg-surface-elevated p-6 shadow-brand-card transition-shadow duration-500 hover:shadow-brand-card-hover sm:p-7"
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        {/* Glare sheen — tracks the mouse for a lacquered look */}
        <span
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-sm opacity-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0) 60%)",
            backgroundSize: "200% 200%",
          }}
        />

        {/* Gold top-edge line that slides in on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-gold via-gold-soft to-transparent transition-transform duration-500 ease-out-soft group-hover:scale-x-100"
        />

        {/* Identity */}
        <div className="flex items-center gap-4" style={{ transform: "translateZ(20px)" }}>
          <Portrait person={person} className="w-20 shrink-0 rounded-sm sm:w-[88px]" />
          <div className="min-w-0">
            <span className="label text-gold-ink">{person.title}</span>
            <h3 className="mt-1.5 font-serif text-lg leading-snug text-ink sm:text-xl">
              {person.name}
            </h3>
          </div>
        </div>

        {/* Pull-quote */}
        <span className="mt-5 block h-px w-8 bg-gold/60" />
        <h4
          className="mt-5 flex-1 font-serif text-lg italic font-light leading-[1.5] text-ink sm:text-xl"
          style={{ transform: "translateZ(12px)" }}
        >
          {person.headline}
        </h4>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-6 inline-flex w-fit items-center gap-1.5 border-b border-gold/40 pb-1 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-ink transition-colors duration-300 hover:border-gold hover:text-gold-soft"
          style={{ transform: "translateZ(8px)" }}
        >
          Read full message
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </article>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[88vh] max-w-2xl overflow-y-auto bg-surface-base p-0 sm:rounded-sm">
          <div className="flex flex-col gap-6 p-6 sm:flex-row sm:gap-8 sm:p-8">
            <Portrait person={person} className="w-24 shrink-0 self-start rounded-sm sm:w-32" />
            <div className="min-w-0 flex-1">
              <DialogHeader>
                <span className="label text-gold-ink">{person.eyebrow}</span>
                <DialogTitle className="font-serif text-2xl italic font-light text-ink sm:text-[28px]">
                  {person.headline}
                </DialogTitle>
                <DialogDescription className="text-sm text-ink/55">
                  {person.name} · {person.title}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-6 space-y-4">
                {person.paragraphs.map((para, idx) => (
                  <p key={idx} className="text-sm leading-[1.8] text-ink/70">{para}</p>
                ))}
              </div>
              <div className="mt-7 border-t border-border-soft pt-5">
                <span className="block h-px w-8 bg-gold/60" />
                <p className="mt-3 font-serif text-xl italic text-gold-ink">{person.name}</p>
                {person.signoff && (
                  <p className="mt-1 text-sm font-semibold text-gold-ink">{person.signoff}</p>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function ExecutiveTeam() {
  const leadersRef = useStagger("[data-leader]", { stagger: 0.14, y: 40 });
  return (
    <section data-testid="team-section" className="bg-surface-base py-28">
      <div className="section-pad mx-auto max-w-[1400px]">
        <SectionHeading
          eyebrow={LEADERSHIP.eyebrow}
          title={LEADERSHIP.headline[0]}
          titleItalic={LEADERSHIP.headline[1]}
          sub={LEADERSHIP.sub}
          className="mb-14"
        />
        <div ref={leadersRef} className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          <LeaderCard person={{ ...LEADERSHIP.ceo, initials: "MS" }} />
          <LeaderCard person={{ ...LEADERSHIP.md,  initials: "NE" }} />
        </div>
      </div>
    </section>
  );
}
