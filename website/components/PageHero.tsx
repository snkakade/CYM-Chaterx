import Image from "next/image";
import { ButtonLink } from "./ButtonLink";
import { SectionLabel } from "./SectionLabel";

type PageHeroProps = {
  label: string;
  title: string;
  italic?: string;
  description: string;
  image?: string;
  imageAlt?: string;
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
  primaryLabel = "Get Started",
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref = "/services",
  compact = false,
  revamp = false,
}: PageHeroProps) {
  const titleLines = title.split("|");
  return (
    <section className={`page-hero ${compact ? "page-hero--compact" : ""} ${revamp ? "page-hero--revamp" : ""}`}>
      <div className="hero-media">
        <Image src={image} alt={imageAlt} fill priority sizes="100vw" />
        <div className="hero-shade" />
      </div>
      <div className="hero-grid" aria-hidden="true" />
      <div className="page-hero-inner">
        <SectionLabel tone="light">{label}</SectionLabel>
        <h1>
          {titleLines.map((line) => <span className="hero-line" key={line}><span>{line}</span></span>)}
          {italic && <span className="hero-line hero-line--italic"><span>{italic}</span></span>}
        </h1>
        <p className="hero-support">{description}</p>
        <div className="hero-actions">
          <ButtonLink href={primaryHref}>{primaryLabel}</ButtonLink>
          {secondaryLabel && <ButtonLink href={secondaryHref} variant="light">{secondaryLabel}</ButtonLink>}
        </div>
      </div>
      <div className="route-line" aria-hidden="true"><i /><i /><i /></div>
    </section>
  );
}
