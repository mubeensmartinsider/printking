import React from "react";
import { useLocation } from "react-router-dom";

/**
 * PageTransition — CSS-only fade/slide on route change.
 *
 * This used to use framer-motion (AnimatePresence + motion.div) for a single
 * opacity + 20px slide. That pulled ~120 KB of animation runtime into the main
 * bundle — more than the entire rest of the page JS combined. A CSS keyframe
 * does the same job for free.
 *
 * `key` on the wrapper remounts it per pathname, which restarts the animation.
 * Query-string-only changes (filters, sorting) keep the same key, so the
 * animation correctly does not replay on those.
 */
export default function PageTransition({ children }) {
  const location = useLocation();

  return (
    <div key={location.pathname} className="page-enter">
      {children}
    </div>
  );
}