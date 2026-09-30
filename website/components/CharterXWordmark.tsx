// Canonical CharterX logo. The previous struck-through version is archived in
// CharterXWordmarkLegacy.tsx for possible future restoration.
export function CharterXWordmark({ tone = "dark", compact = false }: { tone?: "dark" | "light"; compact?: boolean }) {
  return (
    <span className={`brand-copy charterx-wordmark charterx-wordmark--${tone}${compact ? " charterx-wordmark--compact" : ""}`} aria-label="CharterX">
      <strong className="brand-logotype">
        <span className="brand-text-charter">CHARTER</span>
        <span className="brand-text-x">X</span>
      </strong>
    </span>
  );
}
