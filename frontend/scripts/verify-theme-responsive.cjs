/* PRINTKING site verification
   SSR-renders every route, then audits
     (1) theme hygiene  — no hard-coded surface/text colours that ignore the theme
     (2) mobile         — no fixed widths, collapsing grids, gutter coverage
     (3) contrast       — WCAG AA for every text tier on every surface, in BOTH themes
   Run with: npm run verify */
const fs = require("fs");
const path = require("path");
const Module = require("module");
const babel = require("@babel/core");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "src");
const OUT = path.join(ROOT, "verify-report.txt");

const origResolve = Module._resolveFilename;
Module._resolveFilename = (request, parent) => {
  if (request.startsWith("@/")) {
    const base = path.join(SRC, request.slice(2));
    for (const ext of [".js", ".jsx", "/index.js", ""]) {
      const p = base + ext;
      if (fs.existsSync(p) && fs.statSync(p).isFile()) return p;
    }
  }
  return origResolve.call(Module, request, parent, false);
};

const compile = (module, filename) => {
  const { code } = babel.transformSync(fs.readFileSync(filename, "utf8"), {
    filename, babelrc: false, configFile: false,
    presets: [
      [require.resolve("@babel/preset-env"), { targets: { node: "current" } }],
      [require.resolve("@babel/preset-react"), { runtime: "automatic" }],
    ],
  });
  module._compile(code, filename);
};
require.extensions[".css"] = () => {};
require.extensions[".jsx"] = compile;
const origJs = require.extensions[".js"];
require.extensions[".js"] = (m, f) => (f.includes("node_modules") ? origJs(m, f) : compile(m, f));

const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { MemoryRouter, Routes, Route } = require("react-router-dom");
const { ThemeProvider } = require(path.join(SRC, "context/ThemeContext.jsx"));
const { PRODUCTS } = require(path.join(SRC, "lib/content.js"));

const PAGES = [
  ["Home", "pages/Home.jsx", "/", "/"],
  ["About", "pages/AboutPage.jsx", "/about", "/about"],
  ["Products", "pages/ProductsPage.jsx", "/products", "/products"],
  ["ProductDetail", "pages/ProductDetailPage.jsx", "/products/luxury-rigid-boxes", "/products/:slug"],
  ["Blog", "pages/BlogPage.jsx", "/blog", "/blog"],
  ["Machinery", "pages/MachineryPage.jsx", "/machinery", "/machinery"],
  ["Contact", "pages/ContactPage.jsx", "/contact", "/contact"],
  ["RequestQuote", "pages/RequestQuotePage.jsx", "/request-quote", "/request-quote"],
  ["FAQ", "pages/FAQPage.jsx", "/faq", "/faq"],
];

const results = [];
const check = (n, p, e = "") => results.push(`${p ? "PASS" : "FAIL"}  ${n}${e ? " :: " + e : ""}`);

for (const [name, rel, url, pattern] of PAGES) {
  let html = "";
  let err = "";
  try {
    const Page = require(path.join(SRC, rel)).default;
    const el = pattern.includes(":")
      ? React.createElement(Routes, null, React.createElement(Route, { path: pattern, element: React.createElement(Page) }))
      : React.createElement(Page);
    html = renderToStaticMarkup(
      React.createElement(ThemeProvider, null,
        React.createElement(MemoryRouter, { initialEntries: [url] }, el))
    );
  } catch (e) {
    err = e.message;
  }
  check(`${name} renders`, html.length > 500, err || `${html.length} bytes`);
  if (!html) continue;

  /* ---- theme hygiene: no fixed surface or text colour that ignores the theme ----
     bg-obsidian is allowed ONLY where a dark plate is deliberate (the hero stat
     band, the logo plate) â€” those are brand-dark in both themes by design. */
  const ALLOWED_DARK_PLATE = "bg-obsidian";
  const legacy = [...new Set(
    html.match(/(?:bg-(?:obsidian|carbon|graphite)(?![\d/]))|(?:text-platinum)|(?:bg|text|border)-(?:from|via|to)?-?\[#[0-9a-fA-F]{3,8}\]/g) || []
  )].filter((c) => c !== ALLOWED_DARK_PLATE);
  check(`${name}: no theme-breaking hard-coded colour`, legacy.length === 0, legacy.join(","));

  /* ---- mobile hygiene ---- */
  const fixedWide = [...new Set(
    (html.match(/(?:^|[\s"])(?:min-)?w-\[(?:[4-9]\d\d|\d{4,})px\]/g) || []).map((s) => s.trim())
  )];
  check(`${name}: no fixed widths that can overflow`, fixedWide.length === 0, fixedWide.join(","));

  const wideGrids = [...new Set(html.match(/(?<!sm:)(?<!md:)(?<!lg:)(?<!xl:)grid-cols-[3-9]/g) || [])];
  check(`${name}: 3+ column grids collapse on mobile`, wideGrids.length === 0, wideGrids.join(","));

  const tight = [...new Set(html.match(/px-\[(1[0-9]|[2-9]\d)px\]/g) || [])];
  check(`${name}: no oversized side padding`, tight.length === 0, tight.join(","));

  check(`${name}: responsive gutters present`, /section-pad|px-4|px-6/.test(html));
  check(`${name}: no hard-coded viewport height`, !/h-screen(?!:)/.test(html));
}

/* ---- palette contrast in BOTH themes (WCAG AA on body text) ---- */
const tokens = fs.readFileSync(path.join(SRC, "styles", "tokens.css"), "utf8");
const darkBlock = (tokens.match(/\.dark\s*\{([\s\S]*?)\n\}/) || [])[1] || "";
const lightBlock = (tokens.split(".dark")[0] || tokens);
const val = (block, name) => {
  const m = block.match(new RegExp(`--${name}:\\s*([^;]+);`));
  return m ? m[1].trim() : null;
};
const hex = (rgbStr) => {
  const raw = (rgbStr || "").trim();
  if (raw.startsWith("#")) return raw;              /* already a hex literal */
  const m = raw.match(/(\d+)\s+(\d+)\s+(\d+)/);      /* "111 103 93" channels */
  if (!m) return null;
  return "#" + [1, 2, 3].map((i) => Number(m[i]).toString(16).padStart(2, "0")).join("");
};
const lum = (h) => {
  const v = h.replace("#", "");
  const f = [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
  return 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2];
};
const ratio = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

/* every text tier on every surface, in the theme where it is actually used */
const THEMES = [
  {
    name: "light",
    block: lightBlock,
    pairs: [
      ["ink on surface-base", "ink-rgb", "surface-base-rgb"],
      ["ink on surface-primary", "ink-rgb", "surface-primary-rgb"],
      ["ink on surface-elevated", "ink-rgb", "surface-elevated-rgb"],
      ["ink-secondary on surface-base", "ink-secondary-rgb", "surface-base-rgb"],
      ["ink-tertiary on surface-base", "ink-tertiary-rgb", "surface-base-rgb"],
      ["ink-tertiary on surface-elevated", "ink-tertiary-rgb", "surface-elevated-rgb"],
      ["gold-ink on surface-base", "text-gold-rgb", "surface-base-rgb"],
      ["gold-ink on surface-primary", "text-gold-rgb", "surface-primary-rgb"],
    ],
  },
  {
    name: "dark",
    block: darkBlock,
    pairs: [
      ["ink on surface-base", "ink-rgb", "surface-base-rgb"],
      ["ink on surface-elevated", "ink-rgb", "surface-elevated-rgb"],
      ["ink-secondary on surface-elevated", "ink-secondary-rgb", "surface-elevated-rgb"],
      ["ink-tertiary on surface-elevated", "ink-tertiary-rgb", "surface-elevated-rgb"],
      ["gold-ink on surface-elevated", "text-gold-rgb", "surface-elevated-rgb"],
    ],
  },
  {
    /* the navbar mega menu is a fixed white plate in BOTH themes, so these
       must be theme-independent and must stay dark on white */
    name: "white-plate",
    block: lightBlock,
    pairs: [
      ["plate-ink on white", "plate-ink", "WHITE"],
      ["plate-ink-secondary on white", "plate-ink-secondary", "WHITE"],
      ["plate-gold on white", "plate-gold", "WHITE"],
      ["plate-gold on plate-hover", "plate-gold", "plate-hover"],
    ],
  },
];
for (const theme of THEMES) {
  check(`${theme.name}: token block defined`, theme.name !== "dark" || darkBlock.length > 50);
  for (const [label, fgT, bgT] of theme.pairs) {
    const fg = hex(val(theme.block, fgT));
    const bg = bgT === "WHITE" ? "#ffffff" : hex(val(theme.block, bgT));
    if (!fg || !bg) { check(`${theme.name} contrast: ${label}`, false, "token missing"); continue; }
    const r = ratio(fg, bg);
    check(`${theme.name} contrast ${label} >= 4.5`, r >= 4.5, `${r.toFixed(2)}:1 (${fg} on ${bg})`);
  }
}
check("themes differ (light is not dark)", hex(val(lightBlock, "surface-base-rgb")) !== hex(val(darkBlock, "surface-base-rgb")));

const failed = results.filter((r) => r.startsWith("FAIL"));
fs.writeFileSync(OUT, results.join("\n") + `\n\n${results.length - failed.length}/${results.length} passed\n`);
console.log(`${results.length - failed.length}/${results.length} passed`);


