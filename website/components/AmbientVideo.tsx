"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";

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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = true;

    const syncPlayback = () => {
      if (reducedMotion.matches || !inView) {
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

  const style = {
    "--video-position": position,
    "--video-mobile-position": mobilePosition ?? position,
  } as CSSProperties;

  return (
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
    >
      {mobileSrc && <source src={mobileSrc} type="video/mp4" media="(max-width: 899px)" />}
      <source src={src} type="video/mp4" />
    </video>
  );
}
