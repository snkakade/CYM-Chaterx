"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function MotionProvider() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const heroMedia = document.querySelector(".hero-media");
      const heroLines = gsap.utils.toArray<HTMLElement>(".hero-line > span");
      const heroSupport = gsap.utils.toArray<HTMLElement>(".hero-support, .hero-actions, .hero-trust");
      const routeLine = document.querySelector(".route-line");

      if (heroMedia && heroLines.length) {
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro.fromTo(heroMedia, { clipPath: "inset(0 0 100% 0)", scale: 1.08 }, { clipPath: "inset(0 0 0% 0)", scale: 1, duration: 1.45, ease: "power3.inOut" });
        intro.fromTo(heroLines, { yPercent: 115 }, { yPercent: 0, duration: 0.92, stagger: 0.1 }, "-=0.9");
        if (heroSupport.length) intro.fromTo(heroSupport, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 }, "-=0.45");
        if (routeLine) intro.fromTo(routeLine, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, "-=0.6");
      }

      gsap.utils.toArray<HTMLElement>(".reveal-item").forEach((element) => {
        gsap.fromTo(element, { y: 34, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(".image-reveal").forEach((element) => {
        const image = element.querySelector("img");
        gsap.fromTo(element, { clipPath: "inset(0 0 100% 0)" }, {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.05,
          ease: "power3.inOut",
          scrollTrigger: { trigger: element, start: "top 82%", once: true },
        });
        if (image) {
          gsap.fromTo(image, { scale: 1.08 }, {
            scale: 1,
            duration: 1.3,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 82%", once: true },
          });
        }
      });

    });

    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const cleanupListeners: Array<() => void> = [];
      gsap.utils.toArray<HTMLElement>(".magnetic-card").forEach((card) => {
        const onMove = (event: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
          const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
          gsap.to(card, { x, y, duration: 0.35, ease: "power2.out" });
        };
        const onLeave = () => gsap.to(card, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, 0.45)" });
        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerleave", onLeave);
        cleanupListeners.push(() => {
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerleave", onLeave);
        });
      });

      return () => cleanupListeners.forEach((cleanup) => cleanup());
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      const staticElements = gsap.utils.toArray<HTMLElement>(".hero-line > span, .hero-support, .hero-actions, .hero-trust, .reveal-item");
      if (staticElements.length) gsap.set(staticElements, { clearProps: "all", opacity: 1 });
    });

    const targetTop = (target: HTMLElement) => {
      const headerHeight = document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 0;
      return Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerHeight - 12);
    };

    const alignHashTarget = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;

      const root = document.documentElement;
      const previousBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      window.scrollTo({ top: targetTop(target), behavior: "auto" });
      root.style.scrollBehavior = previousBehavior;
    };

    const onAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = anchor?.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;

      event.preventDefault();
      window.history.pushState(null, "", hash);
      window.scrollTo({ top: targetTop(target), behavior: "auto" });
      if (hash === "#main-content") target.focus({ preventScroll: true });
    };

    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
      alignHashTarget();
    }, 220);
    window.addEventListener("hashchange", alignHashTarget);
    document.addEventListener("click", onAnchorClick);

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener("hashchange", alignHashTarget);
      document.removeEventListener("click", onAnchorClick);
      mm.revert();
    };
  }, []);

  return null;
}
