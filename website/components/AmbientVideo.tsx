"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

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
  const [needsManualPlay, setNeedsManualPlay] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileViewport = window.matchMedia("(max-width: 899px)");
    let inView = true;
    let mounted = true;
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

    const syncPlayback = async (manual = false) => {
      if (reducedMotion.matches || !inView) {
        video.pause();
        if (mounted && reducedMotion.matches) setNeedsManualPlay(true);
        return;
      }

      try {
        video.muted = true;
        await video.play();
        if (mounted) setNeedsManualPlay(false);
      } catch {
        if (mounted && !manual) setNeedsManualPlay(true);
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
      if (mounted) setNeedsManualPlay(true);
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
      mounted = false;
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

  const playManually = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    void video.play().then(() => setNeedsManualPlay(false)).catch(() => setNeedsManualPlay(true));
  };

  const style = {
    "--video-position": position,
    "--video-mobile-position": mobilePosition ?? position,
  } as CSSProperties;

  return (
    <>
      <video
        ref={videoRef}
        className={`ambient-video ${className}`.trim()}
        data-desktop-src={src}
        data-mobile-src={mobileSrc}
        autoPlay
        muted
        loop
        playsInline
        preload={preload}
        poster={poster}
        aria-label={label}
        style={style}
      />
      {needsManualPlay && (
        <button className="ambient-video-play" type="button" onClick={playManually} aria-label={`Play ${label}`}>
          <Play aria-hidden="true" fill="currentColor" />
        </button>
      )}
    </>
  );
}
