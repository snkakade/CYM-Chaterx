"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function YachtLoader() {
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const element = root.current;
    if (!element) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let hasPlayed = false;
    try {
      hasPlayed = window.sessionStorage.getItem("charterx:loader:v1") === "played";
    } catch {
      // The loader can still run when browser storage is unavailable.
    }

    if (reducedMotion || hasPlayed) {
      const hideTimer = window.setTimeout(() => setVisible(false), 0);
      return () => window.clearTimeout(hideTimer);
    }

    document.body.classList.add("is-loading");
    const yacht = element.querySelector(".loader-yacht");
    const wakes = element.querySelectorAll(".loader-wake path");
    const timeline = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        try {
          window.sessionStorage.setItem("charterx:loader:v1", "played");
        } catch {
          // The animation remains functional without persisted session state.
        }
        document.body.classList.remove("is-loading");
        setVisible(false);
      },
    });

    timeline
      .fromTo(wakes, { strokeDashoffset: 180, opacity: 0 }, { strokeDashoffset: 0, opacity: 0.48, duration: 1.05, stagger: 0.08 })
      .fromTo(yacht, { xPercent: -165, rotate: -1 }, { xPercent: 165, rotate: 1, duration: 1.35, ease: "power1.inOut" }, 0.08)
      .to(element, { opacity: 0, duration: 0.45, ease: "power2.out" }, "-=0.12");

    return () => {
      timeline.kill();
      document.body.classList.remove("is-loading");
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="yacht-loader" ref={root} role="status" aria-label="Loading CharterX">
      <div className="loader-stage" aria-hidden="true">
        <svg className="loader-wake" viewBox="0 0 420 86" fill="none">
          <path d="M18 55c70-10 120-9 185 1 66 10 129 9 199-5" pathLength="180" />
          <path d="M36 66c64-6 112-3 169 4 65 8 121 5 178-5" pathLength="180" />
        </svg>
        <svg className="loader-yacht" viewBox="0 0 116 42" fill="none">
          <path d="M9 28h96l-13 9H28L9 28Z" />
          <path d="M39 27 48 13h32l15 14" />
          <path d="M54 13V7h19l7 6" />
          <path d="M29 37h63" />
        </svg>
      </div>
      <span>CharterX</span>
    </div>
  );
}
