import React, { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";

const FAQ_DATA = [
  {
    category: "Ordering & Quotes",
    items: [
      {
        q: "How do I request a quote?",
        a: "You can request a quote through our online form at /request-quote, email us at sales@printking.com.pk, or call +92 42 37150138-40. We typically respond within 4 business hours with a detailed quotation.",
      },
      {
        q: "What information do you need to provide a quote?",
        a: "For an accurate quote, please provide: product type (rigid box, carton, bag, etc.), dimensions (L×W×H), quantity, material preferences, finish requirements, and if possible, artwork or reference images.",
      },
      {
        q: "Do you have a minimum order quantity?",
        a: "No minimum order restrictions. We handle everything from sample quantities (50-100 units) to full production runs (100,000+ units). Pricing scales with volume.",
      },
      {
        q: "How long does it take to get a sample?",
        a: "Sample production takes 24-48 hours from approved specifications. We can courier samples to your address for a nominal fee, or you can visit our facility to see them in person.",
      },
    ],
  },
  {
    category: "Design & Artwork",
    items: [
      {
        q: "Do you provide design services?",
        a: "Yes, we have an in-house design studio that can create structural designs (dielines), artwork, and prepress files. Our design team works with you to ensure print-ready files that meet your exact specifications.",
      },
      {
        q: "What file formats do you accept?",
        a: "We accept AI, PSD, PDF, INDD, EPS, and CDR files. For best results, please provide files in CMYK color mode with 300 DPI resolution and any embedded fonts outlined.",
      },
      {
        q: "Can you match my brand colors exactly?",
        a: "Yes, we use Pantone Matching System (PMS) for exact color reproduction. Our Heidelberg presses are ISO-calibrated and we provide digital proofs for color approval before production.",
      },
    ],
  },
  {
    category: "Materials & Finishes",
    items: [
      {
        q: "What types of paper and board do you offer?",
        a: "We stock a wide range: FSC-certified kraft, coated/uncoated art board, greyboard, specialty textured papers, rigid board, and imported substrates. Contact us for our full material catalog.",
      },
      {
        q: "What finishing options are available?",
        a: "Our finishing capabilities include: hot foil stamping (gold, silver, copper, custom), embossing, debossing, spot UV, matte/gloss lamination, soft-touch coating, edge painting, die-cutting, and magnetic closure assembly.",
      },
      {
        q: "What is the difference between soft-touch and matte lamination?",
        a: "Soft-touch lamination creates a velvety, tactile surface that feels premium to the touch. Matte lamination provides a non-reflective, smooth finish without the soft texture. Both are durable and protect the printed surface.",
      },
    ],
  },
  {
    category: "Production & Timeline",
    items: [
      {
        q: "What is the standard turnaround time?",
        a: "Standard turnaround is 7-10 working days from artwork approval. Express production (48-72 hours) is available for urgent orders. Timeline depends on complexity, quantity, and finishing requirements.",
      },
      {
        q: "Can I visit the production facility?",
        a: "Absolutely. We welcome facility visits by appointment. You can see our Heidelberg presses, finishing equipment, and quality control processes in action. Contact our team to schedule a tour.",
      },
      {
        q: "How do you ensure quality control?",
        a: "We are ISO 9001:2015 certified. Every job passes through multiple QC checkpoints: pre-press verification, first-sheet approval, in-process inspection, and final 100% inspection before packing and dispatch.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    items: [
      {
        q: "Do you deliver nationwide?",
        a: "Yes, we deliver to all major cities across Pakistan including Lahore, Karachi, Islamabad, Faisalabad, and more. We use reliable courier and freight partners for timely delivery.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we have successfully shipped to 30+ countries. We handle all export documentation, freight coordination, and customs paperwork. International shipping costs depend on destination and order volume.",
      },
      {
        q: "What are your payment terms?",
        a: "Standard payment terms are 50% advance with the order and 50% before dispatch. We accept bank transfers, cheques, and cash. For established clients, customized terms may be available.",
      },
    ],
  },
  {
    category: "Quality & Returns",
    items: [
      {
        q: "What if the printed product doesn't meet my expectations?",
        a: "We take quality seriously. If there is a manufacturing defect or error on our part, we will reprint or refund. We recommend approving a physical sample before full production to ensure complete satisfaction.",
      },
      {
        q: "Do you offer a warranty on your products?",
        a: "All our products are manufactured to ISO 9001:2015 standards. We stand behind our workmanship and materials. Any manufacturing defects are addressed promptly at no additional cost.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openCategory, setOpenCategory] = useState("Ordering & Quotes");
  const [openItems, setOpenItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const toggleItem = (category, index) => {
    const key = `${category}-${index}`;
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredData = FAQ_DATA.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((cat) => cat.items.length > 0);

  return (
    <>
      <Seo
        title="FAQ — Frequently Asked Questions | PRINTKING"
        description="Find answers to common questions about PRINTKING's printing and packaging services, ordering process, materials, finishes, and delivery."
        path="/faq"
      />
      <PageHero
        eyebrow="QUESTIONS & ANSWERS"
        title="Everything You Need to Know"
        sub="Find answers to common questions about our services, process, and capabilities."
      />

      <section className="bg-obsidian py-24">
        <div className="section-pad mx-auto max-w-[1200px]">
          {/* Search */}
          <div className="relative mx-auto mb-16 max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-platinum/40"
            />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-b border-white/15 bg-transparent py-4 pl-12 pr-4 text-base text-platinum placeholder:text-platinum/30 focus:border-gold focus:outline-none"
            />
          </div>

          <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
            {/* Category sidebar */}
            <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {FAQ_DATA.map((cat) => (
                <button
                  key={cat.category}
                  onClick={() => {
                    setOpenCategory(cat.category);
                    setSearchQuery("");
                  }}
                  className={`label rounded-sm px-4 py-3 text-left transition-all duration-300 ${
                    openCategory === cat.category
                      ? "bg-gold text-obsidian"
                      : "text-platinum/60 hover:bg-gold/10 hover:text-gold"
                  }`}
                >
                  {cat.category}
                </button>
              ))}
            </div>

            {/* FAQ items */}
            <div className="space-y-4">
              {filteredData
                .filter((cat) => cat.category === openCategory)
                .map((cat) => (
                  <div key={cat.category}>
                    <h2 className="display mb-8 text-2xl text-platinum sm:text-3xl">
                      {cat.category}
                    </h2>
                    <div className="space-y-3">
                      {cat.items.map((item, idx) => {
                        const key = `${cat.category}-${idx}`;
                        const isOpen = openItems[key];
                        return (
                          <div
                            key={idx}
                            className="border border-white/[0.06] bg-carbon transition-all duration-300 hover:border-gold/20"
                          >
                            <button
                              onClick={() => toggleItem(cat.category, idx)}
                              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-300 hover:text-gold"
                            >
                              <span className="text-sm font-medium text-platinum transition-colors duration-300 group-hover:text-gold sm:text-base">
                                {item.q}
                              </span>
                              <ChevronDown
                                size={16}
                                className={`shrink-0 text-gold transition-transform duration-300 ${
                                  isOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            <div
                              className={`overflow-hidden transition-all duration-400 ease-lux ${
                                isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                              }`}
                            >
                              <p className="border-t border-white/[0.06] px-6 py-5 text-sm leading-relaxed text-platinum/60">
                                {item.a}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              {filteredData.length === 0 && (
                <p className="py-20 text-center text-platinum/50">
                  No questions match your search. Try different keywords.
                </p>
              )}
            </div>
          </div>

          {/* Still have questions */}
          <div className="mt-20 rounded-sm border border-gold/20 bg-gradient-to-br from-gold/5 to-transparent p-10 text-center">
            <h3 className="display text-2xl text-platinum">Still have questions?</h3>
            <p className="mt-3 text-sm text-platinum/55">
              We're here to help. Contact our team for personalized assistance.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button onClick={() => navigate("/contact")} className="btn-gold">
                Contact Us
              </button>
              <button onClick={() => navigate("/request-quote")} className="btn-ghost">
                Request a Quote
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}