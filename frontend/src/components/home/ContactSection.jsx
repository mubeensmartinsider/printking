import React from "react";
import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { CONTACT, COMPANY } from "../../lib/content";
import QuoteForm from "../common/QuoteForm";
import { useReveal } from "../../lib/animations";

const Detail = ({ icon: Icon, label, value, href }) => (
  <div className="flex items-start gap-4 border-b border-white/[0.07] py-4">
    <Icon size={17} className="mt-0.5 text-gold" />
    <div>
      <div className="label text-platinum/45">{label}</div>
      {href ? (
        <a href={href} className="mt-1 block text-sm text-platinum transition-colors hover:text-gold">{value}</a>
      ) : (
        <div className="mt-1 text-sm text-platinum">{value}</div>
      )}
    </div>
  </div>
);

export default function ContactSection() {
  const ref = useReveal();
  return (
    <section data-testid="contact-section" className="relative bg-obsidian py-28 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern-contact pointer-events-none" />
      <div className="section-pad relative mx-auto max-w-[1400px]">
        <div ref={ref} className="mb-16 max-w-2xl">
          <span className="label text-gold">{CONTACT.eyebrow}</span>
          <h2 className="display mt-6 text-4xl leading-[1.08] text-platinum sm:text-5xl">
            {CONTACT.headline[0]}
            <br />
            <span className="italic">{CONTACT.headline[1]}</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-platinum/55">{CONTACT.sub}</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          {/* Form */}
          <div className="border-t-2 border-gold bg-[linear-gradient(145deg,#1c1814,#241f1a)] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.5)] sm:p-10 rounded-sm">
            <QuoteForm />
          </div>

          {/* Details */}
          <div>
            <p className="display mb-8 text-[22px] italic leading-snug text-platinum/80">
              Every great brand partnership begins with a conversation.
            </p>
            <Detail icon={Phone} label="Call Us" value={COMPANY.phone} href={`tel:${COMPANY.phoneTel}`} />
            <Detail icon={MessageCircle} label="WhatsApp" value={COMPANY.phone} href={`https://wa.me/${COMPANY.whatsapp}`} />
            <Detail icon={Mail} label="Email" value={COMPANY.email} href={`mailto:${COMPANY.email}`} />
            <Detail icon={MapPin} label="Factory" value={COMPANY.address} />
            <Detail icon={Clock} label="Hours" value={COMPANY.hours} />

            <div className="mt-6 flex items-start gap-3 border-t-2 border-gold/70 bg-[#1c1814] p-5 rounded-sm">
              <Clock size={16} className="mt-0.5 text-gold" />
              <div className="text-[12px] leading-relaxed text-platinum/65">
                <p>{CONTACT.responseNote}</p>
                <p className="mt-1">{CONTACT.prototypeNote}</p>
              </div>
            </div>

            {/* Google Maps — dark-styled frame */}
            <div className="mt-6 aspect-video w-full overflow-hidden rounded-[4px] border border-gold/20">
              <iframe
                title="PRINTKING location"
                src="https://www.google.com/maps?q=Sagghian%20Flyover%20Lahore&output=embed"
                className="h-full w-full"
                style={{ filter: "grayscale(0.6) sepia(0.4) hue-rotate(320deg) saturate(0.7) brightness(0.85) contrast(0.9)" }}
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
