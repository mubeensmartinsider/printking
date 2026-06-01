import React from "react";
import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { CONTACT, COMPANY } from "../../lib/content";
import QuoteForm from "../common/QuoteForm";
import { useReveal } from "../../lib/animations";

const Detail = ({ icon: Icon, label, value, href }) => (
  <div className="flex items-start gap-4 border-b border-white/[0.07] py-5">
    <Icon size={18} className="mt-0.5 text-gold" />
    <div>
      <div className="label text-platinum/45">{label}</div>
      {href ? (
        <a href={href} className="mt-1 block text-[15px] text-platinum transition-colors hover:text-gold">
          {value}
        </a>
      ) : (
        <div className="mt-1 text-[15px] text-platinum">{value}</div>
      )}
    </div>
  </div>
);

export default function ContactSection() {
  const ref = useReveal();
  return (
    <section data-testid="contact-section" className="bg-obsidian py-28">
      <div className="section-pad mx-auto max-w-[1400px]">
        <div ref={ref} className="mb-16 max-w-2xl">
          <span className="label text-gold">{CONTACT.eyebrow}</span>
          <h2 className="display mt-6 text-4xl leading-tight text-platinum sm:text-5xl">
            {CONTACT.headline}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-platinum/55">{CONTACT.sub}</p>
        </div>

        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Form */}
          <div className="border border-white/[0.06] bg-carbon p-8 sm:p-10">
            <QuoteForm />
          </div>

          {/* Details + map */}
          <div>
            <Detail icon={Phone} label="Call Us" value={COMPANY.phone} href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} />
            <Detail icon={MessageCircle} label="WhatsApp" value={COMPANY.phone} href={`https://wa.me/${COMPANY.whatsapp}`} />
            <Detail icon={Mail} label="Email" value={COMPANY.email} href={`mailto:${COMPANY.email}`} />
            <Detail icon={MapPin} label="Factory" value={COMPANY.address} />
            <Detail icon={Clock} label="Hours" value={COMPANY.hours} />

            <div className="mt-8 aspect-video w-full overflow-hidden border border-white/[0.06] grayscale">
              <iframe
                title="PRINTKING location"
                src="https://www.google.com/maps?q=Korangi%20Industrial%20Area%20Karachi&output=embed"
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
