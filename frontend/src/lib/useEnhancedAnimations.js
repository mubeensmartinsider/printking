import { useEffect, useRef, useCallback } from "react";
import { gsap } from "./animations";

/**
 * TextReveal — Animates text with word-by-word or character-by-character reveal on scroll.
 * @param {string} mode - "words" | "chars"
 * @param {object} opts - { stagger, duration, y, threshold }
 */
export function useTextReveal(mode = "words", opts = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const text = el.textContent;
    const stagger = opts.stagger || (mode === "words" ? 0.04 : 0.015);
    const y = opts.y || 30;

    // Split text
    if (mode === "words") {
      el.innerHTML = text
        .split(" ")
        .map(
          (w) =>
            `<span class="inline-block" style="opacity:0;transform:translateY(${y}px)">${w}&nbsp;</span>`
        )
        .join("");
    } else {
      el.innerHTML = text
        .split("")
        .map(
          (c) =>
            `<span class="inline-block" style="opacity:0;transform:translateY(${y}px)">${
              c === " " ? "&nbsp;" : c
            }</span>`
        )
        .join("");
    }

    const spans = el.querySelectorAll("span");
    const ctx = gsap.context(() => {
      gsap.to(spans, {
        y: 0,
        opacity: 1,
        stagger,
        duration: opts.duration || 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: opts.threshold || "top 85%",
          once: true,
          invalidateOnRefresh: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [mode]); // eslint-disable-line react-hooks/exhaustive-deps

  return ref;
}

/**
 * useCounter — Animates a number from 0 to target on scroll.
 * @param {number} target - Final number
 * @param {object} opts - { suffix, duration, threshold }
 */
export function useCounter(target, opts = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: target,
        duration: opts.duration || 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: opts.threshold || "top 90%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = Math.round(obj.val) + (opts.suffix || "");
        },
      });
    }, el);

    return () => ctx.revert();
  }, [target]); // eslint-disable-line react-hooks/exhaustive-deps

  return ref;
}

/**
 * useParallax — Creates a parallax effect on a ref element.
 * @param {object} opts - { speed, direction }
 */
export function useParallax(opts = {}) {
  const ref = useRef(null);
  const speed = opts.speed || 0.2;
  const direction = opts.direction || "up";
  const yMove = direction === "up" ? speed * 100 : -speed * 100;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 0 },
        {
          y: yMove,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [yMove]);

  return ref;
}

/**
 * useStaggeredReveal — Enhanced staggered reveal with direction awareness.
 * @param {string} selector - CSS selector for children
 * @param {object} opts - { stagger, y, x, duration, threshold, direction }
 */
export function useStaggeredReveal(selector = ":scope > *", opts = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const dir = opts.direction || "up";
    const vars = {
      opacity: 0,
      duration: opts.duration || 0.7,
      ease: "power2.out",
    };
    if (dir === "up") vars.y = opts.y || 40;
    else if (dir === "down") vars.y = -(opts.y || 40);
    else if (dir === "left") vars.x = opts.x || -40;
    else if (dir === "right") vars.x = opts.x || 40;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll(selector);
      gsap.from(items, {
        ...vars,
        stagger: opts.stagger || 0.08,
        scrollTrigger: {
          trigger: el,
          start: opts.threshold || "top 85%",
          invalidateOnRefresh: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return ref;
}

/**
 * useProgressBar — Creates a progress animation from 0% to 100%
 * @param {number} target - percentage (0-100)
 */
export function useProgressBar(target = 100) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { width: "0%" },
        {
          width: `${target}%`,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [target]);

  return ref;
}