/* ============================================================
   PRINTKING — Hero 3D scene (disabled for performance)
   Static gradient background used instead of WebGL canvas.
   ============================================================ */
import React from "react";

export default function HeroBox() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#1a140d] via-[#0d0b09] to-[#1a140d]" />
  );
}
