"use client";

import { useRef, useState, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ArrowIcon } from "./ArrowIcon";
import { SectionLabel } from "./SectionLabel";
import { GROWTH_SCORE_STORAGE_KEY, type GrowthScorePayload } from "@/utils/growthScore";

const questions = [
  "Is your yacht listed on more than one relevant booking platform?",
  "Are your photos ordered to show the strongest selling points first?",
  "Is your calendar updated consistently?",
  "Do enquiries receive a clear response within a reliable timeframe?",
  "Is pricing reviewed by season, demand, and lead time?",
  "Does your website generate direct enquiries?",
  "Do you track where leads come from?",
  "Do you follow up with guests who do not book immediately?",
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
  const state = score <= 3 ? "Early Stage" : score <= 6 ? "Growth Ready" : "Optimisation Opportunity";
  const body = score <= 3
    ? "Your commercial setup may still rely too heavily on chance, referrals, or unmanaged listings. A structured review can help identify the first improvements in visibility, presentation, enquiry handling, and direct booking flow."
    : score <= 6
      ? "You have some of the right foundations in place, but there may be gaps between visibility, enquiry quality, pricing, and follow-up. The next step is to connect those pieces into a more consistent operating rhythm."
      : "Your business may already have demand, but performance can often improve through better pricing logic, listing refinement, tracking, and direct booking strategy.";
  const ctaLabel = score <= 3 ? "Request a Growth Review" : score <= 6 ? "Review My Setup" : "Discuss Optimisation";

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
        <SectionLabel tone="light">Your score is not a forecast.</SectionLabel>
        <h2>Where is your business <em>losing momentum?</em></h2>
        <p>It is a practical review of the commercial foundations around your yacht. Answer a few questions and we will show whether your current setup is early-stage, growth-ready, or ready for deeper optimisation.</p>
        <div className="score-orbit" aria-hidden="true">
          <div><strong>{isComplete ? score : current}</strong><span>of {questions.length} signals</span></div>
          {questions.map((_, index) => <i className={index < current || isComplete ? "is-active" : ""} key={index} style={{ "--score-dot": index } as CSSProperties} />)}
        </div>
        <div className="score-lenses" aria-label="Areas reviewed"><span>Visibility</span><span>Conversion</span><span>Pricing</span><span>Follow-up</span></div>
        <div className="score-meta"><span>≈ 60 seconds</span><span>No email required</span><span>No inflated promises</span></div>
      </div>
      <div className="score-card reveal-item">
        <div className="score-interactive-label">
          <span>Growth score review</span>
          <small>Select one answer to continue</small>
        </div>
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
                <button type="button" onClick={() => answer(true)}><span><small>Option A</small><strong>Yes</strong></span><span className="score-choice-action">Choose <ArrowIcon direction="right" /></span></button>
                <button type="button" onClick={() => answer(false)}><span><small>Option B</small><strong>Not yet</strong></span><span className="score-choice-action">Choose <ArrowIcon direction="right" /></span></button>
              </div>
            </>
          ) : (
            <div className="score-result">
              <span className="score-result-label">Your growth state</span>
              <div className="score-result-heading"><div><strong>{score}</strong><span>/ {questions.length}</span></div><h3>{state}</h3></div>
              <p>{body}</p>
              <p className="score-guidance">Your setup may have visibility and conversion gaps. A structured review can show where bookings are being lost.</p>
              <div>
                <a className="button button--primary" href="/contact?source=growth-score#enquiry-form" onClick={saveScore}><span>{ctaLabel}</span><ArrowIcon /></a>
                <button className="score-reset" type="button" onClick={reset}>Retake score</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
