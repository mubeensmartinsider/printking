# PRINTKING — Product Requirements Document

## Original Problem Statement
Build a production-ready, award-worthy premium website for **PRINTKING**, a luxury
printing & packaging manufacturer in Pakistan. Standard: Apple / Fedrigoni / Rolls-Royce
level craft. Cinematic scroll, 3D hero, restraint-driven luxury (obsidian + gold).

## User Choices (confirmed)
- Stack: **React (CRA)** + Three.js (R3F/Drei) + GSAP/ScrollTrigger + Lenis + Tailwind (Next.js not supported in env).
- Quote/Contact form: **EmailJS (client-side) + WhatsApp deep-link, NO backend**.
- Company name: **PRINTKING**.
- 3D hero: **custom procedural matte-black + gold-foil rigid box**.
- Scope: full cinematic homepage (13 sections) first, then inner pages.

## Architecture
- Frontend-only. No FastAPI/Mongo usage. React Router for pages.
- Design tokens in `src/styles/tokens.css`; global system in `src/index.css`; Tailwind extended with brand palette + fonts (Cormorant Garamond + Inter).
- Animation system: `src/lib/animations.js` (useReveal/useStagger/useCountUp), `src/lib/useSmoothScroll.js` (Lenis + ScrollTrigger sync).
- 3D scene `src/three/HeroBox.jsx` authored via `React.createElement` (NOT JSX) to avoid the visual-edit babel plugin injecting `x-line-number` attrs that crash R3F.
- Lead delivery: `src/lib/leadService.js` — `sendQuote()` via EmailJS, falls back to `buildWhatsAppLink()` when `REACT_APP_EMAILJS_*` env vars are unset.
- Content single-source: `src/lib/content.js`.

## What's been implemented (2026-06-01)
- **Homepage** with 13 sections: Cinematic 3D Hero, Trusted-by marquee, About (parallax film grid), Manufacturing capability cards, Services (GSAP horizontal pinned scroll, 13 panels), Industries (hex grid), Process (SVG stroke-draw timeline), Why Choose Us, Machinery (editorial grid + lightbox), Sustainability (green-tint), Testimonials (auto rotator), Global Reach (animated map + pulse dots), Contact (form + details + map embed).
- **Inner pages**: /about (milestones timeline, values, certifications), /services (13 cards + finishes + CTA), /portfolio (filterable masonry + lightbox), /machinery (editorial grid + lightbox), /sustainability (manifesto + impact count-ups), /contact, /request-quote (3-step wizard).
- Navbar (scroll-aware + mobile menu), Footer (5-col), floating WhatsApp button, sonner toasts.
- SEO: per-page `<Seo>` (title/description/OG/canonical), `public/sitemap.xml`, `public/robots.txt`, updated index.html title/meta.
- Tested: frontend 100% pass, no runtime errors (testing agent iteration_1).

## Backlog / Next tasks
- P1: Configure EmailJS (REACT_APP_EMAILJS_SERVICE_ID / TEMPLATE_ID / PUBLIC_KEY) to enable email delivery in addition to WhatsApp.
- P1: Replace placeholder company details (phone/whatsapp/email/address) and brand logos with real ones.
- P2: Individual service detail pages (per-service hero/specs/MOQ).
- P2: Blog (editorial, SEO long-form), real machinery/portfolio photography.
- P2: Light-mode product showcase sections; Organization/LocalBusiness/Product JSON-LD schema.
EOF

## Elevation Pass — Real Data + Cinematic Upgrade (2026-06-02)
- **Real company data** injected site-wide from `lib/content.js`: PrintKing (SMC-Private) Ltd, Lahore, tagline "Passion · Quality · Innovation", phone +92 42 37150138-40, sales@printking.com.pk, real socials.
- **Real management team** (CEO Muhammad Shafiq Chaudhary + Naveed Ehsan, Waqas Shafiq, Sohail Anjum, Alweena Tasneem, Hamza Shafiq) in new **Executive Team** section (initials placeholders + parallax cards).
- **Real clients** (Bareezé, Warda, Nestlé, Telenor, ChenOne, Polo Ralph Lauren, Armani, etc.) in marquee + **Media Partners** strip (Heidelberg, Kodak, Apple, Xerox, Bobst, Techkon).
- **Real machinery** (8 Heidelberg presses, Kodak Trendsetter CTP, Polar 92, Stahlfolder, hot foil) on machinery section/page.
- **New sections**: Executive Team, Production Video showcase (play stub + floating stats + capability strip).
- **Navy + Gold palette** upgrade (tokens.css + tailwind: obsidian #07080f / carbon #0d0f1e / graphite #141628 / platinum #eeeef2).
- **Magnetic custom cursor** (Cursor.jsx, desktop-only) with hover-expand + [data-magnetic] pull on CTAs.
- **3D hero enhanced**: meshPhysicalMaterial clearcoat, gold ribbon cross, floating kraft mailer box, gold dust particles (Sparkles).
- **Content purge**: portfolio/services reframed packaging-correct (boxes/bags/tags/labels/catalogs/reports) — no standalone bottles/food/electronics.
- Real counters: 15+ years, 8 presses, 60+ specialists, 12,000 m².
- `PLACEHOLDER_GUIDE.md` added at /app root. Tested: frontend 100% (iteration_2.json), no runtime errors.

## Updated Backlog
- P1: Real exec headshots → swap initials placeholders in ExecutiveTeam.jsx photo slots.
- P1: Real production MP4 → wire <video> into ProductionVideo onPlay (VIDEO SLOT comment).
- P1: Set COMPANY.whatsapp to a WhatsApp-enabled mobile (currently the landline) + configure EmailJS keys.
- P2: Real client logo SVGs (replace text wordmarks), real machinery/portfolio photos, Blog + JSON-LD schema, per-service detail pages.
