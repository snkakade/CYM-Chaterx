import Image from "next/image";
import { AmbientVideo } from "./AmbientVideo";

export function HomeMediaStory() {
  return (
    <section className="home-media-story section-shell" aria-label="Yacht operations in view">
      <figure className="home-media-primary image-reveal">
        <Image
          src="/images/charterx-sunset-yacht.webp"
          alt="Contemporary superyacht alongside a marina at sunset"
          fill
          sizes="(max-width: 899px) 100vw, 64vw"
        />
        <figcaption><span>01</span> The asset</figcaption>
      </figure>

      <div className="home-media-support">
        <figure className="home-media-detail image-reveal">
          <Image
            src="/images/charterx-classic-yacht-detail.webp"
            alt="Classic yacht upper deck framed by mountains and clear blue sky"
            fill
            sizes="(max-width: 899px) 50vw, 30vw"
          />
          <figcaption><span>02</span> The guest experience</figcaption>
        </figure>

        <figure className="home-media-motion reveal-item">
          <AmbientVideo
            src="/videos/charterx-ocean-texture.mp4"
            poster="/images/hero-ocean-poster.webp"
            label="Sunlight moving across a calm ocean surface"
            preload="none"
          />
          <figcaption><span>03</span> The operating rhythm</figcaption>
        </figure>
      </div>
    </section>
  );
}
