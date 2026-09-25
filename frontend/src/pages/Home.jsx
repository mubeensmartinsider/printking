import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import Seo from "../components/common/Seo";
import Hero from "../components/home/Hero";
import ClientLogos from "../components/home/ClientLogos";
const ProductionVideo = lazy(() => import("../components/home/ProductionVideo"));
const ServicesSection = lazy(() => import("../components/home/ServicesSection"));
const Industries = lazy(() => import("../components/home/Industries"));
const MachinerySection = lazy(() => import("../components/home/MachinerySection"));
const ExecutiveTeam = lazy(() => import("../components/home/ExecutiveTeam"));
const Testimonials = lazy(() => import("../components/home/Testimonials"));
const ContactSection = lazy(() => import("../components/home/ContactSection"));

function SectionFallback() {
  return <div className="min-h-[16rem] bg-surface-base" aria-hidden="true" />;
}

function DeferredSection({ children, minHeight = "16rem" }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "320px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={visible ? undefined : { minHeight }}>
      {visible ? children : null}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Seo
        title="PRINTKING — Luxury Packaging Manufacturer Pakistan | Premium Box Printing"
        description="Pakistan's premier luxury packaging manufacturer. Custom rigid boxes, folding cartons, mailers & offset printing for global luxury brands. Request a quote."
        path="/"
      />
      <Hero />
      <ClientLogos />
      <Suspense fallback={<SectionFallback />}>
        <DeferredSection minHeight="22rem"><ProductionVideo /></DeferredSection>
        <DeferredSection minHeight="42rem"><ServicesSection /></DeferredSection>
        <DeferredSection minHeight="28rem"><Industries /></DeferredSection>
        <DeferredSection minHeight="36rem"><MachinerySection /></DeferredSection>
        <DeferredSection minHeight="36rem"><ExecutiveTeam /></DeferredSection>
        <DeferredSection minHeight="28rem"><Testimonials /></DeferredSection>
        <DeferredSection minHeight="36rem"><ContactSection /></DeferredSection>
      </Suspense>
    </>
  );
}
