/* ============================================================
   PRINTKING — Content & Copy
   Single source of truth for all site copy and data.
   Swap placeholder values (phone, email, address) freely.
   ============================================================ */

export const COMPANY = {
  name: "PRINTKING",
  tagline: "Pakistan's Premier Luxury Packaging Manufacturer",
  phone: "+92 300 000 0000",
  whatsapp: "923000000000", // digits only, used for wa.me links
  email: "info@printking.pk",
  address: "Industrial Estate, Korangi, Karachi, Pakistan",
  hours: "Mon – Sat · 9:00 AM – 6:00 PM PKT",
  social: {
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
  },
};

export const NAV_LINKS = [
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Machinery", to: "/machinery" },
  { label: "Sustainability", to: "/sustainability" },
  { label: "Contact", to: "/contact" },
];

export const HERO = {
  label: "PAKISTAN'S PREMIER PACKAGING MANUFACTURER",
  headline: ["Crafted for Brands", "That Refuse", "to Compromise."],
  subheadline:
    "From concept to delivery — we manufacture luxury packaging that elevates your brand at every touchpoint.",
  counters: [
    { value: 500, suffix: "+", label: "Premium Clients" },
    { value: 12, suffix: "+", label: "Years of Excellence" },
    { value: 50, suffix: "M+", label: "Boxes Produced" },
    { value: 98, suffix: "%", label: "Client Retention" },
  ],
};

export const TRUSTED = {
  headline: "The Brands That Trust Us",
  sub: "From regional startups to international luxury houses — our packaging is on shelves worldwide.",
  metrics: [
    "12 Industries Served",
    "30+ Countries Reached",
    "ISO-Certified Production",
    "24hr Prototyping",
  ],
  // Wordmark-style placeholder brands
  brands: [
    "MAISON", "AURÉLIE", "NOIR & CO", "LUMIÈRE", "ATELIER 9",
    "VERSO", "SOVEREIGN", "ÉCLAT", "MERIDIAN", "OBSCURA",
    "HALCYON", "REGENT", "MONOLITH", "SAVANT", "ELYSIAN", "VANTA",
  ],
};

export const ABOUT = {
  eyebrow: "OUR STORY",
  headline:
    "We don't print boxes. We manufacture the first impression your customer will ever have.",
  body: [
    "For over a decade, we have been the manufacturing backbone behind Pakistan's most recognized brands — and the quiet partner behind several international ones. Our facility combines German-engineered offset printing technology with artisan finishing techniques to produce packaging that commands premium shelf presence.",
    "We believe packaging is not a cost — it is your brand's most powerful silent salesperson.",
  ],
  cta: "Discover Our Story",
  images: [
    {
      src: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1200&auto=format&fit=crop",
      caption: "Precision Offset Press",
    },
    {
      src: "https://images.unsplash.com/photo-1610018556010-6a11691bc905?q=80&w=1200&auto=format&fit=crop",
      caption: "Hand-Finished Rigid Boxes",
    },
    {
      src: "https://images.unsplash.com/photo-1556742059-47b93231f536?q=80&w=1200&auto=format&fit=crop",
      caption: "Foil & Emboss Detailing",
    },
    {
      src: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=1200&auto=format&fit=crop",
      caption: "Climate-Controlled Facility",
    },
  ],
};

export const MANUFACTURING = {
  eyebrow: "PRODUCTION CAPABILITY",
  headline: "Industrial Scale. Artisan Precision.",
  sub: "Our facility is built for volume without sacrificing the detail that luxury demands.",
  cards: [
    { icon: "Printer", title: "Offset Printing", desc: "Up to 8-color Heidelberg presses" },
    { icon: "Scissors", title: "Die Cutting & Creasing", desc: "Precision to ±0.1mm tolerance" },
    { icon: "Sparkles", title: "Foiling & Embossing", desc: "Hot foil, cold foil, blind emboss" },
    { icon: "Square", title: "UV Spot & Coating", desc: "Matte, gloss, soft-touch, aqueous" },
    { icon: "Package", title: "Rigid Box Assembly", desc: "Hand-finished, fully automated lines" },
    { icon: "Factory", title: "Production Volume", desc: "5 million+ units monthly capacity" },
  ],
};

export const SERVICES = [
  { num: "01", title: "Luxury Rigid Boxes", desc: "The apex of packaging engineering. Telescopic, magnetic closure, clamshell — manufactured to jewellery-grade tolerances.", slug: "luxury-rigid-boxes" },
  { num: "02", title: "Folding Cartons", desc: "High-speed, high-fidelity cartons engineered for retail shelves and automated filling lines.", slug: "folding-cartons" },
  { num: "03", title: "Mailer Boxes", desc: "E-commerce unboxing moments — structurally robust, beautifully printed, courier-ready.", slug: "mailer-boxes" },
  { num: "04", title: "Paper Bags", desc: "Rope-handle, twisted-handle and luxury laminated bags with reinforced bases.", slug: "paper-bags" },
  { num: "05", title: "Commercial Printing", desc: "Sharp, color-accurate commercial print at any volume, on any premium stock.", slug: "commercial-printing" },
  { num: "06", title: "Corporate Branding", desc: "Cohesive brand collateral — from stationery systems to launch kits.", slug: "corporate-branding" },
  { num: "07", title: "Labels & Stickers", desc: "Pressure-sensitive, embossed, and specialty foil labels with archival adhesion.", slug: "labels-stickers" },
  { num: "08", title: "Retail Packaging", desc: "Shelf-ready packaging designed to win the three-second purchase decision.", slug: "retail-packaging" },
  { num: "09", title: "Product Packaging", desc: "Bespoke structural design tailored to the contours of your product.", slug: "product-packaging" },
  { num: "10", title: "Promotional Materials", desc: "Limited-edition kits, influencer mailers and event collateral that travels well.", slug: "promotional-materials" },
  { num: "11", title: "Hang Tags", desc: "Tactile, foiled, and string-finished tags that complete a garment's story.", slug: "hang-tags" },
  { num: "12", title: "Catalogs & Brochures", desc: "Perfect-bound and saddle-stitched editorial print with gallery-grade reproduction.", slug: "catalogs-brochures" },
  { num: "13", title: "Custom Print Solutions", desc: "If it can be imagined and engineered, we manufacture it — end to end.", slug: "custom-print-solutions" },
];

export const INDUSTRIES = [
  { name: "Fashion & Apparel", desc: "Hang tags, garment boxes & luxury retail bags." },
  { name: "Cosmetics & Beauty", desc: "Rigid boxes & inserts engineered for shelf glamour." },
  { name: "Electronics", desc: "Protective, premium-feel device packaging." },
  { name: "Food & Beverage", desc: "Food-safe cartons with vivid, appetite-led print." },
  { name: "Luxury Retail", desc: "Jewellery-grade boxes and presentation cases." },
  { name: "E-commerce", desc: "Branded mailers that turn delivery into theatre." },
  { name: "Healthcare", desc: "Compliant, tamper-evident pharma packaging." },
  { name: "Corporate", desc: "Onboarding kits, gifting suites & collateral." },
  { name: "Startups", desc: "Low-MOQ premium packaging that scales with you." },
];

export const PROCESS = [
  { num: "01", title: "Brief & Concept", desc: "We listen, interrogate the brief, and define success." },
  { num: "02", title: "Design & Dieline", desc: "Structural engineering and dieline development in-house." },
  { num: "03", title: "Digital Proof", desc: "Color-accurate digital proofs for sign-off." },
  { num: "04", title: "Prototype", desc: "A physical sample in your hands within 24 hours." },
  { num: "05", title: "Press Run", desc: "Calibrated offset production at scale." },
  { num: "06", title: "Finishing & QC", desc: "Foil, emboss, coat — then inspect every batch." },
  { num: "07", title: "Delivery", desc: "Palletized, documented, freight-coordinated worldwide." },
];

export const WHY_CHOOSE = [
  { num: "01", title: "Latest Technology", desc: "Heidelberg & KBA offset presses — the same machines used by Europe's finest printers." },
  { num: "02", title: "Premium Materials", desc: "FSC-certified boards, imported specialty papers, and archival-grade inks and coatings." },
  { num: "03", title: "Fast Turnaround", desc: "Standard 7–10 days. Rush 72-hour production available for qualified orders." },
  { num: "04", title: "International QC", desc: "ISO-compliant quality management. Every batch inspected before despatch. Zero-compromise policy." },
  { num: "05", title: "In-house Design", desc: "Structural engineers and graphic designers on staff — concept to dieline in 24 hours." },
  { num: "06", title: "Competitive Pricing", desc: "Enterprise-grade manufacturing without enterprise-grade overhead. Transparent quotation." },
  { num: "07", title: "Scalable Volume", desc: "Sample quantities to full production runs. Scale with your brand — no minimums penalized." },
  { num: "08", title: "Export Ready", desc: "Palletized, freight-forwarding coordinated, customs documentation provided." },
];

export const MACHINERY = {
  eyebrow: "OUR INFRASTRUCTURE",
  headline: "The Machines Behind the Craft",
  sub: "Our facility is a controlled environment — precision-calibrated, climate-regulated, and running at international production standards.",
  items: [
    { name: "Heidelberg Offset Press", spec: "Up to 8 colors · 18,000 sph", size: "large" },
    { name: "KBA Sheet-fed Press", spec: "Large format capability", size: "small" },
    { name: "Bobst Die Cutter", spec: "Precision ±0.1mm", size: "small" },
    { name: "Folding-Gluing Machine", spec: "300m/min production speed", size: "large" },
    { name: "Hot Foil Stamping", spec: "200°C precision foiling", size: "small" },
    { name: "Lamination Line", spec: "Matte / Gloss / Soft-touch", size: "small" },
    { name: "UV Coating System", spec: "Spot UV · full flood", size: "small" },
    { name: "Rigid Box Production Line", spec: "Semi-automated assembly", size: "small" },
  ],
};

export const SUSTAINABILITY = {
  eyebrow: "RESPONSIBLE MANUFACTURING",
  headline: "Premium does not have to cost the planet.",
  items: [
    { title: "FSC-Certified Materials", desc: "All boards sourced from responsibly managed forests. Certified chain of custody." },
    { title: "Soy-Based Inks", desc: "Zero petroleum-based pigments. Pure, vibrant, non-toxic color." },
    { title: "Waste Reduction Program", desc: "30% production waste recycled or repurposed annually." },
    { title: "Carbon-Offset Shipping", desc: "Freight emissions measured and offset on every export order." },
    { title: "Recyclable by Design", desc: "Mono-material structures engineered for kerbside recycling." },
    { title: "Water-based Coatings", desc: "Low-VOC aqueous coatings that protect product and planet." },
  ],
};

export const TESTIMONIALS = [
  {
    quote: "Their rigid boxes elevated our unboxing experience overnight. Our customers photograph the packaging — that's priceless marketing.",
    name: "Brand Director",
    title: "Luxury Cosmetics Label",
    company: "Dubai",
  },
  {
    quote: "We've worked with printers in China, Europe, and locally. These are the only ones who consistently deliver without compromise.",
    name: "Supply Chain Head",
    title: "Fashion House",
    company: "Karachi",
  },
  {
    quote: "Prototypes in 24 hours, production in 7 days, zero defects. That's the standard we needed and finally found.",
    name: "Founder",
    title: "Premium E-commerce Brand",
    company: "London",
  },
];

export const GLOBAL_REACH = {
  headline: "Manufactured in Pakistan. Delivered Worldwide.",
  sub: "Our packaging reaches shelves across 30+ countries — built to international standards, exported with full documentation.",
  // Approx positions on equirectangular map (x%, y%)
  regions: [
    { name: "Middle East", clients: 84, x: 60, y: 47 },
    { name: "United Kingdom", clients: 41, x: 47, y: 33 },
    { name: "Germany / EU", clients: 56, x: 51, y: 35 },
    { name: "North America", clients: 73, x: 23, y: 40 },
    { name: "Southeast Asia", clients: 38, x: 76, y: 55 },
  ],
  strip: [
    "Middle East", "United Kingdom", "Germany", "USA", "UAE",
    "Saudi Arabia", "Canada", "Australia", "Singapore", "France",
  ],
};

export const CONTACT = {
  eyebrow: "START YOUR PROJECT",
  headline: "Let's Build Something Exceptional Together",
  sub: "Tell us about your packaging need. We'll respond within 4 business hours with a detailed proposal.",
  productTypes: [
    "Rigid Box", "Folding Carton", "Mailer Box", "Paper Bag",
    "Labels", "Brochure", "Other",
  ],
};

export const FOOTER = {
  services: SERVICES.slice(0, 8).map((s) => s.title),
  company: ["About", "Portfolio", "Machinery", "Sustainability", "Blog", "Careers"],
  industries: INDUSTRIES.slice(0, 6).map((i) => i.name),
  certifications: ["ISO 9001", "FSC", "G7 Master"],
};

// Portfolio projects (used on Portfolio page)
export const PORTFOLIO = [
  { title: "Aurélie Skincare", industry: "Cosmetics & Beauty", product: "Rigid Box", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop" },
  { title: "Noir & Co Fragrance", industry: "Luxury Retail", product: "Rigid Box", img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1200&auto=format&fit=crop" },
  { title: "Meridian Coffee", industry: "Food & Beverage", product: "Folding Carton", img: "https://images.unsplash.com/photo-1606937295547-bc0f668595a3?q=80&w=1200&auto=format&fit=crop" },
  { title: "Verso Apparel", industry: "Fashion & Apparel", product: "Hang Tags", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop" },
  { title: "Halcyon Tech", industry: "Electronics", product: "Product Packaging", img: "https://images.unsplash.com/photo-1593344484962-796055d4a3a4?q=80&w=1200&auto=format&fit=crop" },
  { title: "Elysian Beauty", industry: "Cosmetics & Beauty", product: "Mailer Box", img: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=1200&auto=format&fit=crop" },
  { title: "Regent Spirits", industry: "Food & Beverage", product: "Rigid Box", img: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?q=80&w=1200&auto=format&fit=crop" },
  { title: "Sovereign Jewels", industry: "Luxury Retail", product: "Rigid Box", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop" },
  { title: "Vanta Commerce", industry: "E-commerce", product: "Mailer Box", img: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=1200&auto=format&fit=crop" },
];

export const PORTFOLIO_FILTERS = {
  industries: ["All", ...Array.from(new Set(PORTFOLIO.map((p) => p.industry)))],
  products: ["All", ...Array.from(new Set(PORTFOLIO.map((p) => p.product)))],
};
