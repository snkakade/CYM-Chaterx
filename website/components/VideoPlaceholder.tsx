import Image from "next/image";

type VideoPlaceholderProps = {
  label: string;
  title: string;
  direction: string;
  poster: string;
  posterAlt: string;
  fileName: string;
};

export function VideoPlaceholder({
  label,
  title,
  direction,
  poster,
  posterAlt,
  fileName,
}: VideoPlaceholderProps) {
  return (
    <section className="video-placeholder section-shell reveal-item" aria-label={`${label} video placeholder`}>
      <div className="video-placeholder-frame">
        <Image src={poster} alt={posterAlt} fill sizes="(max-width: 899px) calc(100vw - 2.5rem), 90vw" />
        <div className="video-placeholder-shade" aria-hidden="true" />
        <div className="video-placeholder-copy">
          <span>{label} · Film direction</span>
          <h2>{title}</h2>
          <p>{direction}</p>
        </div>
        <span className="video-placeholder-play" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="m9 7 7 5-7 5Z" /></svg>
        </span>
      </div>
      <div className="video-placeholder-spec">
        <span>Replacement file</span>
        <code>{fileName}</code>
        <span>4K preferred · 16:9 · MP4</span>
      </div>
    </section>
  );
}
