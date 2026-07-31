import React, { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import { CONTACT } from "../lib/content";
import { sendQuote, buildWhatsAppLink, isEmailConfigured } from "../lib/leadService";

const STEPS = ["Project Type", "Specifications", "Contact Details"];
const field =
  "w-full bg-transparent border-b border-white/15 py-3 text-platinum placeholder:text-platinum/35 focus:border-gold focus:outline-none transition-colors duration-300 text-[15px]";

const floatingField =
  "w-full bg-transparent border-b border-white/15 py-5 pb-2 pt-6 text-platinum focus:border-gold focus:outline-none transition-all duration-300 text-[15px]";

const initial = {
  productType: "",
  quantity: "",
  timeline: "",
  message: "",
  fullName: "",
  company: "",
  email: "",
  phone: "",
  whatsappOptIn: true,
};

export default function RequestQuotePage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initial);
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));

  const next = () => {
    if (step === 0 && !data.productType) return toast.error("Please select a product type.");
    setStep((s) => Math.min(2, s + 1));
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const submit = async () => {
    if (!data.fullName.trim() || !data.company.trim()) return toast.error("Please complete name and company.");
    if (!/^\S+@\S+\.\S+$/.test(data.email)) return toast.error("Please enter a valid email address.");
    setLoading(true);
    const res = await sendQuote(data);
    setLoading(false);
    if (res.ok) {
      toast.success("Quote request sent. We'll respond within 4 business hours.");
      setData(initial);
      setStep(0);
      return;
    }
    if (!isEmailConfigured()) {
      toast.message("Opening WhatsApp with your request pre-filled…");
    } else {
      toast.error("Email failed — opening WhatsApp as a fallback.");
    }
    window.open(buildWhatsAppLink(data), "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Seo title="Request a Quote — PRINTKING" description="Start your luxury packaging project. Tell us your product type, specifications and contact details for a detailed proposal within 4 business hours." path="/request-quote" />
      <PageHero eyebrow="START YOUR PROJECT" title="Request a Quote" sub="Three quick steps. We'll respond within 4 business hours." />

      <section className="bg-obsidian py-20">
        <div className="section-pad mx-auto max-w-3xl">
          {/* Stepper */}
          <div className="mb-14 flex items-center">
            {STEPS.map((s, i) => (
              <React.Fragment key={s}>
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm transition-colors duration-300 ${
                      i <= step ? "border-gold bg-gold text-obsidian" : "border-white/20 text-platinum/50"
                    }`}
                  >
                    {i < step ? <Check size={16} /> : i + 1}
                  </span>
                  <span className={`label hidden sm:block ${i <= step ? "text-platinum" : "text-platinum/40"}`}>{s}</span>
                </div>
                {i < STEPS.length - 1 && <span className="mx-3 h-px flex-1 bg-white/10" />}
              </React.Fragment>
            ))}
          </div>

          {/* Step 1 */}
          {step === 0 && (
            <div data-testid="wizard-step-1">
              <h3 className="display mb-8 text-2xl text-platinum">What are we making?</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {CONTACT.productTypes.map((p) => (
                  <button
                    key={p}
                    data-testid={`product-${p.replace(/\s+/g, "-").toLowerCase()}`}
                    onClick={() => setData((d) => ({ ...d, productType: p }))}
                    className={`border p-6 text-left text-sm transition-all duration-300 ${
                      data.productType === p
                        ? "border-gold bg-gold/10 text-platinum"
                        : "border-white/[0.1] text-platinum/70 hover:border-gold/60"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 1 && (
            <div data-testid="wizard-step-2" className="space-y-7">
              <h3 className="display text-2xl text-platinum">Specifications</h3>
              <div className="grid gap-7 sm:grid-cols-2">
                <div className="floating-input-group">
                  <input id="wiz-qty" className={floatingField} value={data.quantity} onChange={set("quantity")} placeholder=" " />
                  <label htmlFor="wiz-qty">Estimated Quantity</label>
                </div>
                <div className="floating-input-group">
                  <input id="wiz-tl" className={floatingField} value={data.timeline} onChange={set("timeline")} placeholder=" " />
                  <label htmlFor="wiz-tl">Timeline</label>
                </div>
              </div>
                <div className="floating-input-group">
                  <textarea id="wiz-msg" rows={4} className={`${floatingField} resize-none`} value={data.message} onChange={set("message")} placeholder=" " />
                  <label htmlFor="wiz-msg">Requirements & Finishes</label>
                </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 2 && (
            <div data-testid="wizard-step-3" className="space-y-7">
              <h3 className="display text-2xl text-platinum">Your Details</h3>
              <div className="grid gap-7 sm:grid-cols-2">
                <div className="floating-input-group">
                  <input id="wiz-name" data-testid="wizard-name" className={floatingField} value={data.fullName} onChange={set("fullName")} placeholder=" " />
                  <label htmlFor="wiz-name">Full Name *</label>
                </div>
                <div className="floating-input-group">
                  <input id="wiz-company" data-testid="wizard-company" className={floatingField} value={data.company} onChange={set("company")} placeholder=" " />
                  <label htmlFor="wiz-company">Company / Brand *</label>
                </div>
                <div className="floating-input-group">
                  <input id="wiz-email" data-testid="wizard-email" type="email" className={floatingField} value={data.email} onChange={set("email")} placeholder=" " />
                  <label htmlFor="wiz-email">Email *</label>
                </div>
                <div className="floating-input-group">
                  <input id="wiz-phone" className={floatingField} value={data.phone} onChange={set("phone")} placeholder=" " />
                  <label htmlFor="wiz-phone">Phone (WhatsApp)</label>
                </div>
              </div>
              <label className="flex items-center gap-3 text-sm text-platinum/60">
                <input type="checkbox" checked={data.whatsappOptIn} onChange={(e) => setData((d) => ({ ...d, whatsappOptIn: e.target.checked }))} className="h-4 w-4 accent-[#c5a05a]" />
                I agree to be contacted via WhatsApp
              </label>
            </div>
          )}

          {/* Nav */}
          <div className="mt-14 flex items-center justify-between">
            <button
              onClick={back}
              disabled={step === 0}
              className="btn-ghost disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowLeft size={16} /> Back
            </button>
            {step < 2 ? (
              <button data-testid="wizard-next" onClick={next} className="btn-gold">
                Continue <ArrowRight size={16} />
              </button>
            ) : (
              <button data-testid="wizard-submit" onClick={submit} disabled={loading} className="btn-gold">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Submit Request <Check size={16} /></>}
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
