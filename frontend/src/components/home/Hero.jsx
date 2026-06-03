import React, { useEffect, useRef, useState, createElement as h } from "react";
import { ArrowRight, ChevronDown, Box, Printer, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeroBox from "../../three/HeroBox";
import PrintingPress from "../../three/PrintingPress";
import FoilStamping from "../../three/FoilStamping";
import { gsap } from "../../lib/animations";
import { HERO } from "../../lib/content";

// Scene configuration
const SCENES = [
  { 
    id: 'box', 
    name: 'Luxury Packaging', 
    icon: Box,
    component: HeroBox,
    description: 'Premium rigid boxes with gold foil stamping'
  },
  { 
    id: 'press', 
    name: 'Offset Printing', 
    icon: Printer,
    component: PrintingPress,
    description: 'Heidelberg 8-color printing in action'
  },
  { 
    id: 'foil', 
    name: 'Foil Stamping', 
    icon: Sparkles,
    component: FoilStamping,
    description: 'Gold & metallic foil finishing'
  }
];

const AUTO_ROTATE_INTERVAL = 8000; // 8 seconds per scene

export default function Hero() {
  const progressRef = useRef(0);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeScene, setActiveScene] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoRotateTimer = useRef(null);
  const navigate = useNavigate();

  // Responsive detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-rotate scenes every 8 seconds
  useEffect(() => {
    const startAutoRotate = () => {
      autoRotateTimer.current = setInterval(() => {
        setActiveScene(prev => (prev + 1) % SCENES.length);
        progressRef.current = 0; // Reset animation
      }, AUTO_ROTATE_INTERVAL);
    };

    startAutoRotate();
    return () => {
      if (autoRotateTimer.current) {
        clearInterval(autoRotateTimer.current);
      }
    };
  }, []);

  // Handle manual scene change
  const handleSceneChange = (index) => {
    if (index === activeScene || isTransitioning) return;
    
    // Reset auto-rotate timer
    if (autoRotateTimer.current) {
      clearInterval(autoRotateTimer.current);
    }
    
    setIsTransitioning(true);
    setActiveScene(index);
    progressRef.current = 0;
    
    setTimeout(() => setIsTransitioning(false), 1000);
    
    // Resume auto-rotate after manual change
    setTimeout(() => {
      autoRotateTimer.current = setInterval(() => {
        setActiveScene(prev => (prev + 1) % SCENES.length);
        progressRef.current = 0;
      }, AUTO_ROTATE_INTERVAL);
    }, 1000);
  };

  // Cinematic auto-play unboxing sequence - optimized
  useEffect(() => {
    const timeline = gsap.timeline({
      defaults: { ease: "power2.inOut" }
    });

    // Choreographed unboxing animation
    timeline
      .to(progressRef, { 
        current: 0.3, 
        duration: 1.6, 
        delay: 0.6,
        ease: "power2.inOut" 
      }, "start")
      .to(progressRef, { 
        current: 0.6, 
        duration: 2.0, 
        ease: "power2.out" 
      }, "+=0.1")
      .to(progressRef, { 
        current: 1, 
        duration: 2.4, 
        ease: "power1.inOut" 
      }, "+=0.2");

    return () => timeline.kill();
  }, []);

  // Text entrance animation - optimized
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ 
        defaults: { 
          ease: "power3.out",
          force3D: true // GPU acceleration
        },
        delay: 0.2
      });
      
      tl.from(".hero-label", { 
          y: 20, 
          opacity: 0, 
          duration: 0.6 
        })
        .from(".hero-headline", { 
          y: 30, 
          opacity: 0, 
          duration: 0.8, 
        }, "-=0.3")
        .from(".hero-sub", { 
          opacity: 0, 
          y: 15, 
          duration: 0.6 
        }, "-=0.4")
        .from(".hero-cta", { 
          y: 15, 
          opacity: 0, 
          duration: 0.5, 
          stagger: 0.1 
        }, "-=0.2")
        .from(".hero-stat", { 
          y: 15, 
          opacity: 0, 
          duration: 0.5, 
          stagger: 0.06 
        }, "-=0.1");
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-testid="hero-section"
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-[#0d0b09] via-[#0f0d0a] to-[#1a140d]"
    >
      {/* Ambient glow effects - Apple-style atmospheric lighting */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 left-1/4 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gold/20 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] translate-x-1/2 rounded-full bg-gold/10 blur-[100px]" />
      </div>

      {/* 3D Scene Container with Transitions */}
      <div 
        className="pointer-events-none absolute inset-0 z-0"
        style={{ 
          transform: 'translateZ(0)',
          willChange: isMobile ? 'auto' : 'transform' 
        }}
      >
        {SCENES.map((scene, index) => {
          const SceneComponent = scene.component;
          const isActive = index === activeScene;
          
          return (
            <div
              key={scene.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
              } ${isMobile ? 'scale-90 md:scale-100' : ''}`}
              style={{ zIndex: isActive ? 1 : 0 }}
            >
              <SceneComponent progressRef={progressRef} isMobile={isMobile} />
            </div>
          );
        })}
      </div>

      {/* Premium legibility gradient - Adjusted for mobile visibility */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: isMobile
            ? "linear-gradient(180deg, rgba(13, 11, 9, 0.5) 0%, rgba(13, 11, 9, 0.7) 40%, rgba(13, 11, 9, 0.6) 70%, rgba(13, 11, 9, 0.5) 100%)"
            : "radial-gradient(ellipse at 15% 50%, rgba(13, 11, 9, 0.96) 0%, rgba(13, 11, 9, 0.8) 30%, rgba(13, 11, 9, 0.4) 55%, rgba(13, 11, 9, 0) 70%)",
        }}
      />

      {/* Grain texture overlay - Premium tactile feel */}
      <div 
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.015]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Content Container - Responsive padding and layout */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-[1480px] px-4 py-20 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-28 pb-24 md:pt-32 md:pb-28 lg:pt-40 lg:pb-32"
      >
        <div className="max-w-4xl">
          {/* Label - With premium spacing */}
          <div className="hero-label inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-2 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
            <span className="text-[10px] font-medium tracking-[0.2em] text-gold sm:text-xs">
              {HERO.label}
            </span>
          </div>

          {/* Headline - Fluid responsive typography */}
          <h1 className="hero-headline mt-8 font-light leading-[1.08] tracking-tight text-platinum md:mt-10">
            <span className="block text-[clamp(2.5rem,8vw,5.5rem)] md:text-[clamp(3.5rem,7vw,7rem)] lg:text-[clamp(4.5rem,6.5vw,8rem)]">
              {HERO.headline}
            </span>
          </h1>

          {/* Subheadline - Optimal reading width */}
          <p className="hero-sub mt-6 max-w-[90%] text-base leading-relaxed text-platinum/60 sm:mt-8 sm:max-w-[85%] sm:text-lg md:max-w-[650px] md:text-xl md:leading-relaxed">
            {HERO.subheadline}
          </p>

          {/* CTAs - Touch-optimized mobile buttons */}
          <div className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:gap-4">
            <button
              data-testid="hero-quote-btn"
              onClick={() => navigate("/request-quote")}
              className="hero-cta group relative overflow-hidden rounded-full bg-gradient-to-r from-gold via-[#e4bc5f] to-gold bg-[length:200%_100%] px-8 py-4 font-medium text-[#0d0b09] shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300 hover:bg-[position:100%_0] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] active:scale-95 sm:px-10 sm:py-5"
            >
              <span className="relative z-10 flex items-center justify-center gap-2.5 text-sm sm:text-base">
                Request a Quote 
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>
            <button
              data-testid="hero-portfolio-btn"
              onClick={() => navigate("/portfolio")}
              className="hero-cta group rounded-full border border-gold/30 bg-gold/5 px-8 py-4 font-medium text-platinum backdrop-blur-sm transition-all duration-300 hover:border-gold/50 hover:bg-gold/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] active:scale-95 sm:px-10 sm:py-5"
            >
              <span className="text-sm sm:text-base">Explore Portfolio</span>
            </button>
          </div>

          {/* Stats Bar - Premium card-style presentation */}
          <div className="mt-16 rounded-2xl border border-gold/10 bg-gradient-to-br from-gold/5 to-transparent p-6 backdrop-blur-sm sm:mt-20 sm:p-8 md:mt-24">
            <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4 lg:gap-10">
              {HERO.stats.map((stat, idx) => (
                <div key={idx} className="hero-stat group">
                  <div className="text-3xl font-light tracking-tight text-gold transition-transform duration-300 group-hover:scale-110 sm:text-4xl lg:text-5xl">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-[11px] font-medium tracking-wider text-platinum/40 sm:text-xs">
                    {stat.label}
                  </div>
                  {idx < HERO.stats.length - 1 && (
                    <div className="absolute right-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-gold/20 to-transparent lg:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 animate-bounce md:block">
        <div className="flex flex-col items-center gap-2 opacity-40 transition-opacity duration-300 hover:opacity-100">
          <ChevronDown size={20} className="text-gold" strokeWidth={1.5} />
          <div className="h-12 w-px bg-gradient-to-b from-gold/50 to-transparent" />
        </div>
      </div>

      {/* Scene Switcher - Apple-style carousel controls */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 md:bottom-12">
        <div className="glass flex items-center gap-2 rounded-full border border-gold/20 bg-black/40 p-2 backdrop-blur-xl">
          {SCENES.map((scene, index) => {
            const Icon = scene.icon;
            const isActive = index === activeScene;
            
            return (
              <button
                key={scene.id}
                onClick={() => handleSceneChange(index)}
                disabled={isTransitioning}
                className={`group relative flex items-center gap-2 rounded-full px-4 py-2.5 transition-all duration-500 ${
                  isActive 
                    ? 'bg-gold/20 text-gold' 
                    : 'text-platinum/50 hover:bg-white/5 hover:text-platinum/80'
                }`}
                title={scene.description}
              >
                <Icon 
                  size={18} 
                  className={`transition-all duration-500 ${
                    isActive ? 'scale-110' : 'scale-100 group-hover:scale-105'
                  }`}
                />
                <span className={`text-xs font-medium transition-all duration-500 ${
                  isActive 
                    ? 'max-w-32 opacity-100' 
                    : 'max-w-0 opacity-0 overflow-hidden'
                }`}>
                  {scene.name}
                </span>
                
                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
        
        {/* Scene description - appears below controls */}
        <div className="mt-3 text-center">
          <p className="text-xs text-platinum/40 transition-opacity duration-500">
            {SCENES[activeScene].description}
          </p>
        </div>
      </div>
    </section>
  );
}
