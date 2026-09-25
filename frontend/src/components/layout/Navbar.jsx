import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Phone, Search, Linkedin, Instagram, Facebook, Youtube } from "lucide-react";
import { NAV_LINKS, COMPANY } from "../../lib/content";
import MegaMenu from "./MegaMenu";
import ThemeToggle from "../common/ThemeToggle";

const COMPACT_NAV_LINKS = [
  { label: "About",        to: "/about" },
  { label: "Services",     to: "/services", mega: true },
  { label: "Portfolio",    to: "/portfolio" },
  { label: "Case Studies", to: "/case-studies" },
];

const MORE_LINKS = [
  { label: "Machinery",       to: "/machinery" },
  { label: "Sustainability",  to: "/sustainability" },
  { label: "FAQ",             to: "/faq" },
  { label: "Contact",         to: "/contact" },
];

/* pages searchable from the navbar */
const SEARCH_PAGES = [...COMPACT_NAV_LINKS, ...MORE_LINKS];

const SOCIALS = [
  { label: "LinkedIn",  href: COMPANY.social.linkedin,  Icon: Linkedin },
  { label: "Instagram", href: COMPANY.social.instagram, Icon: Instagram },
  { label: "Facebook",  href: COMPANY.social.facebook,  Icon: Facebook },
  { label: "YouTube",   href: COMPANY.social.youtube,   Icon: Youtube },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [query, setQuery]       = useState("");
  const moreRef     = useRef(null);
  const servicesRef = useRef(null);
  const searchRef   = useRef(null);
  const navigate    = useNavigate();
  const location    = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); setMoreOpen(false); }, [location.pathname]);

  useEffect(() => {
    const handler = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setQuery("");
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isMoreActive = MORE_LINKS.some((l) => location.pathname === l.to);

  /* ── search ── */
  const results = query.trim()
    ? SEARCH_PAGES.filter((l) => l.label.toLowerCase().includes(query.trim().toLowerCase()))
    : [];

  const goToPage = (l) => {
    navigate(l.to);
    setQuery("");
  };

  /* nav link colour — visible on both themes */
  const linkCls = (active) =>
    `label relative px-3 xl:px-4 py-2 text-[13px] xl:text-sm font-medium tracking-wider uppercase transition-all duration-300 ${
      active ? "text-gold" : "text-platinum/60 hover:text-platinum"
    }`;

  return (
    <header
      data-testid="navbar"
      className="navbar-luxury fixed inset-x-0 top-0 z-50 transition-all duration-500 border-b border-border-soft shadow-md"
    >
      <style>{`
        .navbar-luxury {
          --color-platinum: #f0ebe2;
          --text-secondary: #a89f93;
          --text-tertiary: #6b6155;
          --color-border: rgba(255, 255, 255, 0.12);
          --color-border-strong: rgba(255, 255, 255, 0.18);
          --surface-elevated: #1c1814;
          --surface-hover: #2a2520;
          --surface-floating: #241f1a;
          --color-gold: #c5a05a;
          --gold-whisper: rgba(197, 160, 90, 0.12);
          position: relative;
          width: 100%;
          border-color: var(--color-border);
          background: #0d0b09;
          box-shadow: 0 12px 34px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(22px) saturate(150%);
        }

        .navbar-luxury::before {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          z-index: 2;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--color-gold), transparent);
          opacity: 0.7;
        }

        .navbar-luxury__utility {
          position: relative;
          z-index: 1;
          background: #0d0b09;
        }

        .navbar-luxury__utility-inner { min-height: 62px; }

        .navbar-luxury__utility-inner > a img {
          height: 44px;
          width: auto;
          border-radius: 2px;
          transition: transform 250ms var(--ease-out-soft), filter 250ms ease;
        }

        .navbar-luxury__utility-inner > a:hover img {
          filter: drop-shadow(0 4px 10px rgba(197, 160, 90, 0.2));
          transform: scale(1.04);
        }

        .navbar-luxury__search-field {
          border-color: #ded8cd;
          color: #8b6a32;
          background: #faf9f7;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.14);
        }

        .navbar-luxury__search-field:focus-within {
          border-color: var(--color-gold);
          box-shadow: 0 0 0 3px var(--gold-whisper);
        }

        .navbar-luxury__search-field input { color: #1c1a17; }
        .navbar-luxury__search-field input::placeholder { color: #8a8076; }
        .navbar-luxury__search-field button { color: #5a5248; }

        .navbar-luxury__search-results {
          border-color: #ded8cd;
          background: #faf9f7;
          box-shadow: 0 18px 45px rgba(26, 20, 12, 0.16);
        }

        .navbar-luxury__search-results button { color: #1c1a17; }
        .navbar-luxury__search-results button:hover { color: #8b6a32; background: #f1ede6; }
        .navbar-luxury__search-results > div:last-child { color: #6f675d; }

        .navbar-luxury__social {
          color: #a89f93;
          border-color: rgba(255, 255, 255, 0.14);
        }

        .navbar-luxury__social:hover { color: var(--color-gold); border-color: var(--color-gold); }

        .navbar-luxury__main {
          position: relative;
          z-index: 1;
          min-height: 74px;
          background: #0d0b09;
          border-top: 1px solid rgba(255, 255, 255, 0.04);
        }

        .navbar-luxury__main .label {
          color: #a89f93;
          letter-spacing: 0.15em;
          transition: color 250ms ease, background 250ms ease;
        }

        .navbar-luxury__main .label:hover,
        .navbar-luxury__main .label.text-gold { color: var(--color-gold); }

        .navbar-luxury__main .label:hover { background: rgba(197, 160, 90, 0.07); }

        .navbar-luxury__main > div:last-child > a,
        .navbar-luxury__main > div:last-child > button { transition: transform 220ms ease, box-shadow 220ms ease; }

        .navbar-luxury__main > div:last-child > button[data-testid="nav-quote-btn"] {
          box-shadow: 0 8px 20px rgba(197, 160, 90, 0.16);
        }

        .navbar-luxury__main > div:last-child > button[data-testid="nav-quote-btn"]:hover {
          box-shadow: 0 12px 26px rgba(197, 160, 90, 0.26);
          transform: translateY(-1px);
        }
        .navbar-luxury__more {
          border-color: #ded8cd !important;
          background: #faf9f7 !important;
          box-shadow: 0 18px 45px rgba(26, 20, 12, 0.16) !important;
        }

        .navbar-luxury__more a {
          color: #5a5248 !important;
          border-left-color: transparent !important;
        }

        .navbar-luxury__more a:hover {
          color: #8b6a32 !important;
          background: #f1ede6 !important;
          border-left-color: #c5a05a !important;
        }

        .navbar-luxury__more a.text-gold {
          color: #8b6a32 !important;
          background: #f1ede6 !important;
          border-left-color: #c5a05a !important;
        }

        .navbar-luxury__mobile {
          border-color: #ded8cd !important;
          background: #faf9f7 !important;
          color: #1c1a17;
        }

        .navbar-luxury__mobile .space-y-1 > a {
          border-color: transparent;
          color: #5a5248;
          background: transparent;
        }

        .navbar-luxury__mobile .space-y-1 > a:hover,
        .navbar-luxury__mobile .space-y-1 > a.text-gold {
          border-color: #e5d7b7;
          color: #8b6a32;
          background: #f1ede6;
        }

        .navbar-luxury__mobile a[href^="tel"] { color: #5a5248; }
        .navbar-luxury__mobile a[href^="tel"]:hover { color: #8b6a32; }

        @media (max-width: 640px) {
          .navbar-luxury__utility-inner { min-height: 56px; }
          .navbar-luxury__utility-inner > a img { height: 38px; }
          .navbar-luxury__search { width: 2.4rem !important; }
          .navbar-luxury__search-field { justify-content: center; padding: 0; }
          .navbar-luxury__search-field input { position: absolute; width: 1px; opacity: 0; pointer-events: none; }
          .navbar-luxury__search-results { left: auto; width: min(18rem, calc(100vw - 2rem)); }
          .navbar-luxury__socials { display: none !important; }
        }
      `}</style>

      <div
        className="navbar-luxury__utility border-b border-border-soft"
        style={{
          backgroundColor: "var(--surface-glass-nav, var(--surface-base))",
          backdropFilter:  "blur(20px) saturate(160%)",
        }}
      >
        <div className="navbar-luxury__utility-inner section-pad flex w-full items-center justify-between gap-4 py-2 md:py-2.5">
          <Link to="/" data-testid="logo-link" className="group relative flex items-center">
            <img
              src="/assets/logo.png"
              alt="PrintKing Logo"
              className="h-10 w-auto md:h-12 rounded-sm transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Search + socials */}
          <div className="flex items-center gap-2 sm:gap-3">
          <div ref={searchRef} className="navbar-luxury__search relative w-28 sm:w-44 lg:w-64">
            <div className="navbar-luxury__search-field flex items-center gap-2 h-9 rounded-lg border border-border-strong bg-[#faf9f7] px-3 transition-colors duration-300 focus-within:border-gold/60">
              <Search size={15} className="shrink-0 text-gold" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setQuery("");
                  if (e.key === "Enter" && results.length > 0) goToPage(results[0]);
                }}
                placeholder="Search pages…"
                aria-label="Search site"
                className="w-full bg-transparent text-[13px] text-[#1c1a17] placeholder:text-[#8a8076] outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="shrink-0 text-ink opacity-40 hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Results dropdown */}
            {query.trim() && (
              <div className="navbar-luxury__search-results absolute right-0 top-full mt-2 w-72 max-w-[calc(100vw-2rem)] overflow-hidden rounded-lg border border-border-soft bg-surface-floating backdrop-blur-[20px] shadow-xl z-50">
                {results.length > 0 ? (
                  <div className="py-2">
                    {results.map((l) => (
                      <button
                        key={l.to}
                        onClick={() => goToPage(l)}
                        className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-left text-ink opacity-70 hover:opacity-100 hover:bg-surface-hover transition-all duration-200"
                      >
                        <Search size={13} className="shrink-0 text-gold" />
                        {l.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-3 text-sm text-ink-tertiary">No results for “{query}”</div>
                )}
              </div>
            )}
          </div>

            {/* Socials */}
            <div className="navbar-luxury__socials hidden sm:flex items-center gap-2">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="navbar-luxury__social flex h-8 w-8 items-center justify-center rounded-full border border-border-soft text-ink opacity-60 hover:opacity-100 hover:text-gold hover:border-gold/50 transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Lower header: navbar (always dark-themed via .dark scope) ── */}
      <nav
        className="navbar-luxury__main dark section-pad flex w-full h-[64px] md:h-[72px] items-center justify-between"
        style={{
          backgroundColor: "var(--surface-glass-nav, #0d0b09)",
          backdropFilter:  "blur(20px) saturate(160%)",
        }}
      >

        {/* ── Desktop Nav ── */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {COMPACT_NAV_LINKS.map((l) => {
            if (l.mega) {
              return (
                <div
                  key={l.label}
                  ref={servicesRef}
                  className="relative"
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => {
                    setTimeout(() => {
                      if (!servicesRef.current?.contains(document.activeElement)) setMegaOpen(false);
                    }, 200);
                  }}
                >
                  <button
                    onClick={() => { navigate("/services"); setMegaOpen(false); }}
                    data-testid="nav-services"
                    className={linkCls(location.pathname === "/services" || megaOpen)}
                  >
                    Services
                    <ChevronDown size={12} className={`ml-1 inline transition-transform duration-300 ${megaOpen ? "rotate-180" : ""}`} />
                    {location.pathname === "/services" && (
                      <span className="absolute bottom-0 left-3 xl:left-4 right-3 xl:right-4 h-[2px] bg-gold rounded-full" />
                    )}
                  </button>
                  <MegaMenu isOpen={megaOpen} onClose={() => setMegaOpen(false)} />
                </div>
              );
            }
            return (
              <NavLink key={l.to} to={l.to} data-testid={`nav-${l.label.toLowerCase()}`}
                className={({ isActive: a }) => linkCls(a)}
              >
                {({ isActive: a }) => (
                  <>
                    {l.label}
                    {a && <span className="absolute bottom-0 left-3 xl:left-4 right-3 xl:right-4 h-[2px] bg-gold rounded-full" />}
                  </>
                )}
              </NavLink>
            );
          })}

          {/* More Dropdown */}
          <div ref={moreRef} className="relative">
            <button
              onClick={() => setMoreOpen((v) => !v)}
              className={linkCls(isMoreActive || moreOpen)}
            >
              More
              <ChevronDown size={12} className={`ml-1 inline transition-transform duration-300 ${moreOpen ? "rotate-180" : ""}`} />
            </button>

            <div
              className={`navbar-luxury__more absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-lg border border-border-soft bg-surface-floating backdrop-blur-[20px] shadow-xl transition-all duration-300 ${
                moreOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
              }`}
              style={{ pointerEvents: moreOpen ? "auto" : "none" }}
            >
              <div className="py-2">
                {MORE_LINKS.map((l) => (
                  <NavLink key={l.to} to={l.to} onClick={() => setMoreOpen(false)}
                    className={({ isActive: a }) =>
                      `flex items-center px-4 py-2.5 text-sm transition-colors duration-200 border-l-2 ${
                        a
                          ? "text-gold bg-gold/5 border-gold"
                          : "text-ink/70 hover:text-ink hover:bg-surface-hover border-transparent"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Actions ── */}
        <div className="flex items-center gap-2 md:gap-3">
          <ThemeToggle />

          {/* Phone */}
          <a
            href="tel:+924237150138"
            className="hidden lg:flex items-center gap-3 text-sm text-ink opacity-70 hover:text-gold transition-colors duration-300"
          >
            <Phone size={14} className="text-gold" />
            +92 42 37150138
          </a>

          <div className="hidden md:block h-5 w-px bg-border-soft" />

          <button
            data-testid="nav-quote-btn"
            onClick={() => navigate("/request-quote")}
            className="relative overflow-hidden group hidden sm:inline-flex items-center gap-2 h-9 md:h-10 px-4 md:px-5 text-[12px] md:text-[13px] font-semibold tracking-wider uppercase bg-gold hover:bg-gold-soft text-obsidian shadow-md transition-all duration-300 rounded-lg"
          >
            <span className="relative z-10">Get a Quote</span>
            <span className="relative z-10 text-[10px]">→</span>
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </button>

          <button
            data-testid="mobile-menu-toggle"
            className="relative flex items-center justify-center w-9 h-9 text-ink lg:hidden rounded-lg border border-border-soft hover:bg-surface-elevated transition-colors duration-300"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      <div
        className={`navbar-luxury__mobile dark overflow-hidden border-t border-border-soft bg-surface-base backdrop-blur-[20px] transition-all duration-500 lg:hidden ${
          open ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="navbar-luxury__mobile-inner section-pad flex flex-col py-4">

          <div className="space-y-1">
            {NAV_LINKS.map((l, i) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive: a }) =>
                  `flex items-center justify-between px-4 py-3.5 rounded-lg transition-all duration-300 border ${
                    a
                      ? "text-gold bg-gold/10 border-gold/10"
                      : "text-ink/80 hover:text-ink hover:bg-surface-elevated border-transparent"
                  }`
                }
                style={{
                  transitionDelay: open ? `${i * 40}ms` : "0ms",
                  transform: open ? "translateX(0)" : "translateX(-20px)",
                  opacity: open ? 1 : 0,
                  transition: `all 0.3s cubic-bezier(0.16,1,0.3,1) ${open ? `${i * 40}ms` : "0ms"}`,
                }}
              >
                <span className="text-[15px] font-medium">{l.label}</span>
                <span className="text-ink/20 text-xs">→</span>
              </NavLink>
            ))}
          </div>

          <div className="my-4 h-px" style={{ background: "var(--color-border)" }} />

          <div className="px-4">
            <a href="tel:+924237150138"
              className="flex items-center gap-3 text-sm text-ink/60 hover:text-gold transition-colors duration-300"
            >
              <Phone size={14} className="text-gold" />
              +92 42 37150138
            </a>
          </div>

          <button
            onClick={() => { setOpen(false); navigate("/request-quote"); }}
            className="relative overflow-hidden group mt-4 flex items-center justify-center gap-2 h-11 px-6 text-[13px] font-semibold tracking-wider uppercase bg-gold hover:bg-gold-soft text-obsidian shadow-md transition-all duration-300 rounded-lg"
          >
            <span>Get a Quote</span>
            <span className="text-[10px]">→</span>
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </button>

        </div>
      </div>
    </header>
  );
}
