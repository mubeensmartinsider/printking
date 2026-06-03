/* ============================================================
   PRINTKING — 3D Foil Stamping Machine Scene
   Professional hot foil stamping with clear process visualization
   Real-world scale and premium materials
   ============================================================ */
import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Box, Cylinder, ContactShadows, Environment, Lightformer, Text3D, Center } from "@react-three/drei";
import * as THREE from "three";

const h = React.createElement;

// Professional colors
const MACHINE_GRAY = "#626262";
const MACHINE_DARK = "#383838";
const GOLD_FOIL = "#ffd700";
const COPPER_FOIL = "#c77f3a";
const SILVER_FOIL = "#d0d0d0";
const PAPER_CREAM = "#faf8f3";
const CHROME = "#b8b8b8";

const lerp = (a, b, t) => a + (b - a) * t;

// Stamping die with realistic motion and heat glow
function StampingDie({ progressRef }) {
  const dieRef = useRef();
  const plateRef = useRef();
  const foilRef = useRef();
  const sampleRef = useRef();
  
  useFrame((state) => {
    if (!dieRef.current) return;
    
    // Precise rhythmic stamping cycle
    const cycleSpeed = 1.2;
    const cycle = (Math.sin(state.clock.elapsedTime * cycleSpeed) + 1) / 2;
    const eased = cycle < 0.5 ? 2 * cycle * cycle : 1 - Math.pow(-2 * cycle + 2, 2) / 2;
    
    // Die movement - Powerful press action
    const minHeight = 0.05;
    const maxHeight = 0.5;
    const stampHeight = lerp(maxHeight, minHeight, eased);
    dieRef.current.position.y = stampHeight;
    
    // Heat glow when stamping (contact moment)
    const contactThreshold = 0.15;
    if (stampHeight < contactThreshold) {
      const contactIntensity = 1 - (stampHeight / contactThreshold);
      
      if (plateRef.current && plateRef.current.material) {
        plateRef.current.material.emissiveIntensity = 0.4 * contactIntensity;
      }
      
      // Show foil transfer effect
      if (foilRef.current && foilRef.current.material) {
        foilRef.current.material.opacity = 0.3 + contactIntensity * 0.5;
      }
      
      // Sample card receives foil
      if (sampleRef.current && sampleRef.current.material) {
        sampleRef.current.material.emissiveIntensity = 0.3 * contactIntensity;
      }
    } else {
      if (plateRef.current && plateRef.current.material) {
        plateRef.current.material.emissiveIntensity = 0.05;
      }
      if (foilRef.current && foilRef.current.material) {
        foilRef.current.material.opacity = 0.3;
      }
      if (sampleRef.current && sampleRef.current.material) {
        sampleRef.current.material.emissiveIntensity = 0.05;
      }
    }
  });

  return h(
    "group",
    null,
    // Die press head - Heated metal
    h(
      "group",
      { ref: dieRef, position: [0, 0.5, 0] },
      h(
        RoundedBox,
        { 
          args: [0.6, 0.15, 0.5], 
          radius: 0.015,
          castShadow: true,
        },
        h("meshPhysicalMaterial", {
          color: MACHINE_DARK,
          roughness: 0.3,
          metalness: 0.8,
          clearcoat: 0.3,
          clearcoatRoughness: 0.4,
        })
      ),
      
      // Heated stamping plate (red-hot when pressing)
      h(
        Box,
        { 
          ref: plateRef,
          args: [0.4, 0.02, 0.3], 
          position: [0, -0.08, 0],
          castShadow: true,
        },
        h("meshStandardMaterial", {
          color: "#ff4422",
          roughness: 0.3,
          metalness: 0.6,
          emissive: "#ff4422",
          emissiveIntensity: 0.05,
        })
      ),
      
      // Stamping pattern (logo/text area)
      h(
        "mesh",
        { position: [0, -0.09, 0] },
        h("planeGeometry", { args: [0.25, 0.15] }),
        h("meshStandardMaterial", {
          color: "#661100",
          roughness: 0.4,
          metalness: 0.5,
        })
      )
    ),
    
    // Foil sheet between die and paper - Shows transfer moment
    h(
      "mesh",
      { 
        ref: foilRef,
        position: [0, 0.06, 0],
        rotation: [-Math.PI / 2, 0, 0]
      },
      h("planeGeometry", { args: [0.45, 0.35] }),
      h("meshPhysicalMaterial", {
        color: GOLD_FOIL,
        roughness: 0.1,
        metalness: 1.0,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
        emissive: GOLD_FOIL,
        emissiveIntensity: 0.2,
      })
    ),
    
    // Sample card receiving foil stamp
    h(
      "mesh",
      { 
        ref: sampleRef,
        position: [0, 0.04, 0],
        castShadow: true,
        receiveShadow: true,
      },
      h("boxGeometry", { args: [0.5, 0.01, 0.4] }),
      h("meshPhysicalMaterial", {
        color: PAPER_CREAM,
        roughness: 0.5,
        metalness: 0.0,
        clearcoat: 0.3,
        clearcoatRoughness: 0.5,
        emissive: GOLD_FOIL,
        emissiveIntensity: 0.05,
      })
    ),
    
    // Gold stamped area on card (result)
    h(
      "mesh",
      { position: [0, 0.045, 0] },
      h("planeGeometry", { args: [0.25, 0.15] }),
      h("meshPhysicalMaterial", {
        color: GOLD_FOIL,
        roughness: 0.15,
        metalness: 1.0,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
        emissive: GOLD_FOIL,
        emissiveIntensity: 0.15,
      })
    ),
    
    // Base plate - Precision surface
    h(
      RoundedBox,
      { 
        args: [0.7, 0.03, 0.55], 
        position: [0, 0, 0],
        radius: 0.01,
        receiveShadow: true,
      },
      h("meshStandardMaterial", {
        color: CHROME,
        roughness: 0.2,
        metalness: 0.9,
      })
    )
  );
}

// Foil roll with rotation - Shows continuous supply
function FoilRoll({ position, color, name }) {
  const rollRef = useRef();
  const coreRef = useRef();
  
  useFrame((state, delta) => {
    if (rollRef.current) {
      rollRef.current.rotation.x += delta * 0.3;
    }
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.3;
    }
  });

  return h(
    "group",
    { position },
    // Foil wrap
    h(
      Cylinder,
      {
        ref: rollRef,
        args: [0.08, 0.08, 0.4, 32],
        rotation: [0, 0, Math.PI / 2],
        castShadow: true,
      },
      h("meshPhysicalMaterial", {
        color: color,
        roughness: 0.1,
        metalness: 1.0,
        clearcoat: 0.9,
        clearcoatRoughness: 0.1,
        emissive: color,
        emissiveIntensity: 0.2,
      })
    ),
    // Core tube
    h(
      Cylinder,
      {
        ref: coreRef,
        args: [0.025, 0.025, 0.42, 16],
        rotation: [0, 0, Math.PI / 2],
      },
      h("meshStandardMaterial", {
        color: "#8b7355",
        roughness: 0.8,
        metalness: 0.1,
      })
    ),
    // End caps
    h(
      Cylinder,
      {
        args: [0.085, 0.085, 0.02, 32],
        rotation: [0, 0, Math.PI / 2],
        position: [0.21, 0, 0],
      },
      h("meshStandardMaterial", {
        color: CHROME,
        roughness: 0.2,
        metalness: 0.9,
      })
    ),
    h(
      Cylinder,
      {
        args: [0.085, 0.085, 0.02, 32],
        rotation: [0, 0, Math.PI / 2],
        position: [-0.21, 0, 0],
      },
      h("meshStandardMaterial", {
        color: CHROME,
        roughness: 0.2,
        metalness: 0.9,
      })
    )
  );
}

// Professional stamping machine frame
function MachineFrame() {
  return h(
    "group",
    null,
    // Main body
    h(
      RoundedBox,
      { 
        args: [1.0, 0.7, 1.0], 
        radius: 0.03, 
        position: [0, -0.2, 0],
        castShadow: true,
        receiveShadow: true,
      },
      h("meshPhysicalMaterial", {
        color: MACHINE_GRAY,
        roughness: 0.4,
        metalness: 0.7,
        clearcoat: 0.3,
        clearcoatRoughness: 0.5,
      })
    ),
    
    // Vertical press columns - Heavy-duty
    h(
      Box,
      { 
        args: [0.06, 1.0, 0.06], 
        position: [-0.45, 0.25, -0.45],
        castShadow: true,
      },
      h("meshStandardMaterial", {
        color: MACHINE_DARK,
        roughness: 0.3,
        metalness: 0.85,
      })
    ),
    h(
      Box,
      { 
        args: [0.06, 1.0, 0.06], 
        position: [0.45, 0.25, -0.45],
        castShadow: true,
      },
      h("meshStandardMaterial", {
        color: MACHINE_DARK,
        roughness: 0.3,
        metalness: 0.85,
      })
    ),
    
    // Control panel
    h(
      RoundedBox,
      { 
        args: [0.3, 0.2, 0.04], 
        radius: 0.015, 
        position: [0.55, 0.1, 0.3], 
        rotation: [0, -0.4, 0],
        castShadow: true,
      },
      h("meshPhysicalMaterial", {
        color: "#222222",
        roughness: 0.2,
        metalness: 0.5,
        emissive: "#00ff99",
        emissiveIntensity: 0.18,
      })
    ),
    
    // Display
    h(
      "mesh",
      { 
        position: [0.56, 0.1, 0.32],
        rotation: [0, -0.4, 0],
      },
      h("planeGeometry", { args: [0.18, 0.1] }),
      h("meshBasicMaterial", {
        color: "#00ff99",
      })
    ),
    
    // Sample tray - Finished products
    h(
      RoundedBox,
      { 
        args: [0.6, 0.1, 0.4], 
        position: [-0.4, -0.5, 0.4], 
        radius: 0.015,
        castShadow: true,
      },
      h("meshStandardMaterial", { 
        color: MACHINE_DARK, 
        roughness: 0.5, 
        metalness: 0.6 
      })
    )
  );
}

// Sample cards showing different foil colors
function SampleCard({ position, rotation, foilColor, label }) {
  return h(
    "group",
    { position, rotation },
    // Card base - Premium stock
    h(
      Box,
      { 
        args: [0.18, 0.008, 0.25],
        castShadow: true,
        receiveShadow: true,
      },
      h("meshPhysicalMaterial", {
        color: PAPER_CREAM,
        roughness: 0.5,
        metalness: 0.0,
        clearcoat: 0.4,
        clearcoatRoughness: 0.4,
      })
    ),
    // Foil stamped area
    h(
      "mesh",
      { position: [0, 0.005, 0] },
      h("planeGeometry", { args: [0.1, 0.08] }),
      h("meshPhysicalMaterial", {
        color: foilColor,
        roughness: 0.15,
        metalness: 1.0,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
        emissive: foilColor,
        emissiveIntensity: 0.25,
      })
    )
  );
}

// Professional lighting for foil stamping
function FoilLighting({ isMobile }) {
  const shadowMapSize = isMobile ? 1024 : 2048;
  
  return h(
    "group",
    null,
    h("ambientLight", { intensity: 0.6 }),
    
    // Key light - Strong from front
    h("spotLight", {
      position: [3, 4, 3],
      angle: 0.6,
      penumbra: 1,
      intensity: 9,
      castShadow: true,
      "shadow-mapSize": [shadowMapSize, shadowMapSize],
      color: "#fff8f0",
    }),
    
    // Accent on foil
    h("directionalLight", { 
      position: [-2, 3, -2], 
      intensity: 4, 
      color: "#ffd700" 
    }),
    
    h("spotLight", { 
      position: [1, 2, 2], 
      intensity: 6, 
      angle: 0.5,
      penumbra: 0.8,
      color: "#ffffff" 
    }),
    
    h("directionalLight", { 
      position: [0, 3, 0], 
      intensity: 2, 
      color: "#ffe4cc" 
    }),
    
    h(
      Environment,
      { resolution: isMobile ? 256 : 512, background: false },
      h(Lightformer, { 
        intensity: 4.0, 
        position: [-5, 4, 5], 
        scale: [18, 12, 1], 
        color: "#ffffff" 
      }),
      h(Lightformer, { 
        intensity: 3.0, 
        position: [5, 3, 3], 
        scale: [15, 10, 1], 
        color: "#fff8f0" 
      }),
      h(Lightformer, { 
        intensity: 2.5, 
        position: [0, 2, 5], 
        scale: [12, 4, 1], 
        color: GOLD_FOIL 
      })
    ),
    
    h(ContactShadows, {
      position: [0, -0.9, 0],
      opacity: 0.35,
      scale: 8,
      blur: 2.5,
      far: 4,
    })
  );
}

export default function FoilStamping({ progressRef, isMobile = false }) {
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
        position: isMobile ? [0, 0.5, 3] : [0, 0.6, 2.5], 
        fov: isMobile ? 45 : 42 
      }
    },
    h(
      Suspense,
      { fallback: null },
      h(FoilLighting, { isMobile: isMobile }),
      h(
        "group",
        { position: [0, 0, 0], rotation: [0, -Math.PI / 10, 0] },
        h(MachineFrame, null),
        h(StampingDie, { progressRef: progressRef }),
        
        // Foil rolls - Different metallic options
        h(FoilRoll, { 
          position: [-0.6, 0.4, 0.3], 
          color: GOLD_FOIL, 
          name: "Gold" 
        }),
        h(FoilRoll, { 
          position: [-0.6, 0.4, 0], 
          color: SILVER_FOIL, 
          name: "Silver" 
        }),
        h(FoilRoll, { 
          position: [-0.6, 0.4, -0.3], 
          color: COPPER_FOIL, 
          name: "Copper" 
        }),
        
        // Sample cards in output tray
        h(SampleCard, { 
          position: [-0.35, -0.46, 0.45], 
          rotation: [0, 0.25, 0], 
          foilColor: GOLD_FOIL,
          label: "Gold"
        }),
        h(SampleCard, { 
          position: [-0.45, -0.46, 0.35], 
          rotation: [0, -0.15, 0], 
          foilColor: SILVER_FOIL,
          label: "Silver"
        }),
        h(SampleCard, { 
          position: [-0.4, -0.46, 0.25], 
          rotation: [0, 0.4, 0], 
          foilColor: COPPER_FOIL,
          label: "Copper"
        })
      )
    )
  );
}
