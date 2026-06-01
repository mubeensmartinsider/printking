import React, { useState } from "react";
import { toast } from "sonner";
import { Loader2, ArrowRight } from "lucide-react";
import { CONTACT } from "../../lib/content";
import { sendQuote, buildWhatsAppLink, isEmailConfigured } from "../../lib/leadService";

const initial = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  productType: "",
  quantity: "",
  timeline: "",
  message: "",
  whatsappOptIn: true,
};

const field =
  "w-full bg-transparent border-b border-white/15 py-3 text-platinum placeholder:text-platinum/35 focus:border-gold focus:outline-none transition-colors duration-300 text-[15px]";

export default function QuoteForm({ compact = false }) {
  const [data, setData] = useState(initial);
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));

  const validate = () => {
    if (!data.fullName.trim()) return "Please enter your full name.";
    if (!data.company.trim()) return "Please enter your company / brand name.";
    if (!/^\S+@\S+\.\S+$/.test(data.email)) return "Please enter a valid email address.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }
    setLoading(true);
    const res = await sendQuote(data);
    setLoading(false);

    if (res.ok) {
      toast.success("Quote request sent. We'll respond within 4 business hours.");
      setData(initial);
      return;
    }

    // No backend — fall back to WhatsApp deep link with the data pre-filled
    const link = buildWhatsAppLink(data);
    if (!isEmailConfigured()) {
      toast.message("Opening WhatsApp to send your request…", {
        description: "Email delivery isn't configured yet — your details are pre-filled in WhatsApp.",
      });
    } else {
      toast.error("Email delivery failed. Opening WhatsApp as a fallback.");
    }
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <form data-testid="quote-form" onSubmit={handleSubmit} className="space-y-7">
      <div className={`grid gap-7 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div>
          <label className="label mb-2 block text-platinum/50">Full Name *</label>
          <input data-testid="qf-fullName" className={field} value={data.fullName} onChange={set("fullName")} placeholder="Jane Doe" />
        </div>
        <div>
          <label className="label mb-2 block text-platinum/50">Company / Brand *</label>
          <input data-testid="qf-company" className={field} value={data.company} onChange={set("company")} placeholder="Maison & Co." />
        </div>
        <div>
          <label className="label mb-2 block text-platinum/50">Email Address *</label>
          <input data-testid="qf-email" type="email" className={field} value={data.email} onChange={set("email")} placeholder="you@brand.com" />
        </div>
        <div>
          <label className="label mb-2 block text-platinum/50">Phone (WhatsApp preferred)</label>
          <input data-testid="qf-phone" className={field} value={data.phone} onChange={set("phone")} placeholder="+92 3XX XXX XXXX" />
        </div>
        <div>
          <label className="label mb-2 block text-platinum/50">Product Type</label>
          <select data-testid="qf-productType" className={`${field} appearance-none`} value={data.productType} onChange={set("productType")}>
            <option value="" className="bg-carbon">Select a product</option>
            {CONTACT.productTypes.map((p) => (
              <option key={p} value={p} className="bg-carbon">{p}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label mb-2 block text-platinum/50">Estimated Quantity</label>
          <input data-testid="qf-quantity" className={field} value={data.quantity} onChange={set("quantity")} placeholder="e.g. 5,000 units" />
        </div>
      </div>

      <div>
        <label className="label mb-2 block text-platinum/50">Timeline</label>
        <input data-testid="qf-timeline" className={field} value={data.timeline} onChange={set("timeline")} placeholder="e.g. 3 weeks" />
      </div>

      <div>
        <label className="label mb-2 block text-platinum/50">Additional Requirements</label>
        <textarea data-testid="qf-message" rows={4} className={`${field} resize-none`} value={data.message} onChange={set("message")} placeholder="Tell us about your project — dimensions, finishes, references…" />
      </div>

      <label className="flex items-center gap-3 text-sm text-platinum/60">
        <input
          data-testid="qf-whatsapp-optin"
          type="checkbox"
          checked={data.whatsappOptIn}
          onChange={(e) => setData((d) => ({ ...d, whatsappOptIn: e.target.checked }))}
          className="h-4 w-4 accent-[#c9a84c]"
        />
        I agree to be contacted via WhatsApp
      </label>

      <button data-testid="qf-submit" type="submit" disabled={loading} className="btn-gold w-full">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Request Quote <ArrowRight size={16} /></>}
      </button>
    </form>
  );
}
