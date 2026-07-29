/* ============================================================
   PRINTKING — Stunning Luxury Hero Background
   Eye-catching CSS-only animated background with gold accents.
   Zero WebGL, zero performance impact.
   ============================================================ */
import React from "react";

const GOLD = "#d4af37";
const GOLD_LIGHT = "#e8c84a";
const GOLD_DARK = "#b8962e";

export default function HeroBox() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Deep obsidian base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#070504] via-[#0d0a07] to-[#120d08]" />
      
      {/* Animated golden mesh gradient */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(ellipse 100% 60% at 50% 20%, rgba(212, 175, 55, 0.20) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 20% 60%, rgba(212, 175, 55, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 40% 50% at 80% 40%, rgba(212, 175, 55, 0.10) 0%, transparent 50%),
            radial-gradient(ellipse 60% 30% at 50% 85%, rgba(212, 175, 55, 0.08) 0%, transparent 40%)
          `,
          animation: 'pulseGlow 6s ease-in-out infinite',
        }}
      />

      {/* Large rotating golden ring - center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.06]">
        <svg viewBox="0 0 200 200" className="w-full h-full" style={{ animation: 'rotateSlow 30s linear infinite' }}>
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
          <circle cx="100" cy="100" r="65" fill="none" stroke="url(#ringGrad)" strokeWidth="0.3" opacity="0.6" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="url(#ringGrad)" strokeWidth="0.2" opacity="0.4" />
        </svg>
      </div>

      {/* Second rotating ring - opposite direction */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.04]">
        <svg viewBox="0 0 200 200" className="w-full h-full" style={{ animation: 'rotateReverse 25s linear infinite' }}>
          <defs>
            <linearGradient id="ringGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={GOLD} stopOpacity="0" />
              <stop offset="40%" stopColor={GOLD_LIGHT} stopOpacity="0.6" />
              <stop offset="60%" stopColor={GOLD} stopOpacity="0.8" />
              <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="90" fill="none" stroke="url(#ringGrad2)" strokeWidth="0.4" />
          <circle cx="100" cy="100" r="75" fill="none" stroke="url(#ringGrad2)" strokeWidth="0.2" opacity="0.5" />
        </svg>
      </div>

      {/* Animated sweeping light beam */}
      <div 
        className="absolute inset-0 opacity-[0.08]"
        style={{
          background: 'linear-gradient(105deg, transparent 30%, rgba(212, 175, 55, 0.4) 45%, rgba(232, 200, 74, 0.6) 50%, rgba(212, 175, 55, 0.4) 55%, transparent 70%)',
          animation: 'sweep 8s ease-in-out infinite',
          transformOrigin: 'center',
        }}
      />

      {/* Second sweeping beam - delayed */}
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          background: 'linear-gradient(75deg, transparent 20%, rgba(212, 175, 55, 0.3) 40%, rgba(232, 200, 74, 0.5) 50%, rgba(212, 175, 55, 0.3) 60%, transparent 80%)',
          animation: 'sweep2 10s ease-in-out infinite 2s',
          transformOrigin: 'center',
        }}
      />

      {/* Floating gold particles - animated upward */}
      <div className="absolute inset-0 opacity-[0.20]">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[
            { x: 10, y: 80, r: 0.8, d: 3 }, { x: 20, y: 30, r: 0.5, d: 5 },
            { x: 30, y: 60, r: 1.0, d: 2 }, { x: 40, y: 20, r: 0.6, d: 4 },
            { x: 50, y: 70, r: 0.7, d: 3 }, { x: 60, y: 40, r: 0.9, d: 5 },
            { x: 70, y: 85, r: 0.4, d: 2 }, { x: 80, y: 25, r: 0.8, d: 4 },
            { x: 90, y: 55, r: 0.6, d: 3 }, { x: 15, y: 45, r: 0.7, d: 5 },
            { x: 25, y: 90, r: 0.5, d: 2 }, { x: 35, y: 15, r: 0.9, d: 4 },
            { x: 45, y: 50, r: 0.6, d: 3 }, { x: 55, y: 80, r: 0.8, d: 5 },
            { x: 65, y: 10, r: 0.4, d: 2 }, { x: 75, y: 65, r: 0.7, d: 4 },
            { x: 85, y: 35, r: 0.9, d: 3 }, { x: 95, y: 75, r: 0.5, d: 5 },
            { x: 5, y: 20, r: 0.6, d: 2 }, { x: 50, y: 5, r: 0.8, d: 4 },
          ].map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={p.r * 0.2}
              fill={GOLD}
              opacity={0.4 + Math.random() * 0.6}
              style={{
                animation: `floatUp ${4 + p.d}s ease-in-out infinite ${p.d * 0.5}s`,
              }}
            />
          ))}
        </svg>
      </div>

      {/* Animated golden corner frames */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.15]" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="cornerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={GOLD} stopOpacity="0" />
            <stop offset="50%" stopColor={GOLD_LIGHT} stopOpacity="1" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Top-left corner */}
        <path d="M 3 3 L 3 18 M 3 3 L 18 3" stroke="url(#cornerGrad)" strokeWidth="0.6" fill="none" strokeLinecap="round">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="4s" repeatCount="indefinite" />
        </path>
        <path d="M 3 3 L 3 12 M 3 3 L 12 3" stroke={GOLD} strokeWidth="0.2" fill="none" opacity="0.4" />
        {/* Top-right corner */}
        <path d="M 97 3 L 97 18 M 97 3 L 82 3" stroke="url(#cornerGrad)" strokeWidth="0.6" fill="none" strokeLinecap="round">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="4s" begin="1s" repeatCount="indefinite" />
        </path>
        <path d="M 97 3 L 97 12 M 97 3 L 88 3" stroke={GOLD} strokeWidth="0.2" fill="none" opacity="0.4" />
        {/* Bottom-left corner */}
        <path d="M 3 97 L 3 82 M 3 97 L 18 97" stroke="url(#cornerGrad)" strokeWidth="0.6" fill="none" strokeLinecap="round">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="4s" begin="2s" repeatCount="indefinite" />
        </path>
        <path d="M 3 97 L 3 88 M 3 97 L 12 97" stroke={GOLD} strokeWidth="0.2" fill="none" opacity="0.4" />
        {/* Bottom-right corner */}
        <path d="M 97 97 L 97 82 M 97 97 L 82 97" stroke="url(#cornerGrad)" strokeWidth="0.6" fill="none" strokeLinecap="round">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="4s" begin="3s" repeatCount="indefinite" />
        </path>
        <path d="M 97 97 L 97 88 M 97 97 L 88 97" stroke={GOLD} strokeWidth="0.2" fill="none" opacity="0.4" />
      </svg>

      {/* Horizontal gold accent lines with shimmer */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="5" y1="25" x2="95" y2="25" stroke={GOLD} strokeWidth="0.15">
            <animate attributeName="opacity" values="0.2;0.8;0.2" dur="5s" repeatCount="indefinite" />
          </line>
          <line x1="5" y1="50" x2="95" y2="50" stroke={GOLD} strokeWidth="0.1">
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="7s" begin="1s" repeatCount="indefinite" />
          </line>
          <line x1="5" y1="75" x2="95" y2="75" stroke={GOLD} strokeWidth="0.15">
            <animate attributeName="opacity" values="0.2;0.8;0.2" dur="6s" begin="2s" repeatCount="indefinite" />
          </line>
        </svg>
      </div>

      {/* Vertical accent lines */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="20" y1="5" x2="20" y2="95" stroke={GOLD} strokeWidth="0.1">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="6s" begin="0.5s" repeatCount="indefinite" />
          </line>
          <line x1="40" y1="5" x2="40" y2="95" stroke={GOLD} strokeWidth="0.08" />
          <line x1="60" y1="5" x2="60" y2="95" stroke={GOLD} strokeWidth="0.1">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="5s" begin="1.5s" repeatCount="indefinite" />
          </line>
          <line x1="80" y1="5" x2="80" y2="95" stroke={GOLD} strokeWidth="0.08" />
        </svg>
      </div>

      {/* Golden sparkle bursts */}
      <div className="absolute inset-0 opacity-[0.10] pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[
            { x: 15, y: 20, s: 1 }, { x: 85, y: 30, s: 0.8 }, { x: 50, y: 15, s: 1.2 },
            { x: 25, y: 70, s: 0.7 }, { x: 75, y: 80, s: 0.9 }, { x: 10, y: 50, s: 0.6 },
          ].map((s, i) => (
            <g key={i} opacity={0.3 + Math.random() * 0.7}>
              <line x1={s.x - s.s * 2} y1={s.y} x2={s.x + s.s * 2} y2={s.y} stroke={GOLD_LIGHT} strokeWidth="0.15" strokeLinecap="round">
                <animate attributeName="opacity" values="0;1;0" dur={`${2 + Math.random() * 3}s`} repeatCount="indefinite" begin={`${i * 0.8}s`} />
              </line>
              <line x1={s.x} y1={s.y - s.s * 2} x2={s.x} y2={s.y + s.s * 2} stroke={GOLD_LIGHT} strokeWidth="0.15" strokeLinecap="round">
                <animate attributeName="opacity" values="0;1;0" dur={`${2 + Math.random() * 3}s`} repeatCount="indefinite" begin={`${i * 0.8}s`} />
              </line>
              <line x1={s.x - s.s * 1.5} y1={s.y - s.s * 1.5} x2={s.x + s.s * 1.5} y2={s.y + s.s * 1.5} stroke={GOLD} strokeWidth="0.1" strokeLinecap="round">
                <animate attributeName="opacity" values="0;0.6;0" dur={`${2 + Math.random() * 3}s`} repeatCount="indefinite" begin={`${i * 0.8}s`} />
              </line>
              <line x1={s.x + s.s * 1.5} y1={s.y - s.s * 1.5} x2={s.x - s.s * 1.5} y2={s.y + s.s * 1.5} stroke={GOLD} strokeWidth="0.1" strokeLinecap="round">
                <animate attributeName="opacity" values="0;0.6;0" dur={`${2 + Math.random() * 3}s`} repeatCount="indefinite" begin={`${i * 0.8}s`} />
              </line>
            </g>
          ))}
        </svg>
      </div>

      {/* Bottom warm glow */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[50%] opacity-[0.10]"
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

      {/* Subtle grain texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.6\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />

      <style>{`
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes rotateReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes sweep {
          0%, 100% { transform: translateX(-100%) skewX(-15deg); opacity: 0; }
          25% { opacity: 0.08; }
          50% { transform: translateX(100%) skewX(-15deg); opacity: 0.12; }
          75% { opacity: 0.08; }
        }
        @keyframes sweep2 {
          0%, 100% { transform: translateX(100%) skewX(15deg); opacity: 0; }
          25% { opacity: 0.05; }
          50% { transform: translateX(-100%) skewX(15deg); opacity: 0.08; }
          75% { opacity: 0.05; }
        }
        @keyframes floatUp {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0; }
          10% { opacity: 0.8; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 0.6; }
          90% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}