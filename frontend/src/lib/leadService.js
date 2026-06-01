/* ============================================================
   PRINTKING — Lead delivery (no backend)
   Sends quote/contact submissions via EmailJS (client-side)
   and offers a WhatsApp deep-link fallback.
   ============================================================ */
import emailjs from "@emailjs/browser";
import { COMPANY } from "./content";

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

export const isEmailConfigured = () =>
  Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

/* Build a clean WhatsApp message from form data */
export function buildWhatsAppLink(data) {
  const lines = [
    "*New Quote Request — PRINTKING*",
    "",
    `*Name:* ${data.fullName || "-"}`,
    `*Company:* ${data.company || "-"}`,
    `*Email:* ${data.email || "-"}`,
    `*Phone:* ${data.phone || "-"}`,
    `*Product Type:* ${data.productType || "-"}`,
    `*Quantity:* ${data.quantity || "-"}`,
    `*Timeline:* ${data.timeline || "-"}`,
    "",
    `*Requirements:*`,
    data.message || "-",
  ];
  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${COMPANY.whatsapp}?text=${text}`;
}

/* Send via EmailJS. Returns { ok, fallback } */
export async function sendQuote(data) {
  if (!isEmailConfigured()) {
    return { ok: false, fallback: "not_configured" };
  }
  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_name: data.fullName,
        company: data.company,
        reply_to: data.email,
        phone: data.phone,
        product_type: data.productType,
        quantity: data.quantity,
        timeline: data.timeline,
        message: data.message,
        whatsapp_opt_in: data.whatsappOptIn ? "Yes" : "No",
        to_email: COMPANY.email,
      },
      { publicKey: PUBLIC_KEY }
    );
    return { ok: true };
  } catch (err) {
    console.error("EmailJS send failed:", err);
    return { ok: false, fallback: "error" };
  }
}
