import React from "react";
import { INDUSTRIES } from "../../lib/content";
import SectionHeading from "../common/SectionHeading";
import { Shirt, Layers, Wheat, Droplet, Building2, Briefcase, BookOpen, ShoppingBag, Rocket } from "lucide-react";

const INDUSTRY_ICONS = { Shirt, Layers, Wheat, Droplet, Building2, Briefcase, BookOpen, ShoppingBag, Rocket };

function IndustryIcon({ industry }) {
  const Icon = INDUSTRY_ICONS[industry.icon];
  return Icon ? <Icon className="h-5 w-5" aria-hidden="true" /> : null;
}

function EditorialCard({ industry, index, clone }) {
  return (
    <article className="editorial-card" aria-hidden={clone || undefined}>
      <span className="editorial-card__index">{String(index + 1).padStart(2, "0")}</span>
      <span className="editorial-card__icon"><IndustryIcon industry={industry} /></span>
      <div className="min-w-0">
        <h3>{industry.name}</h3>
        <p>{industry.desc}</p>
      </div>
    </article>
  );
}

function EditorialLayout() {
  return (
    <div className="industries-editorial">
      {[false, true].map((reverse) => {
        const items = reverse ? [...INDUSTRIES].reverse() : INDUSTRIES;
        return (
          <div className="marquee-mask" key={reverse ? "reverse" : "forward"}>
            <div className={`ind-marquee-track ${reverse ? "ind-marquee-track--reverse" : "ind-marquee-track--forward"}`}>
              {[...items, ...items].map((industry, index) => (
                <EditorialCard
                  industry={industry}
                  index={index % items.length}
                  clone={index >= items.length}
                  key={`${reverse ? "reverse" : "forward"}-${industry.name}-${index}`}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Industries() {
  return (
    <section data-testid="industries-section" className="industries-section industries-section--editorial">
      <style>{`
        .industries-section {
          position: relative;
          overflow: hidden;
          padding: 5rem 0;
          background: radial-gradient(65% 60% at 50% 0%, rgba(197, 160, 90, 0.16), transparent 65%), var(--surface-base);
        }

        .industries-section::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: linear-gradient(rgba(197, 160, 90, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(197, 160, 90, 0.06) 1px, transparent 1px);
          background-size: 72px 72px;
          opacity: 0.35;
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 18%, black 82%, transparent);
          mask-image: linear-gradient(to bottom, transparent, black 18%, black 82%, transparent);
        }

        .industries-shell {
          position: relative;
          z-index: 1;
          width: 100%;
          margin: 0 auto;
        }

        .industries-heading-wrap {
          position: relative;
          z-index: 1;
          margin-bottom: 2rem;
        }

        .industries-editorial {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .marquee-mask {
          position: relative;
          display: flex;
          overflow: hidden;
          padding: 0.2rem 0;
        }

        .ind-marquee-track {
          display: flex;
          width: max-content;
          flex-shrink: 0;
          gap: 1rem;
          padding-right: 1rem;
          will-change: transform;
        }

        .ind-marquee-track--forward { animation: ind-marquee 46s linear infinite; }
        .ind-marquee-track--reverse { animation: ind-marquee-reverse 46s linear infinite; animation-delay: -23s; }
        .marquee-mask:hover .ind-marquee-track { animation-play-state: paused; }

        .editorial-card {
          display: flex;
          width: 21rem;
          min-height: 6.5rem;
          flex: 0 0 auto;
          align-items: center;
          gap: 1rem;
          border-top: 1px solid var(--color-border-strong);
          border-bottom: 1px solid var(--color-border-strong);
          padding: 1rem 0;
        }

        .editorial-card__index {
          align-self: flex-start;
          color: var(--color-gold);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.16em;
        }

        .editorial-card__icon {
          display: grid;
          width: 2.75rem;
          height: 2.75rem;
          flex: 0 0 auto;
          place-items: center;
          border: 1px solid var(--gold-muted);
          border-radius: 0.85rem;
          color: var(--color-gold);
          background: var(--gold-whisper);
        }

        .editorial-card h3 {
          color: var(--color-platinum);
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 400;
        }

        .editorial-card p {
          margin-top: 0.55rem;
          color: var(--text-secondary);
          font-size: 0.8rem;
          line-height: 1.6;
        }

        @keyframes ind-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes ind-marquee-reverse {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }

        @media (max-width: 767px) {
          .industries-section { padding: 3.5rem 0; }
          .editorial-card { width: min(78vw, 20rem); }
        }

        @media (prefers-reduced-motion: reduce) {
          .ind-marquee-track--forward,
          .ind-marquee-track--reverse {
            animation: none;
            transform: none;
          }

          .marquee-mask {
            overflow-x: auto;
          }
        }
      `}</style>

      <div className="industries-shell section-pad">
        <div className="industries-heading-wrap">
          <SectionHeading
            eyebrow="WHO WE SERVE"
            title="Quality."
            titleItalic="Served Across Industries."
            sub="From fashion houses to financial institutions — premium print & packaging for over 15 years."
            align="center"
            className="!max-w-3xl"
          />
        </div>

        <EditorialLayout />
      </div>
    </section>
  );
}
