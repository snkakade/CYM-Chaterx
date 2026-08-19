"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "charterx:consent:v1";

declare global {
  interface Window {
    gtag?: (...arguments_: unknown[]) => void;
  }
}

function updateGoogleConsent(analyticsGranted: boolean) {
  window.gtag?.("consent", "update", {
    analytics_storage: analyticsGranted ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let shouldShow = true;
    try {
      shouldShow = window.localStorage.getItem(STORAGE_KEY) === null;
    } catch {
      // Keep the banner visible when browser storage is unavailable.
    }
    const visibilityTimer = window.setTimeout(() => setVisible(shouldShow), 0);

    const openPreferences = () => setVisible(true);
    const controls = document.querySelectorAll<HTMLElement>("[data-cookie-preferences]");
    controls.forEach((control) => control.addEventListener("click", openPreferences));
    return () => {
      window.clearTimeout(visibilityTimer);
      controls.forEach((control) => control.removeEventListener("click", openPreferences));
    };
  }, []);

  function saveChoice(choice: "accepted" | "rejected") {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // The consent state still applies for this page when storage is unavailable.
    }
    updateGoogleConsent(choice === "accepted");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <section className="cookie-consent" aria-label="Cookie preferences">
      <p className="cookie-consent-label">Privacy controls</p>
      <h2>Choose how we measure the website.</h2>
      <p>
        CharterX uses Google Analytics to understand website performance. Analytics storage
        remains off unless you accept it. Advertising storage stays off.
      </p>
      <div className="cookie-consent-actions">
        <button type="button" onClick={() => saveChoice("accepted")}>Accept analytics</button>
        <button type="button" onClick={() => saveChoice("rejected")}>Reject non-essential</button>
      </div>
    </section>
  );
}
