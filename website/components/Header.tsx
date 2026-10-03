"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowIcon } from "./ArrowIcon";
import { CharterXWordmark } from "./CharterXWordmark";
import { Logo } from "./Logo";
import { LanguageSelector } from "./LanguageSelector";

const serviceSubLinks = [
  { href: "/ota-management", label: "OTA Management" },
  { href: "/revenue-growth", label: "Revenue Growth" },
  { href: "/digital-marketing", label: "Digital Marketing" },
  { href: "/sales-support", label: "Sales Support" },
];

const aboutSubLinks = [
  { href: "/about", label: "Story" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

const mobilePrimaryLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/yacht-growth-score", label: "Growth Score" },
];

const mobileSecondaryLinks = [
  { href: "/ota-management", label: "OTA Management" },
  { href: "/revenue-growth", label: "Revenue Growth" },
  { href: "/digital-marketing", label: "Digital Marketing" },
  { href: "/sales-support", label: "Sales Support" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

const mobileMenuImages = [
  "/images/hero-yacht.webp",
  "/images/hero-yacht.webp",
  "/images/hero-yacht.webp",
  "/images/hero-yacht.webp",
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  /* Homepage has dark hero video → white text. All other pages have light heroes → dark text. */
  const isHomepage = pathname === "/";
  const headerTheme = isHomepage ? "" : "header--light-page";

  const isServicesActive =
    pathname === "/services" ||
    serviceSubLinks.some((l) => pathname === l.href);

  const isAboutActive =
    pathname === "/about" ||
    aboutSubLinks.some((l) => pathname === l.href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const primaryLinks = menu.querySelectorAll(".mobile-nav-link > span");
    const secondaryLinks = menu.querySelectorAll(".mobile-menu-secondary a");
    const images = menu.querySelectorAll(".mobile-menu-visual img");
    const wordmark = menu.querySelector(".mobile-menu-wordmark");
    gsap.killTweensOf([menu, primaryLinks, secondaryLinks, images, wordmark]);

    if (isOpen) {
      document.body.classList.add("menu-open");
      menu.scrollTop = 0;
      gsap.set(menu, { display: "flex" });
      gsap.set(primaryLinks, { yPercent: reduceMotion ? 0 : 110 });
      gsap.set(secondaryLinks, { yPercent: reduceMotion ? 0 : 110 });
      gsap.set(wordmark, { y: reduceMotion ? 0 : 40 });
      gsap.set(images, { yPercent: (index) => index === 0 || reduceMotion ? 0 : 115 });
      const timeline = gsap.timeline({ defaults: { ease: "power4.inOut" } });
      timeline
        .fromTo(menu, { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }, { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)", duration: reduceMotion ? 0 : 1.05 })
        .to(images, { yPercent: 0, duration: reduceMotion ? 0 : 1.05, stagger: reduceMotion ? 0 : 0.08 }, reduceMotion ? 0 : "-=0.82")
        .to(wordmark, { y: 0, duration: reduceMotion ? 0 : 0.7, ease: "power3.out" }, reduceMotion ? 0 : "-=0.55")
        .to(primaryLinks, { yPercent: 0, duration: reduceMotion ? 0 : 0.72, stagger: reduceMotion ? 0 : 0.075, ease: "power3.out" }, reduceMotion ? 0 : "-=0.55")
        .to(secondaryLinks, { yPercent: 0, duration: reduceMotion ? 0 : 0.55, stagger: reduceMotion ? 0 : 0.04, ease: "power3.out" }, reduceMotion ? 0 : "-=0.5");
    } else {
      document.body.classList.remove("menu-open");
      gsap.to(menu, {
        clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0 0%)",
        duration: reduceMotion ? 0 : 0.85,
        ease: "power4.inOut",
        onComplete: () => gsap.set(menu, { display: "none" }),
      });
    }
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className={`site-header ${scrolled || isOpen ? "is-solid" : ""} ${isOpen ? "menu-active" : ""} ${headerTheme}`}>
        <div className="header-inner header-inner--centered">
          {/* Left: 3 Navigation Tabs */}
          <nav className="desktop-nav desktop-nav--left" aria-label="Primary navigation">
            <a className={pathname === "/" ? "is-active" : ""} href="/">Home</a>

            {/* Services with hover dropdown */}
            <div className="nav-dropdown-wrapper">
              <a
                className={`nav-dropdown-trigger ${isServicesActive ? "is-active" : ""}`}
                href="/services"
              >
                Services
              </a>
              <div className="nav-dropdown">
                {serviceSubLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={pathname === link.href ? "is-active" : ""}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="nav-dropdown-wrapper">
              <a
                className={`nav-dropdown-trigger ${isAboutActive ? "is-active" : ""}`}
                href="/about"
              >
                About
              </a>
              <div className="nav-dropdown">
                {aboutSubLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={pathname === link.href ? "is-active" : ""}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <a
              className={pathname === "/yacht-growth-score" ? "is-active" : ""}
              href="/yacht-growth-score"
            >
              Yacht Growth Score
            </a>
          </nav>

          {/* Center: Logo */}
          <Logo onClick={() => setIsOpen(false)} />

          {/* Right: Language Dropdown + CTA Button */}
          <div className="header-right">
            <LanguageSelector />
            <a className="button button--aqua-cta" href="/contact#enquiry-form">GET A GROWTH PLAN</a>
          </div>

          {/* Mobile toggle */}
          <button
            className={`menu-toggle ${isOpen ? "is-open" : ""}`}
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setIsOpen((current) => !current)}
          >
            <span /><span />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className="mobile-menu" id="mobile-menu" ref={menuRef} aria-hidden={!isOpen}>
        <div className="mobile-menu-visual" aria-hidden="true">
          {mobileMenuImages.map((src, index) => (
            <Image src={src} alt="" fill sizes="42vw" key={`${src}-${index}`} priority={index === 0} />
          ))}
        </div>
        <div className="mobile-menu-content">
          <div className="mobile-menu-wordmark"><CharterXWordmark tone="light" /></div>
          <nav className="mobile-menu-primary" aria-label="Mobile navigation">
            {mobilePrimaryLinks.map((link) => (
              <a className={`mobile-nav-link ${pathname === link.href ? "is-active" : ""}`} href={link.href} key={link.href} tabIndex={isOpen ? 0 : -1} onClick={() => setIsOpen(false)}>
                <span>{link.label}</span>
              </a>
            ))}
          </nav>
          <div className="mobile-menu-footer">
            <nav className="mobile-menu-secondary" aria-label="Services and company navigation">
              {mobileSecondaryLinks.map((link) => (
                <a href={link.href} key={link.href} tabIndex={isOpen ? 0 : -1} onClick={() => setIsOpen(false)}>{link.label}</a>
              ))}
            </nav>
            <div className="mobile-menu-contact">
              <span>Private yacht growth</span>
              <a href="mailto:connect@cymcharterx.com" tabIndex={isOpen ? 0 : -1}>connect@cymcharterx.com</a>
              <a className="button button--primary" href="/contact#enquiry-form" tabIndex={isOpen ? 0 : -1} onClick={() => setIsOpen(false)}>
                <span>Get a Growth Plan</span><ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
