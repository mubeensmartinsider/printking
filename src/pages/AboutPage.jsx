import React from "react";
import { useNavigate } from "react-router-dom";
import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import Img from "../components/common/Img";
import { ABOUT, WHY_CHOOSE, FOOTER } from "../lib/content";
import { useStagger } from "../lib/animations";

const MILESTONES = [
  { year: "2009", title: "Founded in Lahore", desc: "Established as a full-service offset printing house with an obsession for finish quality and customer satisfaction." },
  { year: "2012", title: "First Heidelberg Press", desc: "Commissioned German-engineered Heidelberg presses, setting a new standard for colour precision and consistency." },
  { year: "2015", title: "CTP & Packaging Division", desc: "Added in-house Kodak Trendsetter Computer-to-Plate and launched a dedicated luxury packaging division." },
  { year: "2018", title: "ISO 9001:2015 Certified", desc: "Achieved ISO 9001:2015 quality management across pre-press, press and post-press workflows." },
  { year: "2021", title: "12,000 m² Facility", desc: "Scaled to a climate-controlled 12,000 m² plant running eight state-of-the-art Heidelberg presses." },
  { year: "2024", title: "A National Brand Partner", desc: "Trusted by leading fashion houses, corporates and institutions across Pakistan and beyond." },
];

export default function AboutPage() {
  const navigate = useNavigate();
  const timelineRef = useStagger("[data-ms]", { stagger: 0.1 });
  const valuesRef = useStagger("[data-val]", { stagger: 0.06 });

  return (
    <>
      <Seo title="About PRINTKING — A Decade of Luxury Packaging Craft" description="The story behind Pakistan's premier luxury packaging manufacturer — German-engineered presses, artisan finishing, and a zero-compromise standard." path="/about" />
      <PageHero
        eyebrow="OUR STORY"
        title="A Decade of Manufacturing the First Impression"
        sub="For over twelve years we have been the quiet manufacturing partner behind some of the most recognised brands in Pakistan and beyond."
      />

      {/* Brand statement + facility image */}
      <section className="bg-obsidian py-28">
        <div className="section-pad mx-auto grid max-w-[1400px] items-center gap-16 lg:grid-cols-2">
          <div>
            <h2 className="display text-3xl leading-snug text-platinum sm:text-4xl">
              “{ABOUT.headline}”
            </h2>
            <div className="mt-8 space-y-5">
              {ABOUT.body.map((p, i) => (
                <p key={i} className="text-base leading-[1.8] text-platinum/60">{p}</p>
              ))}
            </div>
          </div>
          <Img src={ABOUT.images[3].src} alt="PRINTKING facility" label="Climate-Controlled Facility" className="aspect-[4/3] w-full" />
        </div>
      </section>

      {/* Vision · Mission · Core Values */}
      <section className="border-t border-white/[0.06] bg-carbon py-28">
        <div className="section-pad mx-auto max-w-[1400px]">
          <SectionHeading eyebrow="WHAT WE STAND FOR" title="Vision, Mission & Values" className="mb-16" />
          <div className="grid gap-12 lg:grid-cols-3">
            <div data-testid="about-vision" className="border-t border-gold/30 pt-7">
              <span className="label text-gold">VISION</span>
              <p className="display mt-5 text-2xl leading-snug text-platinum sm:text-[28px]">“{ABOUT.vision}”</p>
            </div>
            <div data-testid="about-mission" className="border-t border-gold/30 pt-7">
              <span className="label text-gold">MISSION</span>
              <p className="display mt-5 text-2xl leading-snug text-platinum sm:text-[28px]">“{ABOUT.mission}”</p>
            </div>
            <div data-testid="about-values" className="border-t border-gold/30 pt-7">
              <span className="label text-gold">CORE VALUES</span>
              <ul className="mt-5 space-y-4">
                {ABOUT.coreValues.map((v, i) => (
                  <li key={v} className="flex items-baseline gap-4 text-base text-platinum/75">
                    <span className="display text-sm text-gold">0{i + 1}</span>
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-t border-white/[0.06] bg-obsidian py-28">
        <div className="section-pad mx-auto max-w-[1400px]">
          <SectionHeading eyebrow="MILESTONES" title="How We Grew" className="mb-20" />
          <div ref={timelineRef} className="space-y-0 border-l border-white/[0.1] pl-10">
            {MILESTONES.map((m) => (
              <div key={m.year} data-ms className="relative pb-12 last:pb-0">
                <span className="absolute -left-[46px] top-1 flex h-5 w-5 items-center justify-center rounded-full border border-gold bg-obsidian">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                </span>
                <span className="display text-3xl text-gold">{m.year}</span>
                <h3 className="mt-2 text-xl font-medium text-platinum">{m.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-platinum/55">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-white/[0.06] bg-carbon py-28">
        <div className="section-pad mx-auto max-w-[1400px]">
          <SectionHeading eyebrow="WHAT DRIVES US" title="Our Operating Principles" className="mb-16" />
          <div ref={valuesRef} className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CHOOSE.slice(0, 4).map((v) => (
              <div key={v.num} data-val className="border-t border-white/[0.08] pt-6">
                <span className="display text-5xl text-gold">{v.num}</span>
                <h3 className="mt-4 text-lg font-medium text-platinum">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-platinum/55">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications wall */}
      <section className="border-t border-white/[0.06] bg-obsidian py-24">
        <div className="section-pad mx-auto max-w-[1400px] text-center">
          <span className="label text-gold">CERTIFICATIONS & STANDARDS</span>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {[...FOOTER.certifications, "G7 Process Control", "FOGRA PSO", "24-Hour Client Service"].map((c) => (
              <span key={c} className="border border-white/[0.08] px-8 py-5 text-base text-platinum/80">{c}</span>
            ))}
          </div>
          <button onClick={() => navigate("/request-quote")} className="btn-gold mt-14">Start Your Project</button>
        </div>
      </section>
    </>
  );
}
