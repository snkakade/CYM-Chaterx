"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowIcon } from "./ArrowIcon";
import { formatGrowthScoreNotes, GROWTH_SCORE_STORAGE_KEY, type GrowthScorePayload } from "@/utils/growthScore";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [scoreImported, setScoreImported] = useState(false);
  const [source, setSource] = useState("website-contact");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("source") !== "growth-score") return;
    const frame = window.requestAnimationFrame(() => {
      setSource("growth-score");
      try {
        const stored = window.sessionStorage.getItem(GROWTH_SCORE_STORAGE_KEY);
        if (!stored) return;
        const payload = JSON.parse(stored) as GrowthScorePayload;
        if (!Array.isArray(payload.answers) || typeof payload.score !== "number") return;
        setMessage(formatGrowthScoreNotes(payload));
        setScoreImported(true);
      } catch {
        // Keep the form usable if browser storage is unavailable or invalid.
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setError("Please complete the required fields before submitting.");
      form.reportValidity();
      return;
    }
    setError("");
    setSubmitting(true);
    const values = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, source }),
      });
      const result = await response.json() as { error?: string; reference?: string };
      if (!response.ok) throw new Error(result.error || "We could not send your enquiry. Please try again.");
      setReference(result.reference ?? "");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "We could not send your enquiry. Please try again.");
      setSubmitting(false);
      return;
    }
    gsap.to(form, {
      opacity: 0,
      y: -12,
      duration: 0.35,
      onComplete: () => setSubmitted(true),
    });
  };

  if (submitted) {
    return (
      <div className="form-success" role="status">
        <span aria-hidden="true">✓</span>
        <p className="kicker">Enquiry received</p>
        <h2>Thank you. We have received your enquiry.</h2>
        <p>We will review your details and come back with the next suitable step.</p>
        {reference && <p className="form-reference">Reference: {reference}</p>}
        <button type="button" onClick={() => { setSubmitted(false); setSubmitting(false); }}>Submit another enquiry</button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={submit} ref={formRef} noValidate>
      <div className="form-head"><span>Growth enquiry</span><span>Fields marked * are required</span></div>
      <div className="field-grid">
        <label className="form-honeypot" aria-hidden="true"><span>Company website</span><input name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" /></label>
        <label><span>Name *</span><input name="name" type="text" autoComplete="name" required placeholder="Your name" /></label>
        <label><span>Email *</span><input name="email" type="email" autoComplete="email" required placeholder="name@company.com" /></label>
        <label><span>Phone / WhatsApp</span><input name="phone" type="tel" autoComplete="tel" placeholder="Country code + number" /></label>
        <label><span>Business name</span><input name="businessName" type="text" placeholder="Your operating business name" /></label>
        <label><span>Yacht or vessel type *</span><input name="vesselType" type="text" required placeholder="e.g. Motor yacht, sailing yacht" /></label>
        <label><span>Location / market *</span><input name="location" type="text" required placeholder="Where do you operate?" /></label>
        <label><span>Current booking platforms</span><input name="platforms" type="text" placeholder="List any booking platforms or OTAs you currently use" /></label>
        <label><span>Website URL</span><input name="website" type="url" placeholder="Share your current website if you have one" /></label>
        <label><span>Number of vessels</span><input name="numberOfVessels" type="text" placeholder="e.g. 1 yacht, small fleet" /></label>
        <label>
          <span>Biggest challenge *</span>
          <select name="challenge" required defaultValue="">
            <option value="" disabled>Select a focus</option>
            <option>Low OTA visibility</option><option>Missed enquiries</option><option>Weak direct bookings</option>
            <option>Pricing and revenue</option><option>Digital marketing</option><option>Complete growth support</option>
          </select>
        </label>
        <label><span>Monthly booking goal</span><input name="goal" type="text" placeholder="A rough target is enough." /></label>
        <label className="field-full"><span>Message / review notes *</span>{scoreImported && <small className="score-imported">Your Yacht Growth Score and answers have been added for our review.</small>}<textarea name="message" rows={scoreImported ? 12 : 5} required value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Tell us about the vessel, current setup, and what you want to improve." /></label>
      </div>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="form-submit">
        <button className="button button--primary" type="submit" disabled={submitting}><span>{submitting ? "Requesting Review…" : "Request Review"}</span><ArrowIcon /></button>
        <p>No hard sell. We will review the setup first. We will respond with the most useful next step.</p>
      </div>
    </form>
  );
}
