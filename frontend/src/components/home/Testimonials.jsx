import React, { useState } from "react";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "../../lib/content";
import { useReveal, useStagger } from "../../lib/animations";
/* Section background photo — a plain public URL. No import, no alias:
   a string can never fail at module-resolution time, so this cannot break
   the build. The file is served straight from public/assets/clients.png. */
const CLIENTS_PHOTO = "/assets/clients.png";

/* The content file has name/title swapped: `name` holds the role,
   `title` holds the company, `company` holds the city. Normalise once
   here so the attribution renders correctly. */
const attr = (t) => ({ company: t.title, role: t.name, city: t.company });

const Stars = ({ size = 12 }) => (
  <span className="flex items-center gap-1" aria-label="Rated 5 out of 5">
    {Array.from({ length: 5 }, (_, i) => (
      <Star key={i} size={size} className="fill-gold-soft text-gold-soft" strokeWidth={1.5} aria-hidden="true" />
    ))}
  </span>
);

/* ══ COLUMNS — editorial 3-up, no cards, no boxes ══
   The section background is the clients photo, dimmed and desaturated so
   the type stays legible. The photo lives behind the whole section, not
   behind individual quotes. */
export default function Testimonials() {
  const headRef = useReveal();
  const colsRef = useStagger("[data-col]", { stagger: 0.08, y: 24 });
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <section
      data-testid="testimonials-section"
      className="relative isolate overflow-hidden border-y border-white/15 bg-graphite py-12 lg:py-14"
    >
      {/* Background photo — full bleed, softened so quotes stay readable.
          If the asset ever fails to resolve, the veil alone is still a
          valid surface, so the section never shows a broken image. */}
      {!photoFailed && (
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <img
            src={CLIENTS_PHOTO}
            alt=""
            onError={() => setPhotoFailed(true)}
            className="h-full w-full object-cover opacity-60 grayscale"
          />
          <div className="absolute inset-0 bg-graphite/80" />
        </div>
      )}

      <div className="section-pad mx-auto max-w-[1400px]">
        {/* Header — copy left, rating right (single row) */}
        <div ref={headRef} className="relative mb-10 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <div>
            <span className="label text-[11px] font-semibold text-gold-soft">CLIENT VOICES</span>
            <h2 className="display mt-3 text-3xl text-platinum sm:text-4xl">What Our Clients Say.</h2>
          </div>
          <div className="flex items-center gap-2 pb-1 text-platinum/80">
            <Stars size={15} />
            <span className="text-[13px] font-medium">5.0 average rating</span>
          </div>
        </div>

        {/* Three columns — hairline vertical rules, no card boxes */}
        <div ref={colsRef} className="grid gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => {
            const { company, role, city } = attr(t);
            return (
              <figure
                key={t.city}
                data-col
                className={`px-0 sm:px-6 ${
                  /* 2-up: only column 2 starts a row beside another */
                  i === 1 ? "sm:border-l sm:border-border-soft" : ""
                } ${
                  /* 3-up: columns 2 and 3 both get a rule */
                  i > 0 ? "lg:border-l lg:border-border-soft" : ""
                }`}
              >
                <Stars size={14} />
                <blockquote className="mt-4">
                  <p className="font-serif text-[18px] italic leading-[1.75] text-platinum sm:text-[20px]">{t.quote}</p>
                </blockquote>
                <figcaption className="mt-5">
                  <span className="block h-px w-7 bg-gold-soft/80" />
                  <span className="mt-3 block text-[15px] font-semibold text-platinum">{company}</span>
                  <span className="mt-1.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-platinum/85">
                    {role} · {city}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}


