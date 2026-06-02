# PRINTKING — Asset Replacement Guide

All site copy reads from `frontend/src/lib/content.js`. Update that file to change company data.

## Photos
| Slot ID                | Location in code                              | Recommended size | Notes                              |
|------------------------|-----------------------------------------------|------------------|------------------------------------|
| exec-photo-*           | `components/home/ExecutiveTeam.jsx` (ExecCard)| 560×640px (7:8)  | Professional headshots, neutral bg |
| machine-*              | `lib/content.js` → `MACHINERY.items[].img`    | 1200×800px       | Machine in operation preferred     |
| portfolio-*            | `lib/content.js` → `PORTFOLIO[].img`          | 800×800–1200px   | Packaging/print only (boxes, bags, tags, catalogs) |
| about-*                | `lib/content.js` → `ABOUT.images[].src`       | 1000×1200px      | Press floor / boxes / foil work    |
| client-logo-01..26     | `lib/content.js` → `TRUSTED.brands`           | SVG preferred    | Replace text wordmarks with `<img>`|

## Video
| Slot ID              | Location                                  | Format        | Notes              |
|----------------------|-------------------------------------------|---------------|--------------------|
| production-video     | `components/home/ProductionVideo.jsx`     | MP4 H.264     | 16:9, min 1080p    |
| production-thumbnail | same (poster)                             | JPG           | 1920×1080px        |

## Content
- Update `frontend/src/lib/content.js` — `COMPANY`, `CEO`, `TEAM`, `TRUSTED.brands`, `MACHINERY`, `PORTFOLIO`, stats, etc.
- WhatsApp: set `COMPANY.whatsapp` to a WhatsApp-enabled mobile number (currently the landline).

## Content rule (packaging-correct)
Only depict products PrintKing manufactures: boxes, bags, tags, labels, cartons, catalogs, printed sheets.
Do NOT show the end-products inside the packaging (perfume bottles, food items, devices) — show the packaging itself.
