export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <a className="brand notranslate" href="/" aria-label="CharterX home" onClick={onClick}>
      <span className="brand-copy">
        <strong className="brand-logotype">
          <span className="brand-text-charter">
            CHARTER
            <span className="brand-strike" />
          </span>
          <span className="brand-text-x">X</span>
        </strong>
      </span>
    </a>
  );
}
