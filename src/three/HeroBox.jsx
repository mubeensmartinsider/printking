/* ============================================================
   PRINTKING — Cinematic Hero 3D scene
   A procedural matte-black luxury rigid box with gold-foil
   emboss. Rotates continuously; lid opens + box scales on scroll.

   NOTE: The scene graph is authored with React.createElement (not
   JSX) on purpose — the preview's visual-edit babel plugin injects
   source-location attributes onto JSX elements, which React Three
   Fiber would try to apply to THREE objects and crash. createElement
   nodes are not instrumented, so the scene stays clean.
   ============================================================ */
import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  RoundedBox,
  Environment,
  Lightformer,
  ContactShadows,
  Float,
  Sparkles,
} from "@react-three/drei";

const h = React.createElement;
const GOLD = "#c5a05a";
const MATTE = "#1a140d";
const KRAFT = "#b08653";

const lerp = (a, b, t) => a + (b - a) * t;

function LuxuryBox({ progressRef }) {
  const group = useRef();
  const lid = useRef();
  const current = useRef(0);

  useFrame((_, delta) => {
    const target = progressRef.current ?? 0;
    current.current = lerp(current.current, target, Math.min(1, delta * 4));
    const p = current.current;

    if (group.current) {
      group.current.rotation.y += 0.18 * delta; // ~0.003 rad/frame @60fps
      const scale = 1 + p * 0.28;
      group.current.scale.set(scale, scale, scale);
      group.current.position.y = lerp(-0.1, 0.35, p);
    }
    if (lid.current) {
      const open = Math.max(0, Math.min(1, (p - 0.12) / 0.43));
      lid.current.rotation.x = -open * (Math.PI * 0.62);
    }
  });

  const mat = (color, roughness, metalness) =>
    h("meshStandardMaterial", { color, roughness, metalness });
  const physMat = (color) =>
    h("meshPhysicalMaterial", {
      color,
      metalness: 0.15,
      roughness: 0.35,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.8,
    });
  const goldMat = (roughness, metalness) =>
    h("meshStandardMaterial", {
      color: GOLD,
      roughness,
      metalness,
      emissive: GOLD,
      emissiveIntensity: 0.18,
    });

  return h(
    "group",
    { ref: group, dispose: null },
    // Box body
    h(
      RoundedBox,
      { args: [2.2, 1.05, 1.6], radius: 0.04, smoothness: 6, castShadow: true, receiveShadow: true },
      physMat(MATTE)
    ),
    // Gold lining
    h(
      RoundedBox,
      { args: [2.04, 0.92, 1.44], radius: 0.02, position: [0, 0.07, 0] },
      goldMat(0.35, 0.9)
    ),
    // Dark inner cavity
    h(
      RoundedBox,
      { args: [1.92, 0.84, 1.32], radius: 0.02, position: [0, 0.12, 0] },
      mat(MATTE, 0.7, 0.1)
    ),
    // Gold foil emboss on the box front face
    h(
      "mesh",
      { position: [0, -0.04, 0.802] },
      h("planeGeometry", { args: [0.86, 0.34] }),
      goldMat(0.3, 1)
    ),
    // Lid — hinged at the back edge
    h(
      "group",
      { ref: lid, position: [0, 0.54, -0.85] },
      h(
        "group",
        { position: [0, 0, 0.85] },
        h(
          RoundedBox,
          { args: [2.32, 0.34, 1.72], radius: 0.04, smoothness: 6, castShadow: true },
          physMat(MATTE)
        ),
        // Gold foil emboss plate
        h(
          "mesh",
          { position: [0, 0.18, 0], rotation: [-Math.PI / 2, 0, 0] },
          h("planeGeometry", { args: [0.9, 0.42] }),
          goldMat(0.28, 1)
        ),
        // Gold ribbon — crossing the lid
        h(
          "mesh",
          { position: [0, 0.172, 0] },
          h("boxGeometry", { args: [0.16, 0.05, 1.74] }),
          goldMat(0.18, 1)
        ),
        h(
          "mesh",
          { position: [0, 0.172, 0] },
          h("boxGeometry", { args: [2.34, 0.05, 0.16] }),
          goldMat(0.18, 1)
        ),
        // Thin gold rule on lid front
        h(
          "mesh",
          { position: [0, -0.12, 0.861] },
          h("planeGeometry", { args: [2.32, 0.04] }),
          goldMat(0.3, 1)
        )
      )
    )
  );
}

function scene(progressRef) {
  return h(
    Suspense,
    { fallback: null },
    h("ambientLight", { intensity: 0.55 }),
    h("spotLight", {
      position: [4, 6, 4],
      angle: 0.45,
      penumbra: 1,
      intensity: 3.4,
      castShadow: true,
      color: "#fff6e0",
    }),
    h("directionalLight", { position: [0, 2, 6], intensity: 1.1, color: "#ffffff" }),
    h("pointLight", { position: [-4, 2, -2], intensity: 0.8, color: GOLD }),
    h(Float, { speed: 1.1, rotationIntensity: 0.25, floatIntensity: 0.5 }, h(LuxuryBox, { progressRef })),
    h(
      Environment,
      { resolution: 256 },
      h(Lightformer, { intensity: 3, position: [0, 4, -6], scale: [12, 12, 1], color: "#ffffff" }),
      h(Lightformer, { intensity: 1.2, position: [-6, 1, 2], scale: [6, 6, 1], color: GOLD }),
      h(Lightformer, { intensity: 0.8, position: [6, -1, 2], scale: [6, 6, 1], color: "#ffffff" })
    ),
    // Supporting packaging — a kraft mailer box floating in the back
    h(
      Float,
      { speed: 0.9, rotationIntensity: 0.5, floatIntensity: 1.4 },
      h(
        "group",
        { position: [2.9, 1.5, -2.4], rotation: [0.3, -0.5, 0.15], scale: 0.5 },
        h(RoundedBox, { args: [1.3, 0.7, 0.95], radius: 0.03 }, h("meshStandardMaterial", { color: KRAFT, roughness: 0.85, metalness: 0.04 }))
      )
    ),
    // Gold dust particles
    h(Sparkles, { count: 110, scale: [9, 6, 6], size: 1.6, speed: 0.3, color: GOLD, opacity: 0.45 }),
    h(ContactShadows, {
      position: [0, -1.05, 0],
      opacity: 0.55,
      scale: 9,
      blur: 2.6,
      far: 4,
      color: "#000000",
    })
  );
}

export default function HeroBox({ progressRef }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 1.05, 5.4], fov: 40 }}
    >
      {scene(progressRef)}
    </Canvas>
  );
}
