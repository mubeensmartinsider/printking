import React, { useState } from "react";
import { toast } from "sonner";
import { Loader2, ArrowRight, Check } from "lucide-react";
import { CONTACT } from "../../lib/content";
import { sendQuote, buildWhatsAppLink, isEmailConfigured } from "../../lib/leadService";

const initial = {
  fullName: "", company: "", email: "", phone: "",
  productType: "", quantity: "", timeline: "", message: "", whatsappOptIn: true,
};

const inputBase =
  "peer w-full rounded-[2px] bg-[#241f1a] px-3 pb-2 pt-6 text-[15px] text-platinum border-b border-white/15 focus:border-gold focus:outline-none transition-colors duration-300 placeholder-transparent";
const labelBase =
  "pointer-events-none absolute left-3 top-4 text-platinum/40 text-[13px] transition-all duration-200 peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.14em] peer-focus:text-gold peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.14em] peer-[:not(:placeholder-shown)]:text-gold";

function Field({ id, label, value, onChange, type = "text", testid }) {
  return (
    <div className="relative">
      <input id={id} data-testid={testid} type={type} value={value} onChange={onChange} placeholder={label} className={inputBase} />
      <label htmlFor={id} className={labelBase}>{label}</label>
    </div>
  );
}

export default function QuoteForm({ compact = false }) {
  const [data, setData] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
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
    if (err) return toast.error(err);
    setLoading(true);
    const res = await sendQuote(data);
    setLoading(false);
    if (res.ok) {
      setSent(true);
      toast.success("Quote request sent. We'll respond within 4 business hours.");
      setTimeout(() => { setData(initial); setSent(false); }, 4000);
      return;
    }
    if (!isEmailConfigured()) {
      toast.message("Opening WhatsApp to send your request…", { description: "Your details are pre-filled in WhatsApp." });
    } else {
      toast.error("Email delivery failed. Opening WhatsApp as a fallback.");
    }
    window.open(buildWhatsAppLink(data), "_blank", "noopener,noreferrer");
  };

  return (
    <form data-testid="quote-form" onSubmit={handleSubmit} className="space-y-5">
      <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
        <Field id="qf-fn" testid="qf-fullName" label="Full Name *" value={data.fullName} onChange={set("fullName")} />
        <Field id="qf-co" testid="qf-company" label="Company / Brand *" value={data.company} onChange={set("company")} />
        <Field id="qf-em" testid="qf-email" label="Email Address *" type="email" value={data.email} onChange={set("email")} />
        <Field id="qf-ph" testid="qf-phone" label="Phone (WhatsApp preferred)" value={data.phone} onChange={set("phone")} />
        <div className="relative">
          <select id="qf-pt" data-testid="qf-productType" value={data.productType} onChange={set("productType")}
            className="w-full appearance-none rounded-[2px] border-b border-white/15 bg-[#241f1a] px-3 pb-2 pt-6 text-[15px] text-platinum focus:border-gold focus:outline-none">
            <option value="" className="bg-carbon">Select a product</option>
            {CONTACT.productTypes.map((p) => <option key={p} value={p} className="bg-carbon">{p}</option>)}
          </select>
          <label htmlFor="qf-pt" className="pointer-events-none absolute left-3 top-1.5 text-[10px] uppercase tracking-[0.14em] text-gold">Product Type</label>
        </div>
        <Field id="qf-qty" testid="qf-quantity" label="Estimated Quantity" value={data.quantity} onChange={set("quantity")} />
      </div>

      <Field id="qf-tl" testid="qf-timeline" label="Timeline" value={data.timeline} onChange={set("timeline")} />

      <div className="relative">
        <textarea id="qf-msg" data-testid="qf-message" rows={4} value={data.message} onChange={set("message")} placeholder="Additional Requirements"
          className={`${inputBase} resize-none`} />
        <label htmlFor="qf-msg" className={labelBase}>Additional Requirements</label>
      </div>

      <label className="flex items-center gap-3 text-sm text-platinum/60">
        <input data-testid="qf-whatsapp-optin" type="checkbox" checked={data.whatsappOptIn}
          onChange={(e) => setData((d) => ({ ...d, whatsappOptIn: e.target.checked }))}
          className="h-4 w-4 accent-[#c5a05a]" />
        I prefer to be contacted via WhatsApp
      </label>

      <button data-testid="qf-submit" type="submit" disabled={loading || sent} className="btn-gold w-full">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" />
          : sent ? <>Request Sent — We'll respond within 4 hours <Check size={16} /></>
          : <>Request a Quote <ArrowRight size={16} /></>}
      </button>
    </form>
  );
}
