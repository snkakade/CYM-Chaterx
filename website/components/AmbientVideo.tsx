"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

type AmbientVideoProps = {
  src: string;
  mobileSrc?: string;
  poster: string;
  label: string;
  className?: string;
  position?: string;
  mobilePosition?: string;
  preload?: "none" | "metadata";
};

export function AmbientVideo({
  src,
  mobileSrc,
  poster,
  label,
  className = "",
  position = "center",
  mobilePosition,
  preload = "metadata",
}: AmbientVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const manuallyPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = true;

    const syncPlayback = () => {
      if (reducedMotion.matches || !inView || manuallyPaused.current) {
        video.pause();
        return;
      }
      void video.play().catch(() => undefined);
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.12 });

    observer.observe(video);
    reducedMotion.addEventListener("change", syncPlayback);
    syncPlayback();

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", syncPlayback);
      video.pause();
    };
  }, []);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      manuallyPaused.current = false;
      void video.play().catch(() => undefined);
    } else {
      manuallyPaused.current = true;
      video.pause();
    }
  }

  const style = {
    "--video-position": position,
    "--video-mobile-position": mobilePosition ?? position,
  } as CSSProperties;

  return (
    <>
      <video
        ref={videoRef}
        className={`ambient-video ${className}`.trim()}
        muted
        loop
        playsInline
        preload={preload}
        poster={poster}
        aria-label={label}
        style={style}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        {mobileSrc && <source src={mobileSrc} type="video/mp4" media="(max-width: 899px)" />}
        <source src={src} type="video/mp4" />
      </video>
      <button
        type="button"
        className="ambient-video-toggle"
        onClick={togglePlayback}
        aria-label={`${playing ? "Pause" : "Play"} ${label}`}
        aria-pressed={!playing}
      >
        <i aria-hidden="true" />
        <span>{playing ? "Pause film" : "Play film"}</span>
      </button>
    </>
  );
}
