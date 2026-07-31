import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ChevronUp } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import CustomCursor from "../effects/CustomCursor";
import PageTransition from "../effects/PageTransition";
import { useSmoothScroll } from "../../lib/useSmoothScroll";
import { getLenis } from "../../lib/useSmoothScroll";

export default function Layout({ children }) {
  useSmoothScroll();
  const { pathname } = useLocation();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  // Reading progress & back-to-top — throttled via passive scroll
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
          setScrollProgress(progress);
          setShowBackToTop(scrollTop > 400);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-obsidian">
      {/* Custom cursor — only on desktop */}
      <CustomCursor />

      {/* Reading progress bar — thin gold line */}
      <div
        className="fixed top-0 left-0 z-[100] h-[2px] bg-gold"
        style={{ width: `${scrollProgress}%`, transition: "width 0.1s linear" }}
      />

      <Navbar />

      {/* Page transitions */}
      <PageTransition>
        <main>{children}</main>
      </PageTransition>

      <Footer />
      <WhatsAppButton />

      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-32 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-surface-glass backdrop-blur-[12px] text-gold shadow-lg transition-all duration-500 ease-lux hover:border-gold hover:bg-gold/10 md:bottom-24 ${
          showBackToTop
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <ChevronUp size={20} strokeWidth={1.5} />
      </button>
    </div>
  );
}