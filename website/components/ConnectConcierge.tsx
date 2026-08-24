"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type View = "choices" | "message" | "whatsapp" | "callback" | "success";

const CONSENT_KEY = "charterx:consent:v1";
const SHOWN_KEY = "charterx:concierge-shown:v1";

function rememberInvitation() {
  try { window.sessionStorage.setItem(SHOWN_KEY, "yes"); } catch { /* no-op */ }
}

const copy = {
  message: {
    eyebrow: "Direct message",
    title: "What would you like to improve?",
    note: "Send the essentials. Your message goes straight into our enquiry desk.",
  },
  whatsapp: {
    eyebrow: "WhatsApp",
    title: "Where should we message you?",
    note: "Share your mobile number and we’ll continue the conversation on WhatsApp.",
  },
  callback: {
    eyebrow: "Priority callback",
    title: "Prefer to talk it through?",
    note: "Request a callback within 10 minutes during staffed hours. Otherwise, we’ll call at the next available opening.",
  },
} as const;

export function ConnectConcierge({ whatsappNumber = "" }: { whatsappNumber?: string }) {
  const [mounted, setMounted] = useState(false);
  const [consentSettled, setConsentSettled] = useState(false);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("choices");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const panelRef = useRef<HTMLElement>(null);
  const directWhatsapp = whatsappNumber.replace(/\D/g, "");

  useEffect(() => {
    if (window.location.pathname.startsWith("/admin")) return;
    const checkConsent = () => {
      try {
        setConsentSettled(window.localStorage.getItem(CONSENT_KEY) !== null);
      } catch {
        setConsentSettled(false);
      }
    };
    const initialize = window.setTimeout(() => {
      setMounted(true);
      checkConsent();
    }, 0);
    window.addEventListener("charterx:consent-set", checkConsent);
    return () => {
      window.clearTimeout(initialize);
      window.removeEventListener("charterx:consent-set", checkConsent);
    };
  }, []);

  useEffect(() => {
    if (!mounted || !consentSettled) return;
    let timeReady = false;
    let scrollReady = false;
    let alreadyShown = false;
    try {
      alreadyShown = window.sessionStorage.getItem(SHOWN_KEY) === "yes";
    } catch {
      // A visitor can still open the concierge manually when storage is unavailable.
    }
    if (alreadyShown) return;

    const invite = () => {
      if (!timeReady || !scrollReady || document.querySelector(".cookie-consent")) return;
      if (document.activeElement?.matches("input, textarea, select")) return;
      rememberInvitation();
      setView("choices");
      setOpen(true);
      window.removeEventListener("scroll", onScroll);
    };
    const onScroll = () => {
      const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      scrollReady = window.scrollY > 480 || window.scrollY / scrollable > 0.24;
      invite();
    };
    const timer = window.setTimeout(() => { timeReady = true; invite(); }, 6500);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [consentSettled, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const openFromCta = (event: Event) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-open-concierge]");
      if (!target) return;
      event.preventDefault();
      rememberInvitation();
      const requested = target.dataset.conciergeMode as View | undefined;
      setView(requested && requested !== "success" ? requested : "choices");
      setOpen(true);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", openFromCta);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("click", openFromCta);
      document.removeEventListener("keydown", escape);
    };
  }, [mounted]);

  useEffect(() => {
    if (!open || view === "choices") return;
    window.requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>('input:not([tabindex="-1"]), textarea, select')?.focus());
  }, [open, view]);

  const choose = (next: View) => {
    setError("");
    if (next === "whatsapp" && directWhatsapp) {
      const message = encodeURIComponent("Hello CharterX, I would like to discuss growth for my yacht business.");
      window.open(`https://wa.me/${directWhatsapp}?text=${message}`, "_blank", "noopener,noreferrer");
      return;
    }
    setView(next);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSubmitting(true);
    setError("");
    const values = Object.fromEntries(new FormData(form).entries());
    const source = `concierge-${view}`;
    const challenge = view === "callback" ? "Priority callback" : view === "whatsapp" ? "WhatsApp conversation" : "Direct message";
    const details = [values.message, values.bestTime && `Preferred callback: ${values.bestTime}`].filter(Boolean).join("\n");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...values,
          source,
          challenge,
          message: details || `${challenge} requested through the website concierge.`,
        }),
      });
      const result = await response.json() as { error?: string; reference?: string };
      if (!response.ok) throw new Error(result.error || "We could not send this request. Please try again.");
      setReference(result.reference ?? "");
      setView("success");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "We could not send this request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted || !consentSettled) return null;

  const formView = view === "message" || view === "whatsapp" || view === "callback" ? view : null;

  return (
    <aside className={`connect-concierge${open ? " is-open" : ""}`} aria-label="Contact CharterX">
      {open && (
        <section className="connect-panel" ref={panelRef} aria-labelledby="connect-title" aria-live="polite">
          <header className="connect-head">
            <span className="connect-monogram" aria-hidden="true">CX</span>
            <div><small>CharterX concierge</small><strong id="connect-title">Let’s make this useful.</strong></div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close contact options"><span aria-hidden="true">×</span></button>
          </header>

          {view === "choices" && (
            <div className="connect-body">
              <p className="connect-intro">Would you like a quick answer, a WhatsApp conversation or a callback?</p>
              <div className="connect-options">
                <button type="button" onClick={() => choose("message")}><span className="connect-symbol" aria-hidden="true">M</span><span><strong>Message us here</strong><small>Share a few useful details.</small></span></button>
                <button type="button" onClick={() => choose("whatsapp")}><span className="connect-symbol" aria-hidden="true">W</span><span><strong>{directWhatsapp ? "Open WhatsApp" : "Message me on WhatsApp"}</strong><small>{directWhatsapp ? "Continue in WhatsApp." : "We’ll message your number."}</small></span></button>
                <button type="button" onClick={() => choose("callback")}><span className="connect-symbol" aria-hidden="true">C</span><span><strong>Request a callback</strong><small>Ask for a call within 10 minutes.</small></span></button>
                <a href="mailto:connect@cymcharterx.com?subject=CharterX%20enquiry"><span className="connect-symbol" aria-hidden="true">@</span><span><strong>Email directly</strong><small>connect@cymcharterx.com</small></span></a>
              </div>
              <p className="connect-availability">10-minute callback requests apply during staffed hours.</p>
            </div>
          )}

          {formView && (
            <form className="connect-form" onSubmit={submit} noValidate>
              <button className="connect-back" type="button" onClick={() => setView("choices")}>← All contact options</button>
              <p className="connect-eyebrow">{copy[formView].eyebrow}</p>
              <h2>{copy[formView].title}</h2>
              <p>{copy[formView].note}</p>
              <label className="form-honeypot" aria-hidden="true"><span>Company website</span><input name="companyWebsite" tabIndex={-1} autoComplete="off" /></label>
              <label><span>Name *</span><input name="name" required autoComplete="name" placeholder="Your name" /></label>
              {formView === "message" ? (
                <label><span>Email *</span><input name="email" type="email" required autoComplete="email" placeholder="name@company.com" /></label>
              ) : (
                <label><span>Mobile / WhatsApp *</span><input name="phone" type="tel" required autoComplete="tel" placeholder="Country code + number" /></label>
              )}
              {formView === "callback" && (
                <label><span>Best time *</span><select name="bestTime" required defaultValue=""><option value="" disabled>Choose a time</option><option>Within 10 minutes</option><option>This morning</option><option>This afternoon</option><option>Tomorrow</option></select></label>
              )}
              {formView !== "callback" && (
                <label><span>{formView === "message" ? "Message *" : "What can we help with?"}</span><textarea name="message" required={formView === "message"} rows={3} placeholder="A sentence or two is enough." /></label>
              )}
              {error && <p className="connect-error" role="alert">{error}</p>}
              <button className="connect-submit" type="submit" disabled={submitting}>{submitting ? "Sending…" : formView === "callback" ? "Request my callback" : "Send request"}</button>
              <p className="connect-privacy">Your details are used only to respond to this enquiry.</p>
            </form>
          )}

          {view === "success" && (
            <div className="connect-success" role="status">
              <span aria-hidden="true">✓</span>
              <p className="connect-eyebrow">Request received</p>
              <h2>We have it.</h2>
              <p>Your request is now with the CharterX enquiry desk.</p>
              {reference && <small>Reference {reference}</small>}
              <button type="button" onClick={() => setOpen(false)}>Done</button>
            </div>
          )}
        </section>
      )}

      <button className="connect-launcher" type="button" onClick={() => { rememberInvitation(); setView("choices"); setOpen((current) => !current); }} aria-label={open ? "Close contact options" : "Connect with CharterX"} aria-expanded={open} aria-controls="connect-title">
        <span className="connect-launcher-mark" aria-hidden="true">•••</span><span>{open ? "Close" : "Connect"}</span>
      </button>
    </aside>
  );
}
