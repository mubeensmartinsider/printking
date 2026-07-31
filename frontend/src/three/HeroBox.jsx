/* ============================================================
   PRINTKING — PERFORMANCE-OPTIMIZED Luxury Hero Background
   CSS-only animated background with gold accents.
   Reduced SVG animate elements, CSS transforms preferred.
   Zero WebGL, minimal performance impact.
   ============================================================ */
import React from "react";

const GOLD = "#d4af37";
const GOLD_LIGHT = "#e8c84a";

export default function HeroBox() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ contentVisibility: "auto" }}>
      {/* Deep obsidian base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#070504] via-[#0d0a07] to-[#120d08]" />
      
      {/* Animated golden mesh gradient - CSS only */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse 100% 60% at 50% 20%, rgba(212, 175, 55, 0.20) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 20% 60%, rgba(212, 175, 55, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 40% 50% at 80% 40%, rgba(212, 175, 55, 0.10) 0%, transparent 50%),
            radial-gradient(ellipse 60% 30% at 50% 85%, rgba(212, 175, 55, 0.08) 0%, transparent 40%)
          `,
          animation: 'heroPulseGlow 6s ease-in-out infinite',
        }}
      />

      {/* Single rotating ring - SVG only, reduced from 3 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.05]">
        <svg viewBox="0 0 200 200" className="w-full h-full" style={{ animation: 'heroRotateSlow 30s linear infinite' }}>
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={GOLD} stopOpacity="0" />
              <stop offset="30%" stopColor={GOLD} stopOpacity="0.8" />
              <stop offset="50%" stopColor={GOLD_LIGHT} stopOpacity="1" />
              <stop offset="70%" stopColor={GOLD} stopOpacity="0.8" />
              <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="80" fill="none" stroke="url(#ringGrad)" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Single sweeping light beam - CSS only */}
      <div 
        className="absolute inset-0 opacity-[0.06]"
        style={{
          background: 'linear-gradient(105deg, transparent 30%, rgba(212, 175, 55, 0.4) 45%, rgba(232, 200, 74, 0.6) 50%, rgba(212, 175, 55, 0.4) 55%, transparent 70%)',
          animation: 'heroSweep 8s ease-in-out infinite',
          transformOrigin: 'center',
        }}
      />

      {/* Floating gold particles - CSS keyframes, reduced count */}
      <div className="absolute inset-0 opacity-[0.15]">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[
            { x: 15, y: 75, d: 3 }, { x: 30, y: 25, d: 5 },
            { x: 50, y: 65, d: 2 }, { x: 70, y: 35, d: 4 },
            { x: 85, y: 55, d: 3 }, { x: 40, y: 85, d: 5 },
            { x: 60, y: 15, d: 2 }, { x: 20, y: 45, d: 4 },
            { x: 80, y: 70, d: 3 }, { x: 10, y: 20, d: 5 },
          ].map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={0.4}
              fill={GOLD_LIGHT}
              opacity={0.6}
              style={{
                animation: `heroFloatUp ${4 + p.d}s ease-in-out infinite ${p.d * 0.5}s`,
              }}
            />
          ))}
        </svg>
      </div>

      {/* Corner frames - CSS only, reduced from 4 to 2 */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.12]" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="cornerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={GOLD} stopOpacity="0" />
            <stop offset="50%" stopColor={GOLD_LIGHT} stopOpacity="1" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Top-left corner */}
        <path d="M 3 3 L 3 18 M 3 3 L 18 3" stroke="url(#cornerGrad)" strokeWidth="0.6" fill="none" strokeLinecap="round" className="hero-corner-pulse" />
        {/* Bottom-right corner */}
        <path d="M 97 97 L 97 82 M 97 97 L 82 97" stroke="url(#cornerGrad)" strokeWidth="0.6" fill="none" strokeLinecap="round" className="hero-corner-pulse" style={{ animationDelay: '2s' }} />
      </svg>

      {/* Bottom warm glow */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[50%] opacity-[0.08]"
        style={{
          background: 'linear-gradient(0deg, rgba(212, 175, 55, 0.4) 0%, rgba(212, 175, 55, 0.1) 30%, transparent 100%)',
        }}
      />

      {/* Top vignette for text readability */}
      <div 
        className="absolute top-0 left-0 right-0 h-[35%] opacity-[0.4]"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 100%)',
        }}
      />

      <style>{`
        @keyframes heroPulseGlow {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.4; }
        }
        @keyframes heroRotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes heroSweep {
          0%, 100% { transform: translateX(-100%) skewX(-15deg); opacity: 0; }
          25% { opacity: 0.06; }
          50% { transform: translateX(100%) skewX(-15deg); opacity: 0.1; }
          75% { opacity: 0.06; }
        }
        @keyframes heroFloatUp {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0; }
          10% { opacity: 0.7; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 0.5; }
          90% { opacity: 0.7; }
        }
        .hero-corner-pulse {
          animation: heroCornerPulse 4s ease-in-out infinite;
        }
        @keyframes heroCornerPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}