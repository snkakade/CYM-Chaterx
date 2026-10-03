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
  preload?: "none" | "metadata" | "auto";
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
    const mobileViewport = window.matchMedia("(max-width: 899px)");
    let inView = true;
    let usingFallback = false;

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "true");

    const selectSource = () => {
      const selectedSource = mobileSrc && mobileViewport.matches ? mobileSrc : src;
      const selectedUrl = new URL(selectedSource, window.location.href).href;
      if (video.src !== selectedUrl) {
        video.src = selectedSource;
        video.load();
      }
    };

    const syncPlayback = async () => {
      if (reducedMotion.matches || !inView) {
        video.pause();
        return;
      }

      try {
        video.muted = true;
        await video.play();
      } catch {
        // iOS may still block autoplay in Low Power Mode. Keep the poster visible.
      }
    };

    const retryPlayback = () => {
      if (!document.hidden) void syncPlayback();
    };

    const handleSourceChange = () => {
      selectSource();
      retryPlayback();
    };

    const handleError = () => {
      if (!usingFallback && mobileSrc && mobileViewport.matches) {
        usingFallback = true;
        video.src = src;
        video.load();
        retryPlayback();
        return;
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      retryPlayback();
    }, { threshold: 0.12 });

    selectSource();
    observer.observe(video);
    video.addEventListener("canplay", retryPlayback);
    video.addEventListener("error", handleError);
    window.addEventListener("pageshow", retryPlayback);
    document.addEventListener("visibilitychange", retryPlayback);
    document.addEventListener("pointerdown", retryPlayback, { passive: true });

    if ("addEventListener" in reducedMotion) {
      reducedMotion.addEventListener("change", retryPlayback);
      mobileViewport.addEventListener("change", handleSourceChange);
    } else {
      reducedMotion.addListener(retryPlayback);
      mobileViewport.addListener(handleSourceChange);
    }

    retryPlayback();

    return () => {
      observer.disconnect();
      video.removeEventListener("canplay", retryPlayback);
      video.removeEventListener("error", handleError);
      window.removeEventListener("pageshow", retryPlayback);
      document.removeEventListener("visibilitychange", retryPlayback);
      document.removeEventListener("pointerdown", retryPlayback);

      if ("removeEventListener" in reducedMotion) {
        reducedMotion.removeEventListener("change", retryPlayback);
        mobileViewport.removeEventListener("change", handleSourceChange);
      } else {
        reducedMotion.removeListener(retryPlayback);
        mobileViewport.removeListener(handleSourceChange);
      }

      video.pause();
    };
  }, [mobileSrc, src]);

  const style = {
    "--video-position": position,
    "--video-mobile-position": mobilePosition ?? position,
  } as CSSProperties;

  return (
    <video
      ref={videoRef}
      className={`ambient-video ${className}`.trim()}
      data-desktop-src={src}
      data-mobile-src={mobileSrc}
      src={mobileSrc ?? src}
      autoPlay
      muted
      loop
      playsInline
      preload={preload}
      poster={poster}
      aria-label={label}
      style={style}
    />
  );
}
