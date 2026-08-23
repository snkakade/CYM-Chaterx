"use client";

import { useState, useRef, useEffect } from "react";

export type Language = {
  code: string;
  name: string;
  nativeName: string;
  flag: React.ReactNode;
};

const FlagUS = () => (
  <svg viewBox="0 0 32 32" width="20" height="20" className="flag-icon" aria-hidden="true">
    <clipPath id="circle-us">
      <circle cx="16" cy="16" r="16" />
    </clipPath>
    <g clipPath="url(#circle-us)">
      <rect width="32" height="32" fill="#B22234" />
      <path d="M0 4.92h32M0 9.85h32M0 14.77h32M0 19.69h32M0 24.62h32M0 29.54h32" stroke="#FFFFFF" strokeWidth="2.46" />
      <rect width="14" height="17.23" fill="#3C3B6E" />
      {/* 5-pointed stars pattern representation */}
      <circle cx="3.5" cy="3.5" r="0.9" fill="#FFFFFF" />
      <circle cx="7" cy="3.5" r="0.9" fill="#FFFFFF" />
      <circle cx="10.5" cy="3.5" r="0.9" fill="#FFFFFF" />
      <circle cx="5.25" cy="6.5" r="0.9" fill="#FFFFFF" />
      <circle cx="8.75" cy="6.5" r="0.9" fill="#FFFFFF" />
      <circle cx="3.5" cy="9.5" r="0.9" fill="#FFFFFF" />
      <circle cx="7" cy="9.5" r="0.9" fill="#FFFFFF" />
      <circle cx="10.5" cy="9.5" r="0.9" fill="#FFFFFF" />
      <circle cx="5.25" cy="12.5" r="0.9" fill="#FFFFFF" />
      <circle cx="8.75" cy="12.5" r="0.9" fill="#FFFFFF" />
    </g>
  </svg>
);

const FlagItaly = () => (
  <svg viewBox="0 0 32 32" width="20" height="20" className="flag-icon" aria-hidden="true">
    <clipPath id="circle-it">
      <circle cx="16" cy="16" r="16" />
    </clipPath>
    <g clipPath="url(#circle-it)">
      <rect x="0" y="0" width="10.67" height="32" fill="#009246" />
      <rect x="10.67" y="0" width="10.67" height="32" fill="#FFFFFF" />
      <rect x="21.34" y="0" width="10.67" height="32" fill="#CE2B37" />
    </g>
  </svg>
);

const FlagSpain = () => (
  <svg viewBox="0 0 32 32" width="20" height="20" className="flag-icon" aria-hidden="true">
    <clipPath id="circle-es">
      <circle cx="16" cy="16" r="16" />
    </clipPath>
    <g clipPath="url(#circle-es)">
      <rect x="0" y="0" width="32" height="8" fill="#AA151B" />
      <rect x="0" y="8" width="32" height="16" fill="#F1BF00" />
      <rect x="0" y="24" width="32" height="8" fill="#AA151B" />
      <circle cx="9" cy="16" r="2.8" fill="#AA151B" opacity="0.8" />
    </g>
  </svg>
);

const FlagArabic = () => (
  <svg viewBox="0 0 32 32" width="20" height="20" className="flag-icon" aria-hidden="true">
    <clipPath id="circle-ae">
      <circle cx="16" cy="16" r="16" />
    </clipPath>
    <g clipPath="url(#circle-ae)">
      <rect x="0" y="0" width="32" height="10.67" fill="#00732F" />
      <rect x="0" y="10.67" width="32" height="10.67" fill="#FFFFFF" />
      <rect x="0" y="21.34" width="32" height="10.67" fill="#000000" />
      <rect x="0" y="0" width="9.5" height="32" fill="#FF0000" />
    </g>
  </svg>
);

const FlagFrance = () => (
  <svg viewBox="0 0 32 32" width="20" height="20" className="flag-icon" aria-hidden="true">
    <clipPath id="circle-fr">
      <circle cx="16" cy="16" r="16" />
    </clipPath>
    <g clipPath="url(#circle-fr)">
      <rect x="0" y="0" width="10.67" height="32" fill="#002395" />
      <rect x="10.67" y="0" width="10.67" height="32" fill="#FFFFFF" />
      <rect x="21.34" y="0" width="10.67" height="32" fill="#ED2939" />
    </g>
  </svg>
);

const FlagSwahili = () => (
  <svg viewBox="0 0 32 32" width="20" height="20" className="flag-icon" aria-hidden="true">
    <clipPath id="circle-sw">
      <circle cx="16" cy="16" r="16" />
    </clipPath>
    <g clipPath="url(#circle-sw)">
      {/* Kenya / East African representative flag */}
      <rect x="0" y="0" width="32" height="9.5" fill="#000000" />
      <rect x="0" y="9.5" width="32" height="2" fill="#FFFFFF" />
      <rect x="0" y="11.5" width="32" height="9" fill="#990000" />
      <rect x="0" y="20.5" width="32" height="2" fill="#FFFFFF" />
      <rect x="0" y="22.5" width="32" height="9.5" fill="#006600" />
      {/* Maasai shield center */}
      <ellipse cx="16" cy="16" rx="3.5" ry="6.5" fill="#990000" stroke="#FFFFFF" strokeWidth="0.8" />
    </g>
  </svg>
);

export const languages: Language[] = [
  { code: "en", name: "ENGLISH", nativeName: "English", flag: <FlagUS /> },
  { code: "es", name: "ESPAÑOL", nativeName: "Español", flag: <FlagSpain /> },
  { code: "fr", name: "FRANÇAIS", nativeName: "Français", flag: <FlagFrance /> },
  { code: "it", name: "ITALIANO", nativeName: "Italiano", flag: <FlagItaly /> },
  { code: "ar", name: "العربية", nativeName: "العربية", flag: <FlagArabic /> },
  { code: "sw", name: "KISWAHILI", nativeName: "Kiswahili", flag: <FlagSwahili /> },
];

export function LanguageSelector() {
  const [selected, setSelected] = useState<Language>(languages[0]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    
    // Recover selected language from cookie on mount
    const match = document.cookie.match(/(?:^|;)\s*googtrans=([^;]*)/);
    let selectedTimer: number | undefined;
    if (match && match[1]) {
      const parts = match[1].split('/');
      const code = parts[parts.length - 1];
      const lang = languages.find(l => l.code === code);
      if (lang) {
        selectedTimer = window.setTimeout(() => setSelected(lang), 0);
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (selectedTimer !== undefined) window.clearTimeout(selectedTimer);
    };
  }, []);

  return (
    <div
      className="lang-selector-wrapper notranslate"
      ref={containerRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        className="lang-selector-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={`Select language. Current: ${selected.name}`}
      >
        <span className="lang-flag">{selected.flag}</span>
        <span className="lang-name">{selected.name}</span>
        <svg
          className={`lang-chevron ${isOpen ? "is-open" : ""}`}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className={`lang-dropdown ${isOpen ? "is-visible" : ""}`} role="listbox">
        {languages.map((lang) => (
          <button
            key={lang.code}
            type="button"
            className={`lang-option ${selected.code === lang.code ? "is-selected" : ""}`}
            onClick={() => {
              setSelected(lang);
              setIsOpen(false);
              
              if (lang.code === "en") {
                document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${window.location.hostname}; path=/;`;
              } else {
                document.cookie = `googtrans=/en/${lang.code}; path=/`;
                document.cookie = `googtrans=/en/${lang.code}; domain=.${window.location.hostname}; path=/`;
              }
              window.location.reload();
            }}
            role="option"
            aria-selected={selected.code === lang.code}
          >
            <span className="lang-flag">{lang.flag}</span>
            <span className="lang-option-text">{lang.name}</span>
            {selected.code === lang.code && (
              <span className="lang-check" aria-hidden="true">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
