/* ============================================================
   PRINTKING — Content & Copy (single source of truth)
   Real company profile data. Swap any value freely; the whole
   site reads from this file.
   ============================================================ */

export const COMPANY = {
  name: "PrintKing",
  legalName: "PrintKing (SMC-Private) Limited",
  tagline: "Passion · Quality · Innovation",
  founded: "2009",
  phone: "+92 42 37150138-40",
  phoneTel: "+924237150138",
  whatsapp: "924237150138", // edit to a WhatsApp-enabled mobile number
  email: "sales@printking.com.pk",
  website: "www.printking.com.pk",
  address: "Industrial Area Manzoor Park, Sagghian Flyover, Opp. Coke Warehouse, Lahore, Pakistan",
  hours: "Mon – Sat · 24-Hour Client Service",
  social: {
    linkedin: "#",
    instagram: "https://instagram.com/PrintKing_Pakistan",
    facebook: "https://facebook.com/Printking.Pakistan",
    youtube: "#",
  },
};

export const CEO = {
  name: "Muhammad Shafiq Chaudhary",
  title: "Chief Executive Officer",
  quote:
    "A company doesn't grow by standing still. It endures by reinventing itself — always striving to satisfy its customer. That is the story of PrintKing.",
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
  label: "PAKISTAN'S PREMIER PRINTING & PACKAGING HOUSE",
  headline: ["Crafted for Brands", "That Refuse", "to Compromise."],
  subheadline:
    "From concept to delivery — we manufacture luxury packaging and world-class print that elevates your brand at every touchpoint.",
  counters: [
    { value: 15, suffix: "+", label: "Years of Craft" },
    { value: 8, suffix: "", label: "Heidelberg Presses" },
    { value: 60, suffix: "+", label: "Craft Specialists" },
    { value: 12000, suffix: "", label: "m² Facility" },
  ],
};

export const TRUSTED = {
  headline: "The Brands That Choose Us",
  sub: "From regional fashion houses to international luxury names — our print and packaging is on shelves nationwide and beyond.",
  metrics: [
    "15 Years of Excellence",
    "8 Heidelberg Presses",
    "ISO 9001:2015 Certified",
    "24-Hour Client Service",
  ],
  // Real client roster
  brands: [
    "Bareezé", "Firdous", "Baroque", "Warda", "IZNiK", "Zaha", "Imrozia",
    "Taana Baana", "Polo Ralph Lauren", "Armani", "ChenOne", "RajBari",
    "Sefam", "Élan", "Phulkari", "Nestlé", "Pepsi", "Haleeb Foods",
    "Tetra Pak", "Daewoo", "Al-Fatah", "Kansai Paint", "Telenor",
    "DWP Group", "British High Commission", "Govt. of Punjab",
  ],
};

export const MEDIA_PARTNERS = ["Heidelberg", "Kodak", "Apple", "Xerox", "Bobst", "Techkon"];

export const ABOUT = {
  eyebrow: "OUR STORY",
  headline:
    "We don't print boxes. We manufacture the first impression your customer will ever have.",
  body: [
    "PrintKing is a state-of-the-art, full-service offset printing house with 15 years of experience serving fashion houses, corporates, and institutions across Pakistan. From humble beginnings we have grown to a 12,000 m² facility running eight German-engineered Heidelberg presses.",
    "We guide every client through a professional, hands-on approach — from cost-effective solutions to world-class luxury packaging — always with innovation built in. Packaging is not a cost; it is your brand's most powerful silent salesperson.",
  ],
  cta: "Discover Our Story",
  images: [
    { src: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1200&auto=format&fit=crop", caption: "Heidelberg Offset Press" },
    { src: "https://images.unsplash.com/photo-1610018556010-6a11691bc905?q=80&w=1200&auto=format&fit=crop", caption: "Luxury Rigid Boxes" },
    { src: "https://images.unsplash.com/photo-1556742059-47b93231f536?q=80&w=1200&auto=format&fit=crop", caption: "Foil & Emboss Detailing" },
    { src: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=1200&auto=format&fit=crop", caption: "Climate-Controlled Facility" },
  ],
  vision: "Reliable Perfection — the finest solutions, on time, every time.",
  mission: "To create products that wow every customer with delight.",
  coreValues: [
    "We are trustworthy",
    "We constantly upgrade",
    "We consistently deliver",
    "We succeed together",
  ],
};

export const MANUFACTURING = {
  eyebrow: "PRODUCTION CAPABILITY",
  headline: "Industrial Scale. Artisan Precision.",
  sub: "Concept, design, pre-press, press and finishing — every stage under one roof, built for volume without sacrificing detail.",
  cards: [
    { icon: "Sparkles", title: "Concept & Design", desc: "Corporate identity, lookbooks, dielines & packaging design in-house." },
    { icon: "Square", title: "Pre-Press / CTP", desc: "In-house Kodak Trendsetter Computer-to-Plate precision." },
    { icon: "Printer", title: "Offset Press", desc: "Eight Heidelberg presses printing millions of sheets." },
    { icon: "Scissors", title: "Post-Press", desc: "Folding, die-cutting, lamination, foiling & binding." },
    { icon: "Package", title: "Rigid Box Assembly", desc: "Hand-finished luxury rigid boxes & paper bags." },
    { icon: "Factory", title: "Quality Control", desc: "100% inspection · FOGRA & ISO 9001:2015 standards." },
  ],
};

export const SERVICES = [
  { num: "01", title: "Luxury Rigid Boxes", desc: "Magnetic, telescopic & clamshell rigid boxes for perfumes, watches, jewellery and couture — jewellery-grade tolerances.", slug: "luxury-rigid-boxes" },
  { num: "02", title: "Folding Cartons", desc: "Reverse-tuck, straight-tuck and gable cartons — food-safe and retail-ready.", slug: "folding-cartons" },
  { num: "03", title: "Mailer Boxes", desc: "E-commerce mailers from kraft to fully coated, engineered for the unboxing moment.", slug: "mailer-boxes" },
  { num: "04", title: "Luxury Paper Bags", desc: "300gsm board bags with twisted-rope, ribbon and euro handles — fully recyclable.", slug: "paper-bags" },
  { num: "05", title: "Food & Personal-Care Packaging", desc: "Food-safe and personal-care packaging with metallized films, UV and matt finishes.", slug: "food-cosmetic-packaging" },
  { num: "06", title: "Labels & Stickers", desc: "BOPP, kraft, foil and die-cut labels — roll or sheet, on demand.", slug: "labels-stickers" },
  { num: "07", title: "Hang Tags & Danglers", desc: "Foiled, embossed and string-finished tags for apparel and textile brands.", slug: "hang-tags" },
  { num: "08", title: "Catalogues & Lookbooks", desc: "Saddle-stitched and perfect-bound fashion lookbooks and magalogues.", slug: "catalogues-lookbooks" },
  { num: "09", title: "Annual Reports", desc: "Editorial annual reports that tell your brand's story and reinforce trust.", slug: "annual-reports" },
  { num: "10", title: "Home Textile Packaging", desc: "Insert cards and packaging for bedding, duvet and home textile ranges.", slug: "home-textile" },
  { num: "11", title: "Corporate Creatives", desc: "Calendars, diaries and New Year packs crafted to last the whole year.", slug: "corporate-creatives" },
  { num: "12", title: "Real Estate Collateral", desc: "Brochures, magazines and marketing print for property launches.", slug: "real-estate" },
  { num: "13", title: "Commercial & Security Print", desc: "Offset, digital and specialty security printing at scale.", slug: "commercial-printing" },
];

export const INDUSTRIES = [
  { name: "Fashion & Apparel", desc: "Lookbooks, hang tags, garment boxes & luxury bags." },
  { name: "Home Textile", desc: "Insert cards & packaging for bedding & home ranges." },
  { name: "Food & Beverage", desc: "Food-safe cartons & boxes with vivid print." },
  { name: "Personal Care", desc: "Premium packaging engineered for shelf glamour." },
  { name: "Real Estate", desc: "Brochures, magazines & launch collateral." },
  { name: "Corporate & Banking", desc: "Annual reports, profiles & gifting suites." },
  { name: "Education", desc: "Prospectuses, literature & institutional print." },
  { name: "Retail", desc: "Shelf-ready, planogram-optimised packaging." },
  { name: "Startups & SMEs", desc: "Low-MOQ premium packaging that scales with you." },
];

export const PROCESS = [
  { num: "01", title: "Brief & Concept", desc: "We listen, interrogate the brief, and define success." },
  { num: "02", title: "Design & Dieline", desc: "Structural engineering and dieline development in-house." },
  { num: "03", title: "Pre-Press / CTP", desc: "Computer-to-Plate on our Kodak Trendsetter system." },
  { num: "04", title: "Press Run", desc: "Calibrated Heidelberg offset production at scale." },
  { num: "05", title: "Post-Press", desc: "Folding, die-cut, foil, emboss, lamination & binding." },
  { num: "06", title: "Quality Control", desc: "100% inspection to FOGRA & ISO 9001:2015 standards." },
  { num: "07", title: "Delivery", desc: "Finished work delivered to your doorstep, on time." },
];

export const WHY_CHOOSE = [
  { num: "01", title: "Passionate Specialists", desc: "60+ designers, engineers and press operators obsessed with craft." },
  { num: "02", title: "Latest Machinery", desc: "Eight German Heidelberg presses plus in-house Kodak CTP." },
  { num: "03", title: "24-Hour Service", desc: "Round-the-clock client servicing and merchandising team." },
  { num: "04", title: "Doorstep Delivery", desc: "We deliver finished work to your door — on time, every time." },
  { num: "05", title: "FOGRA & ISO Quality", desc: "FOGRA standards and ISO 9001:2015 quality management." },
  { num: "06", title: "Competitive Pricing", desc: "World-class output without enterprise-grade overhead." },
  { num: "07", title: "One-Stop Shop", desc: "Concept, design, pre-press, press and finishing under one roof." },
  { num: "08", title: "In-house CTP", desc: "Kodak Trendsetter IV 800 Computer-to-Plate for precision and speed." },
];

export const MACHINERY = {
  eyebrow: "OUR INFRASTRUCTURE",
  headline: "The Machines Behind the Craft",
  sub: "Eight state-of-the-art Heidelberg presses in a custom-designed, temperature and humidity controlled facility — running six days a week.",
  items: [
    { name: "Heidelberg Speedmaster SM 74-L", spec: "6-Color · UV Coater", size: "large" },
    { name: "Heidelberg CD 102-LX", spec: "5-Color + Coater", size: "small" },
    { name: "Heidelberg SM 102", spec: "5-Color + Coater", size: "small" },
    { name: "Kodak Trendsetter IV 800", spec: "Computer-to-Plate (CTP)", size: "large" },
    { name: "Heidelberg Stahlfolder", spec: "High-speed folding-gluing", size: "small" },
    { name: "Polar 92 EMC", spec: "Programmatic guillotine cutter", size: "small" },
    { name: "Heidelberg Cylinder Die Cutter", spec: "22×32 precision die-cutting", size: "small" },
    { name: "Hot Foil Stamping Machine", spec: "Metallic foil + emboss", size: "small" },
  ],
};

export const VIDEO = {
  eyebrow: "INSIDE OUR PRODUCTION",
  headline: "The Machine Behind Every Perfect Box.",
  sub: "Step inside a facility where German engineering meets Pakistani craftsmanship — where 18,000 sheets per hour become someone's most memorable unboxing moment.",
  stats: [
    { label: "18,000 sheets/hr", pos: "top-left" },
    { label: "ISO 9001:2015", pos: "top-right" },
    { label: "8-Color Precision", pos: "bottom-left" },
    { label: "Zero-Defect QC", pos: "bottom-right" },
  ],
  capabilities: [
    { title: "Modern Machinery", desc: "Heidelberg & KBA offset presses running at peak efficiency." },
    { title: "Quality Control", desc: "100% inspection before every despatch. Zero compromise." },
    { title: "Manufacturing Scale", desc: "Millions of sheets across all product lines monthly." },
    { title: "Precision Standards", desc: "±0.1mm tolerance across all finishing processes." },
  ],
};

export const TEAM = {
  eyebrow: "THE PEOPLE BEHIND PRECISION",
  headline: "Leadership Built on Decades of Craft.",
  sub: "Every box we manufacture carries the conviction of a leadership team that has spent decades mastering the intersection of technology, materials and human craftsmanship.",
  members: [
    { role: "Chief Executive Officer", name: "Muhammad Shafiq Chaudhary", initials: "MS", quote: "A company endures by reinventing itself — always striving to satisfy its customer.", linkedin: "#" },
    { role: "Managing & Marketing Director", name: "Naveed Ehsan", initials: "NE", quote: "Welcome to PrintKing — welcome to the world of great results.", linkedin: "#" },
    { role: "Director Operations", name: "Waqas Shafiq", initials: "WS", quote: "Smooth, hassle-free operations — every job delivered on quality, on time.", linkedin: "#" },
    { role: "Director Finance", name: "Sohail Anjum", initials: "SA", quote: "Disciplined financial stewardship is the quiet backbone of reliable delivery.", linkedin: "#" },
    { role: "Art Director", name: "Alweena Tasneem", initials: "AT", quote: "We don't wait for inspiration — we chase it to bring your imagination to paper.", linkedin: "#" },
    { role: "Planning & Development", name: "Hamza Shafiq", initials: "HS", quote: "An engineer's precision with a creative's mindset — every print planned to perfection.", linkedin: "#" },
  ],
};

export const SUSTAINABILITY = {
  eyebrow: "RESPONSIBLE MANUFACTURING",
  headline: "Premium does not have to cost the planet.",
  items: [
    { title: "100% Recyclable Materials", desc: "Our paper bags and boards are 100% recyclable unless a client specifies otherwise." },
    { title: "Biodegradable Paperboard", desc: "Food packaging built on biodegradable paperboard — appealing, fresh and safe." },
    { title: "Responsible Sourcing", desc: "Art paper, ivory board, kraft and specialty papers from trusted mills." },
    { title: "Soy & Eco Inks", desc: "Low-VOC inks and aqueous coatings that protect product and planet." },
    { title: "Waste Reduction", desc: "Production waste recycled or repurposed across our facility." },
    { title: "Recyclable by Design", desc: "Mono-material structures engineered for kerbside recycling." },
  ],
};

export const TESTIMONIALS = [
  { quote: "Their rigid boxes turned our seasonal launch into an event — our retail shelves have never looked more premium.", name: "Brand Head", title: "Fashion House", company: "Lahore" },
  { quote: "Lookbooks and hang tags delivered with flawless colour consistency, season after season.", name: "Creative Lead", title: "Textile Brand", company: "Karachi" },
  { quote: "Prototypes in 24 hours, doorstep delivery, zero defects. Exactly the partner our brand needed.", name: "Founder", title: "Premium Retail Brand", company: "Islamabad" },
];

export const GLOBAL_REACH = {
  headline: "Made in Lahore. Trusted Nationwide & Beyond.",
  sub: "Our print and packaging reaches brands across Pakistan and select international markets — built to international standards.",
  regions: [
    { name: "Pakistan", clients: 240, x: 67, y: 49 },
    { name: "Middle East", clients: 38, x: 60, y: 47 },
    { name: "United Kingdom", clients: 14, x: 47, y: 33 },
    { name: "Europe", clients: 11, x: 51, y: 35 },
    { name: "North America", clients: 9, x: 23, y: 40 },
  ],
  strip: [
    "Pakistan", "United Arab Emirates", "Saudi Arabia", "United Kingdom",
    "Germany", "USA", "Canada", "Australia",
  ],
};

export const CONTACT = {
  eyebrow: "START YOUR PROJECT",
  headline: "Let's Build Something Exceptional Together",
  sub: "Tell us about your printing or packaging need. We'll respond within 4 business hours with a detailed proposal.",
  productTypes: [
    "Luxury Rigid Box", "Folding Carton", "Mailer Box", "Paper Bag",
    "Labels & Stickers", "Hang Tags", "Catalogue / Lookbook", "Annual Report", "Other",
  ],
};

export const FOOTER = {
  services: SERVICES.slice(0, 8).map((s) => s.title),
  company: ["About", "Portfolio", "Machinery", "Sustainability", "Blog", "Careers"],
  industries: INDUSTRIES.slice(0, 6).map((i) => i.name),
  certifications: ["ISO 9001:2015", "FOGRA", "FSC"],
};

// Packaging-correct portfolio (real clients, real product types)
const IMG = {
  rigid: "https://images.unsplash.com/photo-1610018556010-6a11691bc905?q=80&w=1200&auto=format&fit=crop",
  box: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=1200&auto=format&fit=crop",
  foil: "https://images.unsplash.com/photo-1556742059-47b93231f536?q=80&w=1200&auto=format&fit=crop",
  press: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1200&auto=format&fit=crop",
};

export const PORTFOLIO = [
  { title: "Bareezé Couture Lookbook", industry: "Fashion & Apparel", product: "Catalogue / Lookbook", img: IMG.press },
  { title: "Warda Signature Rigid Box", industry: "Fashion & Apparel", product: "Luxury Rigid Box", img: IMG.box },
  { title: "ChenOne Retail Paper Bag", industry: "Retail", product: "Paper Bag", img: IMG.foil },
  { title: "Nestlé Folding Carton", industry: "Food & Beverage", product: "Folding Carton", img: IMG.box },
  { title: "RajBari Hang Tags", industry: "Fashion & Apparel", product: "Hang Tags", img: IMG.foil },
  { title: "Élan Luxury Box", industry: "Fashion & Apparel", product: "Luxury Rigid Box", img: IMG.rigid },
  { title: "Royal Palm Annual Report", industry: "Corporate & Banking", product: "Annual Report", img: IMG.press },
  { title: "Telenor Corporate Diary", industry: "Corporate & Banking", product: "Corporate Creative", img: IMG.box },
  { title: "Firdous Home Textile Cards", industry: "Home Textile", product: "Home Textile Packaging", img: IMG.foil },
];

export const PORTFOLIO_FILTERS = {
  industries: ["All", ...Array.from(new Set(PORTFOLIO.map((p) => p.industry)))],
  products: ["All", ...Array.from(new Set(PORTFOLIO.map((p) => p.product)))],
};
