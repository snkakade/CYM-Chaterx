"use client";

import "@/app/globals.css";

export default function LogoPreview() {
  return (
    <div style={{ padding: "4rem", background: "var(--navy-950)", minHeight: "100vh", color: "white", display: "flex", flexDirection: "column", gap: "6rem", fontFamily: "var(--font-display), sans-serif" }}>
      
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>10 Out-of-the-Box Typographic Concepts</h1>
        <p style={{ color: "rgba(255,255,255,0.5)" }}>Pushing the absolute limits of pure CSS and typography. No images, no graphics, just code.</p>
      </div>

      {/* 1. The Strikethrough Offset */}
      <div>
        <h2 style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          1. The Horizon Strike
        </h2>
        <div style={{ padding: "4rem", background: "rgba(255,255,255,0.02)", display: "inline-block", borderRadius: "8px" }}>
          <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
            <span style={{ fontSize: "2.5rem", fontWeight: 300, letterSpacing: "0.3em", position: "relative" }}>
              CHARTER
              <span style={{ position: "absolute", top: "50%", left: "-10%", width: "110%", height: "2px", background: "var(--champagne-500)", zIndex: 2 }} />
            </span>
            <span style={{ fontSize: "2.5rem", color: "var(--champagne-500)", fontWeight: 800, zIndex: 1 }}>X</span>
          </div>
        </div>
      </div>

      {/* 2. The Hollow Brutalist */}
      <div>
        <h2 style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          2. The Hollow Form (Brutalist)
        </h2>
        <div style={{ padding: "4rem", background: "rgba(255,255,255,0.02)", display: "inline-block", borderRadius: "8px" }}>
          <span style={{ fontSize: "3.5rem", fontWeight: 800, WebkitTextStroke: "1px rgba(255,255,255,0.8)", color: "transparent", letterSpacing: "0.05em" }}>CHARTER</span>
          <span style={{ fontSize: "3.5rem", fontWeight: 800, color: "var(--champagne-500)", WebkitTextStroke: "1px var(--champagne-500)" }}>X</span>
        </div>
      </div>

      {/* 3. The Split Horizon */}
      <div>
        <h2 style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          3. The Waterline (CSS Clip-Path)
        </h2>
        <div style={{ padding: "4rem", background: "rgba(255,255,255,0.02)", display: "inline-block", borderRadius: "8px" }}>
          <div style={{ position: "relative", fontSize: "3.5rem", fontWeight: 800, letterSpacing: "0.1em", height: "4rem" }}>
            <span style={{ position: "absolute", top: 0, left: 0, color: "white", clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" }}>CHARTERX</span>
            <span style={{ position: "absolute", top: 0, left: 0, color: "var(--champagne-500)", clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)" }}>CHARTERX</span>
          </div>
        </div>
      </div>

      {/* 4. The Mathematical Exponent */}
      <div>
        <h2 style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          4. The Exponent (Mathematical Lockup)
        </h2>
        <div style={{ padding: "4rem", background: "rgba(255,255,255,0.02)", display: "inline-block", borderRadius: "8px" }}>
          <span style={{ fontSize: "2.5rem", fontWeight: 300, display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ color: "var(--champagne-500)", fontWeight: 100, fontSize: "4rem" }}>[</span>
            <span style={{ letterSpacing: "0.3em", padding: "0 0.5rem", transform: "translateY(2px)" }}>CHARTER</span>
            <span style={{ color: "var(--champagne-500)", fontWeight: 100, fontSize: "4rem" }}>]</span>
            <span style={{ fontWeight: 800, fontSize: "1.5rem", transform: "translateY(-1.2rem)" }}>X</span>
          </span>
        </div>
      </div>

      {/* 5. The Expanding Velocity */}
      <div>
        <h2 style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          5. Velocity (Expanding Tracking)
        </h2>
        <div style={{ padding: "4rem", background: "rgba(255,255,255,0.02)", display: "inline-block", borderRadius: "8px" }}>
          <div style={{ fontSize: "2rem", fontWeight: 600, display: "flex", alignItems: "baseline" }}>
            <span style={{ letterSpacing: "-0.05em", opacity: 0.4 }}>C</span>
            <span style={{ letterSpacing: "0.0em", opacity: 0.5 }}>H</span>
            <span style={{ letterSpacing: "0.1em", opacity: 0.6 }}>A</span>
            <span style={{ letterSpacing: "0.2em", opacity: 0.7 }}>R</span>
            <span style={{ letterSpacing: "0.35em", opacity: 0.8 }}>T</span>
            <span style={{ letterSpacing: "0.5em", opacity: 0.9 }}>E</span>
            <span style={{ letterSpacing: "0.7em", opacity: 1 }}>R</span>
            <span style={{ color: "var(--champagne-500)", fontWeight: 800, fontSize: "2.5rem", marginLeft: "1rem" }}>X</span>
          </div>
        </div>
      </div>

      {/* 6. The Vertical Plunge */}
      <div>
        <h2 style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          6. The Drop (Vertical Stack)
        </h2>
        <div style={{ padding: "4rem", background: "rgba(255,255,255,0.02)", display: "inline-block", borderRadius: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", fontSize: "1.2rem", lineHeight: 0.95, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.7)" }}>
              <span>C</span><span>H</span><span>A</span><span>R</span><span>T</span><span>E</span><span>R</span>
            </div>
            <div style={{ width: "2px", height: "6rem", background: "rgba(255,255,255,0.2)" }}></div>
            <span style={{ fontSize: "8rem", fontWeight: 300, color: "var(--champagne-500)", lineHeight: 0.8 }}>X</span>
          </div>
        </div>
      </div>

      {/* 7. The Optical Echo */}
      <div>
        <h2 style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          7. The Optical Echo
        </h2>
        <div style={{ padding: "4rem", background: "rgba(255,255,255,0.02)", display: "inline-block", borderRadius: "8px" }}>
          <span style={{ 
            fontSize: "3.5rem", 
            fontWeight: 800, 
            color: "white", 
            letterSpacing: "0.1em",
            textShadow: "-3px -3px 0px rgba(215, 183, 122, 0.4), -6px -6px 0px rgba(215, 183, 122, 0.15), 3px 3px 0px rgba(255, 255, 255, 0.1)" 
          }}>
            CHARTERX
          </span>
        </div>
      </div>

      {/* 8. The Cross-Axis Intersection */}
      <div>
        <h2 style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          8. The Intersection (CSS Grid)
        </h2>
        <div style={{ padding: "4rem", background: "rgba(255,255,255,0.02)", display: "inline-block", borderRadius: "8px" }}>
          <div style={{ position: "relative", width: "16rem", height: "16rem" }}>
            <span style={{ position: "absolute", top: "50%", left: 0, transform: "translateY(-50%)", fontSize: "2rem", fontWeight: 300, letterSpacing: "0.3em", zIndex: 2 }}>CHARTER</span>
            <span style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", fontSize: "16rem", fontWeight: 800, color: "var(--champagne-500)", opacity: 0.3, lineHeight: 1, zIndex: 1 }}>X</span>
          </div>
        </div>
      </div>

      {/* 9. The Minimalist Frame */}
      <div>
        <h2 style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          9. The Gallery Frame
        </h2>
        <div style={{ padding: "4rem", background: "rgba(255,255,255,0.02)", display: "inline-block", borderRadius: "8px" }}>
          <div style={{ 
            borderTop: "2px solid var(--champagne-500)", 
            borderBottom: "2px solid var(--champagne-500)", 
            padding: "0.5rem 0",
            display: "inline-flex",
            alignItems: "center"
          }}>
            <span style={{ fontSize: "2.2rem", letterSpacing: "0.4em", fontWeight: 300 }}>CHARTER</span>
            <span style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--champagne-500)" }}>X</span>
          </div>
        </div>
      </div>

      {/* 10. The Staggered Steps */}
      <div>
        <h2 style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          10. The Staggered Staircase
        </h2>
        <div style={{ padding: "4rem", background: "rgba(255,255,255,0.02)", display: "inline-block", borderRadius: "8px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", fontSize: "2.5rem", fontWeight: 700, height: "6rem" }}>
            {["C","H","A","R","T","E","R"].map((l, i) => (
              <span key={i} style={{ transform: `translateY(${i * 6}px)`, marginRight: "2px" }}>{l}</span>
            ))}
            <span style={{ color: "var(--champagne-500)", transform: `translateY(42px)`, marginLeft: "8px", fontWeight: 800, fontSize: "3.5rem", lineHeight: 1 }}>X</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "4rem", marginBottom: "2rem", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "4rem" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>10 Hybrid Concepts (Graphics + Type)</h1>
        <p style={{ color: "rgba(255,255,255,0.5)" }}>Mixing bespoke SVG shapes and icons with our typography.</p>
      </div>

      {/* 11. The Geometric Sail Monogram */}
      <div>
        <h2 style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          11. The Geometric Split Sail
        </h2>
        <div style={{ padding: "4rem", background: "rgba(255,255,255,0.02)", display: "inline-block", borderRadius: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25 6 C25 22, 35 30, 38 34 L25 34 Z" fill="var(--champagne-500)"/>
              <path d="M21 6 L21 34 L5 34 C5 30, 13 20, 21 6 Z" fill="white"/>
            </svg>
            <span style={{ fontSize: "2.2rem", fontWeight: 300, letterSpacing: "0.1em" }}>CHARTER<strong style={{ fontWeight: 800 }}>X</strong></span>
          </div>
        </div>
      </div>

      {/* 12. The Compass Embedded */}
      <div>
        <h2 style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          12. The Compass 'X'
        </h2>
        <div style={{ padding: "4rem", background: "rgba(255,255,255,0.02)", display: "inline-block", borderRadius: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: "2.2rem", fontWeight: 300, letterSpacing: "0.2em" }}>
            CHARTER
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "0.5rem" }}>
              <path d="M20 2L24 16L38 20L24 24L20 38L16 24L2 20L16 16Z" fill="var(--champagne-500)"/>
              <circle cx="20" cy="20" r="14" stroke="var(--champagne-500)" strokeWidth="1" strokeDasharray="2 4" opacity="0.5"/>
            </svg>
          </div>
        </div>
      </div>

      {/* 13. The Ocean Wave Underline */}
      <div>
        <h2 style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          13. The Sine Wave
        </h2>
        <div style={{ padding: "4rem", background: "rgba(255,255,255,0.02)", display: "inline-block", borderRadius: "8px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "0.05em" }}>Charter<span style={{ color: "var(--champagne-500)" }}>X</span></span>
            <svg width="120" height="12" viewBox="0 0 120 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: "-5px" }}>
              <path d="M0 6 Q 15 12, 30 6 T 60 6 T 90 6 T 120 6" stroke="var(--champagne-500)" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* 14. The Circular Sun Lockup */}
      <div>
        <h2 style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          14. The Sun/Wheel Lockup
        </h2>
        <div style={{ padding: "4rem", background: "rgba(255,255,255,0.02)", display: "inline-block", borderRadius: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <div style={{ position: "relative", width: "3.5rem", height: "3.5rem" }}>
              <svg viewBox="0 0 100 100" className="spin-slow" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", animation: "spin 20s linear infinite" }}>
                <circle cx="50" cy="50" r="45" stroke="var(--champagne-500)" strokeWidth="2" strokeDasharray="8 8" fill="none"/>
              </svg>
              <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontWeight: 800, fontSize: "1.2rem" }}>CX</span>
            </div>
            <span style={{ fontSize: "2rem", fontWeight: 300, letterSpacing: "0.1em" }}>CHARTERX</span>
          </div>
        </div>
      </div>

      {/* 15. The Integrated Anchor */}
      <div>
        <h2 style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          15. The Integrated Anchor 'T'
        </h2>
        <div style={{ padding: "4rem", background: "rgba(255,255,255,0.02)", display: "inline-block", borderRadius: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: "2.5rem", fontWeight: 300, letterSpacing: "0.1em" }}>
            CHAR
            <svg width="24" height="34" viewBox="0 0 24 34" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: "0 4px", transform: "translateY(2px)" }}>
              <path d="M2 10 L22 10 M12 2 L12 30 M4 20 Q 12 34, 20 20" stroke="var(--champagne-500)" strokeWidth="3" strokeLinecap="round" fill="none"/>
              <circle cx="12" cy="4" r="3" stroke="var(--champagne-500)" strokeWidth="2" fill="none"/>
            </svg>
            ER<span style={{ fontWeight: 800 }}>X</span>
          </div>
        </div>
      </div>

      {/* 16. The Diamond Grid */}
      <div>
        <h2 style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          16. The Diamond Grid (Growth/Data)
        </h2>
        <div style={{ padding: "4rem", background: "rgba(255,255,255,0.02)", display: "inline-block", borderRadius: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="15" y="0" width="10" height="10" transform="rotate(45 15 0)" fill="var(--champagne-500)"/>
              <rect x="7" y="15" width="10" height="10" transform="rotate(45 7 15)" fill="var(--champagne-500)" opacity="0.7"/>
              <rect x="23" y="15" width="10" height="10" transform="rotate(45 23 15)" fill="var(--champagne-500)" opacity="0.7"/>
              <rect x="15" y="30" width="10" height="10" transform="rotate(45 15 30)" fill="var(--champagne-500)" opacity="0.4"/>
            </svg>
            <span style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.02em" }}>CharterX</span>
          </div>
        </div>
      </div>

      {/* 17. The Latitude Globe */}
      <div>
        <h2 style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          17. The Global OTA Sphere
        </h2>
        <div style={{ padding: "4rem", background: "rgba(255,255,255,0.02)", display: "inline-block", borderRadius: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" stroke="var(--champagne-500)" strokeWidth="1.5" fill="none"/>
              <ellipse cx="20" cy="20" rx="8" ry="18" stroke="var(--champagne-500)" strokeWidth="1.5" fill="none"/>
              <path d="M2 20 L38 20" stroke="var(--champagne-500)" strokeWidth="1.5"/>
            </svg>
            <span style={{ fontSize: "2.4rem", fontWeight: 300, letterSpacing: "0.15em" }}>CHARTERX</span>
          </div>
        </div>
      </div>

      {/* 18. The Speed Wake */}
      <div>
        <h2 style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          18. The Velocity Wake
        </h2>
        <div style={{ padding: "4rem", background: "rgba(255,255,255,0.02)", display: "inline-block", borderRadius: "8px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "1rem" }}>
              <path d="M0 4 L30 4 M10 12 L35 12 M5 20 L25 20" stroke="var(--champagne-500)" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <span style={{ fontSize: "2.5rem", fontWeight: 800, fontStyle: "italic", paddingRight: "0.2em" }}>CHARTERX</span>
          </div>
        </div>
      </div>

      {/* 19. The Luxury Shield */}
      <div>
        <h2 style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          19. The Classic Shield
        </h2>
        <div style={{ padding: "4rem", background: "rgba(255,255,255,0.02)", display: "inline-block", borderRadius: "8px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.8rem" }}>
            <div style={{ position: "relative", width: "40px", height: "50px" }}>
              <svg viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", top: 0, left: 0 }}>
                <path d="M20 50 C35 40, 38 20, 38 5 L20 10 L2 5 C2 20, 5 40, 20 50 Z" stroke="var(--champagne-500)" strokeWidth="2" fill="none"/>
              </svg>
              <span style={{ position: "absolute", top: "45%", left: "50%", transform: "translate(-50%, -50%)", fontWeight: 800, fontSize: "0.9rem", color: "white" }}>CX</span>
            </div>
            <span style={{ fontSize: "1.2rem", fontWeight: 400, letterSpacing: "0.3em" }}>CHARTERX</span>
          </div>
        </div>
      </div>

      {/* 20. The Constellation */}
      <div>
        <h2 style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          20. The Navigation Constellation
        </h2>
        <div style={{ padding: "4rem", background: "rgba(255,255,255,0.02)", display: "inline-block", borderRadius: "8px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <svg width="80" height="30" viewBox="0 0 80 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: "0.5rem" }}>
              <path d="M10 20 L30 5 L50 25 L70 10" stroke="var(--champagne-500)" strokeWidth="1" strokeDasharray="2 2" fill="none"/>
              <circle cx="10" cy="20" r="2" fill="white"/>
              <circle cx="30" cy="5" r="3" fill="var(--champagne-500)"/>
              <circle cx="50" cy="25" r="2" fill="white"/>
              <circle cx="70" cy="10" r="2" fill="white"/>
            </svg>
            <span style={{ fontSize: "2rem", fontWeight: 300, letterSpacing: "0.2em" }}>CHARTERX</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "4rem", marginBottom: "2rem", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "4rem" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Level 3: Custom Fonts & Bespoke Lettering</h1>
        <p style={{ color: "rgba(255,255,255,0.5)" }}>You want creativity? Here are 5 concepts using imported, high-fashion Google Fonts (Cinzel, Syne, Megrim, etc.), and 5 concepts where I have <strong>literally drawn the typography from scratch using SVG math</strong>.</p>
        
        {/* Injecting wild Google fonts just for this preview */}
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Syncopate:wght@400;700&family=Syne:wght@400;700;800&family=Italiana&family=Megrim&display=swap');
          
          .font-cinzel { font-family: 'Cinzel Decorative', serif; }
          .font-syncopate { font-family: 'Syncopate', sans-serif; }
          .font-syne { font-family: 'Syne', sans-serif; }
          .font-italiana { font-family: 'Italiana', serif; }
          .font-megrim { font-family: 'Megrim', display; }
        `}} />
      </div>

      {/* 21. Cinzel Decorative */}
      <div>
        <h2 style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          21. The 'Old Money' Luxury (Cinzel Decorative)
        </h2>
        <div style={{ padding: "4rem", background: "rgba(255,255,255,0.02)", display: "inline-block", borderRadius: "8px" }}>
          <span className="font-cinzel" style={{ fontSize: "3rem", fontWeight: 700, letterSpacing: "0.05em" }}>
            CHARTER<span style={{ color: "var(--champagne-500)", fontSize: "4rem", verticalAlign: "middle", marginLeft: "-0.1em" }}>X</span>
          </span>
        </div>
      </div>

      {/* 22. Syne Avant-Garde */}
      <div>
        <h2 style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          22. The Avant-Garde Fashion (Syne)
        </h2>
        <div style={{ padding: "4rem", background: "rgba(255,255,255,0.02)", display: "inline-block", borderRadius: "8px" }}>
          <span className="font-syne" style={{ fontSize: "3.5rem", letterSpacing: "-0.05em", display: "flex", alignItems: "center" }}>
            <span style={{ fontWeight: 800 }}>C</span>
            <span style={{ fontWeight: 400 }}>H</span>
            <span style={{ fontWeight: 800 }}>A</span>
            <span style={{ fontWeight: 400 }}>R</span>
            <span style={{ fontWeight: 800 }}>T</span>
            <span style={{ fontWeight: 400 }}>E</span>
            <span style={{ fontWeight: 800 }}>R</span>
            <span style={{ color: "var(--champagne-500)", fontWeight: 800, marginLeft: "0.1em", fontStyle: "italic" }}>X</span>
          </span>
        </div>
      </div>

      {/* 23. Syncopate Ultra-Wide */}
      <div>
        <h2 style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          23. The Supercar Aesthetic (Syncopate)
        </h2>
        <div style={{ padding: "4rem", background: "rgba(255,255,255,0.02)", display: "inline-block", borderRadius: "8px" }}>
          <span className="font-syncopate" style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "0.1em", display: "flex", gap: "0.5rem" }}>
            <span>CHARTER</span>
            <span style={{ color: "var(--champagne-500)" }}>X</span>
          </span>
        </div>
      </div>

      {/* 24. Italiana Editorial */}
      <div>
        <h2 style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          24. The Vogue Cover (Italiana)
        </h2>
        <div style={{ padding: "4rem", background: "rgba(255,255,255,0.02)", display: "inline-block", borderRadius: "8px" }}>
          <span className="font-italiana" style={{ fontSize: "4rem", fontWeight: 400, letterSpacing: "0.02em" }}>
            Charter<span style={{ color: "var(--champagne-500)", fontStyle: "italic" }}>X</span>
          </span>
        </div>
      </div>

      {/* 25. Megrim Abstract */}
      <div>
        <h2 style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          25. The Extraterrestrial Tech (Megrim)
        </h2>
        <div style={{ padding: "4rem", background: "rgba(255,255,255,0.02)", display: "inline-block", borderRadius: "8px" }}>
          <span className="font-megrim" style={{ fontSize: "4rem", fontWeight: 400, letterSpacing: "0.1em" }}>
            CHARTER<span style={{ color: "var(--champagne-500)", fontWeight: 900 }}>X</span>
          </span>
        </div>
      </div>

      {/* 26. Custom Drawn SVG: The Maze */}
      <div>
        <h2 style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          26. Bespoke Code Logo: "The Golden Maze"
        </h2>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginBottom: "2rem" }}>A custom interlocking CX monogram drawn point-by-point in SVG math. Completely unique to your brand.</p>
        <div style={{ padding: "4rem", background: "rgba(255,255,255,0.02)", display: "inline-block", borderRadius: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Complex C maze */}
              <path d="M40 10 L20 10 L20 50 L40 50" stroke="white" strokeWidth="4" strokeLinecap="square" fill="none"/>
              <path d="M30 20 L10 20 L10 40 L30 40" stroke="white" strokeWidth="4" strokeLinecap="square" fill="none"/>
              {/* X cutting through */}
              <path d="M45 5 L15 55 M15 5 L45 55" stroke="var(--champagne-500)" strokeWidth="4" strokeLinecap="square"/>
            </svg>
            <span style={{ fontSize: "2rem", fontWeight: 300, letterSpacing: "0.2em", fontFamily: "var(--font-display)" }}>CHARTERX</span>
          </div>
        </div>
      </div>

      {/* 27. Custom Drawn SVG: The Hourglass X */}
      <div>
        <h2 style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          27. Bespoke Code Logo: "The Hourglass"
        </h2>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginBottom: "2rem" }}>A perfectly symmetrical, solid geometric X that implies a 'C' in the negative space.</p>
        <div style={{ padding: "4rem", background: "rgba(255,255,255,0.02)", display: "inline-block", borderRadius: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "0.1em", fontFamily: "var(--font-display)" }}>CHARTER</span>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0 L40 0 L20 20 Z" fill="var(--champagne-500)"/>
              <path d="M0 40 L40 40 L20 20 Z" fill="white"/>
            </svg>
          </div>
        </div>
      </div>

      {/* 28. Custom Drawn SVG: The Equalizer (Data Driven) */}
      <div>
        <h2 style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          28. Bespoke Code Logo: "Revenue Equalizer"
        </h2>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginBottom: "2rem" }}>A highly tech-focused logo where the "CX" is literally built out of vertical data bars.</p>
        <div style={{ padding: "4rem", background: "rgba(255,255,255,0.02)", display: "inline-block", borderRadius: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* 'C' shape in bars */}
              <rect x="0" y="0" width="4" height="40" fill="white"/>
              <rect x="8" y="0" width="4" height="10" fill="white"/>
              <rect x="8" y="30" width="4" height="10" fill="white"/>
              <rect x="16" y="0" width="4" height="10" fill="white"/>
              <rect x="16" y="30" width="4" height="10" fill="white"/>
              {/* 'X' shape in gold bars */}
              <rect x="30" y="0" width="4" height="10" fill="var(--champagne-500)"/>
              <rect x="30" y="30" width="4" height="10" fill="var(--champagne-500)"/>
              <rect x="38" y="10" width="4" height="20" fill="var(--champagne-500)"/>
              <rect x="46" y="0" width="4" height="10" fill="var(--champagne-500)"/>
              <rect x="46" y="30" width="4" height="10" fill="var(--champagne-500)"/>
            </svg>
            <span style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "0.2em", fontFamily: "var(--font-display)" }}>CHARTERX</span>
          </div>
        </div>
      </div>

      {/* 29. Custom Drawn SVG: The Perfect Circle */}
      <div>
        <h2 style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          29. Bespoke Code Logo: "The Golden Cut"
        </h2>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginBottom: "2rem" }}>A perfect circle representing global reach, slashed diagonally to form a 'C', with the gold 'X' filling the void.</p>
        <div style={{ padding: "4rem", background: "rgba(255,255,255,0.02)", display: "inline-block", borderRadius: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 2 A 18 18 0 1 0 36 28 L 20 20 Z" fill="white"/>
              <path d="M38 12 L20 20 L38 38 L30 38 L16 20 L30 2 Z" fill="var(--champagne-500)"/>
            </svg>
            <span style={{ fontSize: "2.4rem", fontWeight: 300, letterSpacing: "0.05em", fontFamily: "var(--font-display)" }}>CHARTERX</span>
          </div>
        </div>
      </div>

      {/* 30. Custom Drawn SVG: The Infinite Loop */}
      <div>
        <h2 style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          30. Bespoke Code Logo: "The Infinity Knot"
        </h2>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginBottom: "2rem" }}>A flowing, continuous Bezier curve that traces an infinite knot, representing seamless management.</p>
        <div style={{ padding: "4rem", background: "rgba(255,255,255,0.02)", display: "inline-block", borderRadius: "8px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            <svg width="100" height="40" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 20 C20 -10, 0 50, 50 20 C100 -10, 80 50, 50 20" stroke="var(--champagne-500)" strokeWidth="2" fill="none"/>
              <path d="M50 20 C30 0, 10 40, 50 20 C70 0, 90 40, 50 20" stroke="white" strokeWidth="2" fill="none"/>
            </svg>
            <span style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "0.4em", fontFamily: "var(--font-display)" }}>CHARTERX</span>
          </div>
        </div>
      </div>

    </div>
  );
}
