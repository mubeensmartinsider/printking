import React from "react";
import { INDUSTRIES } from "../../lib/content";
import SectionHeading from "../common/SectionHeading";
import * as Icons from "lucide-react";

export default function Industries() {
  return (
    <section
      data-testid="industries-section"
      className="industries-section"
    >
      <style>{`
        /* ============================================
           INDUSTRIES SECTION
           ============================================ */
        .industries-section {
          position: relative;
          background: var(--surface-base);
          padding: 2.25rem 0;
          overflow: hidden;
        }

        .industries-heading-wrap {
          margin-left: auto;
          margin-right: auto;
          max-width: 72rem;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
          position: relative;
          z-index: 10;
          margin-bottom: 1.5rem;
        }

        /* ============================================
           MARQUEE WRAPPER + MASK
           ============================================ */
        .marquee-mask {
          position: relative;
          display: flex;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        .marquee-mask--second {
          margin-top: 1rem;
        }

        /* ============================================
           MARQUEE TRACK
           ============================================ */
        .ind-marquee-track {
          display: flex;
          flex-shrink: 0;
          width: max-content;
          gap: 1rem;
          padding-right: 1rem;
          will-change: transform;
        }

        .ind-marquee-track--forward {
          animation: ind-marquee 40s linear infinite;
        }

        .ind-marquee-track--reverse {
          animation: ind-marquee-reverse 40s linear infinite;
          /* phase offset — keeps the two rows from mirror-aligning */
          animation-delay: -20s;
        }

        .marquee-mask:hover .ind-marquee-track {
          animation-play-state: paused;
        }

        /* ============================================
           PILL
           ============================================ */
        .marquee-pill {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border-radius: 9999px;
          border: 1px solid var(--color-border);
          background: var(--surface-elevated);
          padding: 0.875rem 1.5rem;
          white-space: nowrap;
          transition: transform 0.2s ease, box-shadow 0.2s ease,
            border-color 0.2s ease;
        }

        .marquee-pill:hover {
          transform: translateY(-2px);
          border-color: #ed0d87;
          box-shadow: 0 6px 20px rgba(237, 13, 135, 0.12);
        }

        .marquee-pill__icon {
          width: 1.25rem;
          height: 1.25rem;
          stroke-width: 1.75;
          flex-shrink: 0;
          transition: color 0.3s ease;
        }

        .marquee-pill__icon--blue {
          color: #2dacde;
        }

        .marquee-pill__icon--pink {
          color: #ed0d87;
        }

        .marquee-pill:hover .marquee-pill__icon--blue {
          color: #ed0d87;
        }

        .marquee-pill:hover .marquee-pill__icon--pink {
          color: #2dacde;
        }

        .marquee-pill__name {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--color-platinum);
        }

        .marquee-pill__desc {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        /* ============================================
           KEYFRAMES
           ============================================ */
        @keyframes ind-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes ind-marquee-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        /* ============================================
           RESPONSIVE
           ============================================ */
        @media (max-width: 640px) {
          .industries-section {
            padding: 1.5rem 0;
          }

          .marquee-pill {
            padding: 0.625rem 1rem;
            gap: 0.5rem;
          }

          .marquee-pill__name {
            font-size: 0.8125rem;
          }

          .marquee-pill__desc {
            font-size: 0.6875rem;
          }

          .marquee-pill__icon {
            width: 1rem;
            height: 1rem;
          }
        }

        /* ============================================
           ACCESSIBILITY — reduced motion
           ============================================ */
        @media (prefers-reduced-motion: reduce) {
          .ind-marquee-track--forward,
          .ind-marquee-track--reverse {
            animation: none;
            transform: none;
          }

          .marquee-mask {
            overflow-x: auto;
            /* remove the fade so the scrollable fallback is fully readable */
            -webkit-mask-image: none;
            mask-image: none;
          }
        }
      `}</style>

      <div className="industries-heading-wrap">
        <SectionHeading
          eyebrow="WHO WE SERVE"
          title="Quality."
          titleItalic="Served Across Industries."
          sub="From fashion houses to financial institutions — premium print & packaging for over 15 years."
          align="center"
        />
      </div>

      {/* Marquee row 1 (forward) */}
      <div className="marquee-mask">
        <div className="ind-marquee-track ind-marquee-track--forward">
          {[...INDUSTRIES, ...INDUSTRIES].map((ind, i) => {
            const Icon = Icons[ind.icon];
            /* second pass is a duplicate for the seamless loop — hidden from AT */
            const isClone = i >= INDUSTRIES.length;
            return (
              <div
                className="marquee-pill"
                key={`${ind.name}-${i}`}
                aria-hidden={isClone || undefined}
              >
                {Icon && (
                  <Icon className="marquee-pill__icon marquee-pill__icon--blue" />
                )}
                <span className="marquee-pill__name">{ind.name}</span>
                <span className="marquee-pill__desc">· {ind.desc}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Marquee row 2 (reverse) */}
      <div className="marquee-mask marquee-mask--second">
        <div className="ind-marquee-track ind-marquee-track--reverse">
          {[...INDUSTRIES, ...INDUSTRIES].reverse().map((ind, i) => {
            const Icon = Icons[ind.icon];
            /* second pass is a duplicate for the seamless loop — hidden from AT */
            const isClone = i >= INDUSTRIES.length;
            return (
              <div
                className="marquee-pill"
                key={`${ind.name}-rev-${i}`}
                aria-hidden={isClone || undefined}
              >
                {Icon && (
                  <Icon className="marquee-pill__icon marquee-pill__icon--pink" />
                )}
                <span className="marquee-pill__name">{ind.name}</span>
                <span className="marquee-pill__desc">· {ind.desc}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}