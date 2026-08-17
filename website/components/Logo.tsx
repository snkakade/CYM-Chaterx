export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <a className="brand" href="/" aria-label="CharterX home" onClick={onClick}>
      <span className="brand-mark" aria-hidden="true"><i /><i /></span>
      <span className="brand-copy">
        <strong>CharterX</strong>
        <small>Yacht Growth &amp; Management</small>
      </span>
    </a>
  );
}
