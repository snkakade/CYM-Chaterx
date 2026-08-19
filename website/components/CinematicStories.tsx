"use client";

import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "./SectionLabel";

const films = [
  {
    src: "/videos/yacht-passage.mp4",
    poster: "/images/yacht-wake.webp",
    label: "The passage",
    title: "A calm guest journey, from first search to final confirmation.",
  },
  {
    src: "/videos/yacht-arc.mp4",
    poster: "/images/hero-yacht.webp",
    label: "The operation",
    title: "Commercial detail managed ashore, without disrupting life onboard.",
  },
] as const;

export function CinematicStories() {
  const root = useRef<HTMLElement>(null);
  const manuallyPaused = useRef(new Set<number>());
  const [paused, setPaused] = useState([false, false]);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const videos = Array.from(section.querySelectorAll<HTMLVideoElement>("video"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      videos.forEach((video) => video.pause());
      setPaused(videos.map(() => true));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        const index = Number(video.dataset.filmIndex);
        if (entry.isIntersecting && !manuallyPaused.current.has(index)) void video.play().catch(() => undefined);
        else video.pause();
      });
    }, { threshold: 0.2 });

    videos.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, []);

  function toggleFilm(index: number) {
    const video = root.current?.querySelector<HTMLVideoElement>(`video[data-film-index="${index}"]`);
    if (!video) return;
    if (video.paused) {
      manuallyPaused.current.delete(index);
      void video.play().catch(() => undefined);
      setPaused((current) => current.map((value, itemIndex) => itemIndex === index ? false : value));
    } else {
      manuallyPaused.current.add(index);
      video.pause();
      setPaused((current) => current.map((value, itemIndex) => itemIndex === index ? true : value));
    }
  }

  return (
    <section className="cinematic-stories section-shell" ref={root}>
      <div className="minimal-heading reveal-item">
        <SectionLabel index="04">In motion</SectionLabel>
        <h2>A quieter view of <em>commercial momentum.</em></h2>
        <p>Short maritime studies that keep the experience grounded in the yacht—not in dashboard theatre.</p>
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
                data-film-index={index}
                onPlay={() => setPaused((current) => current.map((value, itemIndex) => itemIndex === index ? false : value))}
                onPause={() => setPaused((current) => current.map((value, itemIndex) => itemIndex === index ? true : value))}
              >
                <source src={film.src} type="video/mp4" />
              </video>
              <button type="button" className="film-status" onClick={() => toggleFilm(index)} aria-label={`${paused[index] ? "Play" : "Pause"} ${film.label} video`}>
                <i /> {paused[index] ? "Play film" : "Playing silently"}
              </button>
            </div>
            <figcaption>
              <span>{film.label}</span>
              <p>{film.title}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="media-credit">Yacht footage: Mikhail Nilov / Pexels.</p>
    </section>
  );
}
