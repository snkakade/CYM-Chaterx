"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function RevenueDashboardVisual() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const context = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 75%", once: true } });
        timeline
          .fromTo(".dashboard-shell", { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
          .fromTo(".dash-booking", { x: 22, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.1, duration: 0.55 }, "-=0.45")
          .fromTo(".dash-chart-line", { strokeDashoffset: 520 }, { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" }, "-=0.5")
          .fromTo(".dash-bar", { scaleY: 0 }, { scaleY: 1, transformOrigin: "bottom", stagger: 0.06, duration: 0.45 }, "-=0.8");
      });
      return () => mm.revert();
    }, root);
    return () => context.revert();
  }, []);

  return (
    <div className="revenue-dashboard" ref={root} aria-label="Abstract dashboard showing booking rhythm and revenue optimisation">
      <div className="dashboard-shell">
        <div className="dash-head">
          <div className="dash-mark" aria-hidden="true">CX / 01</div>
          <p>Commercial overview</p>
          <span>Monthly signal</span>
        </div>
        <div className="dash-grid">
          <div className="dash-main">
            <div className="dash-kpis">
              <div><span>Enquiry flow</span><strong>Healthy</strong></div>
              <div><span>Channel mix</span><strong>Balanced</strong></div>
              <div><span>Listing quality</span><strong>Optimised</strong></div>
            </div>
            <div className="dash-chart">
              <div className="dash-axis"><span>Position</span><span>Demand</span><span>Conversion</span></div>
              <svg viewBox="0 0 600 220" role="img" aria-label="Abstract upward performance curve">
                <path className="dash-chart-area" d="M0 190 C70 178 95 145 160 152 S260 184 320 112 S425 116 478 68 S550 64 600 28 L600 220 L0 220 Z" />
                <path className="dash-chart-line" pathLength="520" d="M0 190 C70 178 95 145 160 152 S260 184 320 112 S425 116 478 68 S550 64 600 28" />
              </svg>
              <div className="dash-bars" aria-hidden="true">{[38,54,42,68,60,82,71,94].map((height, index) => <i className="dash-bar" style={{ height: `${height}%` }} key={index} />)}</div>
            </div>
          </div>
          <div className="dash-side">
            {["Direct enquiry", "Platform request", "Follow-up ready"].map((label, index) => (
              <div className="dash-booking" key={label}><span>0{index + 1}</span><div><strong>{label}</strong><small>Guest journey active</small></div></div>
            ))}
            <div className="dash-note"><span>Owner view</span><p>Clarity across the commercial engine.</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}
