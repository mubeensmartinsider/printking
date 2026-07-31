import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Clock, Layers, Award } from "lucide-react";
import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import ScrollReveal from "../components/effects/ScrollReveal";
import ParallaxSection from "../components/effects/ParallaxSection";
import ComparisonSlider from "../components/effects/ComparisonSlider";

const CASE_STUDIES = [
  {
    id: "bareeze-couture",
    title: "Bareezé Couture Lookbook",
    industry: "Fashion & Apparel",
    product: "Catalogue / Lookbook",
    client: "Bareezé Couture",
    challenge: "Bareezé needed a premium lookbook that captured the brand's luxury aesthetic for their seasonal collection launch. The lookbook required precise color reproduction to match fabric swatches and intricate design details.",
    solution: "We produced a 48-page perfect-bound lookbook using 8-color Heidelberg offset printing with Pantone-matched colors. Each page was coated with matte lamination for a soft-touch finish, and selected pages featured spot UV for visual contrast.",
    materials: ["200gsm coated art paper", "Matte lamination", "Spot UV coating", "Perfect bound"],
    results: ["98% color accuracy to fabric swatches", "Delivered in 7 working days", "Client reordered for 3 consecutive seasons", "Featured in their flagship store displays"],
    images: {
      before: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1200&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1610018556010-6a11691bc905?q=80&w=1200&auto=format&fit=crop",
    },
    testimonial: {
      quote: "The color accuracy and finish quality exceeded our expectations. This lookbook represents our brand exactly as we envisioned.",
      name: "Marketing Director",
      title: "Bareezé Couture",
    },
  },
  {
    id: "nestle-carton",
    title: "Nestlé Folding Carton Redesign",
    industry: "Food & Beverage",
    product: "Folding Carton",
    client: "Nestlé Pakistan",
    challenge: "Nestlé required a complete packaging redesign for a major product line, requiring high-volume production with zero tolerance for color variation across millions of units.",
    solution: "We engineered a new folding carton structure optimized for high-speed automated filling lines. Using our Heidelberg Speedmaster presses, we maintained consistent color across the entire production run with ISO-certified quality control.",
    materials: ["350gsm FSC-certified board", "Aqueous coating", "Food-safe inks", "Easy-open perforation"],
    results: ["2 million units delivered", "Zero color variation across run", "15% cost reduction vs previous supplier", "ISO 9001:2015 certified process"],
    images: {
      before: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=1200&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1556742059-47b93231f536?q=80&w=1200&auto=format&fit=crop",
    },
    testimonial: {
      quote: "PrintKing's consistency at scale is remarkable. They've become our go-to packaging partner for high-volume production.",
      name: "Operations Manager",
      title: "Nestlé Pakistan",
    },
  },
  {
    id: "elan-luxury",
    title: "Élan Luxury Rigid Box Collection",
    industry: "Fashion & Apparel",
    product: "Luxury Rigid Box",
    client: "Élan",
    challenge: "Élan required a premium rigid box for their luxury pret collection that would create an unforgettable unboxing experience. The box needed to communicate exclusivity and craftsmanship.",
    solution: "We designed a magnetic-closure rigid box with a telescopic lid, wrapped in premium textured paper. The exterior featured hot foil stamping in rose gold, with a soft-touch interior lining and embossed brand logo.",
    materials: ["2mm rigid greyboard", "Textured wrapping paper", "Rose gold foil stamping", "Soft-touch interior lining", "Magnetic closure"],
    results: ["Awarded 'Best Packaging Design' at fashion week", "40% increase in social media unboxing posts", "200% repeat order rate", "Featured in Vogue Pakistan"],
    images: {
      before: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=1200&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1610018556010-6a11691bc905?q=80&w=1200&auto=format&fit=crop",
    },
    testimonial: {
      quote: "The unboxing experience PrintKing created for our collection was nothing short of spectacular. Every detail, from the foil stamping to the magnetic closure, reflects our commitment to luxury.",
      name: "Brand Director",
      title: "Élan",
    },
  },
];

export default function CaseStudiesPage() {
  const [activeCase, setActiveCase] = useState(CASE_STUDIES[0].id);
  const navigate = useNavigate();
  const currentCase = CASE_STUDIES.find((c) => c.id === activeCase) || CASE_STUDIES[0];

  return (
    <>
      <Seo
        title="Case Studies — Packaging Projects in Detail | PRINTKING"
        description="Explore detailed case studies of PRINTKING's packaging and printing projects across fashion, food & beverage, and luxury industries."
        path="/case-studies"
      />
      <PageHero
        eyebrow="CASE STUDIES"
        title="Projects That Define Our Craft"
        sub="Deep-dive into our most challenging and rewarding projects — from concept to delivery."
      />

      {/* Case selector */}
      <section className="bg-carbon border-b border-white/[0.06] py-8">
        <div className="section-pad mx-auto max-w-[1400px]">
          <div className="flex flex-wrap gap-2">
            {CASE_STUDIES.map((cs) => (
              <button
                key={cs.id}
                onClick={() => setActiveCase(cs.id)}
                className={`rounded-sm px-5 py-3 text-left transition-all duration-300 ${
                  activeCase === cs.id
                    ? "bg-gold text-obsidian"
                    : "border border-white/[0.08] text-platinum/70 hover:border-gold/50 hover:text-gold"
                }`}
              >
                <span className="block text-xs font-medium">{cs.client}</span>
                <span className="block text-[10px] opacity-70">{cs.product}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Detail */}
      <ScrollReveal variant="fade-up">
        <section className="bg-obsidian py-16 lg:py-24">
          <div className="section-pad mx-auto max-w-[1400px]">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Left: Content */}
              <div>
                <span className="label text-gold">{currentCase.industry} · {currentCase.product}</span>
                <h2 className="display mt-4 text-3xl text-platinum sm:text-4xl lg:text-5xl">
                  {currentCase.title}
                </h2>

                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="label mb-2 text-gold">THE CHALLENGE</h3>
                    <p className="text-sm leading-relaxed text-platinum/65">{currentCase.challenge}</p>
                  </div>
                  <div>
                    <h3 className="label mb-2 text-gold">THE SOLUTION</h3>
                    <p className="text-sm leading-relaxed text-platinum/65">{currentCase.solution}</p>
                  </div>
                </div>

                {/* Materials */}
                <div className="mt-8 border-t border-white/[0.06] pt-8">
                  <h3 className="label mb-4 flex items-center gap-2 text-gold">
                    <Layers size={14} /> MATERIALS & FINISHES
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currentCase.materials.map((m) => (
                      <span key={m} className="chip text-xs text-platinum/60">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div className="mt-8 border-t border-white/[0.06] pt-8">
                  <h3 className="label mb-4 flex items-center gap-2 text-gold">
                    <Award size={14} /> RESULTS
                  </h3>
                  <ul className="space-y-2">
                    {currentCase.results.map((r, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-platinum/65">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Testimonial */}
                <div className="mt-8 rounded-sm border-l-2 border-gold bg-gold/5 p-6">
                  <p className="display-serif-alt text-lg italic leading-relaxed text-platinum">
                    "{currentCase.testimonial.quote}"
                  </p>
                  <div className="mt-4">
                    <span className="block text-sm font-medium text-platinum">{currentCase.testimonial.name}</span>
                    <span className="label text-gold">{currentCase.testimonial.title}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/request-quote")}
                  className="btn-gold mt-10"
                >
                  Start a Similar Project <ArrowRight size={16} />
                </button>
              </div>

              {/* Right: Before/After */}
              <div className="space-y-8">
                <ParallaxSection speed={0.15}>
                  <ComparisonSlider
                    before={{ src: currentCase.images.before, alt: "Before", label: "Standard" }}
                    after={{ src: currentCase.images.after, alt: "After", label: "PrintKing Quality" }}
                  />
                </ParallaxSection>

                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-white/[0.06] bg-carbon p-5 text-center">
                    <Clock size={20} className="mx-auto text-gold" />
                    <span className="mt-2 block text-2xl font-light text-gold">7-10</span>
                    <span className="label text-platinum/50">Days Turnaround</span>
                  </div>
                  <div className="border border-white/[0.06] bg-carbon p-5 text-center">
                    <Award size={20} className="mx-auto text-gold" />
                    <span className="mt-2 block text-2xl font-light text-gold">100%</span>
                    <span className="label text-platinum/50">QC Pass Rate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA */}
      <section className="border-t border-white/[0.06] bg-carbon py-24 text-center">
        <div className="section-pad mx-auto max-w-2xl">
          <h2 className="display text-3xl text-platinum sm:text-4xl">
            Have a Project in Mind?
          </h2>
          <p className="mt-5 text-platinum/55">
            Let's discuss how we can bring your packaging vision to life with the same precision and craftsmanship.
          </p>
          <button onClick={() => navigate("/contact")} className="btn-gold mt-10">
            Start Your Project
          </button>
        </div>
      </section>
    </>
  );
}