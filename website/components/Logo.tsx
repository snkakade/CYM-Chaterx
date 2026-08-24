import { CharterXWordmark } from "./CharterXWordmark";

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <a className="brand notranslate" href="/" aria-label="CharterX home" onClick={onClick}>
      <CharterXWordmark />
    </a>
  );
}
