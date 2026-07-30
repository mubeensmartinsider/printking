import React from "react";
import { LEADERSHIP, CEO, TEAM } from "../../lib/content";
import SectionHeading from "../common/SectionHeading";

export default function ExecutiveTeam() {
  return (
    <section data-testid="team-section" className="bg-obsidian py-28">
      <div className="section-pad mx-auto max-w-[1400px]">
        {/* Section header */}
        <SectionHeading
          eyebrow={LEADERSHIP.eyebrow}
          title={LEADERSHIP.headline[0]}
          titleItalic={LEADERSHIP.headline[1]}
          sub={LEADERSHIP.sub}
          className="mb-20"
        />

        {/* CEO Feature Block */}
        <div className="mb-28 pb-20 border-b border-gold/20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
            {/* Photo */}
            <div className="relative max-w-md">
              <div className="relative aspect-[3/4] overflow-hidden bg-graphite rounded-sm border border-gold/10 flex items-center justify-center">
                <span className="display text-5xl text-gold/20">CEO</span>
                <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-gold/40"></div>
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-gold/40"></div>
              </div>
              <p className="mt-4 text-center text-xs text-platinum/50">Photo placeholder</p>
              <p className="text-center font-serif text-base text-platinum mt-4">{CEO.name}</p>
              <p className="text-center label text-gold text-[10px] mt-1">{CEO.title}</p>
            </div>

            {/* Message */}
            <div>
              <p className="label text-gold mb-4">{CEO.eyebrow}</p>
              <h2 className="font-serif text-4xl italic font-light text-platinum mb-8 leading-relaxed">
                {CEO.headline}
              </h2>
              <div className="space-y-5">
                {CEO.paragraphs.map((para, idx) => (
                  <p key={idx} className="text-sm leading-relaxed text-platinum/70">
                    {para}
                  </p>
                ))}
              </div>
              <div className="mt-10 pt-6 border-t border-gold/20">
                <p className="font-serif text-2xl italic text-gold mb-2">{CEO.name}</p>
                <p className="text-xs text-platinum/50">{CEO.title}</p>
              </div>
            </div>
          </div>
        </div>

        {/* MD Feature Block */}
        <div className="mb-28 pb-20 border-b border-gold/20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
            {/* Message */}
            <div>
              <p className="label text-gold mb-4">{LEADERSHIP.md.eyebrow}</p>
              <h2 className="font-serif text-4xl italic font-light text-platinum mb-8 leading-relaxed">
                {LEADERSHIP.md.headline}
              </h2>
              <div className="space-y-5">
                {LEADERSHIP.md.paragraphs.map((para, idx) => (
                  <p key={idx} className="text-sm leading-relaxed text-platinum/70">
                    {para}
                  </p>
                ))}
              </div>
              <div className="mt-10 pt-6 border-t border-gold/20">
                <p className="font-serif text-2xl italic text-gold mb-2">{LEADERSHIP.md.name}</p>
                <p className="text-xs text-platinum/50">{LEADERSHIP.md.title}</p>
                <p className="text-sm font-semibold text-gold mt-3">{LEADERSHIP.md.signoff}</p>
              </div>
            </div>

            {/* Photo */}
            <div className="relative max-w-md">
              <div className="relative aspect-[3/4] overflow-hidden bg-graphite rounded-sm border border-gold/10 flex items-center justify-center">
                <span className="display text-5xl text-gold/20">MD</span>
                <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-gold/40"></div>
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-gold/40"></div>
              </div>
              <p className="mt-4 text-center text-xs text-platinum/50">Photo placeholder</p>
              <p className="text-center font-serif text-base text-platinum mt-4">{LEADERSHIP.md.name}</p>
              <p className="text-center label text-gold text-[10px] mt-1">{LEADERSHIP.md.title}</p>
            </div>
          </div>
        </div>

        {/* Department Heads Grid */}
        <div className="pt-12 w-full">
          <h3 className="text-sm font-semibold text-gold mb-16">DEPARTMENT HEADS</h3>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full auto-rows-max">
            {TEAM && TEAM.length > 0 ? (
              TEAM.map((member) => (
                <article 
                  key={member.name} 
                  className="group relative flex flex-col h-full overflow-hidden rounded-lg border-t-2 border-gold/30 bg-gradient-to-b from-graphite to-graphite-dark shadow-lg transition-all duration-400 hover:shadow-[0_0_32px_rgba(197,160,90,0.2)] hover:-translate-y-1.5"
                >
                  {/* Background pattern */}
                  <div className="absolute inset-0 bg-pattern-team pointer-events-none" />
                  
                  {/* Card glow overlay */}
                  <div className="card-glow-overlay" />

                  {/* Photo area */}
                  <div className="relative z-10 w-full aspect-[4/3] overflow-hidden bg-graphite/50 flex items-center justify-center border-b border-gold/10 flex-shrink-0">
                    <span className="display text-4xl text-gold/15">{member.initials}</span>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-obsidian to-transparent p-3">
                      <span className="label text-gold text-[9px]">{member.role}</span>
                    </div>
                  </div>
                  {/* Content area */}
                  <div className="relative z-10 p-6 flex flex-col flex-grow">
                    <h3 className="text-base font-semibold text-platinum">{member.name}</h3>
                    <p className="label text-gold mt-1 mb-4">{member.role}</p>
                    <div className="h-px bg-gradient-to-r from-gold to-transparent w-6 mb-4 flex-shrink-0"></div>
                    <p className="text-sm leading-relaxed text-platinum/65 flex-grow">{member.desc}</p>
                  </div>
                </article>
              ))
            ) : (
              <p className="text-platinum/50">Loading team members...</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
