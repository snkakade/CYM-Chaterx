"use client";

import { FormEvent, useState } from "react";
import { ArrowIcon } from "./ArrowIcon";
import { CharterXWordmark } from "./CharterXWordmark";

export function AdminLogin() {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy(true);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
      });
      const result = await response.json().catch(() => null) as { error?: string } | null;
      if (!response.ok) throw new Error(result?.error || "Unable to sign in. Please try again.");
      window.location.assign("/admin");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to sign in.");
      setBusy(false);
    }
  }

  return (
    <div className="admin-login-page admin-page">
      <div className="admin-login-brand">
        <CharterXWordmark tone="light" />
        <small>CYM Operations</small>
      </div>
      <section className="admin-login-card" aria-labelledby="admin-login-title">
        <p className="admin-eyebrow">Private operations portal</p>
        <h1 id="admin-login-title">Welcome back ashore.</h1>
        <p>Sign in to manage enquiries, follow-ups, invoices, and commercial activity.</p>
        <form onSubmit={submit}>
          <label><span>Email address</span><input name="email" type="email" autoComplete="username" required /></label>
          <label><span>Password</span><input name="password" type="password" autoComplete="current-password" minLength={12} required /></label>
          {error && <p className="admin-form-error" role="alert">{error}</p>}
          <button type="submit" disabled={busy}>{busy ? "Checking access…" : "Sign in securely"}<ArrowIcon direction="right" /></button>
        </form>
        <div className="admin-security-note"><p>Protected access. Attempts are rate-limited and sessions expire automatically.</p></div>
      </section>
      <p className="admin-legal">Collaborative Yacht Management Limited · Trading as CharterX</p>
    </div>
  );
}
