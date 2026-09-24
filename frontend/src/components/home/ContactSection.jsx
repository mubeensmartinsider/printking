import React from "react";
import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { CONTACT, COMPANY } from "../../lib/content";
import QuoteForm from "../common/QuoteForm";
import { useReveal } from "../../lib/animations";

const CONTACT_ITEMS = [
  { icon: Phone, label: "Call us", value: COMPANY.phone, href: `tel:${COMPANY.phoneTel}` },
  { icon: MessageCircle, label: "WhatsApp", value: COMPANY.phone, href: `https://wa.me/${COMPANY.whatsapp}` },
  { icon: Mail, label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
  { icon: MapPin, label: "Factory", value: COMPANY.address },
  { icon: Clock, label: "Hours", value: COMPANY.hours },
];

const Detail = ({ icon: Icon, label, value, href }) => (
  <div className="flex items-start gap-3 border-b border-border-soft py-2.5">
    <Icon size={17} className="mt-0.5 shrink-0 text-gold" />
    <div className="min-w-0">
      <div className="label text-ink/45">{label}</div>
      {href ? (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
          className="mt-1 block break-words text-sm leading-relaxed text-ink transition-colors hover:text-gold"
        >
          {value}
        </a>
      ) : (
        <div className="mt-1 text-sm leading-relaxed text-ink">{value}</div>
      )}
    </div>
  </div>
);

function FormCard() {
  return (
    <div className="relative rounded-sm border-t-2 border-gold bg-surface-elevated p-4 sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-5 border-b border-border-soft pb-3">
        <div>
          <span className="label text-gold">REQUEST A QUOTE</span>
          <h3 className="mt-1 font-serif text-lg italic text-ink sm:text-xl">Tell us about your project.</h3>
        </div>
        <span className="label shrink-0 text-ink/35">04 HRS</span>
      </div>
      <QuoteForm dense />
    </div>
  );
}

function MapCard() {
  return (
    <div className="aspect-[16/6] w-full overflow-hidden rounded-[4px] border border-gold/20">
      <iframe
        title="PRINTKING location"
        src="https://www.google.com/maps?q=Sagghian%20Flyover%20Lahore&output=embed"
        className="h-full w-full"
        style={{ filter: "grayscale(0.3) contrast(0.9)" }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

function ContactList() {
  return (
    <div>
      {CONTACT_ITEMS.map((item) => (
        <Detail key={item.label} {...item} />
      ))}
    </div>
  );
}

function ClassicLayout() {
  return (
    <div className="relative z-10 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-8">
      <FormCard />
      <div>
        <p className="display mb-3 text-lg italic leading-snug text-ink/75">{CONTACT.asideQuote}</p>
        <ContactList />
        <div className="mt-3"><MapCard /></div>
      </div>
    </div>
  );
}



export default function ContactSection() {
  const ref = useReveal();

  return (
    <section data-testid="contact-section" className="relative overflow-hidden bg-surface-base py-12 sm:py-16 lg:py-20">
      <div className="section-pad relative mx-auto max-w-[1400px]">
        <div ref={ref} className="mb-6 max-w-2xl sm:mb-8">
          <span className="label text-gold">{CONTACT.eyebrow}</span>
          <h2 className="display mt-3 text-2xl leading-[1.08] text-ink sm:text-3xl">
            {CONTACT.headline[0]}<br />
            <span className="italic">{CONTACT.headline[1]}</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink/55">{CONTACT.sub}</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-ink/55">
            <span className="inline-flex items-center gap-1.5">
              <Clock size={13} className="text-gold" />
              {CONTACT.responseNote}
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-gold/60 sm:block" />
            <span>{CONTACT.prototypeNote}</span>
          </div>
        </div>

        <ClassicLayout />
      </div>
    </section>
  );
}
