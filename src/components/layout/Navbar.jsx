import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "../../lib/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="navbar"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-carbon/85 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="section-pad mx-auto flex h-[72px] max-w-[1400px] items-center justify-between">
        <Link
          to="/"
          data-testid="logo-link"
          className="display text-[26px] font-medium tracking-tight text-platinum"
        >
          PRINT<span className="text-gold">KING</span>
        </Link>

        <div className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={`nav-${l.label.toLowerCase()}`}
              className={({ isActive }) =>
                `label transition-colors duration-300 hover:text-gold ${
                  isActive ? "text-gold" : "text-platinum/80"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            data-testid="nav-quote-btn"
            data-magnetic
            onClick={() => navigate("/request-quote")}
            className="btn-gold hidden h-10 sm:inline-flex"
          >
            Request a Quote
          </button>
          <button
            data-testid="mobile-menu-toggle"
            className="text-platinum lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-white/[0.06] bg-carbon/95 backdrop-blur-xl transition-[max-height] duration-500 lg:hidden ${
          open ? "max-h-[460px]" : "max-h-0"
        }`}
      >
        <div className="section-pad flex flex-col gap-1 py-6">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="border-b border-white/[0.05] py-4 font-display text-2xl text-platinum"
            >
              {l.label}
            </NavLink>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              navigate("/request-quote");
            }}
            className="btn-gold mt-4 w-full"
          >
            Request a Quote
          </button>
        </div>
      </div>
    </header>
  );
}
