import React from "react";
import { LEADERSHIP, CEO } from "../../lib/content";
import SectionHeading from "../common/SectionHeading";

export default function ExecutiveTeam() {
  return (
    <section data-testid="team-section" className="bg-surface-base py-28">
      <div className="section-pad mx-auto max-w-[1400px]">
        <SectionHeading
          eyebrow={LEADERSHIP.eyebrow}
          title={LEADERSHIP.headline[0]}
          titleItalic={LEADERSHIP.headline[1]}
          sub={LEADERSHIP.sub}
          className="mb-20"
        />

        {/* CEO Block */}
        <div className="mb-20 pb-20 border-b border-border-soft">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
            <div className="relative max-w-md">
              <div className="relative aspect-[3/4] overflow-hidden bg-surface-elevated rounded-sm border border-border-soft">
                {CEO.img ? (
                  <img src={CEO.img} alt={CEO.name} className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="display text-6xl text-gold/30">PK</span>
                  </div>
                )}
              </div>
              <p className="text-center font-serif text-base text-ink mt-4">{CEO.name}</p>
              <p className="text-center label text-gold text-[10px] mt-1">{CEO.title}</p>
            </div>

            <div>
              <p className="label text-gold mb-4">{CEO.eyebrow}</p>
              <h2 className="font-serif text-4xl italic font-light text-ink mb-8 leading-relaxed">
                {CEO.headline}
              </h2>
              <div className="space-y-5">
                {CEO.paragraphs.map((para, idx) => (
                  <p key={idx} className="text-sm leading-relaxed text-ink/65">{para}</p>
                ))}
              </div>
              <div className="mt-10 pt-6 border-t border-border-soft">
                <p className="font-serif text-2xl italic text-gold mb-2">{CEO.name}</p>
                <p className="text-xs text-ink/45">{CEO.title}</p>
              </div>
            </div>
          </div>
        </div>

        {/* MD Block */}
        <div className="pb-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <p className="label text-gold mb-4">{LEADERSHIP.md.eyebrow}</p>
              <h2 className="font-serif text-4xl italic font-light text-ink mb-8 leading-relaxed">
                {LEADERSHIP.md.headline}
              </h2>
              <div className="space-y-5">
                {LEADERSHIP.md.paragraphs.map((para, idx) => (
                  <p key={idx} className="text-sm leading-relaxed text-ink/65">{para}</p>
                ))}
              </div>
              <div className="mt-10 pt-6 border-t border-border-soft">
                <p className="font-serif text-2xl italic text-gold mb-2">{LEADERSHIP.md.name}</p>
                <p className="text-xs text-ink/45">{LEADERSHIP.md.title}</p>
                <p className="text-sm font-semibold text-gold mt-3">{LEADERSHIP.md.signoff}</p>
              </div>
            </div>

            <div className="relative max-w-md">
              <div className="relative aspect-[3/4] overflow-hidden bg-surface-elevated rounded-sm border border-border-soft">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="display text-6xl text-gold/30">PK</span>
                </div>
              </div>
              <p className="text-center font-serif text-base text-ink mt-4">{LEADERSHIP.md.name}</p>
              <p className="text-center label text-gold text-[10px] mt-1">{LEADERSHIP.md.title}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
