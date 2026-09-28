import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../../lib/content";

const SERVICES_COLUMNS = [
  {
    title: "Core Products",
    /* Deep link straight into each product's detail page */
    items: PRODUCTS.slice(0, 7).map((p) => ({
      label: p.title,
      to: `/products/${p.slug}`,
      desc: p.short.substring(0, 60) + "...",
    })),
  },
  {
    title: "Capabilities",
    items: [
      { label: "Offset Printing", to: "/products/offset-printing", desc: "Heidelberg precision printing" },
      { label: "Die-Cutting", to: "/products/uv-finishing", desc: "±0.1mm tolerance" },
      { label: "Foil Stamping", to: "/products/uv-finishing", desc: "Gold, silver & custom foil" },
      { label: "Lamination", to: "/products/uv-finishing", desc: "Matte, gloss & soft-touch" },
      { label: "UV Coating", to: "/products/uv-finishing", desc: "Spot & full flood UV" },
      { label: "Rigid Box Assembly", to: "/products/luxury-rigid-boxes", desc: "Magnetic, clamshell & more" },
    ],
  },
  {
    title: "View All",
    items: [
      { label: "All Products →", to: "/products", desc: "Full product range" },
      { label: "Request a Quote →", to: "/request-quote", desc: "Start your project" },
    ],
  },
];

export default function MegaMenu({ isOpen, onClose }) {
  const [panelHover, setPanelHover] = useState(false);
  const timeoutRef = useRef(null);
  const panelRef = useRef(null);

  const handleMouseEnterPanel = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setPanelHover(true);
  };

  const handleMouseLeavePanel = () => {
    timeoutRef.current = setTimeout(() => {
      setPanelHover(false);
      onClose();
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const show = isOpen || panelHover;

  return (
    <div
      ref={panelRef}
      onMouseEnter={handleMouseEnterPanel}
      onMouseLeave={handleMouseLeavePanel}
      className={`absolute left-0 top-full w-screen max-w-[900px] transition-all duration-400 ease-lux ${
        show
          ? "visible translate-y-0 opacity-100"
          : "invisible -translate-y-2 opacity-0"
      }`}
      style={{
        perspective: "1200px",
        pointerEvents: show ? "auto" : "none",
      }}
    >
      {/* Fixed white plate in BOTH themes (as designed) — its contents use the
          plate-* tokens, which never flip, so they stay dark on white. */}
      <div className="mt-2 overflow-hidden rounded-xl border border-plate-border bg-white shadow-[0_24px_60px_-12px_rgba(13,11,9,0.35)] backdrop-blur-[24px]">
        <div className="grid grid-cols-1 sm:grid-cols-3">
          {SERVICES_COLUMNS.map((col, ci) => (
            <div
              key={ci}
              className={`p-5 sm:p-6 ${
                ci < SERVICES_COLUMNS.length - 1
                  ? "border-b border-plate-border sm:border-b-0 sm:border-r"
                  : ""
              }`}
            >
              <h4 className="label mb-4 text-plate-gold text-[11px] font-semibold tracking-[0.15em] uppercase">
                {col.title}
              </h4>
              <ul className="space-y-1">
                {col.items.map((item, ii) => (
                  <li key={ii}>
                    <Link
                      to={item.to}
                      className="group block rounded-lg px-3 py-2.5 transition-all duration-200 hover:bg-plate-hover"
                      onClick={() => {
                        setPanelHover(false);
                        onClose();
                      }}
                    >
                      <span className="text-sm font-medium text-plate-ink transition-colors duration-200 group-hover:text-plate-gold">
                        {item.label}
                      </span>
                      {item.desc && (
                        <span className="mt-0.5 block text-[11px] leading-relaxed text-plate-ink-secondary">
                          {item.desc}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}