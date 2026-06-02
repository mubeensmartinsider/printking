import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import Cursor from "./Cursor";
import { useSmoothScroll } from "../../lib/useSmoothScroll";
import { getLenis } from "../../lib/useSmoothScroll";

export default function Layout({ children }) {
  useSmoothScroll();
  const { pathname } = useLocation();

  useEffect(() => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="relative min-h-screen bg-obsidian">
      <Cursor />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
