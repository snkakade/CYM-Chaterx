"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";

export function FAQAccordion({ items }: { items: readonly (readonly [string, string])[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const answers = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (index: number) => {
    const nextIndex = openIndex === index ? null : index;
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1;
    if (openIndex !== null && answers.current[openIndex]) {
      gsap.to(answers.current[openIndex], { height: 0, duration: 0.36 * duration, ease: "power2.inOut" });
    }
    if (nextIndex !== null && answers.current[nextIndex]) {
      gsap.set(answers.current[nextIndex], { height: "auto" });
      gsap.from(answers.current[nextIndex], { height: 0, duration: 0.42 * duration, ease: "power3.inOut" });
    }
    setOpenIndex(nextIndex);
  };

  return (
    <div className="faq-list">
      {items.map(([question, answer], index) => {
        const isOpen = openIndex === index;
        return (
          <div className={`faq-item ${isOpen ? "is-open" : ""}`} key={question}>
            <h3>
              <button id={`faq-question-${index}`} type="button" aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} onClick={() => toggle(index)}>
                <span><i aria-hidden="true">0{index + 1}</i>{question}</span>
                <b aria-hidden="true">{isOpen ? "−" : "+"}</b>
              </button>
            </h3>
            <div
              className="faq-answer"
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              aria-hidden={!isOpen}
              ref={(element) => { answers.current[index] = element; }}
              style={{ height: isOpen ? "auto" : 0 }}
            >
              <p>{answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
