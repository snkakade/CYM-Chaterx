export function CharterXWordmark({ tone = "dark", compact = false }: { tone?: "dark" | "light"; compact?: boolean }) {
  return (
    <span className={`charterx-wordmark charterx-wordmark--${tone}${compact ? " charterx-wordmark--compact" : ""}`} aria-label="CharterX">
      <span className="charterx-wordmark__name">CHARTER<span className="charterx-wordmark__line" aria-hidden="true" /></span>
      <span className="charterx-wordmark__x">X</span>
    </span>
  );
}
