"use client";

import { useEffect, useRef } from "react";
import { SectionLabel } from "./SectionLabel";

const films = [
  {
    src: "/videos/charterx-yacht-aerial.mp4",
    poster: "/images/yacht-wake.webp",
    label: "The passage",
    title: "A calm guest journey, from first search to final confirmation.",
  },
  {
    src: "/videos/charterx-yacht-wake.mp4",
    poster: "/images/hero-yacht.webp",
    label: "The operation",
    title: "Commercial detail managed ashore, without disrupting life onboard.",
  },
] as const;

export function CinematicStories() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const videos = Array.from(section.querySelectorAll<HTMLVideoElement>("video"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      videos.forEach((video) => video.pause());
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) void video.play().catch(() => undefined);
        else video.pause();
      });
    }, { threshold: 0.2 });

    videos.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="cinematic-stories section-shell" ref={root}>
      <div className="minimal-heading reveal-item">
        <SectionLabel index="04">In motion</SectionLabel>
        <h2>A quieter view of <em>commercial momentum.</em></h2>
        <p>Short maritime studies that keep the experience grounded in the yacht, not in dashboard theatre.</p>
      </div>
      <div className="film-grid">
        {films.map((film, index) => (
          <figure className={`film-card film-card--${index + 1} reveal-item`} key={film.src}>
            <div className="film-frame">
              <video
                muted
                loop
                playsInline
                preload="metadata"
                poster={film.poster}
                aria-label={film.title}
              >
                <source src={film.src} type="video/mp4" />
              </video>
            </div>
            <figcaption>
              <span>{film.label}</span>
              <p>{film.title}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="media-credit">Yacht footage: Pexels contributors. Source details are recorded in the project video notes.</p>
    </section>
  );
}
