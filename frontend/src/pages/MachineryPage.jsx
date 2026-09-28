import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, ScanLine, FileCheck2, Printer, FoldVertical, Scissors, PackageCheck } from "lucide-react";
import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import MachineryShowcase from "../components/machinery/MachineryShowcase";
import MachineryStats from "../components/machinery/MachineryStats";
import { MACHINERY } from "../lib/content";
import { useStagger } from "../lib/animations";

/* ============================================================
   /machinery — the production floor, end to end.

   Hero → facility figures → the fleet (with display options)
   → the production flow → quality standards → enquiry.
   Every surface, border and text colour is a theme token, so
   the page is a first-class citizen of both the light and the
   dark theme.
   ============================================================ */

/* One icon per stage of the flow, in order */
const STAGE_ICONS = [ScanLine, FileCheck2, Printer, FoldVertical, Scissors, PackageCheck];

export default function MachineryPage() {
  const flowRef = useStagger("[data-step]", { stagger: 0.07 });

  return (
    <>
      <Seo
        title="Machinery & Infrastructure | PRINTKING"
        description="Inside PRINTKING's production facility — Heidelberg Speedmaster presses, Stahlfolder folding systems, Polar cutters, Suprasetter CTP and Promatrix die-cutters running at international standards."
        path="/machinery"
      />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <PageHero
        eyebrow={MACHINERY.eyebrow}
        title="The Machines Behind the Craft"
        sub={MACHINERY.sub}
        tight
      >
        <div className="flex flex-wrap items-center gap-2.5">
          {MACHINERY.highlights.map((h) => (
            <span
              key={h}
              className="inline-flex items-center gap-2 border border-border-soft bg-surface-elevated px-3 py-1.5 text-[11px] tracking-[0.06em] text-ink-secondary"
            >
              <span className="h-1 w-1 rounded-full bg-gold" />
              {h}
            </span>
          ))}

          <a href="#fleet" className="btn-gold ml-auto">
            Explore the fleet
            <ArrowRight size={13} />
          </a>
        </div>
      </PageHero>

      {/* ── Facility figures ─────────────────────────────────────── */}
      <section className="border-b border-border-soft bg-surface-primary py-9 md:py-10">
        <div className="section-pad mx-auto max-w-[1400px]">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="display text-2xl text-ink sm:text-3xl">
              The plant in numbers
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-ink-secondary">
              {MACHINERY.banner}
            </p>
          </div>
          <MachineryStats stats={MACHINERY.stats} />
        </div>
      </section>

      {/* ── The fleet (spotlight) ────────────────────────────────── */}
      <section id="fleet" className="scroll-mt-32 bg-surface-base py-10 md:py-12">
        <div className="section-pad mx-auto max-w-[1400px]">
          <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="label text-gold-ink">THE FLEET</span>
              <h2 className="display mt-2 text-balance text-3xl leading-[1.1] text-ink sm:text-4xl">
                One machine at a time,{" "}
                <span className="italic text-gold-ink">full specification</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink-secondary">
              Nine German-built machines across one production flow. Use the arrows or
              the thumbnails to move between them — select any machine to open its
              complete spec sheet.
            </p>
          </div>

          <MachineryShowcase items={MACHINERY.items} />
        </div>
      </section>

      {/* ── Production flow ──────────────────────────────────────── */}
      <section className="border-y border-border-soft bg-surface-primary py-10 md:py-12">
        <div className="section-pad mx-auto max-w-[1400px]">
          <div className="mb-7 max-w-2xl">
            <span className="label text-gold-ink">PLATE TO PALLET</span>
            <h2 className="display mt-2 text-balance text-3xl leading-[1.1] text-ink sm:text-4xl">
              One controlled flow, <span className="italic text-gold-ink">six stages</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
              Nothing leaves the building until it has passed every stage below — and
              every stage is inspected before the next one begins.
            </p>
          </div>

          <div ref={flowRef} className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {MACHINERY.pipeline.map((step, i) => {
              const Icon = STAGE_ICONS[i % STAGE_ICONS.length];
              return (
                <div key={step.num} data-step className="group relative border-t border-border-soft pt-4">
                  <span className="absolute -top-px left-0 h-px w-16 bg-gold/60 transition-all duration-500 group-hover:w-full" />
                  <div className="flex items-center justify-between">
                    <span className="display text-2xl text-ink/25 transition-colors duration-500 group-hover:text-gold-ink/70">
                      {step.num}
                    </span>
                    <Icon size={16} className="text-gold-ink/70" strokeWidth={1.25} />
                  </div>
                  <h3 className="mt-3 text-base font-medium text-ink">{step.title}</h3>
                  <span className="label mt-1 block text-gold-ink/80">{step.machine}</span>
                  <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Quality standards ────────────────────────────────────── */}
      <section className="bg-surface-base py-10 md:py-12">
        <div className="section-pad mx-auto max-w-[1400px]">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-10">
            <div>
              <span className="label text-gold-ink">ASSURANCE</span>
              <h2 className="display mt-2 text-balance text-3xl leading-[1.1] text-ink sm:text-4xl">
                Measured, <span className="italic text-gold-ink">not marketed</span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                The plant is certified, colour-managed and inspected at every stage. These
                are the standards your job is measured against.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/request-quote" className="btn-gold">
                  Start your job
                </Link>
                <Link to="/sustainability" className="btn-ghost">
                  Our materials
                </Link>
              </div>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {MACHINERY.standards.map((s) => (
                <li
                  key={s.title}
                  className="group flex flex-col justify-center border border-border-soft bg-surface-elevated p-5 transition-all duration-500 ease-lux hover:-translate-y-1 hover:border-gold/50 hover:shadow-[var(--shadow-card-hover)]"
                >
                  <ShieldCheck
                    size={16}
                    strokeWidth={1.25}
                    className="text-gold-ink transition-transform duration-500 group-hover:scale-110"
                  />
                  <h3 className="mt-3 text-sm font-medium text-ink sm:text-base">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-secondary">{s.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Enquiry ──────────────────────────────────────────────── */}
      <section className="border-t border-border-soft bg-surface-primary py-10 md:py-12">
        <div className="section-pad mx-auto max-w-[1400px]">
          <div className="relative overflow-hidden border border-gold/30 bg-surface-elevated px-6 py-9 text-center sm:px-12">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(70% 120% at 50% 0%, var(--gold-100), transparent 70%)",
              }}
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="display text-balance text-2xl leading-tight text-ink sm:text-3xl">
                {MACHINERY.cta.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                {MACHINERY.cta.sub}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Link to={MACHINERY.cta.primary.to} className="btn-gold">
                  {MACHINERY.cta.primary.label}
                  <ArrowRight size={13} />
                </Link>
                <Link to={MACHINERY.cta.secondary.to} className="btn-ghost">
                  {MACHINERY.cta.secondary.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

