"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { growthSteps } from "@/data/site";
import { SectionLabel } from "./SectionLabel";

gsap.registerPlugin(ScrollTrigger);

export function GrowthEngine() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = root.current;
    const element = track.current;
    if (!section || !element) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => Math.max(0, element.scrollWidth - window.innerWidth);
      const progress = section.querySelector<HTMLElement>(".growth-progress span");
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance() + window.innerHeight * 0.8}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
      timeline.to(element, { x: () => -distance(), ease: "none" }, 0);
      if (progress) timeline.fromTo(progress, { scaleX: 0.2 }, { scaleX: 1, ease: "none" }, 0);
      return () => timeline.kill();
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="growth-engine" ref={root}>
      <div className="growth-engine-intro">
        <SectionLabel tone="light">The operating rhythm</SectionLabel>
        <h2>The Yacht <em>Growth Engine</em></h2>
        <p>Five connected disciplines. One clear route from market position to better commercial performance.</p>
      </div>
      <div className="growth-track" ref={track}>
        {growthSteps.map((step) => (
          <article className="growth-step" key={step.number}>
            <span className="growth-number">{step.number}</span>
            <p className="growth-verb">{step.verb}</p>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
            <div className="growth-compass" aria-hidden="true"><i /><i /></div>
          </article>
        ))}
      </div>
      <div className="growth-progress" aria-hidden="true"><span /></div>
    </section>
  );
}
