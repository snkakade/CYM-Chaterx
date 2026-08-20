import Image from "next/image";
import { AmbientVideo } from "./AmbientVideo";
import { ButtonLink } from "./ButtonLink";
import { SectionLabel } from "./SectionLabel";

type PageHeroProps = {
  label: string;
  title: string;
  italic?: string;
  description: string;
  image?: string;
  imageAlt?: string;
  video?: string;
  videoMobile?: string;
  videoPosition?: string;
  videoMobilePosition?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  compact?: boolean;
  revamp?: boolean;
};

export function PageHero({
  label,
  title,
  italic,
  description,
  image = "/images/hero-yacht.webp",
  imageAlt = "Luxury yacht in a calm marina at blue hour",
  video,
  videoMobile,
  videoPosition,
  videoMobilePosition,
  primaryLabel = "Get Started",
  primaryHref = "/contact#enquiry-form",
  secondaryLabel,
  secondaryHref = "/services",
  compact = false,
  revamp = false,
}: PageHeroProps) {
  const titleLines = title.split("|");
  return (
    <section className={`page-hero ${compact ? "page-hero--compact" : ""} ${revamp ? "page-hero--revamp" : ""}`}>
      <div className="hero-media">
        {video ? (
          <AmbientVideo
            src={video}
            mobileSrc={videoMobile}
            poster={image}
            label={imageAlt}
            position={videoPosition}
            mobilePosition={videoMobilePosition}
          />
        ) : (
          <Image src={image} alt={imageAlt} fill priority sizes="(max-width: 899px) calc(100vw - 2.5rem), 44vw" />
        )}
        <div className="hero-shade" />
        <div className="hero-media-caption">
          <span>CharterX</span>
          <span>{label}</span>
        </div>
      </div>
      <div className="hero-grid" aria-hidden="true" />
      <div className="page-hero-inner">
        <div className="hero-copy">
          <SectionLabel>{label}</SectionLabel>
          <h1>
            {titleLines.map((line) => <span className="hero-line" key={line}><span>{line}</span></span>)}
            {italic && <span className="hero-line hero-line--italic"><span>{italic}</span></span>}
          </h1>
          <p className="hero-support">{description}</p>
          <div className="hero-actions">
            <ButtonLink href={primaryHref}>{primaryLabel}</ButtonLink>
            {secondaryLabel && <ButtonLink href={secondaryHref} variant="secondary">{secondaryLabel}</ButtonLink>}
          </div>
        </div>
        <div className="hero-footnote" aria-hidden="true">
          <span>Yacht Growth &amp; Management</span>
          <span>Built ashore · Working worldwide</span>
        </div>
      </div>
      <div className="route-line" aria-hidden="true"><i /><i /><i /></div>
    </section>
  );
}
