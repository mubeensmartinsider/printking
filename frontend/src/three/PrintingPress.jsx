/* ============================================================
   PRINTKING — 3D Offset Printing Press Scene
   Professional Heidelberg press with clear printing visualization
   Real-world scale and advanced materials
   ============================================================ */
import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Box, Cylinder, Environment, Lightformer, ContactShadows, Text3D, Center } from "@react-three/drei";
import * as THREE from "three";

const h = React.createElement;

// Professional printing press colors
const PRESS_METAL = "#5a5a5a";
const PRESS_DARK = "#333333";
const HEIDELBERG_GREEN = "#1e5a3c";
const CYAN = "#00b8d4";
const MAGENTA = "#d81b60";
const YELLOW = "#ffd600";
const BLACK_INK = "#1a1a1a";
const PAPER_WHITE = "#fafafa";
const CHROME = "#c0c0c0";

const lerp = (a, b, t) => a + (b - a) * t;

// Paper sheet moving through press cylinders - Clear visualization
function PaperSheet({ index }) {
  const meshRef = useRef();
  const startZ = 2.5;
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Smooth continuous movement
    const speed = 0.4;
    const offset = index * 1.2;
    const totalCycle = 8;
    const rawPos = (state.clock.elapsedTime * speed + offset) % totalCycle;
    const pos = startZ - rawPos;
    
    meshRef.current.position.z = pos;
    
    // Visible range control
    const minZ = -3;
    const maxZ = 2.5;
    
    if (pos < minZ || pos > maxZ) {
      meshRef.current.visible = false;
    } else {
      meshRef.current.visible = true;
      
      // Fade in/out at edges
      const fadeMargin = 0.8;
      let opacity = 1;
      
      if (pos > maxZ - fadeMargin) {
        opacity = (maxZ - pos) / fadeMargin;
      } else if (pos < minZ + fadeMargin) {
        opacity = (pos - minZ) / fadeMargin;
      }
      
      if (meshRef.current.material) {
        meshRef.current.material.opacity = Math.max(0, Math.min(1, opacity));
        
        // Show ink accumulation as paper passes through CMYK cylinders
        const inkProgress = Math.max(0, Math.min(1, (2.5 - pos) / 3));
        if (inkProgress > 0) {
          meshRef.current.material.emissiveIntensity = inkProgress * 0.15;
        } else {
          meshRef.current.material.emissiveIntensity = 0;
        }
      }
    }
  });

  return h(
    "mesh",
    { 
      ref: meshRef,
      position: [0, 0, 0],
      rotation: [-Math.PI / 2, 0, 0],
      castShadow: true,
      receiveShadow: true,
    },
    h("planeGeometry", { args: [0.8, 0.6] }),
    h("meshPhysicalMaterial", {
      color: PAPER_WHITE,
      roughness: 0.4,
      metalness: 0.0,
      clearcoat: 0.3,
      clearcoatRoughness: 0.4,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide,
      emissive: "#00aaff",
      emissiveIntensity: 0,
    })
  );
}

// Rotating CMYK ink cylinders - Core printing mechanism
function InkCylinder({ position, color, label, rotationSpeed = 2 }) {
  const cylinderRef = useRef();
  
  useFrame((state, delta) => {
    if (cylinderRef.current) {
      cylinderRef.current.rotation.x += delta * rotationSpeed;
    }
  });

  return h(
    "group",
    { position },
    // Main cylinder with ink color
    h(
      Cylinder,
      {
        ref: cylinderRef,
        args: [0.08, 0.08, 1.0, 32],
        rotation: [0, 0, Math.PI / 2],
        castShadow: true,
        receiveShadow: true,
      },
      h("meshPhysicalMaterial", {
        color: color,
        roughness: 0.25,
        metalness: 0.7,
        clearcoat: 0.5,
        clearcoatRoughness: 0.3,
        emissive: color,
        emissiveIntensity: 0.2,
      })
    ),
    // End caps - Chrome finish
    h(
      Cylinder,
      {
        args: [0.09, 0.09, 0.05, 32],
        rotation: [0, 0, Math.PI / 2],
        position: [0.525, 0, 0],
      },
      h("meshStandardMaterial", {
        color: CHROME,
        roughness: 0.1,
        metalness: 1.0,
      })
    ),
    h(
      Cylinder,
      {
        args: [0.09, 0.09, 0.05, 32],
        rotation: [0, 0, Math.PI / 2],
        position: [-0.525, 0, 0],
      },
      h("meshStandardMaterial", {
        color: CHROME,
        roughness: 0.1,
        metalness: 1.0,
      })
    )
  );
}

// Professional press frame - Heidelberg style
function PressBody() {
  return h(
    "group",
    null,
    // Main press body - Heidelberg green
    h(
      RoundedBox,
      { 
        args: [1.4, 0.9, 2.2], 
        radius: 0.03, 
        position: [0, -0.15, 0],
        castShadow: true,
        receiveShadow: true,
      },
      h("meshPhysicalMaterial", {
        color: HEIDELBERG_GREEN,
        roughness: 0.35,
        metalness: 0.6,
        clearcoat: 0.4,
        clearcoatRoughness: 0.3,
      })
    ),
    
    // Control panel with digital display
    h(
      RoundedBox,
      { 
        args: [0.4, 0.3, 0.06], 
        radius: 0.015, 
        position: [0.75, 0.25, 0.8], 
        rotation: [0, -0.35, 0],
        castShadow: true,
      },
      h("meshPhysicalMaterial", {
        color: "#1a1a1a",
        roughness: 0.2,
        metalness: 0.4,
        emissive: "#00ff88",
        emissiveIntensity: 0.2,
      })
    ),
    
    // Display screen
    h(
      "mesh",
      { 
        position: [0.76, 0.25, 0.82],
        rotation: [0, -0.35, 0],
      },
      h("planeGeometry", { args: [0.25, 0.15] }),
      h("meshBasicMaterial", {
        color: "#00ff88",
      })
    ),
    
    // Side frame rails - Precision engineering
    h(
      Box,
      { 
        args: [0.04, 0.8, 2.0], 
        position: [0.7, -0.15, 0],
        castShadow: true,
      },
      h("meshStandardMaterial", {
        color: PRESS_METAL,
        roughness: 0.4,
        metalness: 0.85,
      })
    ),
    h(
      Box,
      { 
        args: [0.04, 0.8, 2.0], 
        position: [-0.7, -0.15, 0],
        castShadow: true,
      },
      h("meshStandardMaterial", {
        color: PRESS_METAL,
        roughness: 0.4,
        metalness: 0.85,
      })
    ),
    
    // Paper feed tray (input)
    h(
      RoundedBox,
      { 
        args: [0.9, 0.15, 0.7], 
        position: [0, -0.3, 1.8], 
        radius: 0.02,
        castShadow: true,
      },
      h("meshPhysicalMaterial", { 
        color: PRESS_DARK, 
        roughness: 0.5, 
        metalness: 0.6 
      })
    ),
    
    // Stack of blank paper in feed tray
    h(
      "mesh",
      { position: [0, -0.24, 1.8] },
      h("boxGeometry", { args: [0.8, 0.08, 0.6] }),
      h("meshStandardMaterial", { 
        color: PAPER_WHITE, 
        roughness: 0.6 
      })
    ),
    
    // Paper delivery tray (output)
    h(
      RoundedBox,
      { 
        args: [0.9, 0.15, 0.7], 
        position: [0, -0.3, -1.8], 
        radius: 0.02,
        castShadow: true,
      },
      h("meshPhysicalMaterial", { 
        color: PRESS_DARK, 
        roughness: 0.5, 
        metalness: 0.6 
      })
    ),
    
    // Stack of printed sheets in delivery
    h(
      "mesh",
      { position: [0, -0.24, -1.8] },
      h("boxGeometry", { args: [0.8, 0.06, 0.6] }),
      h("meshStandardMaterial", { 
        color: "#e8e8e8", 
        roughness: 0.4,
        emissive: "#004488",
        emissiveIntensity: 0.08,
      })
    )
  );
}

// HEIDELBERG branding text
function createBrandText() {
  return h(
    Center,
    { position: [0.72, 0.5, 0.3], rotation: [0, -Math.PI / 2, 0] },
    h(
      Text3D,
      {
        font: "https://threejs.org/examples/fonts/helvetiker_bold.typeface.json",
        size: 0.08,
        height: 0.008,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.003,
        bevelSize: 0.001,
        bevelSegments: 5,
      },
      "HEIDELBERG",
      h("meshStandardMaterial", {
        color: "#ffffff",
        roughness: 0.3,
        metalness: 0.2,
      })
    )
  );
}

// Professional studio lighting for press
function PressLighting({ isMobile }) {
  const shadowMapSize = isMobile ? 1024 : 2048;
  
  return h(
    "group",
    null,
    h("ambientLight", { intensity: 0.5 }),
    
    h("spotLight", {
      position: [4, 5, 3],
      angle: 0.6,
      penumbra: 1,
      intensity: 8,
      castShadow: true,
      "shadow-mapSize": [shadowMapSize, shadowMapSize],
      color: "#ffffff",
    }),
    
    h("directionalLight", { 
      position: [-3, 4, -2], 
      intensity: 3.5, 
      color: "#ffeedd" 
    }),
    
    h("spotLight", { 
      position: [0, 3, 4], 
      intensity: 5, 
      angle: 0.5,
      penumbra: 0.8,
      color: "#ffffff" 
    }),
    
    h("directionalLight", { 
      position: [2, 2, -3], 
      intensity: 2.5, 
      color: "#d4af37" 
    }),
    
    h(
      Environment,
      { resolution: isMobile ? 256 : 512, background: false },
      h(Lightformer, { 
        intensity: 3.5, 
        position: [-6, 4, 6], 
        scale: [20, 12, 1], 
        color: "#ffffff" 
      }),
      h(Lightformer, { 
        intensity: 2.5, 
        position: [6, 3, 2], 
        scale: [15, 10, 1], 
        color: "#fff8f0" 
      }),
      h(Lightformer, { 
        intensity: 2.0, 
        position: [0, 4, -6], 
        scale: [18, 8, 1], 
        color: "#ffe4cc" 
      })
    ),
    
    h(ContactShadows, {
      position: [0, -0.9, 0],
      opacity: 0.3,
      scale: 10,
      blur: 2.5,
      far: 4,
    })
  );
}

export default function PrintingPress({ progressRef, isMobile = false }) {
  const dpr = isMobile ? [1, 1.5] : [1, 2];
  
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
        position: isMobile ? [0, 0.6, 4] : [0, 0.7, 3.5], 
        fov: isMobile ? 45 : 42 
      }
    },
    h(
      Suspense,
      { fallback: null },
      h(PressLighting, { isMobile: isMobile }),
      h(
        "group",
        { position: [0, 0, 0], rotation: [0, Math.PI / 8, 0] },
        h(PressBody, null),
        createBrandText(),
        
        // CMYK printing cylinders - Clearly positioned
        h(InkCylinder, { 
          position: [-0.45, 0.25, -0.6], 
          color: CYAN, 
          label: "C",
          rotationSpeed: 2.2 
        }),
        h(InkCylinder, { 
          position: [-0.45, 0.25, -0.2], 
          color: MAGENTA, 
          label: "M",
          rotationSpeed: 2.0 
        }),
        h(InkCylinder, { 
          position: [-0.45, 0.25, 0.2], 
          color: YELLOW, 
          label: "Y",
          rotationSpeed: 2.1 
        }),
        h(InkCylinder, { 
          position: [-0.45, 0.25, 0.6], 
          color: BLACK_INK, 
          label: "K",
          rotationSpeed: 1.9 
        }),
        
        // Impression cylinder (presses paper against ink)
        h(InkCylinder, { 
          position: [0.15, 0, 0], 
          color: PRESS_DARK, 
          label: "IMP",
          rotationSpeed: -1.8 
        }),
        
        // Moving paper sheets showing printing process
        h(PaperSheet, { index: 0 }),
        h(PaperSheet, { index: 1 }),
        h(PaperSheet, { index: 2 }),
        h(PaperSheet, { index: 3 }),
        h(PaperSheet, { index: 4 })
      )
    )
  );
}
