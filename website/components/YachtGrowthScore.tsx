"use client";

import { useRef, useState, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ArrowIcon } from "./ArrowIcon";
import { SectionLabel } from "./SectionLabel";
import { GROWTH_SCORE_STORAGE_KEY, type GrowthScorePayload } from "@/utils/growthScore";

const questions = [
  "Is your yacht listed on more than one booking platform?",
  "Are your photos and descriptions professionally optimized?",
  "Do you respond to inquiries within 15 minutes?",
  "Do you adjust pricing by season, demand, and availability?",
  "Does your website generate direct inquiries?",
  "Do you track source, conversion, and booking value?",
  "Do you follow up with unconverted leads?",
];

export function YachtGrowthScore() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const panel = useRef<HTMLDivElement>(null);
  const isComplete = current >= questions.length;

  const answer = (value: boolean) => {
    const next = [...answers, value];
    const element = panel.current;
    if (!element) return;
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1;
    gsap.to(element, {
      x: -18,
      opacity: 0,
      duration: 0.22 * duration,
      ease: "power2.in",
      onComplete: () => {
        setAnswers(next);
        setCurrent((value) => value + 1);
        gsap.fromTo(element, { x: duration ? 18 : 0, opacity: duration ? 0 : 1 }, { x: 0, opacity: 1, duration: 0.38 * duration, ease: "power3.out" });
      },
    });
  };

  const reset = () => {
    setAnswers([]);
    setCurrent(0);
  };

  const score = answers.filter(Boolean).length;
  const state = score <= 2 ? "Early Stage" : score <= 5 ? "Growth Ready" : "Optimization Opportunity";
  const body = score <= 2
    ? "Your commercial foundations may be limiting visibility and response consistency. A focused setup review can establish the right priorities."
    : score <= 5
      ? "You have useful foundations in place, with clear room to connect your channels, enquiry process, and revenue decisions more closely."
      : "Your setup is active and commercially aware. The next opportunity is likely in refinement, measurement, and the consistency of your operating rhythm.";

  const saveScore = () => {
    const payload: GrowthScorePayload = {
      score,
      total: questions.length,
      state,
      answers: questions.map((question, index) => ({ question, answer: answers[index] ? "Yes" : "Not yet" })),
    };
    window.sessionStorage.setItem(GROWTH_SCORE_STORAGE_KEY, JSON.stringify(payload));
  };

  return (
    <section className="score-section" id="yacht-growth-score">
      <div className="score-intro reveal-item">
        <SectionLabel tone="light">Yacht Growth Score</SectionLabel>
        <h2>Where is your business <em>losing momentum?</em></h2>
        <p>A focused commercial diagnostic that maps the visibility, conversion, pricing, and follow-up systems around your yacht.</p>
        <div className="score-orbit" aria-hidden="true">
          <div><strong>{isComplete ? score : current}</strong><span>of 7 signals</span></div>
          {questions.map((_, index) => <i className={index < current || isComplete ? "is-active" : ""} key={index} style={{ "--score-dot": index } as CSSProperties} />)}
        </div>
        <div className="score-lenses" aria-label="Areas reviewed"><span>Visibility</span><span>Conversion</span><span>Pricing</span><span>Follow-up</span></div>
        <div className="score-meta"><span>≈ 60 seconds</span><span>No email required</span><span>No inflated promises</span></div>
      </div>
      <div className="score-card reveal-item">
        <div className="score-progress">
          <span>{isComplete ? "Complete" : `Question ${current + 1} of ${questions.length}`}</span>
          <div><i style={{ width: `${(Math.min(current, questions.length) / questions.length) * 100}%` }} /></div>
          <strong>{Math.round((Math.min(current, questions.length) / questions.length) * 100)}%</strong>
        </div>
        <div className="score-panel" ref={panel} aria-live="polite">
          {!isComplete ? (
            <>
              <span className="score-question-number">0{current + 1}</span>
              <h3>{questions[current]}</h3>
              <p>Choose the answer that best reflects your current operating setup.</p>
              <div className="score-choices">
                <button type="button" onClick={() => answer(true)}>Yes <ArrowIcon direction="right" /></button>
                <button type="button" onClick={() => answer(false)}>Not yet <ArrowIcon direction="right" /></button>
              </div>
            </>
          ) : (
            <div className="score-result">
              <span className="score-result-label">Your growth state</span>
              <div className="score-result-heading"><div><strong>{score}</strong><span>/ {questions.length}</span></div><h3>{state}</h3></div>
              <p>{body}</p>
              <p className="score-guidance">Your setup may have visibility and conversion gaps. A structured review can show where bookings are being lost.</p>
              <div>
                <a className="button button--primary" href="/contact?source=growth-score#enquiry-form" onClick={saveScore}><span>Request a Growth Review</span><ArrowIcon /></a>
                <button className="score-reset" type="button" onClick={reset}>Retake score</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
