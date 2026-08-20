"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const nodes = ["Distribution", "Visibility", "Enquiries", "Conversion", "Revenue"];

export function CommercialEngine() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const context = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 90%", once: true },
        });
        timeline
          .fromTo(".engine-path", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power2.inOut" })
          .fromTo(".engine-node", { scale: 0.72, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.12, duration: 0.6, ease: "back.out(1.4)" }, "-=0.8");
      });
      return () => mm.revert();
    }, root);
    return () => context.revert();
  }, []);

  return (
    <div className="commercial-engine" ref={root}>
      <div className="engine-orbit" aria-hidden="true"><i /><i /></div>
      <div className="engine-path" aria-hidden="true" />
      {nodes.map((node, index) => (
        <div className="engine-node" key={node}>
          <span>0{index + 1}</span>
          <strong>{node}</strong>
        </div>
      ))}
    </div>
  );
}
