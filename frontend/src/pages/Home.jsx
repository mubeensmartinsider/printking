import React from "react";
import Seo from "../components/common/Seo";
import Hero from "../components/home/Hero";
import TrustedBy from "../components/home/TrustedBy";
import AboutSection from "../components/home/AboutSection";
import ExecutiveTeam from "../components/home/ExecutiveTeam";
import Manufacturing from "../components/home/Manufacturing";
import ServicesSection from "../components/home/ServicesSection";
import Industries from "../components/home/Industries";
import Process from "../components/home/Process";
import WhyChooseUs from "../components/home/WhyChooseUs";
import ProductionVideo from "../components/home/ProductionVideo";
import MachinerySection from "../components/home/MachinerySection";
import Sustainability from "../components/home/Sustainability";
import Testimonials from "../components/home/Testimonials";
import GlobalReach from "../components/home/GlobalReach";
import ContactSection from "../components/home/ContactSection";

export default function Home() {
  return (
    <>
      <Seo
        title="PRINTKING — Luxury Packaging Manufacturer Pakistan | Premium Box Printing"
        description="Pakistan's premier luxury packaging manufacturer. Custom rigid boxes, folding cartons, mailers & offset printing for global luxury brands. Request a quote."
        path="/"
      />
      <Hero />
      <TrustedBy />
       <ProductionVideo />
      <AboutSection />
      <ExecutiveTeam />
      <Manufacturing />
      <ServicesSection />
      <Industries />
      <Process />
      <WhyChooseUs />
     
      <MachinerySection />
      <Sustainability />
      <Testimonials />
      <GlobalReach />
      <ContactSection />
    </>
  );
}
