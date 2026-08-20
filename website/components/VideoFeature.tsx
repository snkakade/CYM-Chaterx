import { AmbientVideo } from "./AmbientVideo";

type VideoFeatureProps = {
  src: string;
  label: string;
  title: string;
  direction: string;
  poster: string;
  posterAlt: string;
  position?: string;
  mobilePosition?: string;
};

export function VideoFeature({
  src,
  label,
  title,
  direction,
  poster,
  posterAlt,
  position,
  mobilePosition,
}: VideoFeatureProps) {
  return (
    <section className="video-placeholder video-feature section-shell reveal-item" aria-label={`${label} film`}>
      <div className="video-placeholder-frame">
        <AmbientVideo
          src={src}
          poster={poster}
          label={posterAlt}
          position={position}
          mobilePosition={mobilePosition}
          preload="none"
        />
        <div className="video-placeholder-shade" aria-hidden="true" />
        <div className="video-placeholder-copy">
          <span>{label} · In motion</span>
          <h2>{title}</h2>
          <p>{direction}</p>
        </div>
      </div>
      <div className="video-placeholder-spec" aria-hidden="true">
        <span>CharterX film</span>
        <span>Silent film · Motion-aware</span>
      </div>
    </section>
  );
}
