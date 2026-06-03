/* ============================================================
   PRINTKING — Cinematic Luxury Unboxing Hero
   A world-class 3D experience showcasing premium printing craftsmanship
   through a narrative-driven unboxing sequence.
   
   Aesthetic inspiration: Apple, Rolls-Royce, Pentagram
   Focus: Physical-based rendering, realistic materials, cinematic lighting
   ============================================================ */
import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  RoundedBox,
  Environment,
  Lightformer,
  ContactShadows,
  Sparkles,
  Text3D,
  Center,
} from "@react-three/drei";
import * as THREE from "three";

const h = React.createElement;

// Premium color palette - Professional luxury
const GOLD = "#d4af37";
const MATTE_BLACK = "#3d3531";
const TISSUE_BLACK = "#524a42";
const FOIL_GOLD = "#ffd700";
const BOX_INNER = "#2a2420";
const BOX_ACCENT = "#a08968";
const PAPER_CREAM = "#f5f1e8";

const lerp = (a, b, t) => a + (b - a) * t;
const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// Professional studio lighting setup - Key, Fill, Rim, Accent
function SceneLighting({ shadowMapSize, isMobile }) {
  return h(
    "group",
    null,
    // Ambient base - subtle foundation
    h("ambientLight", { intensity: 0.4 }),
    
    // Key light - Main illumination from front-left, soft and bright
    h("spotLight", {
      position: [-4, 6, 4],
      angle: 0.8,
      penumbra: 1,
      intensity: 10.0,
      castShadow: true,
      "shadow-mapSize": [shadowMapSize, shadowMapSize],
      "shadow-bias": -0.0001,
      color: "#fff8f0",
    }),
    
    // Fill light - Softer from opposite side to reduce shadows
    h("directionalLight", {
      position: [5, 4, 3],
      intensity: 3.0,
      color: "#ffeedd",
    }),
    
    // Rim light - Creates edge definition on gold foil
    h("directionalLight", {
      position: [-3, 3, -4],
      intensity: 5.0,
      color: GOLD,
    }),
    
    // Accent spot on foil areas - Makes gold pop
    h("spotLight", {
      position: [0, 3, 5],
      angle: 0.5,
      penumbra: 0.8,
      intensity: 6.0,
      color: "#ffd700",
    }),
    
    // Top light for depth
    h("directionalLight", {
      position: [0, 8, 0],
      intensity: 2.0,
      color: "#ffffff",
    }),
    
    // Environment with studio softboxes
    h(
      Environment,
      { resolution: isMobile ? 256 : 512, background: false },
      // Large softbox front-left (key)
      h(Lightformer, { 
        intensity: 4.0, 
        position: [-6, 4, 8], 
        scale: [25, 15, 1], 
        color: "#ffffff" 
      }),
      // Medium softbox right (fill)
      h(Lightformer, { 
        intensity: 2.5, 
        position: [6, 3, 4], 
        scale: [15, 12, 1], 
        color: "#fff8f0" 
      }),
      // Accent strip light for gold
      h(Lightformer, { 
        intensity: 3.5, 
        position: [0, 2, 6], 
        scale: [20, 3, 1], 
        color: GOLD 
      }),
      // Backlight strip
      h(Lightformer, { 
        intensity: 2.0, 
        position: [0, 4, -8], 
        scale: [18, 10, 1], 
        color: "#ffe4cc" 
      })
    ),
    
    // Professional contact shadows
    h(ContactShadows, {
      position: [0, -0.8, 0],
      opacity: 0.35,
      scale: 8,
      blur: 2.5,
      far: 4,
      resolution: isMobile ? 512 : 1024,
      color: "#1a1614",
    })
  );
}

// Shared canvas wrapper with professional settings
function SceneCanvas({ children, isMobile }) {
  const dpr = isMobile ? [1, 1.5] : [1, 2];
  const shadowMapSize = isMobile ? 1024 : 2048;
  const particleCount = isMobile ? 30 : 60;

  return h(
    Canvas,
    { 
      shadows: true,
      dpr: dpr,
      gl: { 
        antialias: true, 
        alpha: true, 
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: isMobile ? 1.4 : 1.6,
      },
      camera: { 
        position: isMobile ? [0, 0, 3.5] : [0, 0, 3], 
        fov: isMobile ? 45 : 40 
      }
    },
    h(
      Suspense,
      { fallback: null },
      h(SceneLighting, { shadowMapSize: shadowMapSize, isMobile: isMobile }),
      children,
      h(Sparkles, { 
        count: particleCount,
        scale: isMobile ? [4, 3, 3] : [5, 4, 4],
        size: isMobile ? 0.8 : 1.0,
        speed: 0.12,
        color: FOIL_GOLD,
        opacity: 0.25
      })
    )
  );
}

// Text creation helper - Premium embossed branding
function createText(text, position, rotation = [0, 0, 0]) {
  return h(
    Center,
    { position, rotation },
    h(
      Text3D,
      {
        font: "https://threejs.org/examples/fonts/helvetiker_bold.typeface.json",
        size: 0.08,
        height: 0.01,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.005,
        bevelSize: 0.002,
        bevelOffset: 0,
        bevelSegments: 8,
      },
      text,
      h("meshStandardMaterial", {
        color: "#1a1714",
        roughness: 0.25,
        metalness: 0.15,
        emissive: "#0d0a08",
        emissiveIntensity: 0.08,
      })
    )
  );
}

// Advanced PBR materials - Museum-grade luxury finishes

// Matte uncoated paper with subtle texture (roughness map simulation)
function createMattePaperMaterial() {
  return h("meshPhysicalMaterial", {
    color: MATTE_BLACK,
    roughness: 0.85,
    metalness: 0.0,
    clearcoat: 0.0,
    clearcoatRoughness: 1.0,
  });
}

// Premium gold foil with clearcoat - Real metallic shine
function createGoldFoilMaterial() {
  return h("meshPhysicalMaterial", {
    color: GOLD,
    roughness: 0.15,
    metalness: 1.0,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1,
    emissive: FOIL_GOLD,
    emissiveIntensity: 0.25,
  });
}

// Textured board with premium coating
function createTexturedBoardMaterial() {
  return h("meshPhysicalMaterial", {
    color: MATTE_BLACK,
    roughness: 0.65,
    metalness: 0.0,
    clearcoat: 0.3,
    clearcoatRoughness: 0.5,
  });
}

// Luxury paper stock - Coated
function createCoatedPaperMaterial() {
  return h("meshPhysicalMaterial", {
    color: PAPER_CREAM,
    roughness: 0.3,
    metalness: 0.0,
    clearcoat: 0.7,
    clearcoatRoughness: 0.2,
  });
}

// Luxury rigid box component - Real-world scale: 300mm x 200mm x 80mm
function RigidBox({ progressRef }) {
  const boxGroup = useRef();
  const lid = useRef();
  const tissueGroup = useRef();
  const current = useRef(0);

  useFrame((state, delta) => {
    const target = progressRef.current ?? 0;
    current.current = lerp(current.current, target, Math.min(1, delta * 2.5));
    const p = easeInOutCubic(current.current);

    if (boxGroup.current) {
      // Professional slow rotation showcasing craftsmanship
      boxGroup.current.rotation.y = state.clock.elapsedTime * 0.12 + Math.PI / 4;
      boxGroup.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }

    if (lid.current) {
      // Lid lifts with weight and precision
      const lidOpen = Math.max(0, Math.min(1, (p - 0.2) / 0.4));
      lid.current.position.y = lidOpen * 0.6;
      lid.current.rotation.x = -lidOpen * 0.12;
    }

    if (tissueGroup.current) {
      // Tissue reveals luxury contents
      const tissueReveal = Math.max(0, Math.min(1, (p - 0.4) / 0.3));
      tissueGroup.current.position.y = tissueReveal * 0.15;
      tissueGroup.current.scale.setScalar(0.6 + tissueReveal * 0.4);
    }
  });

  return h(
    "group",
    { ref: boxGroup, dispose: null },
    
    // Main box body - 300mm x 200mm x 80mm (scaled: 3 x 2 x 0.8)
    h(
      RoundedBox,
      { 
        args: [1.5, 0.4, 1.0], 
        radius: 0.02, 
        smoothness: 10, 
        castShadow: true, 
        receiveShadow: true,
        position: [0, 0, 0]
      },
      createTexturedBoardMaterial()
    ),
    
    // Inner lining - luxury contrast
    h(
      RoundedBox,
      { 
        args: [1.45, 0.38, 0.95], 
        radius: 0.015, 
        position: [0, 0.01, 0] 
      },
      h("meshPhysicalMaterial", { 
        color: BOX_INNER, 
        roughness: 0.9,
        metalness: 0.0,
      })
    ),
    
    // Premium gold foil logo panel - Front face
    h(
      "mesh",
      { position: [0, 0, 0.505], castShadow: true },
      h("planeGeometry", { args: [0.6, 0.25] }),
      createGoldFoilMaterial()
    ),
    
    // Embossed detail on foil - Creates depth
    h(
      "mesh",
      { position: [0, 0, 0.51] },
      h("boxGeometry", { args: [0.58, 0.23, 0.008] }),
      createGoldFoilMaterial()
    ),
    
    // "PRINT KING" branding on front
    createText("PRINT", [0, 0.06, 0.515]),
    createText("KING", [0, -0.04, 0.515]),
    
    // Right side panel with subtle accent
    h(
      "mesh",
      { position: [0.755, 0, 0], rotation: [0, Math.PI / 2, 0] },
      h("planeGeometry", { args: [1.0, 0.4] }),
      h("meshPhysicalMaterial", { 
        color: BOX_ACCENT,
        roughness: 0.7,
        metalness: 0.0,
        opacity: 0.6,
        transparent: true,
      })
    ),
    createText("PRINT", [0.755, 0.06, 0], [0, Math.PI / 2, 0]),
    createText("KING", [0.755, -0.04, 0], [0, Math.PI / 2, 0]),
    
    // Left side panel
    h(
      "mesh",
      { position: [-0.755, 0, 0], rotation: [0, -Math.PI / 2, 0] },
      h("planeGeometry", { args: [1.0, 0.4] }),
      h("meshPhysicalMaterial", { 
        color: BOX_ACCENT,
        roughness: 0.7,
        metalness: 0.0,
        opacity: 0.6,
        transparent: true,
      })
    ),
    createText("PRINT", [-0.755, 0.06, 0], [0, -Math.PI / 2, 0]),
    createText("KING", [-0.755, -0.04, 0], [0, -Math.PI / 2, 0]),
    
    // Back side panel
    h(
      "mesh",
      { position: [0, 0, -0.505], rotation: [0, Math.PI, 0] },
      h("planeGeometry", { args: [1.5, 0.4] }),
      h("meshPhysicalMaterial", { 
        color: BOX_ACCENT,
        roughness: 0.7,
        metalness: 0.0,
        opacity: 0.6,
        transparent: true,
      })
    ),
    createText("PRINT", [0, 0.06, -0.505], [0, Math.PI, 0]),
    createText("KING", [0, -0.04, -0.505], [0, Math.PI, 0]),
    
    // Lid with gold accent - Perfectly fitted
    h(
      "group",
      { ref: lid, position: [0, 0.2, 0] },
      h(
        RoundedBox,
        { 
          args: [1.54, 0.12, 1.04], 
          radius: 0.02, 
          smoothness: 10, 
          castShadow: true,
          receiveShadow: true,
        },
        createMattePaperMaterial()
      ),
      
      // Gold foil logo on lid top
      h(
        "mesh",
        { position: [0, 0.065, 0], rotation: [-Math.PI / 2, 0, 0] },
        h("planeGeometry", { args: [0.5, 0.3] }),
        createGoldFoilMaterial()
      ),
      
      // Embossed detail on lid
      h(
        "mesh",
        { position: [0, 0.065, 0] },
        h("boxGeometry", { args: [0.48, 0.006, 0.28] }),
        createGoldFoilMaterial()
      )
    ),
    
    // Luxury tissue paper nest - Black with subtle shimmer
    h(
      "group",
      { ref: tissueGroup, position: [0, -0.15, 0] },
      h(
        "mesh",
        { position: [0, 0, 0], rotation: [0.08, 0.25, 0] },
        h("boxGeometry", { args: [1.2, 0.04, 0.8] }),
        h("meshPhysicalMaterial", { 
          color: TISSUE_BLACK, 
          roughness: 0.95,
          metalness: 0.0,
          transmission: 0.05,
          opacity: 0.95,
          transparent: true,
        })
      ),
      h(
        "mesh",
        { position: [0, -0.015, 0.05], rotation: [0.12, -0.15, 0] },
        h("boxGeometry", { args: [1.1, 0.03, 0.7] }),
        h("meshPhysicalMaterial", { 
          color: TISSUE_BLACK, 
          roughness: 0.95,
          metalness: 0.0,
          opacity: 0.85,
          transparent: true,
        })
      )
    )
  );
}

// Floating luxury printed products - Scaled to showcase craftsmanship
function FloatingElements({ progressRef }) {
  const elementsGroup = useRef();
  const elements = useRef([]);
  const current = useRef(0);

  useFrame((state, delta) => {
    const target = progressRef.current ?? 0;
    current.current = lerp(current.current, target, Math.min(1, delta * 2));
    const p = easeInOutCubic(current.current);

    // Elements float out gracefully after tissue reveals
    const floatStart = Math.max(0, Math.min(1, (p - 0.6) / 0.4));

    elements.current.forEach((el, idx) => {
      if (el) {
        const delay = idx * 0.18;
        const elementProgress = Math.max(0, Math.min(1, floatStart - delay));
        
        // Gentle orbital display - Museum presentation
        const angle = (idx / 4) * Math.PI * 2 + state.clock.elapsedTime * 0.08;
        const radius = 1.8 * elementProgress;
        
        el.position.x = Math.cos(angle) * radius;
        el.position.z = Math.sin(angle) * radius;
        el.position.y = 0.3 + elementProgress * 1.0 + Math.sin(state.clock.elapsedTime * 0.6 + idx) * 0.08;
        
        // Subtle rotation to show all sides
        el.rotation.y = state.clock.elapsedTime * 0.15 + idx;
        el.rotation.x = Math.sin(state.clock.elapsedTime * 0.4 + idx) * 0.08;
      }
    });
  });

  return h(
    "group",
    { ref: elementsGroup },
    
    // Premium business card with gold foil
    h(
      "mesh",
      { 
        ref: (el) => (elements.current[0] = el),
        castShadow: true,
        receiveShadow: true,
      },
      h("boxGeometry", { args: [0.5, 0.015, 0.35] }),
      createCoatedPaperMaterial()
    ),
    h(
      "mesh",
      { 
        position: [0, 0.008, 0] 
      },
      h("planeGeometry", { args: [0.3, 0.15] }),
      createGoldFoilMaterial()
    ),
    
    // Luxury perfume/cosmetic carton
    h(
      RoundedBox,
      { 
        ref: (el) => (elements.current[1] = el),
        args: [0.35, 0.5, 0.35], 
        radius: 0.015,
        castShadow: true,
        receiveShadow: true,
      },
      h("meshPhysicalMaterial", {
        color: MATTE_BLACK,
        roughness: 0.25,
        metalness: 0.05,
        clearcoat: 0.9,
        clearcoatRoughness: 0.15,
      })
    ),
    h(
      "mesh",
      { 
        position: [0, 0, 0.18]
      },
      h("planeGeometry", { args: [0.2, 0.12] }),
      createGoldFoilMaterial()
    ),
    
    // Premium invitation with embossed crest
    h(
      "mesh",
      { 
        ref: (el) => (elements.current[2] = el),
        castShadow: true,
        receiveShadow: true,
      },
      h("boxGeometry", { args: [0.45, 0.012, 0.32] }),
      createCoatedPaperMaterial()
    ),
    h(
      "mesh",
      { 
        position: [0, 0.008, 0]
      },
      h("cylinderGeometry", { args: [0.05, 0.05, 0.008, 32] }),
      createGoldFoilMaterial()
    ),
    
    // Die-cut luxury label
    h(
      "mesh",
      { 
        ref: (el) => (elements.current[3] = el),
        castShadow: true,
        receiveShadow: true,
      },
      h("boxGeometry", { args: [0.38, 0.01, 0.28] }),
      h("meshPhysicalMaterial", {
        color: "#f8f6f0",
        roughness: 0.35,
        metalness: 0.0,
        clearcoat: 0.8,
        clearcoatRoughness: 0.18,
      })
    ),
    h(
      "mesh",
      { 
        position: [0, 0.006, 0]
      },
      h("planeGeometry", { args: [0.18, 0.1] }),
      createGoldFoilMaterial()
    ),
  );
}

// Main component export with proper canvas configuration
export default function HeroBox({ progressRef, isMobile = false }) {
  return h(
    SceneCanvas, 
    { isMobile: isMobile }, 
    h(RigidBox, { progressRef: progressRef }),
    h(FloatingElements, { progressRef: progressRef })
  );
}
