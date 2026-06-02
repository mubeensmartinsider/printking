import React from "react";
import Seo from "../components/common/Seo";
import ContactSection from "../components/home/ContactSection";

export default function ContactPage() {
  return (
    <>
      <Seo title="Contact PRINTKING — Request a Packaging Quote" description="Get in touch with PRINTKING. Tell us about your packaging project and we'll respond within 4 business hours with a detailed proposal." path="/contact" />
      <div className="pt-20">
        <ContactSection />
      </div>
    </>
  );
}
