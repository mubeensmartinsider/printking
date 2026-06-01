import React from "react";
import { Link } from "react-router-dom";
import { Linkedin, Instagram, Facebook, Youtube } from "lucide-react";
import { COMPANY, FOOTER, NAV_LINKS } from "../../lib/content";

const SocialIcon = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    data-testid={`social-${label.toLowerCase()}`}
    className="flex h-10 w-10 items-center justify-center border border-white/[0.08] text-platinum/70 transition-all duration-300 hover:border-gold hover:text-gold"
  >
    {children}
  </a>
);

const Col = ({ title, children }) => (
  <div>
    <h4 className="label mb-5 text-gold">{title}</h4>
    <ul className="space-y-3">{children}</ul>
  </div>
);

const FLink = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="text-sm text-platinum/60 transition-colors duration-300 hover:text-platinum"
    >
      {children}
    </Link>
  </li>
);

export default function Footer() {
  return (
    <footer data-testid="footer" className="border-t border-white/[0.06] bg-obsidian">
      <div className="section-pad mx-auto max-w-[1400px] py-20">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-3 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="display text-[28px] font-medium text-platinum">
              PRINT<span className="text-gold">KING</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-platinum/55">
              {COMPANY.tagline}. Luxury packaging manufactured to international standards.
            </p>
            <div className="mt-6 flex gap-3">
              <SocialIcon href={COMPANY.social.linkedin} label="LinkedIn"><Linkedin size={17} /></SocialIcon>
              <SocialIcon href={COMPANY.social.instagram} label="Instagram"><Instagram size={17} /></SocialIcon>
              <SocialIcon href={COMPANY.social.facebook} label="Facebook"><Facebook size={17} /></SocialIcon>
              <SocialIcon href={COMPANY.social.youtube} label="YouTube"><Youtube size={17} /></SocialIcon>
            </div>
          </div>

          <Col title="Services">
            {FOOTER.services.map((s) => (
              <FLink key={s} to="/services">{s}</FLink>
            ))}
          </Col>

          <Col title="Company">
            {FOOTER.company.map((c) => {
              const map = {
                About: "/about",
                Portfolio: "/portfolio",
                Machinery: "/machinery",
                Sustainability: "/sustainability",
              };
              return <FLink key={c} to={map[c] || "/"}>{c}</FLink>;
            })}
          </Col>

          <Col title="Industries">
            {FOOTER.industries.map((i) => (
              <FLink key={i} to="/services">{i}</FLink>
            ))}
          </Col>

          <Col title="Contact">
            <li className="text-sm text-platinum/60">{COMPANY.phone}</li>
            <li className="text-sm text-platinum/60">{COMPANY.email}</li>
            <li className="text-sm leading-relaxed text-platinum/60">{COMPANY.address}</li>
            <li className="flex flex-wrap gap-2 pt-3">
              {FOOTER.certifications.map((c) => (
                <span key={c} className="chip label text-platinum/60">{c}</span>
              ))}
            </li>
          </Col>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-xs text-platinum/45 sm:flex-row">
          <p>© 2026 {COMPANY.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-platinum">Privacy Policy</Link>
            <Link to="/" className="hover:text-platinum">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
