import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { SERVICES } from "../../lib/content";

const SERVICES_COLUMNS = [
  {
    title: "Core Products",
    items: SERVICES.slice(0, 7).map((s) => ({
      label: s.title,
      to: "/services",
      desc: s.desc.substring(0, 60) + "...",
    })),
  },
  {
    title: "Capabilities",
    items: [
      { label: "Offset Printing", to: "/services", desc: "Heidelberg precision printing" },
      { label: "Die-Cutting", to: "/services", desc: "±0.1mm tolerance" },
      { label: "Foil Stamping", to: "/services", desc: "Gold, silver & custom foil" },
      { label: "Lamination", to: "/services", desc: "Matte, gloss & soft-touch" },
      { label: "UV Coating", to: "/services", desc: "Spot & full flood UV" },
      { label: "Rigid Box Assembly", to: "/services", desc: "Magnetic, clamshell & more" },
    ],
  },
  {
    title: "View All",
    items: [
      { label: "All Services →", to: "/services", desc: "Full capability overview" },
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
      <div className="mt-2 overflow-hidden rounded-xl border border-white/[0.06] bg-surface-glass/95 backdrop-blur-[24px] saturate-[1.6] shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        <div className="grid grid-cols-3 gap-0">
          {SERVICES_COLUMNS.map((col, ci) => (
            <div
              key={ci}
              className={`p-6 ${
                ci < SERVICES_COLUMNS.length - 1
                  ? "border-r border-white/[0.06]"
                  : ""
              }`}
            >
              <h4 className="label mb-4 text-gold text-[11px] font-semibold tracking-[0.15em] uppercase">
                {col.title}
              </h4>
              <ul className="space-y-1">
                {col.items.map((item, ii) => (
                  <li key={ii}>
                    <Link
                      to={item.to}
                      className="group block rounded-lg px-3 py-2.5 transition-all duration-200 hover:bg-gold/5"
                      onClick={() => {
                        setPanelHover(false);
                        onClose();
                      }}
                    >
                      <span className="text-sm font-medium text-platinum transition-colors duration-200 group-hover:text-gold">
                        {item.label}
                      </span>
                      {item.desc && (
                        <span className="mt-0.5 block text-[11px] leading-relaxed text-platinum/40">
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