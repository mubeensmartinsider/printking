# PrintKing 3D Components

## HeroBox - Cinematic Luxury Unboxing

A world-class 3D experience showcasing premium printing craftsmanship through a narrative-driven unboxing sequence.

---

## Quick Start

```jsx
import HeroBox from './three/HeroBox';

function Hero() {
  const progressRef = useRef(0);
  
  return (
    <div className="hero-container">
      <HeroBox progressRef={progressRef} />
    </div>
  );
}
```

---

## Props

### `progressRef`
**Type:** `React.MutableRefObject<number>`  
**Required:** Yes  
**Range:** 0.0 to 1.0

Controls the animation progress of the entire unboxing sequence:
- `0.0` - Initial closed box state
- `0.2-0.4` - Lid opens
- `0.4-0.7` - Tissue paper reveals
- `0.7-1.0` - Elements float out and settle

**Example:**
```javascript
// Auto-play animation
useEffect(() => {
  gsap.to(progressRef, { 
    current: 1, 
    duration: 8.8, 
    ease: "power2.inOut" 
  });
}, []);

// Scroll-driven animation
useEffect(() => {
  const onScroll = () => {
    const scrollProgress = window.scrollY / window.innerHeight;
    progressRef.current = scrollProgress;
  };
  window.addEventListener('scroll', onScroll);
  return () => window.removeEventListener('scroll', onScroll);
}, []);
```

---

## Components

### Main Components

#### `HeroBox`
Main exported component that sets up the Canvas and scene.

#### `RigidBox`
The main luxury rigid box with:
- Matte black textured board
- Gold foil stamping
- Embossed details
- Hinged lid mechanism
- Black tissue paper nest

#### `FloatingElements`
Premium printed materials that orbit after unboxing:
- Foil-stamped business cards
- Luxury cosmetic carton
- Embossed invitation card
- Die-cut label

#### `StudioLighting`
Professional lighting setup:
- Key light (main illumination)
- Rim light (edge highlights)
- Fill light (shadow detail)
- Ambient light (base level)

---

## Material Functions

### `createMattePaperMaterial()`
Returns physically-based material for matte paper board:
- Deep black color (#0d0b09)
- High roughness (0.9)
- Minimal clearcoat
- Non-reflective

### `createGoldFoilMaterial()`
Returns metallic material for gold foil stamping:
- Authentic gold color (#d4af37)
- Low roughness (0.2)
- Full metalness (1.0)
- Subtle emissive glow

### `createTexturedBoardMaterial()`
Returns material for textured rigid board:
- Matte black finish
- Medium roughness (0.7)
- Light clearcoat protection
- Non-metallic

---

## Animation Timeline

### Phase Breakdown

| Phase | Progress | Duration | Description |
|-------|----------|----------|-------------|
| Emergence | 0.0-0.2 | 1.8s | Box fades in, rotation begins |
| Lid Opening | 0.2-0.6 | 2.2s | Lid lifts with weight |
| Tissue Reveal | 0.4-0.7 | 2.0s | Black tissue emerges |
| Elements Float | 0.7-1.0 | 3.0s | Printed items orbit out |
| Final State | 1.0 | Hold | Gallery composition |

---

## Performance Guidelines

### Optimization Tips

1. **Device Pixel Ratio:**
   ```javascript
   dpr={[1, 2]} // Adaptive quality
   ```

2. **Shadow Quality:**
   - Desktop: 2048x2048 shadow maps
   - Mobile: Consider 1024x1024

3. **Particle Count:**
   - Desktop: 80 particles
   - Mobile: 40-50 particles

4. **Geometry Complexity:**
   - Keep RoundedBox smoothness at 6-8
   - Minimize polygon count for floating elements

### Mobile Considerations

```javascript
// Detect mobile and adjust
const isMobile = window.innerWidth < 768;

<Canvas
  shadows
  dpr={isMobile ? [1, 1.5] : [1, 2]}
  // ... other props
>
```

---

## Lighting Configuration

### Key Light Setup
```javascript
position: [-3, 5, 2]    // Top-left placement
angle: 0.5              // Spotlight cone
penumbra: 1             // Soft edges
intensity: 4.5          // Bright key
castShadow: true        // Enable shadows
```

### Rim Light Setup
```javascript
position: [4, 3, -2]    // Back-right edge
intensity: 2            // Strong highlight
color: GOLD             // Golden edge glow
```

### Environment Setup
```javascript
resolution: 512         // HDR quality
background: false       // Transparent
// Multiple Lightformers for realistic reflections
```

---

## Color Constants

```javascript
const GOLD = "#d4af37";           // Primary gold foil
const MATTE_BLACK = "#0d0b09";    // Box exterior
const TISSUE_BLACK = "#1a1612";   // Interior nest
const FOIL_GOLD = "#f4d03f";      // Emissive highlights
```

---

## Easing Functions

### `lerp(a, b, t)`
Linear interpolation for smooth value transitions.

```javascript
const lerp = (a, b, t) => a + (b - a) * t;
```

### `easeInOutCubic(t)`
Custom cubic easing for weight and elegance.

```javascript
const easeInOutCubic = (t) => 
  t < 0.5 
    ? 4 * t * t * t 
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
```

---

## Troubleshooting

### Common Issues

#### 1. Scene doesn't render
- Check WebGL support in browser
- Verify Three.js version compatibility
- Check console for GL context errors

#### 2. Low frame rate
- Reduce shadow map resolution
- Lower particle count
- Disable post-processing effects
- Check for memory leaks in refs

#### 3. Materials look wrong
- Verify tone mapping is enabled
- Check exposure value (1.2)
- Ensure lights are properly positioned

#### 4. Animation stuttering
- Use `requestAnimationFrame` properly
- Avoid heavy computations in `useFrame`
- Check GSAP performance settings

---

## Advanced Customization

### Changing Box Colors

```javascript
// In createTexturedBoardMaterial()
color: "#1a1a2e",  // Navy blue box
```

### Adjusting Animation Speed

```javascript
// Faster unboxing
timeline.to(progressRef, { 
  current: 1, 
  duration: 5,  // Was 8.8s
  ease: "power2.out" 
});
```

### Adding More Floating Elements

```javascript
// In FloatingElements component
// Add new mesh with ref
h("mesh", {
  ref: (el) => (elements.current[4] = el),
  // ... geometry and material
})
```

### Custom Lighting

```javascript
// Add colored accent light
h("pointLight", {
  position: [0, 2, 2],
  intensity: 1.5,
  color: "#ff6b6b",
  distance: 10
})
```

---

## Dependencies

```json
{
  "@react-three/fiber": "^9.6.1",
  "@react-three/drei": "^10.7.7",
  "three": "^0.184.0",
  "gsap": "^3.15.0"
}
```

---

## Browser Compatibility

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |
| Mobile Safari | iOS 14+ | ✅ Optimized |
| Chrome Android | 90+ | ✅ Optimized |

---

## React.createElement Pattern

**Why we use `h = React.createElement`:**

The visual-edit Babel plugin injects source-location attributes onto JSX elements. React Three Fiber would attempt to apply these as Three.js object properties and crash.

Using `createElement` nodes keeps the scene clean and prevents instrumentation.

```javascript
// ❌ Would crash with visual-edit plugin
<mesh position={[0, 0, 0]}>
  <boxGeometry args={[1, 1, 1]} />
</mesh>

// ✅ Works perfectly
h("mesh", { position: [0, 0, 0] },
  h("boxGeometry", { args: [1, 1, 1] })
)
```

---

## Best Practices

1. **Always dispose of geometries and materials** when component unmounts
2. **Use refs carefully** - avoid memory leaks
3. **Test on target devices early** - mobile performance varies
4. **Profile with React DevTools** - monitor render cycles
5. **Use production builds** for performance testing
6. **Implement loading states** for better UX
7. **Consider accessibility** - provide fallback content

---

## Resources

- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Drei Helpers](https://github.com/pmndrs/drei)
- [Three.js Manual](https://threejs.org/manual/)
- [GSAP Documentation](https://greensock.com/docs/)
- [PBR Material Guide](https://learnopengl.com/PBR/Theory)

---

## License

Proprietary - PrintKing (SMC-Private) Limited

---

**Version:** 2.0.0  
**Last Updated:** June 2, 2026
