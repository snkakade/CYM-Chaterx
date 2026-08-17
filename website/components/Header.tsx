"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowIcon } from "./ArrowIcon";
import { Logo } from "./Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/ota-management", label: "OTA Management" },
  { href: "/revenue-growth", label: "Revenue Growth" },
  { href: "/digital-marketing", label: "Digital Marketing" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
      <header className={`site-header ${scrolled || isOpen ? "is-solid" : ""}`}>
        <div className="header-inner">
          <Logo onClick={() => setIsOpen(false)} />
          <nav className="desktop-nav" aria-label="Primary navigation">
            {links.slice(0, -1).map((link) => (
              <a className={pathname === link.href ? "is-active" : ""} href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <a className="header-cta" href="/contact">Get Started <ArrowIcon /></a>
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
      <div className="mobile-menu" id="mobile-menu" ref={menuRef} aria-hidden={!isOpen}>
        <nav aria-label="Mobile navigation">
          {links.map((link, index) => (
            <a className="mobile-nav-link" href={link.href} key={link.href} tabIndex={isOpen ? 0 : -1} onClick={() => setIsOpen(false)}>
              <span>0{index + 1}</span>{link.label}
            </a>
          ))}
        </nav>
        <div className="mobile-menu-footer">
          <p>You operate the yacht.<br />We help grow the business.</p>
          <a className="button button--primary" href="/contact" tabIndex={isOpen ? 0 : -1} onClick={() => setIsOpen(false)}>
            <span>Book a Strategy Call</span><ArrowIcon />
          </a>
        </div>
      </div>
    </>
  );
}
