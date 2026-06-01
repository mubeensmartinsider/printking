import React from "react";
import { useNavigate } from "react-router-dom";
import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import ServiceCard from "../components/common/ServiceCard";
import { SERVICES } from "../lib/content";
import { useStagger } from "../lib/animations";

const FINISHES = [
  "UV Spot Coating", "Soft-Touch Lamination", "Hot Foil Stamping", "Cold Foil",
  "Blind Emboss", "Debossing", "Die-Cutting", "Aqueous Coating",
  "Matte Lamination", "Gloss Lamination", "Edge Painting", "Magnetic Closure",
];

export default function ServicesPage() {
  const navigate = useNavigate();
  const gridRef = useStagger("[data-svc]", { stagger: 0.05 });

  return (
    <>
      <Seo title="Services — Luxury Boxes, Cartons, Bags & Print | PRINTKING" description="Explore PRINTKING's full capability: luxury rigid boxes, folding cartons, mailer boxes, paper bags, labels, commercial printing and bespoke custom solutions." path="/services" />
      <PageHero
        eyebrow="WHAT WE MAKE"
        title="Every Format. Every Finish. Every Scale."
        sub="Thirteen manufacturing disciplines under one roof — from jewellery-grade rigid boxes to high-volume commercial print runs."
      />

      <section className="bg-obsidian py-24">
        <div ref={gridRef} className="section-pad mx-auto grid max-w-[1400px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div key={s.num} data-svc className="min-h-[340px]">
              <ServiceCard service={s} onClick={() => navigate("/request-quote")} className="h-full min-h-[340px]" />
            </div>
          ))}
        </div>
      </section>

      {/* Finishes */}
      <section className="border-y border-white/[0.06] bg-carbon py-28">
        <div className="section-pad mx-auto max-w-[1400px]">
          <SectionHeading eyebrow="THE DETAIL" title="Finishes & Specialty Techniques" sub="The finishing details that separate premium packaging from ordinary print." className="mb-14" />
          <div className="flex flex-wrap gap-3">
            {FINISHES.map((f) => (
              <span key={f} className="chip text-sm text-platinum/75">{f}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-obsidian py-24 text-center">
        <div className="section-pad mx-auto max-w-2xl">
          <h2 className="display text-4xl text-platinum">Have a specification in mind?</h2>
          <p className="mt-5 text-platinum/55">Send us your brief and we'll return a detailed quote within 4 business hours.</p>
          <button onClick={() => navigate("/request-quote")} className="btn-gold mt-10">Request a Quote</button>
        </div>
      </section>
    </>
  );
}
