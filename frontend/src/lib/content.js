/* ============================================================
   PRINTKING — Content & Copy (single source of truth)
   ============================================================ */

export const COMPANY = {
  name: "PrintKing",
  legalName: "PrintKing (SMC-Private) Limited",
  tagline: "Passion · Quality · Innovation",
  founded: "2009",
  phone: "+92 42 37150138-40",
  phoneTel: "+924237150138",
  whatsapp: "923224839646", // edit to a WhatsApp-enabled mobile number
  email: "sales.printking@gmail.com",
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

export const NAV_LINKS = [
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Blog", to: "/blog" },
  { label: "Machinery", to: "/machinery" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

export const HERO = {
  label: "PAKISTAN'S PREMIER PRINTING & PACKAGING HOUSE",
  headline: "Premium Printing That Elevates Your Brand.",
  subheadline:
    "From offset printing to luxury rigid boxes — we deliver world-class printing solutions with Heidelberg precision and artisan craftsmanship.",
  stats: [
    { value: "15+", label: "Years Experience" },
    { value: "8", label: "Heidelberg Presses" },
    { value: "60+", label: "Print Specialists" },
    { value: "12,000", label: "m² Print Facility" },
  ],
};

export const TRUSTED = {
  headline: "Trusted By Leading Brands",
  sub: "From fashion houses to FMCG giants — our printing and packaging solutions power brands across Pakistan and beyond.",
  metrics: [
    "15 Years of Printing Excellence",
    "8 Heidelberg Offset Presses",
    "ISO 9001:2015 Certified",
    "24-Hour Print Production",
  ],
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
    "We don't just print. We create the first impression that defines your brand.",
  body: [
    "PrintKing is Pakistan's leading offset printing and packaging house with 15 years of experience delivering world-class print solutions. From high-volume commercial printing to luxury packaging, we combine German engineering with artisan craftsmanship.",
    "Operating from a 12,000 m² state-of-the-art facility with eight Heidelberg presses, we serve fashion brands, corporates, FMCG companies, and institutions nationwide. Every project receives our signature attention to detail — from concept and design to press and finishing.",
  ],
  cta: "Discover Our Story",
  images: [
    { src: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1200&auto=format&fit=crop", caption: "Heidelberg Offset Press" },
    { src: "https://images.unsplash.com/photo-1610018556010-6a11691bc905?q=80&w=1200&auto=format&fit=crop", caption: "Luxury Packaging Production" },
    { src: "https://images.unsplash.com/photo-1556742059-47b93231f536?q=80&w=1200&auto=format&fit=crop", caption: "Foil Stamping & Embossing" },
    { src: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=1200&auto=format&fit=crop", caption: "Climate-Controlled Print Floor" },
  ],
  vision: "Printing Excellence — delivering world-class quality, on time, every time.",
  mission: "To be Pakistan's most trusted printing partner through innovation, precision, and service.",
  coreValues: [
    "Quality without compromise",
    "Continuous innovation",
    "Deadline commitment",
    "Client partnership",
  ],
};

/* ---- Leadership ---- */
export const LEADERSHIP = {
  eyebrow: "OUR LEADERSHIP",
  headline: ["People Behind", "Precision."],
  sub: "Every sheet printed, every box folded, every deadline met — is a reflection of the people who lead this company.",
  ceo: {
    eyebrow: "CEO'S MESSAGE",
    headline: "The way we work has never been about standing still.",
    paragraphs: [
      "A company doesn't grow by standing still. It endures by reinventing and diversifying — always striving to satisfy its customer. That conviction has shaped PrintKing from the very first sheet.",
      "With over fifteen years in commercial printing, we have built a reputation for outstanding quality and customer satisfaction — the result of a long-term dedication to brilliance.",
      "We offer best-in-class pre-press, press and post-press services using state-of-the-art technology, supported by a comprehensive quality control and verification system across every workflow.",
      "I personally invite you to come forward and experience the difference — and let us help you make a lasting impression in your marketplace.",
    ],
    signature: "Muhammad Shafiq Chaudhry",
    name: "Muhammad Shafiq Chaudhry",
    title: "Chief Executive Officer",
    /* Portrait path once a real photo exists, e.g. "/assets/ceo.jpg".
       Left empty until then so the card shows the initials placeholder
       instead of an unrelated machine photo. */
    img: "/assets/ceo.jpeg",
  },
  md: {
    eyebrow: "MANAGING DIRECTOR",
    headline: "A success story, fifteen years in the making.",
    paragraphs: [
      "PrintKing is a success story — a meritorious fifteen-year history built on an unorthodox way of doing things and a determination to keep improving.",
      "We have grown from humble beginnings to a 12,000 sq. metre facility running eight state-of-the-art Heidelberg presses from Germany.",
      "Our team of sixty — graphic designers, mechanical engineers, communication specialists, production managers and a 24-hour client services desk — works across Corporate, Commercial Printing and Packaging.",
      "Three disciplines, one unwavering vision. Welcome to PrintKing — welcome to the world of great results.",
    ],
    signature: "Naveed Ehsan",
    signoff: "Ready On Press!!!",
    name: "Naveed Ehsan",
    title: "Managing & Marketing Director",
    img: "/assets/md.jpeg",
  },
  heads: [
    { name: "Waqas Shafiq", role: "Director Operations", initials: "WS", desc: "Takes care of operational detailing, supply-chain and execution of all production efforts. Ensures smooth, hassle-free operations — every job delivered to agreed quality, time-frame, and doorstep delivery." },
    { name: "Sohail Anjum", role: "Director Finance", initials: "SA", desc: "Holds the portfolio of accounts, financial management, customer receivables, accounts payable, annual financial planning, administration and tax matters of the company." },
    { name: "Alveena Tasneem", role: "Art Director", initials: "AT", desc: "Courageous in taking on challenges to make customers' imaginary world real on paper. She does not wait for inspiration — she goes after it to make it possible for our customers." },
    { name: "Hamza Shafiq", role: "Planning Manager", initials: "HS", desc: "Acts as Planning & Development Manager. With an engineering background and a creative mindset, he plans current and future printing and packaging needs, coordinating all operations for client benefit." },
    { name: "Shahmeer Shafiq", role: "Manager Administration", initials: "SS", desc: "Believes the value decade demands top-quality products at the world's lowest price. The best way to hold customers is to constantly find ways to give them more for less." },
  ],
};

export const MANUFACTURING = {
  eyebrow: "PRODUCTION CAPABILITY",
  headline: "Industrial Scale. Printing Precision.",
  sub: "Complete in-house printing solutions — from pre-press and offset printing to finishing and packaging assembly under one roof.",
  cards: [
    { icon: "Sparkles", title: "Design & Pre-Press", desc: "In-house design studio and Kodak CTP for plate-ready artwork." },
    { icon: "Square", title: "Computer-to-Plate", desc: "Kodak Trendsetter CTP system for precision plate imaging." },
    { icon: "Printer", title: "Offset Printing", desc: "Eight Heidelberg presses delivering millions of impressions monthly." },
    { icon: "Scissors", title: "Finishing", desc: "Die-cutting, lamination, UV coating, foil stamping & embossing." },
    { icon: "Package", title: "Packaging Assembly", desc: "Rigid box making, paper bag production & finishing." },
    { icon: "Factory", title: "Quality Control", desc: "ISO 9001:2015 certified with 100% inspection protocols." },
  ],
};

export const SERVICES = [
  { num: "01", title: "Luxury Rigid Boxes", icon: "Package", size: "large", desc: "Magnetic closure, telescope lid, clamshell. The apex of packaging engineering, manufactured to jewellery-grade tolerances.", detail: "Finishes: soft-touch, gold foil, emboss, spot UV.", slug: "luxury-rigid-boxes" },
  { num: "02", title: "Offset Printing", icon: "Printer", size: "large", desc: "8-color Heidelberg precision. Up to 18,000 sheets per hour on German-engineered presses.", detail: "CMYK & Pantone matched. Up to 720×1020mm.", slug: "offset-printing" },
  { num: "03", title: "Custom Packaging", icon: "Box", size: "large", desc: "Every dimension, every material, every finish. Fully bespoke from structural design to delivery.", detail: "In-house dieline engineering & prototyping.", slug: "custom-packaging" },
  { num: "04", title: "Folding Cartons", icon: "Boxes", desc: "Reverse tuck, straight tuck, gable top, auto-bottom. High-speed production, premium results.", slug: "folding-cartons" },
  { num: "05", title: "Mailer Boxes", icon: "PackageOpen", desc: "E-commerce and DTC packaging. Kraft to coated, plain to full bleed. Built for unboxing moments.", slug: "mailer-boxes" },
  { num: "06", title: "Paper Bags", icon: "ShoppingBag", desc: "Twisted rope, flat ribbon, euro handle. Retail, gifting, and luxury carry bags.", slug: "paper-bags" },
  { num: "07", title: "Labels & Stickers", icon: "Tag", desc: "BOPP, kraft, foil, clear. Die-cut, roll, and sheet format. Any shape, any size.", slug: "labels-stickers" },
  { num: "08", title: "Hang Tags", icon: "Tags", desc: "Garment, retail, and product tags. Premium board, full-colour both sides, eyelet punched.", slug: "hang-tags" },
  { num: "09", title: "Catalogs & Brochures", icon: "BookOpen", desc: "Saddle stitch, perfect bound, gatefold. Printed to make brands look world-class.", slug: "catalogs-brochures" },
  { num: "10", title: "Corporate Branding", icon: "Briefcase", desc: "Letterheads, business cards, folders, envelopes. Complete corporate identity print.", slug: "corporate-branding" },
  { num: "11", title: "Commercial Printing", icon: "Newspaper", desc: "High-volume runs for any commercial requirement. Fast turnaround, consistent quality.", slug: "commercial-printing" },
  { num: "12", title: "Promotional Materials", icon: "Megaphone", desc: "Flyers, posters, banners, inserts. Campaign-ready print at production scale.", slug: "promotional-materials" },
  { num: "13", title: "UV & Finishing", icon: "Sparkles", desc: "Spot UV, matte lamination, gloss, soft-touch, hot foil, emboss, deboss. The details that make packaging premium.", slug: "uv-finishing" },
];

/* ============================================================
   PRODUCTS — single source of truth for /products and /products/:slug
   Each product carries: `image` (product photo — light/white art),
   an overview description, a label/value feature sheet and a
   `banner` used as the social/OG image.
   ============================================================ */

/* Trade terms shared by every product — keeps the feature sheet consistent */
const tradeTerms = (
  moq,
  delivery = "Based on the complexity of the project. Premium plans are available for high-priority deliveries."
) => [
  { label: "Sample", value: "Digital or offset sample proofing is possible. Contact us for sampling charges." },
  { label: "MOQ", value: moq },
  { label: "Certification", value: "ISO 9001:2015 certified manufacturing." },
  { label: "Delivery time", value: delivery },
  { label: "QC", value: "100% inspection before delivery." },
  { label: "Price", value: "Competitive prices offered — request a quotation for your specification." },
  { label: "Payment terms", value: "Bank transfer (T/T), Letter of Credit (LC) and PayPal." },
];

const RIGID_MOQ = "500 pieces for rigid boxes. Monocartons: 50,000 boxes. Contact us to know more.";

export const PRODUCTS = [
  {
    num: "01",
    slug: "luxury-rigid-boxes",
    title: "Luxury Rigid Boxes",
    category: "Luxury Packaging",
    tagline: "The apex of packaging engineering, manufactured to jewellery-grade tolerances.",
    short:
      "Magnetic closure, telescope lid and clamshell builds — the premium box your product deserves to arrive in.",
    banner: "/assets/banners/rigidbanner.jpg",
    image: "/assets/services/luxuryRigid.jpg",
    highlights: ["Magnetic & clamshell", "Telescope lids", "Soft-touch & foil", "Hand-wrapped corners"],
    description: [
      "A rigid box is the first physical moment your customer experiences your brand. We build each one from a grey-board core wrapped in your chosen substrate — assembled, corner-folded and finished by hand so the lid closes with the weight and precision of a luxury object.",
      "Magnetic closure, telescope lid, clamshell, drawer and book-style structures are all engineered in-house, with inserts die-cut to hold your product without movement in transit. Every box is inspected before it leaves the plant.",
    ],
    features: [
      { label: "Size", value: "Built to your product dimensions — from small jewellery boxes to large presentation cases." },
      { label: "Structure", value: "Magnetic flap, telescope lid, clamshell, drawer/sleeve, book-style and two-piece builds." },
      { label: "Board", value: "1200–1600gsm grey-board core wrapped in art paper, specialty paper, leatherette or fabric." },
      { label: "Surface disposal", value: "Matt/gloss lamination, soft-touch, protective varnish, spot UV and gold/silver hot stamping." },
      { label: "Lamination", value: "Matt, glossy, velvet/silk, holographic and thermal options." },
      { label: "Finishing", value: "Embossing & debossing, hot foil stamping, screen printing, laser cutting and edge painting." },
      { label: "Insert", value: "EVA foam, moulded pulp, velvet-lined or die-cut board inserts." },
      { label: "Ribbon & handle", value: "Satin ribbon pulls, cotton rope, PP and jute handles available." },
      { label: "Design", value: "In-house structural engineering and dieline development; OEM and bespoke design welcome." },
      { label: "Logo", value: "Send your artwork — we handle sampling and mass production to your logo specification." },
      ...tradeTerms(RIGID_MOQ),
    ],
  },
  {
    num: "02",
    slug: "custom-packaging",
    title: "Custom Packaging",
    category: "Luxury Packaging",
    tagline: "Every dimension, every material, every finish — engineered around your product.",
    short:
      "Fully bespoke packaging: structural design, prototyping and production under one roof, from first dieline to delivered pallet.",
    banner: "/assets/banners/mainbanner.jpg",
    image: "/assets/services/custompackaging.jpg",
    highlights: ["Dieline engineering", "Rapid prototyping", "Any material", "Any finish"],
    description: [
      "Some products simply do not fit a catalogue. Our packaging engineers start from the physical object — its weight, fragility, shelf presence and shipping route — and design a structure that solves for all of it before a single sheet is printed.",
      "You receive a dieline, a digital proof and a physical prototype at full specification. Only once you approve the sample does production begin on our Heidelberg lines, followed by finishing, QC and packing.",
    ],
    features: [
      { label: "Size", value: "Any dimension, calculated from your product's actual measurements and tolerance." },
      { label: "Structure", value: "Rigid, folding carton, mailer, sleeve, tray, insert or multi-piece assembly." },
      { label: "Material", value: "Rigid board, C2S art paper, ivory board, kraft, corrugated and imported specialty papers." },
      { label: "Prototyping", value: "CAD dieline, white sample and full-colour prototype before mass production." },
      { label: "Design", value: "In-house structural design team — OEM and fully customised design welcome." },
      { label: "Surface disposal", value: "Lamination, varnish, UV coating, foil stamping, emboss/deboss and screen printing." },
      { label: "Product purpose", value: "Retail, gifting, e-commerce, advertising, promotion and institutional packaging." },
      ...tradeTerms("Project dependent — no minimum order restriction on most custom formats."),
    ],
  },
  {
    num: "03",
    slug: "folding-cartons",
    title: "Folding Cartons",
    category: "Boxes & Cartons",
    tagline: "Reverse tuck, straight tuck, gable top, auto-bottom — high-speed production, premium results.",
    short:
      "Precision die-cut cartons for retail shelves and automated filling lines, printed and glued at high volume.",
    banner: "/assets/banners/banner3.jpg",
    image: "/assets/services/foldingcartons.jpg",
    highlights: ["Auto-bottom & tuck-end", "Food-safe inks", "High-speed gluing", "Retail-ready dielines"],
    description: [
      "Folding cartons are the workhorse of retail packaging, and they are where our offset quality shows most clearly. Every dieline is engineered for your filling line — board grade, grain direction and glue flap width all calculated so the carton runs without jamming.",
      "From 350gsm FSC-certified board to metallised and recycled substrates, we print, cut, crease and glue in-house on Heidelberg presses, with colour monitored across the whole run.",
    ],
    features: [
      { label: "Size", value: "Custom dimensions engineered to your product and filling-line tolerance." },
      { label: "Structure", value: "Reverse tuck, straight tuck, auto-bottom, gable top, tray and sleeve formats." },
      { label: "Material", value: "350–450gsm FSC-certified board, ivory board, recycled and metallised substrates." },
      { label: "Printing", value: "8-colour Heidelberg offset with CMYK and Pantone matching, plus food-safe ink options." },
      { label: "Surface disposal", value: "Aqueous coating, matt/gloss lamination, spot UV and hot foil stamping." },
      { label: "Finishing", value: "Die-cutting, creasing, embossing, debossing and perforation for easy-open formats." },
      { label: "Gluing", value: "In-line high-speed folding and gluing for jam-free automated packing lines." },
      { label: "Design", value: "In-house dieline engineering, artwork adaptation and OEM production." },
      ...tradeTerms("50,000 cartons. Smaller trial runs available on request."),
    ],
  },
  {
    num: "04",
    slug: "mailer-boxes",
    title: "Mailer Boxes",
    category: "Boxes & Cartons",
    tagline: "Built for the unboxing moment — kraft to coated, plain to full bleed.",
    short:
      "E-commerce and DTC mailers that survive the courier network and still look immaculate on the doorstep.",
    banner: "/assets/banners/mainbanner2.jpg",
    image: "/assets/services/mailer.jpg",
    highlights: ["Corrugated strength", "Full-bleed print", "Inside print option", "Flat-packed shipping"],
    description: [
      "A mailer box carries your brand further than any other piece of packaging — through sorting centres, vans and finally into your customer's hands. We specify flute grade and board combination based on the weight and fragility of what goes inside.",
      "Mailers ship flat and fold into shape in seconds, which cuts storage and freight cost. Print inside and out, add a ribbon pull or tissue, and the unboxing becomes something customers photograph.",
    ],
    features: [
      { label: "Size", value: "Custom, based on your product plus protective clearance and courier limits." },
      { label: "Structure", value: "Roll-end tuck, mailer with self-locking base, drawer mailer and rigid magnetic mailer." },
      { label: "Material", value: "E-flute and B-flute corrugated, kraft or coated white, plus specialty liners." },
      { label: "Printing", value: "Full-bleed offset litho lamination, flexo kraft stamping or digital short runs." },
      { label: "Surface disposal", value: "Matt/gloss lamination, varnish, spot UV, foil stamping and embossing." },
      { label: "Inside finish", value: "Custom interior print, tissue paper, ribbon pulls and die-cut inserts." },
      { label: "Design", value: "Structural design and artwork support; OEM and bespoke design welcome." },
      ...tradeTerms("1,000 pieces for litho-laminated mailers. Plain kraft from 500 pieces."),
    ],
  },
  {
    num: "05",
    slug: "paper-bags",
    title: "Paper Bags",
    category: "Bags, Tags & Labels",
    tagline: "Twisted rope, flat ribbon, euro handle — retail, gifting and luxury carry bags.",
    short:
      "Branded carry bags that turn a purchase into a walking advertisement for your store.",
    banner: "/assets/banners/banner1.jpg",
    image: "/assets/services/paperbag.jpg",
    highlights: ["Rope & ribbon handles", "Reinforced top", "Matte & gloss", "Food-grade liners"],
    description: [
      "The bag a customer carries out of your store is seen by everyone on the street. We print and finish bags that hold their shape, carry real weight and keep your identity visible long after the purchase.",
      "Handle type, gusset depth, board weight and reinforcement are specified per use — boutique, gifting, festival retail or heavier multi-item carry.",
    ],
    features: [
      { label: "Size", value: "Custom widths, heights and gusset depths, from small gift bags to large retail carry bags." },
      { label: "Handle", value: "Twisted paper handle, flat ribbon, cotton rope, PP rope, die-cut and jute rope." },
      { label: "Material", value: "Kraft paper, art paper, ivory board and imported specialty papers." },
      { label: "Surface disposal", value: "Matt/gloss lamination, protective varnish, UV coating and gold/silver hot stamping." },
      { label: "Finishing", value: "Embossing & debossing, hot foil stamping, screen printing and reinforced card tops." },
      { label: "Lamination", value: "Matt, glossy, soft-touch and velvet/silk options." },
      { label: "Product purpose", value: "Retail store, gifting, festivals, exhibitions, advertising and promotion." },
      ...tradeTerms("1,000 pieces. Smaller quantities available on request."),
    ],
  },
  {
    num: "06",
    slug: "labels-stickers",
    title: "Labels & Stickers",
    category: "Bags, Tags & Labels",
    tagline: "BOPP, kraft, foil, clear — die-cut, roll or sheet, in any shape or size.",
    short:
      "Product labels and brand stickers engineered to adhere cleanly and stay put through shelf life and handling.",
    banner: "/assets/banners/Edge-Perfection-Banner-1.jpg",
    image: "/assets/services/labels.jpg",
    highlights: ["Waterproof BOPP", "Roll & sheet", "Any die shape", "Pantone matched"],
    description: [
      "Labels are where print quality is judged at arm's length — a registration error of a fraction of a millimetre shows immediately. Our labels are printed, varnished and die-cut with the same discipline we apply to packaging.",
      "We select adhesive and face material for the surface and condition: chilled or oily bottles, textured board, glass, plastic or fabric, each with a wet-strength or removable adhesive to suit.",
    ],
    features: [
      { label: "Size", value: "Any size and any die shape — from small security seals to wraps and sheets." },
      { label: "Material", value: "Paper, BOPP, PET, clear-on-clear, metallic and kraft label stock." },
      { label: "Adhesive", value: "Permanent, removable, freezer-grade and wet-strength adhesives." },
      { label: "Format", value: "Roll form for applicator lines or sheet form for hand application." },
      { label: "Printing", value: "Offset and flexo with CMYK and Pantone matching; barcode and QR variable data." },
      { label: "Surface disposal", value: "Gloss/matt varnish, lamination, spot UV and cold foil." },
      { label: "Finishing", value: "Die-cutting, embossing, numbering and laser cutting." },
      ...tradeTerms("5,000 labels. Roll die charges apply."),
    ],
  },
  {
    num: "07",
    slug: "hang-tags",
    title: "Hang Tags",
    category: "Bags, Tags & Labels",
    tagline: "Garment, retail and product tags — premium board, eyelet punched, full colour both sides.",
    short:
      "The small detail that carries your brand, size, price and care story — printed on both sides with a quality feel in hand.",
    banner: "/assets/banners/banner4.jpeg",
    image: "/assets/services/hangtags.jpg",
    highlights: ["Full colour both sides", "Eyelet punched", "Foil & emboss", "Spot UV"],
    description: [
      "A hang tag is handled more than any other printed piece in the store — customers turn it, feel it and read it before deciding. We print on substantial boards so it has presence rather than flimsiness.",
      "Eyelets, punched shapes, foiled logos, embossed textures and tag strings or pins are all produced and applied in-house for a consistent finish across the whole consignment.",
    ],
    features: [
      { label: "Size", value: "Custom tag sizes and die shapes, from slim garment tags to large retail cards." },
      { label: "Material", value: "300–450gsm art card, ivory board, kraft and imported specialty papers." },
      { label: "Printing", value: "Full colour both sides, CMYK and Pantone matched, on offset presses." },
      { label: "Surface disposal", value: "Matt/gloss lamination, protective varnish, spot UV and soft-touch." },
      { label: "Finishing", value: "Foil stamping, embossing & debossing, screen printing, punching and eyelet fitting." },
      { label: "String & pin", value: "Cotton, nylon, elastic or jute strings; plastic or metal pins on request." },
      { label: "Product purpose", value: "Garment, accessory, jewellery, footwear, home textile and retail display." },
      ...tradeTerms("5,000 tags. Smaller quantities available on request."),
    ],
  },
  {
    num: "08",
    slug: "catalogs-brochures",
    title: "Catalogs & Brochures",
    category: "Print & Publishing",
    tagline: "Saddle stitch, perfect bound, gatefold — printed to make brands look world-class.",
    short:
      "Lookbooks, product catalogues and brochures that hold thousands of products without ever looking cheap.",
    banner: "/assets/banners/banner3.jpg",
    image: "/assets/services/catalogs.jpg",
    highlights: ["Perfect & saddle bound", "FSC text papers", "Gatefold covers", "Colour-critical proofing"],
    description: [
      "Catalogue printing is a colour-accuracy exercise at scale. Every skin tone, fabric shade and product colour must repeat across dozens of pages and thousands of copies, which is why we proof against Pantone and monitor the run on press.",
      "Choose from saddle stitch, perfect binding, section-sewn or wire-o, with optional spot UV, foil and embossed covers that give the piece the weight of your brand.",
    ],
    features: [
      { label: "Size", value: "A4, A5, square, portrait, landscape or custom trimmed formats." },
      { label: "Extent", value: "From 8-page leaflets to 300+ page catalogues." },
      { label: "Binding", value: "Saddle stitch, perfect bound, section sewn, wire-o, spiral and case bound." },
      { label: "Material", value: "FSC-certified text and cover papers, art card, uncoated and specialty stocks." },
      { label: "Printing", value: "8-colour Heidelberg offset with CMYK and Pantone matching." },
      { label: "Cover finishing", value: "Matt/gloss lamination, soft-touch, spot UV, foil stamping and embossing." },
      { label: "Design", value: "Artwork preparation, imposition and OEM production; design support available." },
      ...tradeTerms("1,000 copies. Short runs quoted on request."),
    ],
  },
  {
    num: "09",
    slug: "offset-printing",
    title: "Offset Printing",
    category: "Print & Publishing",
    tagline: "Eight-colour Heidelberg precision — up to 18,000 sheets per hour.",
    short:
      "The production engine behind everything we make: German-engineered offset printing with ISO-calibrated colour control.",
    banner: "/assets/banners/mainbanner.jpg",
    image: "/assets/services/offset.jpg",
    highlights: ["8-colour presses", "18,000 sph", "Pantone matching", "CTP plate imaging"],
    description: [
      "Printing is where a specification either delivers or fails. Our sheet-fed Heidelberg presses run eight colours in a single pass, with inline coating and automatic plate changing that keeps registration and colour stable across long runs.",
      "Plates are imaged in-house on thermal CTP at 2400 dpi, colour is verified with spectrophotometer readings, and every job is checked against the approved proof at the end of the run.",
    ],
    features: [
      { label: "Size", value: "Up to 720 × 1020mm sheet format; smaller formats nested for efficiency." },
      { label: "Colours", value: "Up to 8 colours in a single pass, plus inline aqueous or UV coating." },
      { label: "Speed", value: "Up to 18,000 sheets per hour on flagship presses." },
      { label: "Material", value: "Art paper, ivory board, kraft, corrugated liner, specialty and synthetic stocks." },
      { label: "Colour control", value: "CMYK and Pantone matching with spectrophotometer verification." },
      { label: "Pre-press", value: "In-house thermal CTP at 2400 dpi, digital proofing and imposition." },
      { label: "Surface disposal", value: "Aqueous coating, UV coating, matt/gloss lamination and varnish." },
      ...tradeTerms("Depends on the job — no minimum order restriction on most print formats."),
    ],
  },
  {
    num: "10",
    slug: "corporate-branding",
    title: "Corporate Branding",
    category: "Print & Publishing",
    tagline: "Letterheads, business cards, folders and envelopes — complete corporate identity print.",
    short:
      "Everything your company hands out, printed consistently so every touchpoint looks like one brand.",
    banner: "/assets/banners/banner3.jpg",
    image: "/assets/services/corporatebranding.jpg",
    highlights: ["Brand-consistent colour", "Premium stocks", "Foil & emboss", "Rush turnaround"],
    description: [
      "Corporate stationery is judged in the hand — the weight of a business card, the feel of a letterhead, the crispness of an embossed folder. We print the full set together so the paper, colour and finish match exactly across every item.",
      "Standard packs cover letterheads, continuation sheets, envelopes, compliment slips, business cards, folders, notepads and ID or gift items, with optional foil, emboss and soft-touch finishing.",
    ],
    features: [
      { label: "Size", value: "Standard A4 letterheads and 90×54mm cards, plus custom sizes on request." },
      { label: "Items", value: "Letterheads, envelopes, business cards, compliment slips, folders, notepads, ID cards." },
      { label: "Material", value: "80–120gsm text papers, 300–450gsm card and imported specialty stocks." },
      { label: "Printing", value: "Offset and digital production with CMYK and Pantone matching." },
      { label: "Surface disposal", value: "Matt/gloss lamination, soft-touch, spot UV, varnish and edge painting." },
      { label: "Finishing", value: "Foil stamping, embossing & debossing, die-cutting and foil-blocked folders." },
      { label: "Brand support", value: "Artwork setup against your brand guidelines; variable data for personalised sets." },
      ...tradeTerms("1,000 pieces per item. Rush production available."),
    ],
  },
  {
    num: "11",
    slug: "commercial-printing",
    title: "Commercial Printing",
    category: "Print & Publishing",
    tagline: "High-volume runs for any commercial requirement — fast turnaround, consistent quality.",
    short:
      "Large-scale offset production for businesses that need volume without a drop in standard.",
    banner: "/assets/banners/mainbanner2.jpg",
    image: "/assets/services/commercialmaterial.jpg",
    highlights: ["High-volume runs", "24-hour production", "Sheet & web options", "Nationwide delivery"],
    description: [
      "When a campaign has to land on a date, capacity decides the outcome. With eight Heidelberg presses running six days a week we schedule long runs without pushing your delivery week.",
      "Volumes are quoted per impression with material and finishing fixed up front, so a re-run two months later matches the first exactly.",
    ],
    features: [
      { label: "Size", value: "Sheet formats up to 720 × 1020mm, plus large-format posters on request." },
      { label: "Volume", value: "From a few thousand impressions to multi-million sheet programmes." },
      { label: "Turnaround", value: "Standard 7–10 working days; express 48–72 hour production available." },
      { label: "Material", value: "Art paper, ivory board, kraft, newsprint, synthetic and specialty stocks." },
      { label: "Printing", value: "8-colour Heidelberg offset with CMYK and Pantone matching." },
      { label: "Surface disposal", value: "Aqueous coating, UV coating, matt/gloss lamination and varnish." },
      { label: "Finishing", value: "Cutting, folding, creasing, perforating, numbering, stitching and packing." },
      ...tradeTerms("Depends on the specification — request a quotation for your volume."),
    ],
  },
  {
    num: "12",
    slug: "promotional-materials",
    title: "Promotional Materials",
    category: "Print & Publishing",
    tagline: "Flyers, posters, banners and inserts — campaign-ready print at production scale.",
    short:
      "Everything a marketing calendar needs, produced to the same standard as your premium packaging.",
    banner: "/assets/banners/awardbanner2.jpg",
    image: "/assets/services/promotional.jpg",
    highlights: ["Campaign scale", "Fast reprints", "Indoor & outdoor", "Bundle packing"],
    description: [
      "Promotional print is judged in seconds and handled roughly — so the material has to look sharp and survive. We print flyers, posters, standees, banners, tent cards and inserts on substrates matched to how they will be used.",
      "Bundle packing by campaign or store, sequential numbering and sorted palletising are offered so distribution teams can move fast without sorting boxes on site.",
    ],
    features: [
      { label: "Size", value: "A6 flyers to A0 posters, standees and custom large-format sizes." },
      { label: "Items", value: "Flyers, leaflets, posters, standees, tent cards, shelf talkers, banners and inserts." },
      { label: "Material", value: "Art paper, board, newsprint, self-adhesive and synthetic weather-resistant stocks." },
      { label: "Printing", value: "Offset for volume, digital for short-run or versioned campaigns." },
      { label: "Surface disposal", value: "Aqueous coating, UV coating, matt/gloss lamination and varnish." },
      { label: "Finishing", value: "Die-cutting, creasing, folding, numbering and eyeleting." },
      { label: "Packing", value: "Bundle packing by campaign, store or region on request." },
      ...tradeTerms("5,000 pieces. Short-run digital available with no minimum."),
    ],
  },
  {
    num: "13",
    slug: "uv-finishing",
    title: "UV & Finishing",
    category: "Finishing & Effects",
    tagline: "Spot UV, foil, emboss, soft-touch — the details that make packaging premium.",
    short:
      "Specialty finishes applied in-house that turn a well-printed sheet into a piece people keep.",
    banner: "/assets/banners/Edge-Perfection-Banner-1.jpg",
    image: "/assets/services/uvfinishing.jpg",
    highlights: ["Spot & flood UV", "Hot & cold foil", "Emboss & deboss", "Soft-touch & velvet"],
    description: [
      "Finishing is what separates packaging that looks printed from packaging that looks made. We run lamination, coating, foiling, embossing, die-cutting and laser work under one roof, so a job never leaves our control between processes.",
      "Finishes can be combined — soft-touch lamination with a spot-UV logo over a debossed panel, or cold foil with a registered emboss — to create surface detail that no flat print can reproduce.",
    ],
    features: [
      { label: "Lamination", value: "Matt, gloss, soft-touch, velvet/silk, holographic and thermal options." },
      { label: "Coatings", value: "Full-flood and registered spot UV, aqueous coating and protective varnish." },
      { label: "Foil", value: "Hot and cold foil stamping in gold, silver, copper, holographic and custom colours." },
      { label: "Emboss", value: "Blind embossing, registered embossing and debossing with multi-level dies." },
      { label: "Die work", value: "Die-cutting, creasing, kiss-cutting and combined die-cutting with foil in one pass." },
      { label: "Special techniques", value: "Screen printing, laser cutting, edge painting and texture varnishes." },
      { label: "Quality", value: "Registered finishes proofed against the artwork before the production run." },
      ...tradeTerms("Applied to your print job — finishing-only quantities quoted on request."),
    ],
  },
];

/* Category chips used by the /products filter bar */
export const PRODUCT_CATEGORIES = ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];

/* /products page hero */
export const PRODUCT_PAGE = {
  eyebrow: "OUR PRODUCTS",
  headline: "Every Format. Every Finish. Every Scale.",
  sub: "Packaging and print disciplines manufactured under one roof — from jewellery-grade rigid boxes and bespoke structural design to high-volume commercial print runs. Select any product to see its full specification.",
  banner: "/assets/banners/mainbanner.jpg",
};

/* Light, wide banner used behind the /products hero and the product-detail
   header band. Keyed by product category so the page stays on-palette for the
   light theme (the dark banners in PRODUCTS[].banner are only for social/OG). */
export const CATEGORY_HEADER_IMAGES = {
  "Luxury Packaging": "/assets/banners/mainbanner.jpg",
  "Boxes & Cartons": "/assets/banners/mainbanner2.jpg",
  "Bags, Tags & Labels": "/assets/banners/banner4.jpeg",
  "Print & Publishing": "/assets/banners/mainbanner.jpg",
  "Finishing & Effects": "/assets/banners/mainbanner2.jpg",
};

/* Header band image for a product (falls back to the product's own banner) */
export const productHeaderImage = (product) =>
  (product && CATEGORY_HEADER_IMAGES[product.category]) || (product && product.banner) || PRODUCT_PAGE.banner;

/* ---- Home "Boxes | Banner | Services" section — left column ---- */
export const BOX_FORMATS = [
  { id: "box-1", title: "Luxury Rigid Boxes", icon: "Package", image: "/assets/services/luxuryRigid.jpg", desc: "Magnetic closure, telescope lid and clamshell builds — the apex of packaging engineering, made to jewellery-grade tolerances." },
  { id: "box-2", title: "Folding Cartons", icon: "Boxes", image: "/assets/services/foldingcartons.jpg", desc: "Reverse tuck, straight tuck, gable top and auto-bottom. High-speed production, premium results." },
  { id: "box-3", title: "Mailer Boxes", icon: "PackageOpen", image: "/assets/services/mailer.jpg", desc: "E-commerce and DTC packaging — kraft to coated, plain to full bleed, built for the unboxing moment." },
  { id: "box-4", title: "Paper Bags", icon: "ShoppingBag", image: "/assets/services/paperbag.jpg", desc: "Twisted rope, flat ribbon and euro handles. Retail, gifting and luxury carry bags." },
  { id: "box-5", title: "Labels & Stickers", icon: "Tag", image: "/assets/services/labels.jpg", desc: "BOPP, kraft, foil and clear stock — die-cut in roll or sheet format, any shape, any size." },
  { id: "box-6", title: "Hang Tags", icon: "Tags", image: "/assets/services/hangtags.jpg", desc: "Garment, retail and product tags on premium board — full-colour both sides, eyelet punched." },
  { id: "box-7", title: "Catalogs & Brochures", icon: "BookOpen", image: "/assets/services/catalogs.jpg", desc: "Saddle stitch, perfect bound and gatefold — printed to make brands look world-class." },
];

/* ---- Home "Boxes | Banner | Services" section — right column ---- */
export const SERVICE_LINES = [
  { id: "svc-1", title: "Offset Printing", icon: "Printer", image: "/assets/services/offset.jpg", desc: "Eight-color Heidelberg precision — up to 18,000 sheets per hour, CMYK and Pantone matched." },
  { id: "svc-2", title: "Custom Packaging", icon: "Box", image: "/assets/services/custompackaging.jpg", desc: "Every dimension, material and finish — fully bespoke from structural design to delivery." },
  { id: "svc-3", title: "Corporate Branding", icon: "Briefcase", image: "/assets/services/corporatebranding.jpg", desc: "Letterheads, business cards, folders and envelopes — complete corporate identity print." },
  { id: "svc-4", title: "Commercial Printing", icon: "Newspaper", image: "/assets/services/commercialmaterial.jpg", desc: "High-volume runs for any commercial requirement, with fast turnaround and consistent quality." },
  { id: "svc-5", title: "Promotional Materials", icon: "Megaphone", image: "/assets/services/promotional.jpg", desc: "Flyers, posters, banners and inserts — campaign-ready print at production scale." },
  { id: "svc-6", title: "UV & Finishing", icon: "Sparkles", image: "/assets/services/uvfinishing.jpg", desc: "Spot UV, matte lamination, soft-touch, hot foil, emboss and deboss — the details that make packaging premium." },
  { id: "svc-7", title: "Design & Pre-Press", icon: "PenTool", image: "/assets/services/designprepress.jpg", desc: "In-house artwork, dielines and colour proofing — proofed, plated and press-ready." },
];

export const INDUSTRIES = [
  { name: "Fashion & Apparel", icon: "Shirt", desc: "Garment tags, retail bags, luxury boxes." },
  { name: "Home Textile", icon: "Layers", desc: "Branded packaging and care labels." },
  { name: "Food & Beverage", icon: "Wheat", desc: "Printed cartons, labels and wraps." },
  { name: "Personal Care", icon: "Droplet", desc: "Premium boxes and product labels." },
  { name: "Real Estate", icon: "Building2", desc: "Brochures, folders and corporate print." },
  { name: "Corporate & Banking", icon: "Briefcase", desc: "Letterheads, reports and stationery." },
  { name: "Education", icon: "BookOpen", desc: "Catalogs, notebooks and print materials." },
  { name: "Retail", icon: "ShoppingBag", desc: "Paper bags, swing tags and packaging." },
  { name: "Startups & SMEs", icon: "Rocket", desc: "Brand kits, mailer boxes and labels." },
];

export const PROCESS = [
  { num: "01", title: "Brief & Concept", desc: "We receive your project requirements — dimensions, quantity and finish preferences. Our team asks the right questions so nothing is assumed." },
  { num: "02", title: "Structural Design", desc: "Our in-house engineers create the dieline and structural specification — optimised for your product, your shelf and your shipping." },
  { num: "03", title: "Digital Proof", desc: "A full digital proof is produced for approval before any plate is made. Colours are Pantone-matched and verified against your brand guidelines." },
  { num: "04", title: "Prototype", desc: "A physical sample is produced at full specification. You see, hold and approve the actual product before full production begins." },
  { num: "05", title: "Press Run", desc: "Approved files go to press on our Heidelberg machines. Every sheet is monitored for colour, registration and ink density." },
  { num: "06", title: "Finishing & QC", desc: "Die-cutting, lamination, foiling, UV and embossing applied in sequence. Every finished unit passes our QC checkpoint before packing." },
  { num: "07", title: "Packing & Delivery", desc: "Units are counted, packed, palletized and dispatched — local delivery or freight-forwarded internationally with full documentation." },
];

export const WHY_CHOOSE = [
  { num: "01", title: "Heidelberg Precision", desc: "German-engineered Heidelberg offset presses deliver 18,000 sheets per hour with ISO-calibrated color accuracy and registration precision." },
  { num: "02", title: "Premium Materials", desc: "FSC-certified paper stocks, imported specialty substrates, archival-grade inks and premium coatings from international suppliers." },
  { num: "03", title: "In-House Expertise", desc: "Complete pre-press department with CTP technology, structural engineers for packaging design, and experienced press operators." },
  { num: "04", title: "Fast Production", desc: "Standard turnaround 7-10 working days. Express 48-72 hour production available for urgent print runs." },
  { num: "05", title: "ISO Quality Standards", desc: "ISO 9001:2015 certified quality management. Every job inspected before shipment. Zero-compromise quality policy." },
  { num: "06", title: "Scalable Capacity", desc: "From sample quantities to full production runs. No minimum order restrictions. Scale your printing as your business grows." },
  { num: "07", title: "Competitive Pricing", desc: "Enterprise-grade printing equipment with streamlined operations means competitive pricing without quality compromise." },
  { num: "08", title: "Export Capability", desc: "Full export documentation and freight coordination. Successfully shipped to 30+ countries with complete paperwork support." },
];

export const MACHINERY = {
  eyebrow: "OUR INFRASTRUCTURE",
  headline: ["The Machines Behind", "the Craft."],
  sub: "A controlled, precision-calibrated production environment. Climate-regulated and built to international manufacturing standards — running six days a week with in-house colour management at every stage.",
  banner: "Total covered production area: 12,000 sq m — 8 Heidelberg presses — 60 production specialists",

  /* Short proof-points for the page hero */
  highlights: [
    "12,000 m² covered production",
    "8 Heidelberg presses",
    "18,000 sheets / hour",
    "60+ production specialists",
  ],

  /* Facility figures — the numeric values are count-up animated on the page */
  stats: [
    { value: 12000, suffix: " m²", label: "Covered production area", detail: "Climate-regulated press floor with in-line colour management." },
    { value: 8, suffix: "", label: "Heidelberg machines", detail: "Offset, folding, cutting, die-cutting and CTP in-house." },
    { value: 18000, suffix: " sph", label: "Peak press output", detail: "8-colour sheet-fed presses running at full speed." },
    { value: 60, suffix: "+", label: "Production specialists", detail: "Press operators, engineers and QC technicians." },
  ],

  items: [
    { name: "Heidelberg Speedmaster SX 102", category: "Offset Printing", spec: "8-color · 18,000 sph", size: "hero", img: "/assets/1.jpeg", specs: ["8-color sheet-fed", "18,000 sheets per hour", "Format up to 720×1020mm"], capability: "The benchmark press for premium commercial and packaging print worldwide." },
    { name: "Heidelberg Speedmaster CD 102", category: "Offset Printing", spec: "6-color · 15,000 sph", size: "small", img: "/assets/2.jpeg", specs: ["6-color sheet-fed", "15,000 sheets per hour", "Perfecting capability"], capability: "Versatile 6-color press for high-quality commercial and packaging work." },
    { name: "Heidelberg Speedmaster XL 106", category: "Offset Printing", spec: "8-color · 18,000 sph", size: "small", img: "/assets/3.jpeg", specs: ["8-color sheet-fed", "18,000 sheets per hour", "Autoplate Advanced"], capability: "Flagship XL platform delivering maximum productivity and print quality." },
    { name: "Heidelberg Stahlfolder", category: "Folding & Gluing", spec: "300 m/min · inline gluing", size: "wide", img: "/assets/4.jpeg", specs: ["300 metres per minute", "Multi-format capability", "Inline gluing"], capability: "High-speed folding and gluing for folding cartons and mailer boxes." },
    { name: "Heidelberg Polar 115", category: "Cutting", spec: "Programmable · ±0.1mm", size: "small", img: "/assets/5.jpeg", specs: ["Programmable cutting", "±0.1mm precision", "115cm cutting width"], capability: "Precision guillotine cutting for exact sheet and finished product sizing." },
    { name: "Heidelberg Suprasetter", category: "Computer-to-Plate", spec: "Kodak CTP · 2400 dpi", size: "small", img: "/assets/6.jpeg", specs: ["Thermal CTP imaging", "2400 dpi resolution", "Auto plate loading"], capability: "Precision plate imaging for razor-sharp reproduction of every detail." },
    { name: "Heidelberg Easyfold", category: "Folding & Gluing", spec: "Auto setup · 200 m/min", size: "small", img: "/assets/7.jpeg", specs: ["Automatic setup", "200 metres per minute", "Multi-pocket folding"], capability: "Automated folding system for consistent, high-speed carton production." },
    { name: "Heidelberg Promatrix 106", category: "Die Cutting", spec: "±0.1mm tolerance", size: "small", img: "/assets/8.jpeg", specs: ["±0.1mm cutting tolerance", "7,500 sheets per hour", "Full-format 106×106cm"], capability: "Precision die-cutting for complex packaging structures and intricate shapes." },
    { name: "Heidelberg Dymatrix 106", category: "Die Cutting", spec: "Hot foil · emboss · die-cut", size: "small", img: "/assets/9.jpeg", specs: ["Hot foil stamping", "Embossing & debossing", "Combined die-cutting"], capability: "Multi-function finishing with foil stamping, embossing and die-cutting in one pass." },
  ],

  /* The production flow the above machines serve — plate to pallet */
  pipeline: [
    { num: "01", title: "Pre-Press & Imaging", machine: "Heidelberg Suprasetter", desc: "Thermal CTP plates imaged at 2400 dpi with automatic plate loading, so every run starts from an identical, calibrated plate." },
    { num: "02", title: "Proofing & Approval", machine: "In-house pre-press", desc: "FOGRA-standard contract proofs plus a full-size pre-production sample — approved by you before a single production plate is made." },
    { num: "03", title: "Offset Printing", machine: "Speedmaster SX 102 / XL 106", desc: "8-colour sheet-fed presses running to 18,000 sheets per hour, with in-line spectrophotometry watching every sheet." },
    { num: "04", title: "Folding & Gluing", machine: "Stahlfolder / Easyfold", desc: "Up to 300 metres per minute of multi-format folding with inline gluing for cartons, mailers and wraps." },
    { num: "05", title: "Cutting & Finishing", machine: "Polar 115 / Promatrix / Dymatrix", desc: "Guillotine cutting, die-cutting, hot foil, embossing and debossing — all held to a ±0.1 mm tolerance." },
    { num: "06", title: "QC, Packing & Dispatch", machine: "100% inspection checkpoint", desc: "Every finished unit is inspected, counted, palletised and documented — locally or freight-forwarded worldwide." },
  ],

  /* Assurance blocks shown under the machines */
  standards: [
    { title: "ISO 9001:2015", desc: "Certified quality management across pre-press, press and finishing — audited end to end." },
    { title: "FOGRA colour proofs", desc: "Contract proofs matched to PSOcoated and PSOuncoated standards before approval." },
    { title: "±0.1 mm tolerance", desc: "Registration, cutting and die-cutting accuracy verified on every job." },
    { title: "FSC certified board", desc: "Chain-of-custody material from responsibly managed forests on every structure." },
  ],

  cta: {
    title: "Put These Machines to Work on Your Job",
    sub: "Send us your artwork or a simple brief — our pre-press team will come back with a specification, a price and a production date.",
    primary: { label: "Request a Quote", to: "/request-quote" },
    secondary: { label: "Talk to the Team", to: "/contact" },
  },
};

export const FAQ = {
  eyebrow: "QUESTIONS & ANSWERS",
  headline: "Everything You Need to Know",
  sub: "Find answers to common questions about our services, process, and capabilities.",

  categories: [
    {
      category: "Ordering & Quotes",
      items: [
        {
          q: "How do I request a quote?",
          a: "You can request a quote through our online form at /request-quote, email us at sales.printking@gmail.com, or call +92 42 37150138-40. We typically respond within 4 business hours with a detailed quotation.",
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
  ],

  cta: {
    title: "Still have questions?",
    sub: "We're here to help. Contact our team for personalised assistance.",
    primary: { label: "Contact Us", to: "/contact" },
    secondary: { label: "Request a Quote", to: "/request-quote" },
  },
};

export const BLOG = {
  eyebrow: "THE PRINTKING JOURNAL",
  headline: "Notes From the Press Floor",
  sub: "Project stories, material guides and production know-how — written by the people who run the machines.",

  /* The case studies, rewritten as posts, plus craft/operations pieces */

  posts: [
    {
      slug: "bareeze-lookbook-colour-accuracy",
      title: "Matching a fashion lookbook to its fabric swatches",
      category: "Case Study",
      date: "2026-09-12",
      readTime: 4,
      author: "PrintKing Pre-Press",
      client: "Bareezé Couture",
      excerpt:
        "A 48-page perfect-bound lookbook that had to hold its colour across coated stock — and match the season's fabric swatches, page after page.",
      cover: "/assets/services/products.jpg",
      tags: ["Offset Printing", "Pantone", "Lookbook"],
      body: [
        {
          heading: "The brief",
          text: "Bareezé needed a premium lookbook for their seasonal collection launch — 48 pages, perfect bound, that captured the brand's luxury aesthetic. The hard part was colour: every image had to hold the exact tone of the fabric swatches the design team was working from, with intricate line work surviving at reading distance.",
        },
        {
          heading: "What we did",
          text: "We ran the job on an 8-colour Heidelberg sheet-fed press with every colour Pantone-matched from a physical swatch rather than a screen value. The whole book was coated in matte lamination for a soft-touch surface, and selected pages carried spot UV to lift key details off the page without touching the images.",
        },
        {
          heading: "The result",
          text: "Colour held to 98% accuracy against the original fabric swatches, and the book landed in seven working days from artwork approval. Bareezé re-ordered for three consecutive seasons and featured the lookbook in their flagship store displays.",
        },
      ],
      materials: ["200gsm coated art paper", "Matte lamination", "Spot UV coating", "Perfect bound"],
      results: ["98% colour accuracy to fabric swatches", "Delivered in 7 working days", "Re-ordered for 3 consecutive seasons"],
      quote: {
        text: "The colour accuracy and finish quality exceeded our expectations. This lookbook represents our brand exactly as we envisioned.",
        name: "Marketing Director",
        role: "Bareezé Couture",
      },
    },
    {
      slug: "nestle-folding-carton-at-scale",
      title: "Two million cartons, zero colour variation",
      category: "Case Study",
      date: "2026-08-21",
      readTime: 5,
      author: "PrintKing Production",
      client: "Nestlé Pakistan",
      excerpt:
        "A folding carton redesign engineered for high-speed filling lines — and colour held steady across a two-million-unit run.",
      cover: "/assets/services/foldingcartons.jpg",
      tags: ["Folding Carton", "High Volume", "Food & Beverage"],
      body: [
        {
          heading: "The brief",
          text: "Nestlé needed a complete packaging redesign for a major product line. Beyond the graphics, the structure had to survive high-speed automated filling, and the print had to show zero tolerance for colour variation across millions of units.",
        },
        {
          heading: "What we did",
          text: "We engineered a new folding carton structure optimised for the filling line, with easy-open perforation and a board weight chosen for both the machine and the shelf. Production ran on our Heidelberg Speedmaster presses under ISO-certified quality control, with in-line checks through the run rather than only at the start.",
        },
        {
          heading: "The result",
          text: "Two million units delivered with no measurable colour variation across the run, and a 15% cost reduction against the previous supplier. The process is ISO 9001:2015 certified end to end.",
        },
      ],
      materials: ["350gsm FSC-certified board", "Aqueous coating", "Food-safe inks", "Easy-open perforation"],
      results: ["2 million units delivered", "Zero colour variation across run", "15% cost reduction vs previous supplier"],
      quote: {
        text: "PrintKing's consistency at scale is remarkable. They've become our go-to packaging partner for high-volume production.",
        name: "Operations Manager",
        role: "Nestlé Pakistan",
      },
    },
    {
      slug: "elan-luxury-rigid-box-unboxing",
      title: "Designing an unboxing moment worth photographing",
      category: "Case Study",
      date: "2026-07-30",
      readTime: 4,
      author: "PrintKing Design Studio",
      client: "Élan",
      excerpt:
        "A magnetic-closure rigid box with rose gold foil and a soft-touch lining — built so the box itself carries the brand.",
      cover: "/assets/services/luxuryRigid.jpg",
      tags: ["Luxury Rigid Box", "Foil Stamping", "Fashion"],
      body: [
        {
          heading: "The brief",
          text: "Élan wanted a premium rigid box for a luxury pret collection — one that would create an unforgettable unboxing experience and communicate exclusivity before the product was even opened.",
        },
        {
          heading: "What we did",
          text: "We designed a magnetic-closure rigid box with a telescopic lid, wrapped in premium textured paper. The exterior carries hot foil stamping in rose gold, the interior is lined in soft-touch, and the brand logo is embossed rather than printed so it reads by touch as well as by eye.",
        },
        {
          heading: "The result",
          text: "The collection took 'Best Packaging Design' at fashion week, unboxing posts on social rose sharply after launch, and the structure went on to earn a 200% repeat order rate. The box was featured in Vogue Pakistan.",
        },
      ],
      materials: ["2mm rigid greyboard", "Textured wrapping paper", "Rose gold foil stamping", "Soft-touch interior", "Magnetic closure"],
      results: ["Awarded 'Best Packaging Design'", "40% increase in unboxing posts", "200% repeat order rate"],
      quote: {
        text: "The unboxing experience PrintKing created for our collection was nothing short of spectacular. Every detail, from the foil stamping to the magnetic closure, reflects our commitment to luxury.",
        name: "Brand Director",
        role: "Élan",
      },
    },
    {
      slug: "pantone-colour-on-coated-sheet",
      title: "Why your Pantone match needs a physical swatch",
      category: "Print Craft",
      date: "2026-09-02",
      readTime: 3,
      author: "PrintKing Pre-Press",
      excerpt:
        "A screen value is not a Pantone match. How we build a colour from a physical chip — and what to send us so the first proof is the right one.",
      cover: "/assets/banners/mainbanner.jpg",
      tags: ["Colour", "Pre-Press", "Proofing"],
      body: [
        {
          heading: "Screen and paper are different worlds",
          text: "Every screen emits light; every printed sheet reflects it. That is why a colour that looks perfect on a laptop can land a shade or two off on press, and why we ask for a physical swatch or a measured reference before we build a separation.",
        },
        {
          heading: "What we work from",
          text: "Send the Pantone code plus a physical chip, or a previously printed reference we can measure. From there we set the build on an ISO-calibrated press, run a contract proof, and only move to plate once that proof is approved.",
        },
        {
          heading: "Files that give us the best chance",
          text: "CMYK colour mode, 300 dpi at final size, embedded fonts outlined, and a one-page specification listing stock, finish and Pantones. With those in place most jobs reach an approved proof on the first pass — which is where the schedule really comes from.",
        },
      ],
      materials: ["Contract proof (FOGRA standard)", "Pantone Solid Coated/ uncoated", "ISO-calibrated colour measurement"],
      results: ["Fewer proof rounds", "Accurate first press", "Shorter approval cycles"],
    },
    {
      slug: "choosing-board-for-a-luxury-rigid-box",
      title: "Choosing board for a rigid box that survives unboxing",
      category: "Materials",
      date: "2026-08-08",
      readTime: 3,
      author: "PrintKing Design Studio",
      excerpt:
        "Greyboard, wrap, lining, closure — the four decisions that decide whether a rigid box feels premium or simply expensive.",
      cover: "/assets/banners/rigidbanner.jpg",
      tags: ["Rigid Box", "Board", "Materials"],
      body: [
        {
          heading: "Start with the board, not the wrap",
          text: "Everything structural starts with greyboard. Around 2mm is the sweet spot for a presentation box — rigid enough to feel solid, light enough to ship economically. Below that it flexes in the hand; above it, you are paying to move cardboard.",
        },
        {
          heading: "Wrap is the first thing a hand touches",
          text: "Textured wrapping paper reads as craft; coated stock reads as corporate. Both are valid, but the tactile choice should match how the brand behaves elsewhere. We keep a library of both so you can see real samples, not swatches.",
        },
        {
          heading: "Lining and closure do the last 10%",
          text: "A soft-touch or flocked interior changes the moment the lid lifts, and a magnetic closure makes the box feel deliberate. These are the details people remember — and the cheapest places to add perceived value.",
        },
      ],
      materials: ["2mm greyboard", "Textured wrap", "Soft-touch / flock lining", "Magnetic closure"],
      results: ["Consistent structure across runs", "Faster assembly", "Better perceived value"],
    },
    {
      slug: "iso-9001-what-it-means-for-your-job",
      title: "What ISO 9001:2015 actually means for your job",
      category: "Operations",
      date: "2026-07-14",
      readTime: 4,
      author: "PrintKing Quality",
      excerpt:
        "Certification is not a logo on a wall. Here is where the checkpoints sit between your artwork and your pallet — and what we check at each one.",
      cover: "/assets/banners/awardbanner2.jpg",
      tags: ["Quality", "ISO 9001:2015", "QC"],
      body: [
        {
          heading: "Four checkpoints, not one final look",
          text: "Quality control that happens at the end only tells you what went wrong. Our process checks at four points: pre-press file verification, first-sheet approval, in-process inspection during the run, and final inspection before packing. Most defects are caught at the first two, when they are still cheap to fix.",
        },
        {
          heading: "What we hold ourselves to",
          text: "Registration and cutting accuracy are verified to ±0.1 mm, and every finished unit is inspected before dispatch. On multi-million-unit runs, in-line measurement keeps colour steady rather than sampling it after the fact.",
        },
        {
          heading: "Standards you can ask about",
          text: "FSC-certified board with chain of custody, soy-based inks, water-based aqueous coatings where UV is not required, and FOGRA-standard contract proofs. Ask for the certificate that applies to your job and we will point you at it.",
        },
      ],
      materials: ["ISO 9001:2015 certified process", "FSC-certified board", "FOGRA-standard proofs", "In-line spectrophotometry"],
      results: ["±0.1 mm registration and cutting tolerance", "100% inspection before dispatch", "Documented export paperwork"],
    },
  ],

  cta: {
    title: "Want this level of detail on your job?",
    sub: "Send us your artwork or a simple brief. Our pre-press team replies within four business hours with a specification and a date.",
    primary: { label: "Request a Quote", to: "/request-quote" },
    secondary: { label: "Talk to the Team", to: "/contact" },
  },
};

export const VIDEO = {
  eyebrow: "INSIDE OUR PRODUCTION",
  headline: "Where Precision Printing Comes to Life.",
  sub: "A rare walk through our 12,000 m² plant — where German engineering meets Pakistani craftsmanship.",
  stats: [
    { label: "18,000 sheets/hr", pos: "top-left" },
    { label: "ISO 9001:2015", pos: "top-right" },
    { label: "8-Color Heidelberg", pos: "bottom-left" },
    { label: "Zero-Defect QC", pos: "bottom-right" },
  ],
  capabilities: [
    { title: "Heidelberg Presses", desc: "German-engineered offset printing at peak efficiency." },
    { title: "Quality Assurance", desc: "100% inspection before every shipment. Zero compromise." },
    { title: "Production Scale", desc: "Millions of impressions monthly across all print lines." },
    { title: "Precision Standards", desc: "±0.1mm tolerance across all finishing processes." },
  ],
};

export const SUSTAINABILITY = {
  eyebrow: "RESPONSIBLE MANUFACTURING",
  headline: ["Built to Last.", "Built Responsibly."],
  quote: "Premium does not have to cost the planet.",
  quoteAttribution: "OUR MANUFACTURING COMMITMENT",
  items: [
    { num: "01", title: "FSC-Certified Materials", desc: "All paper and board sourced from responsibly managed forests with verified chain of custody certification." },
    { num: "02", title: "Soy-Based Inks", desc: "Zero petroleum-based pigments across all press lines. Pure, vibrant, non-toxic colour with significantly reduced VOC emissions." },
    { num: "03", title: "Waste Reduction Program", desc: "30% of annual production waste is recycled or repurposed. Offcuts are baled and sold to certified recycling partners." },
    { num: "04", title: "Recyclable by Design", desc: "Every packaging structure we engineer is designed for end-of-life recyclability. We brief clients on lower-impact material choices." },
    { num: "05", title: "Water-Based Coatings", desc: "Where UV is not required, we specify water-based aqueous coatings — lower emission, fully recyclable with the substrate." },
    { num: "06", title: "Responsible Consumption", desc: "Energy-efficient press configurations, LED curing systems, and scheduling optimised to minimise idle time and energy waste." },
  ],
};

export const TESTIMONIALS = [
  { quote: "PrintKing delivered our catalog printing with impeccable quality and on schedule. Their Heidelberg presses produce color accuracy that matches international standards.", name: "Marketing Director", title: "Fashion Retail Chain", company: "Lahore" },
  { quote: "We switched to PrintKing for all our packaging and commercial printing. Consistent quality, reliable delivery, and responsive service — exactly what a growing business needs.", name: "Operations Manager", title: "FMCG Company", company: "Karachi" },
  { quote: "From business cards to luxury packaging, PrintKing handles all our print requirements. Their attention to detail and production speed keeps our brand looking professional.", name: "Brand Manager", title: "Corporate Services", company: "Islamabad" },
];

export const GLOBAL_REACH = {
  headline: "Printed in Lahore. Delivered Nationwide & Beyond.",
  sub: "Our printing and packaging solutions serve businesses across Pakistan and international markets — built to world-class standards.",
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
  headline: ["Let's Bring Your", "Print Project to Life."],
  sub: "Tell us about your printing or packaging requirements. We'll respond with a detailed quotation and production timeline within 4 business hours.",
  asideQuote: "Every successful print project begins with clear communication.",
  responseNote: "Typical response time: within 4 business hours.",
  prototypeNote: "Sample production: 24–48 hours from approved specifications.",
  productTypes: [
    "Offset Printing", "Luxury Rigid Box", "Folding Carton", "Mailer Box", "Paper Bag",
    "Labels & Stickers", "Hang Tags", "Catalog or Brochure",
    "Commercial Printing", "Corporate Stationery", "Other",
  ],
};

/* Direct exports for ExecutiveTeam component */
export const CEO = LEADERSHIP.ceo;
export const TEAM = LEADERSHIP.heads;

export const FOOTER = {
  /* Products column of the footer — label + deep link to the product detail page */
  products: PRODUCTS.slice(0, 8).map((p) => ({ label: p.title, to: `/products/${p.slug}` })),
  company: ["About", "Blog", "Machinery", "FAQ", "Careers"],
  industries: INDUSTRIES.slice(0, 6).map((i) => i.name),
  certifications: ["ISO 9001:2015", "FOGRA", "FSC"],
};

const IMG = {
  rigid: "https://images.unsplash.com/photo-1610018556010-6a11691bc905?q=80&w=1200&auto=format&fit=crop",
  box: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=1200&auto=format&fit=crop",
  foil: "https://images.unsplash.com/photo-1556742059-47b93231f536?q=80&w=1200&auto=format&fit=crop",
  press: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1200&auto=format&fit=crop",
};


/* PORTFOLIO / PORTFOLIO_FILTERS removed with the Portfolio page. */

