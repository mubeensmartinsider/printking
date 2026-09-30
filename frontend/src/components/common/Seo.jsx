import { useEffect } from "react";

/* ============================================================
   Seo — lightweight document head manager (no external dep).
   Sets title, description, and Open Graph tags per page.
   ============================================================ */
function setMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function Seo({ title, description, path = "/", image }) {
  useEffect(() => {
    if (title) document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    /* Default share card. Without this every link shared on LinkedIn /
       WhatsApp / Slack rendered with no preview — and that is where B2B
       enquiries arrive from. Pages may override via the `image` prop. */
    const shareImage = image || "/assets/og-image.jpg";
    setMeta("property", "og:image", shareImage);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:image", shareImage);

    // canonical
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", `${window.location.origin}${path}`);
  }, [title, description, path, image]);

  return null;
}
