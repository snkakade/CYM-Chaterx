"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowIcon } from "./ArrowIcon";
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

const mobileLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/ota-management", label: "OTA Management" },
  { href: "/revenue-growth", label: "Revenue Growth" },
  { href: "/digital-marketing", label: "Digital Marketing" },
  { href: "/sales-support", label: "Sales Support" },
  { href: "/yacht-growth-score", label: "Yacht Growth Score" },
  { href: "/about", label: "Story" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
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
    gsap.killTweensOf([menu, ".mobile-nav-link", ".mobile-menu-footer"]);

    if (isOpen) {
      document.body.classList.add("menu-open");
      menu.scrollTop = 0;
      gsap.set(menu, { display: "flex" });
      const timeline = gsap.timeline();
      timeline
        .fromTo(menu, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: reduceMotion ? 0 : 0.65, ease: "power3.inOut" })
        .fromTo(".mobile-nav-link", { y: reduceMotion ? 0 : 28, opacity: reduceMotion ? 1 : 0 }, { y: 0, opacity: 1, stagger: reduceMotion ? 0 : 0.055, duration: reduceMotion ? 0 : 0.55, ease: "power3.out" }, reduceMotion ? 0 : "-=0.25")
        .fromTo(".mobile-menu-footer", { y: reduceMotion ? 0 : 18, opacity: reduceMotion ? 1 : 0 }, { y: 0, opacity: 1, duration: reduceMotion ? 0 : 0.45 }, reduceMotion ? 0 : "-=0.25");
    } else {
      document.body.classList.remove("menu-open");
      gsap.to(menu, {
        clipPath: "inset(0 0 100% 0)",
        duration: reduceMotion ? 0 : 0.45,
        ease: "power3.inOut",
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
      <header className={`site-header ${scrolled || isOpen ? "is-solid" : ""} ${headerTheme}`}>
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
        <nav aria-label="Mobile navigation">
          {mobileLinks.map((link, index) => (
            <a className="mobile-nav-link" href={link.href} key={link.href} tabIndex={isOpen ? 0 : -1} onClick={() => setIsOpen(false)}>
              <span>{String(index + 1).padStart(2, "0")}</span>{link.label}
            </a>
          ))}
        </nav>
        <div className="mobile-menu-footer">
          <p>More bookings.<br />Less drift.</p>
          <a className="button button--primary" href="/contact#enquiry-form" tabIndex={isOpen ? 0 : -1} onClick={() => setIsOpen(false)}>
            <span>Get a Growth Plan</span><ArrowIcon />
          </a>
        </div>
      </div>
    </>
  );
}
