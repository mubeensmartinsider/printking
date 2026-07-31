import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { NAV_LINKS } from "../../lib/content";
import MegaMenu from "./MegaMenu";

const COMPACT_NAV_LINKS = [
  { label: "About", to: "/about" },
  { label: "Services", to: "/services", mega: true },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Case Studies", to: "/case-studies" },
];

const MORE_LINKS = [
  { label: "Machinery", to: "/machinery" },
  { label: "Sustainability", to: "/sustainability" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const moreRef = useRef(null);
  const servicesRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
  }, [location.pathname]);

  // Close "More" dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;
  const isMoreActive = MORE_LINKS.some((l) => isActive(l.to));

  return (
    <header
      data-testid="navbar"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-surface-glass/90 backdrop-blur-[24px] saturate-[1.6] border-b border-white/[0.06] shadow-[0_4px_40px_rgba(0,0,0,0.4)]"
          : "bg-gradient-to-b from-black/40 to-transparent border-b border-transparent"
      }`}
    >
      <nav className="section-pad mx-auto flex h-[64px] md:h-[72px] max-w-[1400px] items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          data-testid="logo-link"
          className="group relative flex items-center gap-2"
        >
          <span className="display text-[22px] md:text-[26px] font-medium tracking-tight text-platinum transition-all duration-300 group-hover:tracking-normal">
            PRINT<span className="text-gold relative">
              KING
              <span className="absolute -inset-x-2 -bottom-0.5 h-[1.5px] bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
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
                      if (!servicesRef.current?.contains(document.activeElement)) {
                        setMegaOpen(false);
                      }
                    }, 200);
                  }}
                >
                  <button
                    onClick={() => {
                      navigate("/services");
                      setMegaOpen(false);
                    }}
                    data-testid="nav-services"
                    className={`label relative flex items-center gap-1 px-3 xl:px-4 py-2 text-[13px] xl:text-sm font-medium tracking-wider uppercase transition-all duration-300 ${
                      location.pathname === "/services" || megaOpen
                        ? "text-gold"
                        : "text-platinum/70 hover:text-platinum"
                    }`}
                  >
                    Services
                    <ChevronDown
                      size={12}
                      className={`transition-transform duration-300 ${
                        megaOpen ? "rotate-180" : ""
                      }`}
                    />
                    {location.pathname === "/services" && (
                      <span className="absolute bottom-0 left-3 xl:left-4 right-3 xl:right-4 h-[2px] bg-gold rounded-full shadow-[0_0_8px_rgba(197,160,90,0.5)]" />
                    )}
                  </button>
                  <MegaMenu isOpen={megaOpen} onClose={() => setMegaOpen(false)} />
                </div>
              );
            }
            return (
              <NavLink
                key={l.to}
                to={l.to}
                data-testid={`nav-${l.label.toLowerCase()}`}
                className={({ isActive: active }) =>
                  `label relative px-3 xl:px-4 py-2 text-[13px] xl:text-sm font-medium tracking-wider uppercase transition-all duration-300 ${
                    active
                      ? "text-gold"
                      : "text-platinum/70 hover:text-platinum"
                  }`
                }
              >
                {({ isActive: active }) => (
                  <>
                    {l.label}
                    {active && (
                      <span className="absolute bottom-0 left-3 xl:left-4 right-3 xl:right-4 h-[2px] bg-gold rounded-full shadow-[0_0_8px_rgba(197,160,90,0.5)]" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}

          {/* More Dropdown */}
          <div ref={moreRef} className="relative">
            <button
              onClick={() => setMoreOpen((v) => !v)}
              className={`label relative flex items-center gap-1 px-3 xl:px-4 py-2 text-[13px] xl:text-sm font-medium tracking-wider uppercase transition-all duration-300 ${
                isMoreActive || moreOpen
                  ? "text-gold"
                  : "text-platinum/70 hover:text-platinum"
              }`}
            >
              More
              <ChevronDown
                size={12}
                className={`transition-transform duration-300 ${
                  moreOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-lg border border-white/[0.06] bg-surface-glass/95 backdrop-blur-[24px] saturate-[1.6] shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-300 ${
                moreOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-2 opacity-0"
              }`}
              style={{ pointerEvents: moreOpen ? "auto" : "none" }}
            >
              <div className="py-2">
                {MORE_LINKS.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={() => setMoreOpen(false)}
                    className={({ isActive: active }) =>
                      `flex items-center px-4 py-2.5 text-sm transition-all duration-200 ${
                        active
                          ? "text-gold bg-gold/5 border-l-2 border-gold"
                          : "text-platinum/70 hover:text-platinum hover:bg-white/[0.03] border-l-2 border-transparent"
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

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Phone - icon only on tablet, full text on desktop+ */}
          <a
            href="tel:+924237150138"
            className="hidden sm:flex items-center gap-1.5 px-2 py-2 text-[13px] text-platinum/60 hover:text-gold transition-all duration-300"
            title="Call us: +92 42 37150138"
          >
            <Phone size={14} className="text-gold shrink-0" />
            <span className="hidden lg:inline">+92 42 37150138</span>
          </a>

          {/* Divider */}
          <div className="hidden sm:block h-5 w-px bg-white/[0.06]" />

          {/* Get a Quote Button - hidden on mobile, shown on sm+ */}
          <button
            data-testid="nav-quote-btn"
            data-magnetic
            onClick={() => navigate("/request-quote")}
            className="relative overflow-hidden group hidden sm:inline-flex items-center gap-2 h-9 md:h-10 px-4 md:px-5 text-[12px] md:text-[13px] font-semibold tracking-wider uppercase text-surface-base bg-gradient-to-r from-gold to-gold-600 hover:from-gold-soft hover:to-gold shadow-lg shadow-gold/20 hover:shadow-gold/30 transition-all duration-300 rounded-lg"
          >
            <span className="relative z-10">Get a Quote</span>
            <span className="relative z-10 inline-flex items-center justify-center w-5 h-5 rounded-full bg-black/10 text-[10px]">
              →
            </span>
            {/* Shimmer overlay */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            data-testid="mobile-menu-toggle"
            className="relative flex items-center justify-center w-9 h-9 text-platinum lg:hidden rounded-lg border border-white/[0.06] hover:bg-white/[0.04] transition-all duration-300"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-t border-white/[0.06] bg-surface-glass/95 backdrop-blur-[24px] saturate-[1.6] transition-all duration-500 ease-in-out lg:hidden ${
          open ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="section-pad flex flex-col py-4">
          {/* Main Nav Links */}
          <div className="space-y-1">
            {NAV_LINKS.map((l, i) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                    className={({ isActive: active }) =>
                      `flex items-center justify-between px-4 py-3.5 rounded-lg transition-all duration-300 ${
                        active
                          ? "text-gold bg-gold/10 border border-gold/10"
                          : "text-platinum/80 hover:text-platinum hover:bg-white/[0.02] border border-transparent"
                      }`
                    }
                style={{
                  transitionDelay: open ? `${i * 40}ms` : "0ms",
                  transform: open ? "translateX(0)" : "translateX(-20px)",
                  opacity: open ? 1 : 0,
                  transition: `all 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${open ? `${i * 40}ms` : "0ms"}`,
                }}
              >
                <span className="text-[15px] font-medium">{l.label}</span>
                <span className="text-platinum/20 text-xs">→</span>
              </NavLink>
            ))}
          </div>

          {/* Divider */}
          <div className="my-4 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

          {/* Contact Info */}
          <div className="px-4 space-y-3">
            <a
              href="tel:+924237150138"
              className="flex items-center gap-3 text-sm text-platinum/60 hover:text-gold transition-colors duration-300"
            >
              <Phone size={14} className="text-gold" />
              +92 42 37150138
            </a>
          </div>

          {/* Quote Button */}
          <button
            onClick={() => {
              setOpen(false);
              navigate("/request-quote");
            }}
            className="relative overflow-hidden group mt-4 flex items-center justify-center gap-2 h-11 px-6 text-[13px] font-semibold tracking-wider uppercase text-surface-base bg-gradient-to-r from-gold to-gold-600 hover:from-gold-soft hover:to-gold shadow-lg shadow-gold/20 transition-all duration-300 rounded-lg"
          >
            <span>Get a Quote</span>
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-black/10 text-[10px]">
              →
            </span>
            {/* Shimmer */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </button>
        </div>
      </div>
    </header>
  );
}