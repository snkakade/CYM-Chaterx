"use client";

import { FormEvent, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { ArrowIcon } from "./ArrowIcon";
import { CharterXWordmark } from "./CharterXWordmark";

export function AdminLogin() {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      <section className="admin-login-card" aria-labelledby="admin-login-title">
        <div className="admin-login-brand">
          <CharterXWordmark />
          <small>CYM Operations</small>
        </div>
        <p className="admin-eyebrow">Private operations portal</p>
        <h1 id="admin-login-title">Welcome back ashore.</h1>
        <p>Sign in to manage enquiries, follow-ups, invoices, and commercial activity.</p>
        <form onSubmit={submit}>
          <label><span>Email address</span><input name="email" type="email" autoComplete="username" required /></label>
          <div className="admin-password-field">
            <label htmlFor="admin-password">Password</label>
            <div className="admin-password-input">
              <input id="admin-password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                title={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((visible) => !visible)}
              >
                {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
              </button>
            </div>
          </div>
          {error && <p className="admin-form-error" role="alert">{error}</p>}
          <button type="submit" disabled={busy}>{busy ? "Checking access…" : "Sign in securely"}<ArrowIcon direction="right" /></button>
        </form>
        <div className="admin-security-note"><p>Protected access. Attempts are rate-limited and sessions expire automatically.</p></div>
      </section>
      <p className="admin-legal">Collaborative Yacht Management LLP · Trading as CharterX</p>
    </div>
  );
}
