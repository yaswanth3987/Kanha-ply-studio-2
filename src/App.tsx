import { useState, useRef, useEffect, useCallback, type ReactNode } from "react"
import kanhaLogo from "./imports/Kanha_Logo.png"
import ThreeDStudio from "./components/ThreeDStudio"
import { Scissors } from "lucide-react"

// ─── Images ───────────────────────────────────────────────────────────────────
const IMG = {
  hero:     "https://images.unsplash.com/photo-1745301558339-44eb3217d5da?w=1400&h=900&fit=crop&auto=format",
  heroAlt:  "https://images.unsplash.com/photo-1697947656193-a87d460b5fb5?w=900&h=700&fit=crop&auto=format",
  about:    "https://images.unsplash.com/photo-1742541656775-5fc717774c02?w=900&h=700&fit=crop&auto=format",
  kitchen:  "https://images.unsplash.com/photo-1755771984341-546c2a04f236?w=800&h=600&fit=crop&auto=format",
  bedroom:  "https://images.unsplash.com/photo-1757344454333-cc666252e596?w=800&h=600&fit=crop&auto=format",
  office:   "https://images.unsplash.com/photo-1715593949273-09009558300a?w=800&h=600&fit=crop&auto=format",
  wood1:    "https://images.unsplash.com/photo-1725330785143-ce43bff100d3?w=600&h=400&fit=crop&auto=format",
  wood2:    "https://images.unsplash.com/photo-1776278515712-9d5753884f5f?w=600&h=400&fit=crop&auto=format",
  wood3:    "https://images.unsplash.com/photo-1621295693450-080546d2ec8e?w=600&h=400&fit=crop&auto=format",
  veneer:   "https://images.unsplash.com/photo-1716452581609-76fc2949d43c?w=600&h=400&fit=crop&auto=format",
  before:   "https://images.unsplash.com/photo-1700072806012-01b7493151db?w=1000&h=640&fit=crop&auto=format",
  after:    "https://images.unsplash.com/photo-1653972233499-eaad56990299?w=1000&h=640&fit=crop&auto=format",
  p1:       "https://images.unsplash.com/photo-1745301558339-44eb3217d5da?w=800&h=560&fit=crop&auto=format",
  p2:       "https://images.unsplash.com/photo-1755771984341-546c2a04f236?w=800&h=560&fit=crop&auto=format",
  p3:       "https://images.unsplash.com/photo-1757344454333-cc666252e596?w=800&h=560&fit=crop&auto=format",
  p4:       "https://images.unsplash.com/photo-1706074793638-da28b90ea8ae?w=800&h=560&fit=crop&auto=format",
  cta:      "https://images.unsplash.com/photo-1678978866819-306ed8608e7f?w=900&h=700&fit=crop&auto=format",
  living:   "https://images.unsplash.com/photo-1667375186016-db03fabfc259?w=800&h=600&fit=crop&auto=format",
  luxury:   "https://images.unsplash.com/photo-1654064550874-3c14a961730e?w=800&h=600&fit=crop&auto=format",
}

// ─── Scroll animation hook ─────────────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return ref
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ target, suffix = "", duration = 1800 }: { target: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          const ease = 1 - Math.pow(1 - p, 3)
          setVal(Math.floor(ease * target))
          if (p < 1) requestAnimationFrame(tick)
          else setVal(target)
        }
        requestAnimationFrame(tick)
        obs.disconnect()
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])
  return <span ref={ref}>{val}{suffix}</span>
}

// ─── Fade wrapper ─────────────────────────────────────────────────────────────
function Reveal({ children, className = "", delay = 0, style }: { children: ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.transitionDelay = `${delay}s`
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return <div ref={ref} className={`fade-up ${className}`} style={style}>{children}</div>
}

// ─────────────────────────────────────────────────────────────────────────────
// HEADER
// ─────────────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Interiors", href: "#services" },
  { label: "3D Studio", href: "#3d-studio" },
  { label: "Materials", href: "#materials" },
  { label: "Why KANHA", href: "#why" },
  { label: "Process", href: "#process" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
]

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState("")
  const [promoVisible, setPromoVisible] = useState(true)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        backgroundColor: scrolled ? "rgba(247,243,234,0.98)" : "#F7F3EA",
        borderBottom: `1px solid ${scrolled ? "rgba(200,155,60,0.25)" : "rgba(200,155,60,0.15)"}`,
        boxShadow: scrolled ? "0 2px 32px rgba(7,59,92,0.1)" : "none",
        transition: "all 0.3s ease",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}>
        {/* Top bar */}
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 16px", display: "flex", alignItems: "center", height: 72, gap: 16 }}>
          {/* Logo */}
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0, textDecoration: "none" }}>
            <img src={kanhaLogo} alt="KANHA" style={{ height: 52, width: "auto", objectFit: "contain" }} />
          </a>

          {/* Nav - desktop */}
          <nav className="hide-mobile" style={{ display: "flex", gap: 2, flex: 1, justifyContent: "center" }}>
            {NAV_LINKS.map(({ label, href }) => (
              <a key={label} href={href}
                onClick={() => setActive(label)}
                style={{
                  padding: "8px 14px",
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  fontWeight: active === label ? 600 : 500,
                  color: active === label ? "var(--peacock)" : "var(--charcoal)",
                  letterSpacing: "0.03em",
                  textDecoration: "none",
                  borderRadius: 4,
                  position: "relative",
                  transition: "color 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--peacock)")}
                onMouseLeave={e => (e.currentTarget.style.color = active === label ? "var(--peacock)" : "var(--charcoal)")}
              >
                {label}
                {active === label && (
                  <span style={{ position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)", width: 20, height: 2, background: "var(--gold)", borderRadius: 2 }} />
                )}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0, marginLeft: "auto" }}>
            <a href="tel:+910000000000" style={{ display: "flex", alignItems: "center", gap: 7, textDecoration: "none", color: "var(--charcoal)", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500 }}>
              <svg width="14" height="14" fill="none" stroke="var(--peacock)" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
              </svg>
              +91 98765 43210
            </a>
            <a href="#contact" className="btn-gold" style={{ fontSize: 13, padding: "10px 20px" }}>
              Book Free Consultation →
            </a>
          </div>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="show-mobile" aria-label="Toggle navigation"
            style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", padding: 8, color: "var(--charcoal)", display: "flex", alignItems: "center" }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen ? <path d="M18 6L6 18M6 6l12 12"/> : <path d="M3 12h18M3 6h18M3 18h18"/>}
            </svg>
          </button>
        </div>

        {/* Mobile menu - Luxury slide overlay */}
        <div style={{
          overflow: "hidden",
          maxHeight: menuOpen ? "90vh" : 0,
          transition: "max-height 0.38s cubic-bezier(0.16, 1, 0.3, 1)",
          background: "rgba(247,243,234,0.99)",
          backdropFilter: "blur(20px)",
          borderTop: menuOpen ? "1px solid rgba(200,155,60,0.2)" : "none",
          boxShadow: menuOpen ? "0 24px 48px rgba(7,59,92,0.18)" : "none",
        }}>
          <div style={{ padding: "8px 20px 32px" }}>
            {NAV_LINKS.map(({ label, href }) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 500, color: "var(--charcoal)", textDecoration: "none", borderBottom: "1px solid rgba(200,155,60,0.1)" }}>
                {label}
                <span style={{ color: "var(--gold)", fontSize: 12 }}>→</span>
              </a>
            ))}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
              <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-gold" style={{ fontSize: 14, textAlign: "center", padding: "14px 18px" }}>Book Free Consultation →</a>
              <a href="https://wa.me/910000000000" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: 14, textAlign: "center", padding: "13px 18px" }}>Chat on WhatsApp</a>
            </div>
            {/* Mobile contact info */}
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(200,155,60,0.1)", display: "flex", flexDirection: "column", gap: 8 }}>
              <a href="tel:+919876543210" style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--grey)", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "var(--peacock)" }}>📞</span> +91 98765 43210
              </a>
              <a href="mailto:hello@kanha.in" style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--grey)", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "var(--peacock)" }}>✉</span> hello@kanha.in
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Floating WhatsApp - dynamically coordinated with bottom banner */}
      <a href="https://wa.me/910000000000" target="_blank" rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: promoVisible ? 68 : 22,
          right: 20,
          zIndex: 300,
          width: 50,
          height: 50,
          borderRadius: "50%",
          background: "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(37,211,102,0.45)",
          textDecoration: "none",
          transition: "bottom 0.3s ease, transform 0.2s, box-shadow 0.2s"
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(37,211,102,0.5)" }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,211,102,0.45)" }}
        title="Chat on WhatsApp"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Promo bottom banner */}
      <PromoBanner visible={promoVisible} onClose={() => setPromoVisible(false)} />
    </>
  )
}

function PromoBanner({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  if (!visible) return null
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 190,
      background: "var(--navy)", padding: "10px 18px", display: "flex", alignItems: "center",
      justifyContent: "center", gap: 12, boxShadow: "0 -4px 20px rgba(0,0,0,0.15)"
    }}>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "white", fontWeight: 500, textAlign: "center" }}>
        🎁 <strong>Free 3D Design + Quote</strong> — Limited consultation slots this month.
      </span>
      <a href="#contact" className="btn-gold" style={{ fontSize: 11, padding: "5px 12px", flexShrink: 0 }}>Claim Now →</a>
      <button onClick={onClose} aria-label="Close" style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: 18, lineHeight: 1, padding: "4px 8px" }}>×</button>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────
function Hero() {
  const [imgLoaded, setImgLoaded] = useState(false)
  return (
    <section style={{ paddingTop: 72, minHeight: "88vh", background: "var(--ivory)", display: "flex", alignItems: "center", overflow: "hidden" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "60px 24px 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center", width: "100%" }}
        className="hero-grid">
        {/* Left */}
        <div>
          <Reveal>
            <span className="eyebrow" style={{ display: "block", marginBottom: 16 }}>SPACES • MATERIALS • DESIGN</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="hero-title" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(32px, 4.5vw, 66px)", fontWeight: 700, lineHeight: 1.1, color: "var(--charcoal)", margin: "0 0 20px" }}>
              From the Right<br />
              <em style={{ color: "var(--navy)", fontStyle: "italic" }}>Materials</em> to the<br />
              Right Space.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 15.5, lineHeight: 1.75, color: "#4a5260", margin: "0 0 28px", maxWidth: 460 }}>
              Premium materials, thoughtful interior design and complete execution — brought together under one roof.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="hero-actions" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
              <a href="#services" className="btn-primary hero-btn">Explore Interiors →</a>
              <a href="#materials" className="btn-outline hero-btn">Explore Materials →</a>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="hero-bullets" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px 20px", paddingTop: 22, borderTop: "1px solid rgba(200,155,60,0.2)" }}>
              {["Quality Materials", "Design Expertise", "End-to-End Execution", "Personalised Solutions"].map(t => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--gold)", display: "inline-block", flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 500, letterSpacing: "0.02em", color: "#5a6170" }}>{t}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right: Hero Visual */}
        <Reveal delay={0.15} className="hero-img-wrap">
          <div style={{ position: "relative" }}>
            <div style={{ borderRadius: 8, overflow: "hidden", background: "#d4c9b0", aspectRatio: "4/3", opacity: imgLoaded ? 1 : 0.6, transition: "opacity 0.5s", boxShadow: "0 20px 56px rgba(7,59,92,0.14)" }}>
              <img src={IMG.hero} alt="Luxury living room" style={{ width: "100%", height: "100%", objectFit: "cover" }} onLoad={() => setImgLoaded(true)} />
            </div>
            <div className="hero-decor-box" style={{ position: "absolute", bottom: -16, right: -16, width: "50%", height: "50%", border: "2px solid rgba(200,155,60,0.3)", borderRadius: 8, zIndex: -1 }} />
            <div className="hero-floating-badge" style={{ position: "absolute", bottom: 20, left: -20, background: "white", borderRadius: 8, padding: "12px 18px", boxShadow: "0 8px 32px rgba(7,59,92,0.15)", borderLeft: "3px solid var(--gold)" }}>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 15, fontWeight: 700, color: "var(--navy)", lineHeight: 1 }}>Complete Journey</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 9, color: "var(--grey)", letterSpacing: "0.08em", marginTop: 4 }}>MATERIALS → DESIGN → EXECUTION</div>
            </div>
          </div>
        </Reveal>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; padding: 36px 16px 32px !important; }
          .hero-img-wrap { display: block !important; order: -1; max-width: 100%; margin: 0 auto; width: 100%; }
          .hero-floating-badge { left: 10px !important; bottom: 10px !important; padding: 8px 12px !important; }
          .hero-decor-box { display: none !important; }
        }
        @media (max-width: 480px) {
          .hero-actions { flex-direction: column !important; gap: 10px !important; }
          .hero-btn { width: 100% !important; text-align: center !important; box-sizing: border-box !important; }
          .hero-bullets { grid-template-columns: 1fr 1fr !important; gap: 8px !important; }
          .hero-title { font-size: clamp(28px, 8vw, 42px) !important; }
        }
      `}</style>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// STATS BAR + TICKER
// ─────────────────────────────────────────────────────────────────────────────
const STATS = [
  { val: 120, suffix: "+", label: "Projects Delivered" },
  { val: 5, suffix: ".0★", label: "Client Rating" },
  { val: 8, suffix: "+", label: "Cities Served" },
  { val: 2021, suffix: "", label: "Established" },
]
const TICKER_ITEMS = [
  "Full Home Interiors", "Modular Kitchens", "Luxury Wardrobes", "BWP Plywood", "Natural Veneers",
  "False Ceilings", "Office Design", "Commercial Spaces", "Laminates", "Flush Doors",
  "Hardware & Fittings", "End-to-End Execution", "3D Visualisation", "Transparent Pricing",
]

function StatsBar() {
  return (
    <section style={{ background: "white", borderBottom: "1px solid rgba(200,155,60,0.12)" }}>
      {/* Counters */}
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "40px 32px 34px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }} className="stats-grid">
        {STATS.map((s, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(30px,3.5vw,50px)", fontWeight: 700, color: "var(--navy)", lineHeight: 1 }}>
                <Counter target={s.val} suffix={s.suffix} />
              </div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: "var(--grey)", marginTop: 8, textTransform: "uppercase" }}>
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Marquee */}
      <div style={{ borderTop: "1px solid rgba(200,155,60,0.12)", padding: "12px 0", overflow: "hidden", background: "var(--ivory)" }}>
        <div className="marquee-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap", marginRight: 40 }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--charcoal)", opacity: 0.55 }}>{item}</span>
              <span style={{ marginLeft: 40, color: "var(--gold)", fontSize: 9 }}>✦</span>
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 700px) {
          .stats-grid {
            grid-template-columns: repeat(2,1fr) !important;
            padding: 28px 16px 24px !important;
            gap: 20px 12px !important;
          }
        }
      `}</style>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section className="section-pad" style={{ background: "var(--ivory)" }} id="about">
      <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="about-grid">
        {/* Image side */}
        <Reveal>
          <div style={{ position: "relative" }}>
            <div style={{ borderRadius: 6, overflow: "hidden", background: "#d4c9b0", aspectRatio: "4/3", boxShadow: "0 12px 36px rgba(0,0,0,0.08)" }}>
              <img src={IMG.about} alt="Modern living space designed by KANHA" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div className="about-decor-box" style={{ position: "absolute", top: -16, left: -16, width: "45%", height: "45%", border: "2px solid rgba(200,155,60,0.25)", borderRadius: 6, zIndex: -1 }} />
            {/* Mini stat badge */}
            <div className="about-badge" style={{ position: "absolute", top: 18, right: 18, background: "var(--navy)", color: "white", borderRadius: 6, padding: "10px 16px", boxShadow: "0 8px 24px rgba(7,59,92,0.25)" }}>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 700 }}>120+</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 9.5, letterSpacing: "0.1em", opacity: 0.7, marginTop: 3 }}>PROJECTS</div>
            </div>
          </div>
        </Reveal>

        {/* Text side */}
        <div>
          <Reveal delay={0.1}>
            <span className="eyebrow" style={{ display: "block", marginBottom: 16 }}>WHO WE ARE</span>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 700, color: "var(--charcoal)", margin: "0 0 18px", lineHeight: 1.18 }}>
              Not Just Interiors.<br />
              <em style={{ color: "var(--navy)", fontStyle: "italic" }}>A Complete Experience.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 14.5, lineHeight: 1.75, color: "#4a5260", margin: "0 0 14px" }}>
              KANHA brings together the material supply chain and interior design under one roof — eliminating the disconnect between what you buy and how it gets designed and built.
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 14.5, lineHeight: 1.75, color: "#4a5260", margin: "0 0 28px" }}>
              From selecting the right plywood grade to handing over a finished space, every stage is coordinated by the same team with the same commitment to quality.
            </p>
          </Reveal>

          {/* Inline stats */}
          <Reveal delay={0.25}>
            <div style={{ display: "flex", gap: 28, marginBottom: 28, flexWrap: "wrap" }}>
              {[["120+", "Projects"], ["8+", "Cities"], ["4+", "Years"]].map(([v, l]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 24, fontWeight: 700, color: "var(--navy)" }}>{v}</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 10.5, color: "var(--grey)", letterSpacing: "0.08em", marginTop: 3 }}>{l}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="about-actions" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#contact" className="btn-primary">Get Free Consultation →</a>
              <a href="https://wa.me/910000000000" className="btn-outline">WhatsApp Us</a>
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .about-decor-box { display: none !important; }
          .about-badge { right: 12px !important; top: 12px !important; padding: 8px 14px !important; }
        }
        @media (max-width: 480px) {
          .about-actions { flex-direction: column !important; }
          .about-actions .btn-primary, .about-actions .btn-outline { width: 100% !important; text-align: center !important; }
        }
      `}</style>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FEATURED PROJECTS
// ─────────────────────────────────────────────────────────────────────────────
const PROJECTS = [
  { cat: "Full Home", badge: "Completed", title: "The Mehta Residence", loc: "Pune, Maharashtra", type: "4BHK Complete Interior", budget: "₹18–22 L", desc: "Full home transformation with bespoke wall panels, modular storage and cohesive material palette.", img: IMG.p1 },
  { cat: "Modular Kitchen", badge: "Completed", title: "Contemporary Kitchen", loc: "Mumbai", type: "L-Shape Modular", budget: "₹4–6 L", desc: "Streamlined cabinetry, premium laminates and integrated appliances.", img: IMG.p2 },
  { cat: "Luxury Interior", badge: "Completed", title: "The Sharma Suite", loc: "Nagpur", type: "Master Bedroom", budget: "₹6–9 L", desc: "Warm wood tones, bespoke wardrobe and layered lighting for a private retreat.", img: IMG.p3 },
  { cat: "Office / Commercial", badge: "Completed", title: "Studio Workspaces", loc: "Pune", type: "Commercial Office", budget: "₹12–16 L", desc: "Open-plan office with acoustic panels, collaborative zones and a commanding client lounge.", img: IMG.p4 },
]

function ProjectCard({ cat, badge, title, loc, type, budget, desc, img }: typeof PROJECTS[0]) {
  const [hov, setHov] = useState(false)
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: "white",
        borderRadius: 8,
        overflow: "hidden",
        cursor: "pointer",
        transition: "box-shadow 0.25s, transform 0.25s, border-color 0.25s",
        boxShadow: hov ? "0 16px 40px rgba(7,59,92,0.12)" : "0 2px 10px rgba(0,0,0,0.05)",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        border: hov ? "1px solid var(--peacock)" : "1px solid rgba(200,155,60,0.15)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        boxSizing: "border-box",
      }}>
      <div className="proj-card-img" style={{ overflow: "hidden", height: 240, background: "#d4c9b0", position: "relative", flexShrink: 0 }}>
        <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease", transform: hov ? "scale(1.06)" : "scale(1)" }} />
        <span style={{ position: "absolute", top: 12, left: 12, background: "var(--emerald)", color: "white", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", padding: "4px 9px", borderRadius: 3, fontFamily: "var(--font-sans)" }}>{badge}</span>
        <span style={{ position: "absolute", top: 12, right: 12, background: "rgba(7,59,92,0.88)", color: "white", fontSize: 10, fontWeight: 600, padding: "4px 9px", borderRadius: 3, fontFamily: "var(--font-sans)", backdropFilter: "blur(4px)" }}>{cat}</span>
      </div>
      <div style={{ padding: "22px 22px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 19, fontWeight: 600, color: "var(--charcoal)", margin: "0 0 6px" }}>{title}</h3>
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--grey)" }}>{loc}</span>
          <span style={{ color: "var(--gold)", fontSize: 8 }}>●</span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--grey)" }}>{type}</span>
        </div>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "#5a6170", lineHeight: 1.6, margin: "0 0 18px", flex: 1 }}>{desc}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 14, borderTop: "1px solid rgba(0,0,0,0.06)", marginTop: "auto" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 700, color: "var(--navy)" }}>{budget} <span style={{ fontWeight: 400, color: "var(--grey)", fontSize: 11 }}>all inclusive</span></span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, fontWeight: 600, color: hov ? "var(--peacock)" : "var(--charcoal)", display: "flex", alignItems: "center", gap: 4, transition: "color 0.2s" }}>
            View Project <span style={{ transform: hov ? "translate(3px,-3px)" : "none", transition: "transform 0.2s", display: "inline-block" }}>↗</span>
          </span>
        </div>
      </div>
    </div>
  )
}

function FeaturedProjects() {
  return (
    <section className="section-pad" style={{ background: "var(--ivory)" }} id="projects">
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 44, flexWrap: "wrap", gap: 16 }}>
            <div>
              <span className="eyebrow" style={{ display: "block", marginBottom: 12 }}>REAL PROJECTS · REAL RESULTS</span>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 700, color: "var(--charcoal)", margin: "0 0 10px" }}>Spaces We've Shaped.</h2>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 14.5, color: "var(--grey)", margin: 0 }}>Real spaces. Thoughtful design. Carefully selected materials.</p>
            </div>
            <a href="#contact" className="btn-outline btn-mobile-full">View All Projects →</a>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }} className="proj-grid">
          {PROJECTS.map((p, i) => (
            <Reveal key={i} delay={i * 0.08} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <ProjectCard {...p} />
            </Reveal>
          ))}
        </div>
        {/* Mini stats below */}
        <Reveal delay={0.2}>
          <div style={{ display: "flex", gap: 36, justifyContent: "center", marginTop: 44, paddingTop: 32, borderTop: "1px solid rgba(200,155,60,0.15)", flexWrap: "wrap" }}>
            {[["120+", "Projects Completed"], ["5.0★", "Average Rating"], ["8+", "Cities"]].map(([v, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 26, fontWeight: 700, color: "var(--navy)" }}>{v}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--grey)", letterSpacing: "0.08em", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <style>{`
        @media (max-width: 800px) {
          .proj-grid { grid-template-columns: 1fr !important; gap: 18px !important; }
          .proj-card-img { height: 210px !important; }
        }
      `}</style>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// INTERIOR SERVICES
// ─────────────────────────────────────────────────────────────────────────────
const SERVICES = [
  { badge: "Flagship Service", name: "Full Home Interiors", desc: "Cohesive end-to-end design for every room in your home.", img: IMG.about },
  { badge: "Most Popular", name: "Modular Kitchens", desc: "Functional layouts with premium cabinetry and hardware finishes.", img: IMG.kitchen },
  { badge: "Residential", name: "Wardrobes & Storage", desc: "Custom storage systems built precisely for your daily rhythm.", img: IMG.bedroom },
  { badge: "Residential", name: "Living & Bedrooms", desc: "Spaces that balance comfort, character and clean function.", img: IMG.living },
  { badge: "Specialty", name: "False Ceilings", desc: "Architectural ceiling treatments with integrated lighting design.", img: IMG.luxury },
  { badge: "Commercial", name: "Office Interiors", desc: "Work environments engineered for focus, culture and impression.", img: IMG.office },
]

function ServiceCard({ badge, name, desc, img }: typeof SERVICES[0]) {
  const [hov, setHov] = useState(false)
  const badgeColor = badge === "Most Popular" ? "var(--gold)" : badge === "Flagship Service" ? "var(--navy)" : badge === "Commercial" ? "var(--teal)" : "var(--peacock)"
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: "white", borderRadius: 6, overflow: "hidden", cursor: "pointer", transition: "box-shadow 0.25s, transform 0.25s", boxShadow: hov ? "0 12px 36px rgba(0,107,143,0.14)" : "0 2px 10px rgba(0,0,0,0.05)", transform: hov ? "translateY(-4px)" : "none", border: hov ? "1.5px solid var(--peacock)" : "1.5px solid rgba(200,155,60,0.12)" }}>
      <div style={{ position: "relative", height: 190, overflow: "hidden", background: "#d4c9b0" }}>
        <img src={img} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.45s", transform: hov ? "scale(1.07)" : "scale(1)" }} />
        <span style={{ position: "absolute", top: 12, left: 12, background: badgeColor, color: "white", fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", padding: "4px 9px", borderRadius: 3, fontFamily: "var(--font-sans)" }}>{badge}</span>
        <div style={{ position: "absolute", top: 12, right: 12, width: 30, height: 30, borderRadius: "50%", background: hov ? "var(--peacock)" : "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s", color: hov ? "white" : "var(--charcoal)", fontSize: 15, fontWeight: 300 }}>↗</div>
      </div>
      <div style={{ padding: "16px 18px 16px" }}>
        <h3 style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, color: "var(--charcoal)", margin: "0 0 6px" }}>{name}</h3>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--grey)", margin: 0, lineHeight: 1.55 }}>{desc}</p>
      </div>
    </div>
  )
}

function Services() {
  return (
    <section className="section-pad" style={{ background: "white" }} id="services">
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="eyebrow" style={{ display: "block", marginBottom: 14 }}>WHAT WE DESIGN</span>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 700, color: "var(--charcoal)", margin: 0 }}>
              Interior Solutions for Every Space.
            </h2>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="svc-grid">
          {SERVICES.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <ServiceCard {...s} />
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1000px) { .svc-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 600px) { .svc-grid { grid-template-columns: 1fr !important; gap: 16px !important; } }
      `}</style>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// BEFORE / AFTER
// ─────────────────────────────────────────────────────────────────────────────
function BeforeAfter() {
  const [pos, setPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const update = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const r = containerRef.current.getBoundingClientRect()
    setPos(Math.max(2, Math.min(98, ((clientX - r.left) / r.width) * 100)))
  }, [])

  useEffect(() => {
    const move = (e: MouseEvent) => { if (dragging.current) update(e.clientX) }
    const touch = (e: TouchEvent) => { if (dragging.current) update(e.touches[0].clientX) }
    const up = () => { dragging.current = false }
    window.addEventListener("mousemove", move)
    window.addEventListener("touchmove", touch, { passive: true })
    window.addEventListener("mouseup", up)
    window.addEventListener("touchend", up)
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("touchmove", touch); window.removeEventListener("mouseup", up); window.removeEventListener("touchend", up) }
  }, [update])

  const benefits = ["Better Use of Space", "Improved Functionality", "Material Harmony", "Enhanced Aesthetics", "Higher Long-Term Value"]

  return (
    <section className="section-pad" style={{ background: "var(--charcoal)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", color: "var(--gold)", display: "block", marginBottom: 14 }}>TRANSFORMATIONS</span>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(30px, 4vw, 54px)", fontWeight: 700, color: "white", margin: "0 0 14px", lineHeight: 1.15 }}>
              Before KANHA.<br />
              <em style={{ color: "var(--teal)", fontStyle: "italic" }}>After KANHA.</em>
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(255,255,255,0.6)", maxWidth: 480, margin: "0 auto" }}>
              See what happens when materials, design and execution come together.
            </p>
          </div>
        </Reveal>

        {/* Slider */}
        <div ref={containerRef}
          className="ba-container ba-responsive-box"
          style={{ borderRadius: 6, background: "#1a2a3a" }}
          onMouseDown={e => { dragging.current = true; update(e.clientX) }}
          onTouchStart={e => { dragging.current = true; update(e.touches[0].clientX) }}
        >
          <img src={IMG.after} alt="Finished interior after KANHA" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", userSelect: "none" }} draggable={false} />
          <div className="ba-after" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <img src={IMG.before} alt="Empty room before KANHA" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", userSelect: "none" }} draggable={false} />
          </div>
          <div style={{ position: "absolute", top: 14, left: 14, background: "rgba(0,0,0,0.7)", color: "white", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", padding: "5px 10px", borderRadius: 3, fontFamily: "var(--font-sans)", backdropFilter: "blur(4px)" }}>BEFORE</div>
          <div style={{ position: "absolute", top: 14, right: 14, background: "rgba(0,107,143,0.88)", color: "white", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", padding: "5px 10px", borderRadius: 3, fontFamily: "var(--font-sans)", backdropFilter: "blur(4px)" }}>AFTER</div>
          <div className="ba-handle" style={{ left: `${pos}%` }}>
            <div className="ba-btn">
              <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M8 9l-4 3 4 3M16 9l4 3-4 3"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Journey strip */}
        <Reveal delay={0.1}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 28, flexWrap: "wrap" }}>
            {["SPACE", "DESIGN", "MATERIALS", "EXECUTION", "RESULT"].map((j, i, arr) => (
              <span key={j} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", color: i === arr.length - 1 ? "var(--teal)" : "rgba(255,255,255,0.6)" }}>{j}</span>
                {i < arr.length - 1 && <span style={{ color: "var(--gold)", fontSize: 12 }}>→</span>}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Benefits + CTA */}
        <Reveal delay={0.2}>
          <div style={{ display: "flex", gap: 24, marginTop: 36, alignItems: "center", flexWrap: "wrap", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {benefits.map(b => (
                <span key={b} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 18, height: 18, borderRadius: "50%", border: "1px solid var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="9" height="9" fill="none" stroke="var(--gold)" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
                  </span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, color: "rgba(255,255,255,0.75)" }}>{b}</span>
                </span>
              ))}
            </div>
            <a href="#projects" className="btn-primary btn-mobile-full" style={{ whiteSpace: "nowrap" }}>View More Transformations →</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PLYWOOD & MATERIALS
// ─────────────────────────────────────────────────────────────────────────────
const MATS = [
  { id: "bwp-plywood", icon: "🪵", name: "BWP Plywood", grade: "Grade A · Boiling Waterproof", desc: "Ideal for kitchens, bathrooms and moisture-prone areas.", img: IMG.wood3 },
  { id: "bwr-plywood", icon: "🔶", name: "BWR Plywood", grade: "Grade B · Boiling Water Resistant", desc: "Best for furniture, wardrobes and structural applications.", img: IMG.wood2 },
  { id: "mr-plywood", icon: "🟫", name: "MR Plywood", grade: "Grade C · Moisture Resistant", desc: "Economical grade for interior furniture and partitions.", img: IMG.wood1 },
  { id: "laminates", icon: "🎨", name: "Laminates", grade: "1mm · Decorative Surface", desc: "Wide range of textures, finishes and colour options.", img: IMG.veneer },
  { id: "natural-veneers", icon: "🌿", name: "Natural Veneers", grade: "0.6mm · Real Wood Surface", desc: "Authentic wood grain for premium furniture and panels.", img: IMG.wood2 },
  { id: "flush-doors", icon: "🚪", name: "Flush Doors", grade: "35–45mm · Solid & Hollow Core", desc: "Internal and external door solutions in multiple grades.", img: IMG.wood1 },
  { id: "block-boards", icon: "📦", name: "Block Boards", grade: "19–25mm · Rigid Core", desc: "Superior rigidity for shelves, tables and partition panels.", img: IMG.wood3 },
  { id: "hardware-fittings", icon: "🔩", name: "Hardware & Fittings", grade: "Hettich · Häfele · Ebco", desc: "European-grade hinges, channels, handles and soft-close systems.", img: IMG.veneer },
]

function Materials() {
  return (
    <section className="section-pad" style={{ background: "var(--ivory)" }} id="materials">
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 44, flexWrap: "wrap", gap: 16 }}>
            <div>
              <span className="eyebrow" style={{ display: "block", marginBottom: 12 }}>WHAT WE SUPPLY</span>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 700, color: "var(--charcoal)", margin: 0 }}>
                Materials That Build<br />Better Spaces.
              </h2>
            </div>
            <a href="#3d-studio" className="btn-primary btn-mobile-full">Inspect All in 3D Studio →</a>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }} className="mats-grid">
          {MATS.map((m, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <MatCard {...m} />
            </Reveal>
          ))}
        </div>
        {/* Stats repeat */}
        <Reveal delay={0.2}>
          <div style={{ display: "flex", gap: 36, justifyContent: "center", marginTop: 44, paddingTop: 32, borderTop: "1px solid rgba(200,155,60,0.15)", flexWrap: "wrap" }}>
            {[["8", "Material Categories"], ["120+", "Projects Supplied"], ["Top Brands", "Stocked"], ["Fast", "Delivery Available"]].map(([v, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 24, fontWeight: 700, color: "var(--navy)" }}>{v}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--grey)", letterSpacing: "0.08em", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <style>{`
        @media (max-width: 1000px) { .mats-grid { grid-template-columns: repeat(3,1fr) !important; } }
        @media (max-width: 700px) { .mats-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 520px) { .mats-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

function MatCard({ id, icon, name, grade, desc, img }: typeof MATS[0]) {
  const [hov, setHov] = useState(false)

  const handleInspect3D = () => {
    window.dispatchEvent(new CustomEvent('kanha-select-3d-material', { detail: { id } }))
    const el = document.getElementById('3d-studio')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div
      onClick={handleInspect3D}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "white",
        borderRadius: 6,
        overflow: "hidden",
        cursor: "pointer",
        transition: "box-shadow 0.2s, transform 0.2s, border-color 0.2s",
        boxShadow: hov ? "0 12px 32px rgba(7,59,92,0.15)" : "0 2px 10px rgba(0,0,0,0.05)",
        transform: hov ? "translateY(-4px)" : "none",
        border: hov ? "1.5px solid var(--gold)" : "1.5px solid transparent"
      }}
    >
      <div style={{ height: 140, overflow: "hidden", background: "#d4c9b0", position: "relative" }}>
        <img src={img} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s", transform: hov ? "scale(1.08)" : "scale(1)" }} />
        <span style={{ position: "absolute", top: 10, right: 10, background: "rgba(7,59,92,0.85)", color: "var(--gold)", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 3, backdropFilter: "blur(4px)" }}>
          ✦ 3D Ready
        </span>
      </div>
      <div style={{ padding: "16px 18px 18px" }}>
        <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, color: "var(--charcoal)", marginBottom: 3 }}>{name}</div>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", color: "var(--peacock)", marginBottom: 8 }}>{grade}</div>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--grey)", lineHeight: 1.55, margin: "0 0 12px" }}>{desc}</p>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, color: hov ? "var(--gold)" : "var(--peacock)", letterSpacing: "0.05em", transition: "color 0.2s", display: "inline-flex", alignItems: "center", gap: 4 }}>
          Inspect in 3D Studio →
        </span>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// WHY KANHA (numbered list + comparison table)
// ─────────────────────────────────────────────────────────────────────────────
const PRINCIPLES = [
  { n: "01", title: "Material Expertise", desc: "Deep knowledge of plywood grades, laminates, veneers and hardware — we know what works and lasts." },
  { n: "02", title: "Design Intelligence", desc: "Function-first thinking that translates your lifestyle into considered spatial solutions." },
  { n: "03", title: "One-Point Coordination", desc: "A single team manages materials, design, vendors and execution from start to handover." },
  { n: "04", title: "Quality-Focused Execution", desc: "Controlled manufacturing and on-site supervision — every detail finished to agreed standard." },
  { n: "05", title: "Transparent Process", desc: "Clear timelines, honest quotations and open communication at every stage. No surprises." },
  { n: "06", title: "Personalised Solutions", desc: "Every brief is unique. We design for your household, your taste and your timeline." },
]

const COMPARISON = [
  ["Material + design under one roof", true, false],
  ["In-house plywood & laminate supply", true, false],
  ["Transparent itemised quotation", true, false],
  ["Free 3D visualisation included", true, false],
  ["Single team, start to finish", true, false],
  ["Fixed delivery timeline commitment", true, false],
] as [string, boolean, boolean][]

function WhyKanha() {
  return (
    <section className="section-pad" style={{ background: "var(--charcoal)", position: "relative" }} id="why">
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 75% 25%, rgba(0,138,135,0.1) 0%, transparent 55%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1320, margin: "0 auto", position: "relative" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", color: "var(--gold)", display: "block", marginBottom: 14 }}>OUR PRINCIPLES</span>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(30px, 4vw, 54px)", fontWeight: 700, color: "white", margin: 0 }}>
              Why <em style={{ color: "var(--teal)", fontStyle: "italic" }}>KANHA?</em>
            </h2>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }} className="why-inner">
          {/* Numbered list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {PRINCIPLES.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{ display: "flex", gap: 16, padding: "20px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, color: "var(--gold)", letterSpacing: "0.08em", flexShrink: 0, marginTop: 3, width: 24 }}>{p.n}</div>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 17, fontWeight: 600, color: "white", margin: "0 0 6px" }}>{p.title}</h3>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Comparison table */}
          <Reveal delay={0.2}>
            <div>
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="why-table-header" style={{ background: "rgba(200,155,60,0.12)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "var(--gold)" }}>KANHA vs. OTHERS</span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, color: "var(--teal)", letterSpacing: "0.06em", textAlign: "center" }}>KANHA</span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em", textAlign: "center" }}>OTHERS</span>
                </div>
                {COMPARISON.map(([label, kanha, others], i) => (
                  <div key={i} className="why-table-row" style={{ borderBottom: i < COMPARISON.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, color: "rgba(255,255,255,0.75)" }}>{label}</span>
                    <span style={{ textAlign: "center", color: kanha ? "#4ade80" : "#f87171", fontSize: 15, fontWeight: 700 }}>{kanha ? "✓" : "✗"}</span>
                    <span style={{ textAlign: "center", color: others ? "#4ade80" : "rgba(255,255,255,0.25)", fontSize: 15 }}>{others ? "✓" : "✗"}</span>
                  </div>
                ))}
              </div>

              {/* Pull quote */}
              <div style={{ background: "rgba(0,107,143,0.15)", borderRadius: 6, padding: "20px 22px", marginTop: 20, borderLeft: "3px solid var(--teal)" }}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 16, fontStyle: "italic", color: "rgba(255,255,255,0.88)", lineHeight: 1.6, marginBottom: 10 }}>
                  "The experience was completely different — one team, one vision, one beautiful result."
                </div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 10.5, color: "var(--gold)", letterSpacing: "0.1em" }}>Google Review · Verified Customer</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .why-inner { grid-template-columns: 1fr !important; gap: 36px !important; } }
      `}</style>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PROCESS TIMELINE — animated SVG icons
// ─────────────────────────────────────────────────────────────────────────────

// Each step has a custom SVG icon path rendered with stroke-dashoffset animation
function ProcessIcon({ step, animate }: { step: number; animate: boolean }) {
  const color = step < 3 ? "#073B5C" : step < 6 ? "#006B8F" : step < 8 ? "#008A87" : "#087F5B"
  const dur = `${0.8 + step * 0.06}s`
  const s = (len: number) => ({ strokeDasharray: len, strokeDashoffset: animate ? 0 : len, transition: `stroke-dashoffset ${dur} cubic-bezier(0.4,0,0.2,1) ${step * 0.09}s` })

  const icons = [
    // 0 — Consultation: chat bubble + person
    <svg key={0} width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="16" r="7" stroke={color} strokeWidth="2" style={s(44)}/>
      <path d="M8 36c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke={color} strokeWidth="2" strokeLinecap="round" style={s(44)}/>
      <path d="M34 8l4-4M34 12h4M36 16v-4" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" style={s(18)}/>
    </svg>,
    // 1 — Rough Quote: document with ₹
    <svg key={1} width="44" height="44" viewBox="0 0 44 44" fill="none">
      <rect x="9" y="6" width="26" height="32" rx="3" stroke={color} strokeWidth="2" style={s(116)}/>
      <path d="M15 16h14M15 22h14M15 28h8" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s(40)}/>
      <text x="26" y="31" fontSize="11" fill="var(--gold)" fontWeight="700">₹</text>
    </svg>,
    // 2 — Discussion: two speech bubbles
    <svg key={2} width="44" height="44" viewBox="0 0 44 44" fill="none">
      <path d="M6 8h20a2 2 0 012 2v10a2 2 0 01-2 2H14l-4 4v-4H8a2 2 0 01-2-2V10a2 2 0 012-2z" stroke={color} strokeWidth="2" strokeLinejoin="round" style={s(90)}/>
      <path d="M22 24h10a2 2 0 012 2v6a2 2 0 01-2 2h-2v3l-4-3h-6a2 2 0 01-2-2v-2" stroke="var(--gold)" strokeWidth="1.8" strokeLinejoin="round" style={s(64)}/>
    </svg>,
    // 3 — Booking: calendar + checkmark
    <svg key={3} width="44" height="44" viewBox="0 0 44 44" fill="none">
      <rect x="6" y="10" width="32" height="28" rx="3" stroke={color} strokeWidth="2" style={s(120)}/>
      <path d="M6 18h32" stroke={color} strokeWidth="1.5" style={s(32)}/>
      <path d="M14 6v8M30 6v8" stroke={color} strokeWidth="2" strokeLinecap="round" style={s(16)}/>
      <path d="M14 26l5 5 11-9" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={s(28)}/>
    </svg>,
    // 4 — 2D/3D Design: floor plan / ruler
    <svg key={4} width="44" height="44" viewBox="0 0 44 44" fill="none">
      <rect x="6" y="6" width="32" height="32" rx="2" stroke={color} strokeWidth="2" style={s(128)}/>
      <path d="M6 20h32M20 6v32" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" style={s(68)}/>
      <rect x="22" y="22" width="12" height="10" rx="1" stroke="var(--gold)" strokeWidth="1.8" style={s(44)}/>
      <rect x="10" y="10" width="8" height="8" rx="1" stroke="var(--gold)" strokeWidth="1.8" style={s(32)}/>
    </svg>,
    // 5 — Material Presentation: palette/swatches
    <svg key={5} width="44" height="44" viewBox="0 0 44 44" fill="none">
      <rect x="6" y="12" width="10" height="20" rx="2" fill={color} opacity="0.15" stroke={color} strokeWidth="1.8" style={s(60)}/>
      <rect x="18" y="8" width="10" height="28" rx="2" fill="var(--gold)" opacity="0.12" stroke="var(--gold)" strokeWidth="1.8" style={s(76)}/>
      <rect x="30" y="14" width="8" height="16" rx="2" fill={color} opacity="0.1" stroke={color} strokeWidth="1.8" style={{ strokeDasharray: 48, strokeDashoffset: animate ? 0 : 48, transition: `stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1) ${step * 0.09 + 0.2}s` }}/>
      <path d="M8 36a4 4 0 014-4" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" style={s(14)}/>
    </svg>,
    // 6 — Final Quotation: invoice with seal
    <svg key={6} width="44" height="44" viewBox="0 0 44 44" fill="none">
      <path d="M10 4h18l8 8v28H10V4z" stroke={color} strokeWidth="2" strokeLinejoin="round" style={s(120)}/>
      <path d="M28 4v8h8" stroke={color} strokeWidth="1.5" style={s(24)}/>
      <path d="M16 18h12M16 24h12M16 30h6" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s(38)}/>
      <circle cx="34" cy="34" r="7" fill="var(--gold)" opacity="0.9" style={{ opacity: animate ? 0.9 : 0, transition: `opacity 0.5s ease ${step * 0.09 + 0.5}s` }}/>
      <path d="M31 34l2 2 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s(12)}/>
    </svg>,
    // 7 — Manufacturing: hammer + wrench
    <svg key={7} width="44" height="44" viewBox="0 0 44 44" fill="none">
      <path d="M12 32L28 16l4 4L16 36l-4-4z" stroke={color} strokeWidth="2" strokeLinejoin="round" style={s(80)}/>
      <path d="M28 16l6-6 4 4-6 6" stroke={color} strokeWidth="2" strokeLinejoin="round" style={s(40)}/>
      <path d="M8 36l4-4" stroke={color} strokeWidth="2" strokeLinecap="round" style={s(12)}/>
      <path d="M32 8l-4 4 2 2 4-4" stroke="var(--gold)" strokeWidth="1.8" strokeLinejoin="round" style={s(24)}/>
      <line x1="10" y1="34" x2="36" y2="34" stroke={color} strokeWidth="1" strokeDasharray="2 3" opacity="0.3" style={s(40)}/>
    </svg>,
    // 8 — Handover: house + key
    <svg key={8} width="44" height="44" viewBox="0 0 44 44" fill="none">
      <path d="M22 6L6 20v18h12V28h8v10h12V20L22 6z" stroke={color} strokeWidth="2" strokeLinejoin="round" style={s(140)}/>
      <circle cx="34" cy="34" r="6" stroke="var(--gold)" strokeWidth="2" style={s(38)}/>
      <circle cx="34" cy="34" r="2" fill="var(--gold)" style={{ opacity: animate ? 1 : 0, transition: `opacity 0.4s ease ${step * 0.09 + 0.6}s` }}/>
      <path d="M38 30l4-4" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" style={s(12)}/>
    </svg>,
  ]
  return icons[step] ?? null
}

function ProcessStep({ step, n, title, desc, color }: { step: number; n: string; title: string; desc: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [animated, setAnimated] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setAnimated(true); obs.disconnect() }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 8px" }}>
      {/* Icon circle */}
      <div style={{ width: 80, height: 80, borderRadius: "50%", background: animated ? `${color}12` : "rgba(200,155,60,0.05)", border: `2px solid ${animated ? color : "rgba(200,155,60,0.2)"}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, transition: "background 0.5s, border-color 0.5s", position: "relative", zIndex: 1, flexShrink: 0, boxShadow: animated ? `0 0 0 6px ${color}08` : "none" }}>
        <ProcessIcon step={step} animate={animated} />
      </div>
      {/* Step number */}
      <div style={{ fontFamily: "var(--font-sans)", fontSize: 9, fontWeight: 800, letterSpacing: "0.18em", color: "var(--gold)", marginBottom: 8 }}>{n}</div>
      <h4 style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, color: "var(--charcoal)", margin: "0 0 6px", lineHeight: 1.3 }}>{title}</h4>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--grey)", lineHeight: 1.55, margin: 0 }}>{desc}</p>
    </div>
  )
}

const PROCESS_STEPS = [
  { n: "01", title: "Free Consultation", desc: "We meet to understand your space and aspirations.", color: "#073B5C" },
  { n: "02", title: "Rough Quotation", desc: "An approximate budget based on your brief.", color: "#073B5C" },
  { n: "03", title: "Detailed Discussion", desc: "Room-by-room requirements and material preferences.", color: "#073B5C" },
  { n: "04", title: "Booking & Advance", desc: "Confirm the project with a nominal advance payment.", color: "#006B8F" },
  { n: "05", title: "2D / 3D Design", desc: "Floor plans, elevations and photorealistic renders.", color: "#006B8F" },
  { n: "06", title: "Material Presentation", desc: "Curated samples presented at our studio.", color: "#006B8F" },
  { n: "07", title: "Final Quotation", desc: "Itemised cost breakdown with no hidden charges.", color: "#008A87" },
  { n: "08", title: "Manufacturing & Execution", desc: "Workshop production and supervised installation.", color: "#008A87" },
  { n: "09", title: "Final Handover", desc: "Walkthrough, punch-list clearance, and your new space.", color: "#087F5B" },
]

function Process() {
  return (
    <section className="section-pad" style={{ background: "white" }} id="process">
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <span className="eyebrow" style={{ display: "block", marginBottom: 12 }}>HOW WE WORK</span>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 700, color: "var(--charcoal)", margin: "0 0 14px" }}>
              From Idea to Handover.
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 14.5, color: "var(--grey)", maxWidth: 480, margin: "0 auto" }}>
              Nine clear steps. One unified team. Zero ambiguity.
            </p>
          </div>
        </Reveal>

        {/* Desktop 9-column icon grid */}
        <div className="proc-desktop" style={{ overflowX: "auto", paddingBottom: 8 }}>
          <div style={{ position: "relative", minWidth: 960 }}>
            {/* Animated connector line */}
            <ProcessLine />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(9, 1fr)", gap: 4, paddingTop: 0 }}>
              {PROCESS_STEPS.map((s, i) => (
                <ProcessStep key={i} step={i} {...s} />
              ))}
            </div>
          </div>
        </div>

        {/* Phase labels */}
        <Reveal delay={0.3}>
          <div className="proc-desktop" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", minWidth: 960, margin: "36px auto 0", gap: 16 }}>
            {[["Discovery", "Steps 01–03", "var(--navy)"], ["Design", "Steps 04–06", "var(--peacock)"], ["Delivery", "Steps 07–09", "var(--teal)"]].map(([phase, steps, clr]) => (
              <div key={phase} style={{ textAlign: "center", padding: "14px 20px", borderTop: `3px solid ${clr}`, background: "rgba(7,59,92,0.02)", borderRadius: "0 0 6px 6px" }}>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 700, color: clr, letterSpacing: "0.08em" }}>{phase}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--grey)", marginTop: 4 }}>{steps}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Mobile vertical */}
        <div className="proc-mobile" style={{ display: "none" }}>
          {PROCESS_STEPS.map((s, i) => (
            <MobileProcessStep key={i} step={i} {...s} />
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .proc-desktop { display: none !important; }
          .proc-mobile { display: block !important; }
        }
      `}</style>
    </section>
  )
}

function ProcessLine() {
  const ref = useRef<SVGLineElement>(null)
  const [prog, setProg] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start: number | null = null
        const anim = (ts: number) => {
          if (!start) start = ts
          const p = Math.min((ts - start) / 1200, 1)
          setProg(p)
          if (p < 1) requestAnimationFrame(anim)
        }
        requestAnimationFrame(anim)
        obs.disconnect()
      }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  const totalLen = 860
  return (
    <svg style={{ position: "absolute", top: 39, left: "5.5%", right: "5.5%", width: "89%", height: 4, zIndex: 0, overflow: "visible" }} viewBox={`0 0 ${totalLen} 4`} preserveAspectRatio="none">
      <line ref={ref} x1="0" y1="2" x2={totalLen} y2="2" stroke="rgba(200,155,60,0.12)" strokeWidth="2"/>
      <line x1="0" y1="2" x2={prog * totalLen} y2="2" stroke="url(#procGrad)" strokeWidth="2.5" strokeLinecap="round"/>
      <defs>
        <linearGradient id="procGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#073B5C"/>
          <stop offset="33%" stopColor="#006B8F"/>
          <stop offset="66%" stopColor="#008A87"/>
          <stop offset="100%" stopColor="#087F5B"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

function MobileProcessStep({ step, n, title, desc, color }: { step: number; n: string; title: string; desc: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [animated, setAnimated] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setAnimated(true); obs.disconnect() } }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  const isLast = step === PROCESS_STEPS.length - 1
  return (
    <div ref={ref} style={{ display: "flex", gap: 16, marginBottom: 22, position: "relative" }}>
      {!isLast && <div style={{ position: "absolute", left: 26, top: 56, width: 2, height: "calc(100% + 4px)", background: `${color}25` }} />}
      <div style={{ width: 52, height: 52, borderRadius: "50%", border: `2px solid ${animated ? color : "rgba(200,155,60,0.2)"}`, background: animated ? `${color}10` : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.5s" }}>
        <ProcessIcon step={step} animate={animated} />
      </div>
      <div style={{ paddingTop: 6 }}>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: 9, fontWeight: 800, letterSpacing: "0.16em", color: "var(--gold)", marginBottom: 3 }}>{n}</div>
        <h4 style={{ fontFamily: "var(--font-sans)", fontSize: 13.5, fontWeight: 700, color: "var(--charcoal)", margin: "0 0 3px" }}>{title}</h4>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--grey)", lineHeight: 1.55, margin: 0 }}>{desc}</p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────────────────────────────────────
const REVIEWS = [
  { initials: "AV", name: "A. Verma", role: "Full Home Interior · Pune", text: "The team understood exactly what we wanted and delivered something even better. Material quality and execution were exceptional — every detail was thought through.", rating: 5 },
  { initials: "SP", name: "S. & R. Patel", role: "Modular Kitchen · Mumbai", text: "We spent months looking for someone who understood both materials and design. KANHA simplified the entire process. Our kitchen is a joy to use every day.", rating: 5 },
  { initials: "MS", name: "M. Shah", role: "Office Interiors · Nagpur", text: "Our office now reflects exactly the kind of company we are. Clients consistently compliment the space. Working with KANHA was straightforward and the result is outstanding.", rating: 5 },
]

function Testimonials() {
  return (
    <section className="section-pad" style={{ background: "var(--ivory)" }} id="reviews">
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 44, flexWrap: "wrap", gap: 16 }}>
            <div>
              <span className="eyebrow" style={{ display: "block", marginBottom: 12 }}>CLIENT VOICES</span>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 700, color: "var(--charcoal)", margin: 0 }}>What Our Clients Say.</h2>
            </div>
            <a href="https://g.page/r/kanha" className="btn-outline btn-mobile-full">View All Reviews on Google →</a>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="rev-grid">
          {REVIEWS.map((r, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="testimonial-card" style={{ background: "white", borderRadius: 6, borderTop: "3px solid var(--gold)", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
                <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                  {Array.from({ length: r.rating }).map((_, j) => <span key={j} style={{ color: "#FBBF24", fontSize: 15 }}>★</span>)}
                </div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 44, color: "var(--gold)", lineHeight: 1, marginBottom: 10, opacity: 0.4 }}>"</div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 13.5, lineHeight: 1.72, color: "var(--charcoal)", margin: "0 0 24px", fontStyle: "italic" }}>{r.text}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--navy)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: 11.5, fontWeight: 700, color: "white" }}>{r.initials}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, fontWeight: 600, color: "var(--charcoal)" }}>{r.name}</div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 10.5, color: "var(--grey)", marginTop: 2 }}>{r.role}</div>
                  </div>
                  <div style={{ marginLeft: "auto", background: "rgba(8,127,91,0.1)", color: "var(--emerald)", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", padding: "3px 7px", borderRadius: 3, fontFamily: "var(--font-sans)" }}>VERIFIED</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .rev-grid { grid-template-columns: 1fr !important; gap: 18px !important; } }
        @media (max-width: 1100px) and (min-width: 901px) { .rev-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// BRAND PARTNERS
// ─────────────────────────────────────────────────────────────────────────────
const BRANDS = [
  { name: "Century Ply", cat: "Plywood" }, { name: "Green Ply", cat: "Plywood" },
  { name: "Häfele", cat: "Hardware" }, { name: "Hettich", cat: "Hardware" },
  { name: "Ebco", cat: "Hardware" }, { name: "Godrej", cat: "Hardware" },
  { name: "Merino", cat: "Laminates" }, { name: "Greenply Laminates", cat: "Laminates" },
  { name: "Virgo", cat: "Veneers" }, { name: "Olivya", cat: "Veneers" },
  { name: "Rang Acrylic", cat: "Acrylic" }, { name: "Austin Ply", cat: "Plywood" },
]

function BrandPartners() {
  const cats = ["All", "Plywood", "Hardware", "Laminates", "Veneers", "Acrylic"]
  const [active, setActive] = useState("All")
  const filtered = active === "All" ? BRANDS : BRANDS.filter(b => b.cat === active)

  return (
    <section className="section-pad" style={{ background: "white" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <span className="eyebrow" style={{ display: "block", marginBottom: 12 }}>OUR SUPPLY CHAIN</span>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 3vw, 44px)", fontWeight: 700, color: "var(--charcoal)", margin: "0 0 24px" }}>
              Brand Partners We Trust.
            </h2>
            {/* Category filter */}
            <div className="horizontal-scroll-track no-scrollbar" style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", padding: "4px 0" }}>
              {cats.map(c => (
                <button key={c} onClick={() => setActive(c)}
                  style={{ fontFamily: "var(--font-sans)", fontSize: 11.5, fontWeight: 600, padding: "6px 14px", borderRadius: 20, border: "1.5px solid", borderColor: active === c ? "var(--peacock)" : "rgba(32,37,34,0.2)", background: active === c ? "var(--peacock)" : "transparent", color: active === c ? "white" : "var(--charcoal)", cursor: "pointer", transition: "all 0.2s", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 14 }} className="brands-grid">
          {filtered.map((b, i) => (
            <Reveal key={`${b.name}-${i}`} delay={i * 0.04}>
              <div style={{ background: "var(--ivory)", borderRadius: 6, padding: "18px 14px", textAlign: "center", border: "1px solid rgba(200,155,60,0.12)", transition: "box-shadow 0.2s, border-color 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,107,143,0.1)"; e.currentTarget.style.borderColor = "rgba(0,107,143,0.25)" }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "rgba(200,155,60,0.12)" }}>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, fontWeight: 700, color: "var(--charcoal)", marginBottom: 4 }}>{b.name}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "var(--gold)", letterSpacing: "0.08em", fontWeight: 600 }}>{b.cat}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .brands-grid { grid-template-columns: repeat(3,1fr) !important; gap: 12px !important; } }
        @media (max-width: 560px) { .brands-grid { grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PRICING
// ─────────────────────────────────────────────────────────────────────────────
const PRICING = [
  { tier: "Smart", range: "₹5–10 L", name: "Smart Home", popular: false, features: ["Modular furniture basics", "Standard plywood grade", "Laminate finishes", "1-year support"] },
  { tier: "Luxury", range: "₹15–25 L", name: "Luxury Interior", popular: false, features: ["Full custom carpentry", "BWR/BWP plywood grade", "Natural veneer options", "Premium hardware", "3D visualisation"] },
  { tier: "Ultra Premium", range: "₹20–40 L", name: "Ultra Premium", popular: true, features: ["Complete design + execution", "BWP waterproof throughout", "Imported laminates & veneers", "European hardware brands", "False ceiling & lighting", "Dedicated project manager"] },
  { tier: "Villa", range: "₹30–50 L+", name: "Villa & Bungalow", popular: false, features: ["Whole-property transformation", "Architect collaboration", "Bespoke millwork", "Premium stone & surfaces", "Smart home integration", "White glove handover"] },
]

function Pricing() {
  return (
    <section className="section-pad" style={{ background: "var(--ivory)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="eyebrow" style={{ display: "block", marginBottom: 12 }}>THE KANHA PROMISE · TRANSPARENT PRICING</span>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 700, color: "var(--charcoal)", margin: "0 0 10px" }}>
              Investment Ranges.
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--grey)", margin: 0 }}>All packages include design, materials and execution. No hidden costs.</p>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }} className="price-grid">
          {PRICING.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className={p.popular ? "popular-card" : ""} style={{ background: p.popular ? "var(--navy)" : "white", borderRadius: 6, padding: "28px 24px", border: p.popular ? "none" : "1.5px solid rgba(200,155,60,0.15)", position: "relative", boxShadow: p.popular ? "0 16px 48px rgba(7,59,92,0.25)" : "0 2px 12px rgba(0,0,0,0.05)" }}>
                {p.popular && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "var(--gold)", color: "white", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", padding: "4px 12px", borderRadius: 20, fontFamily: "var(--font-sans)", whiteSpace: "nowrap" }}>MOST POPULAR</div>}
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", color: p.popular ? "var(--gold)" : "var(--peacock)", marginBottom: 8 }}>{p.tier.toUpperCase()}</div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 26, fontWeight: 700, color: p.popular ? "white" : "var(--charcoal)", marginBottom: 4 }}>{p.range}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: p.popular ? "rgba(255,255,255,0.5)" : "var(--grey)", marginBottom: 22, letterSpacing: "0.04em" }}>{p.name}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <span style={{ color: p.popular ? "var(--teal)" : "var(--emerald)", fontSize: 13, flexShrink: 0, marginTop: 1 }}>✓</span>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: p.popular ? "rgba(255,255,255,0.75)" : "var(--charcoal)", lineHeight: 1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>
                <a href="#contact" className="btn-mobile-full" style={{ display: "block", textAlign: "center", padding: "12px", borderRadius: 3, fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, cursor: "pointer", textDecoration: "none", transition: "all 0.2s",
                  background: p.popular ? "var(--gold)" : "transparent",
                  color: p.popular ? "white" : "var(--peacock)",
                  border: p.popular ? "none" : "1.5px solid var(--peacock)"
                }}>
                  Get a Quote →
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        .popular-card { transform: scale(1.03); }
        @media (max-width: 1000px) {
          .price-grid { grid-template-columns: repeat(2,1fr) !important; gap: 16px !important; }
          .popular-card { transform: none !important; }
        }
        @media (max-width: 600px) { .price-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// RIBBON CUTTING — Classic interactive ceremony
// ─────────────────────────────────────────────────────────────────────────────
function RibbonCutting() {
  const [phase, setPhase] = useState<"idle" | "hover" | "cutting" | "cut" | "celebrating">("idle")
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; y: number; color: string; size: number; rot: number; vel: { x: number; y: number } }>>([])
  const [ribbonPieces, setRibbonPieces] = useState<{ left: boolean; right: boolean }>({ left: false, right: false })
  const [scissorPos, setScissorPos] = useState(0) // -50 to 50 as percentage across ribbon width
  const rafRef = useRef<number>(0)

  const COLORS = ["#C89B3C", "#073B5C", "#006B8F", "#008A87", "#087F5B", "#E8D5A3", "#FFD700", "#FF6B6B", "#4ECDC4"]

  const launchConfetti = () => {
    const pieces = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: 35 + Math.random() * 30, // clustered around center
      y: 50,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 6 + Math.random() * 10,
      rot: Math.random() * 360,
      vel: { x: (Math.random() - 0.5) * 8, y: -(4 + Math.random() * 8) }
    }))
    setConfetti(pieces)

    let frame = 0
    const animate = () => {
      frame++
      setConfetti(prev => prev
        .map(p => ({
          ...p,
          x: p.x + p.vel.x * 0.15,
          y: p.y + p.vel.y * 0.15 + frame * 0.015,
          rot: p.rot + 3,
          vel: { ...p.vel, y: p.vel.y + 0.18 }
        }))
        .filter(p => p.y < 130)
      )
      if (frame < 180) rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
  }

  const handleCut = () => {
    if (phase !== "idle" && phase !== "hover") return
    setPhase("cutting")
    setTimeout(() => {
      setPhase("cut")
      setRibbonPieces({ left: true, right: true })
      launchConfetti()
      setTimeout(() => setPhase("celebrating"), 300)
    }, 600)
  }

  const handleReset = () => {
    cancelAnimationFrame(rafRef.current)
    setPhase("idle")
    setConfetti([])
    setRibbonPieces({ left: false, right: false })
    setScissorPos(0)
  }

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  const isDone = phase === "cut" || phase === "celebrating"

  return (
    <section style={{ background: "var(--charcoal)", padding: "80px 24px", overflow: "hidden", position: "relative" }}>
      {/* Background radial glow */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 40%, rgba(200,155,60,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative" }}>
        <Reveal>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", color: "var(--gold)", display: "block", marginBottom: 12 }}>GRAND OPENING</span>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(26px, 4vw, 52px)", fontWeight: 700, color: "white", margin: "0 0 12px", lineHeight: 1.15 }}>
            {isDone ? (
              <><em style={{ color: "var(--teal)" }}>Welcome</em> to KANHA Studio!</>
            ) : (
              <>Cut the Ribbon.<br /><em style={{ color: "var(--gold)", fontStyle: "italic" }}>Begin Your Journey.</em></>
            )}
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 14.5, color: "rgba(255,255,255,0.55)", maxWidth: 480, margin: "0 auto 40px" }}>
            {isDone
              ? "Your dream space awaits. Let's make it extraordinary together."
              : "Click the scissors to open our studio doors — and discover what's possible."}
          </p>
        </Reveal>

        {/* Stage */}
        <div style={{ position: "relative", width: "100%", height: 220, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 32 }}>

          {/* Confetti canvas layer */}
          {confetti.map(p => (
            <div key={p.id} style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size * 0.5,
              background: p.color,
              borderRadius: 2,
              transform: `rotate(${p.rot}deg)`,
              opacity: Math.max(0, 1 - (p.y - 50) / 80),
              pointerEvents: "none",
              zIndex: 20,
              transition: "none",
            }} />
          ))}

          {/* Pillars */}
          {["left", "right"].map(side => (
            <div key={side} style={{
              position: "absolute",
              [side]: "8%",
              top: "10%",
              width: 18,
              height: "82%",
              background: "linear-gradient(180deg, #C89B3C 0%, #8B6914 100%)",
              borderRadius: "6px 6px 0 0",
              boxShadow: "0 4px 20px rgba(200,155,60,0.3)",
              zIndex: 2,
            }} />
          ))}

          {/* Ribbon — left half */}
          <div style={{
            position: "absolute",
            left: "calc(8% + 18px)",
            right: "calc(50% + 2px)",
            top: "50%",
            height: 28,
            marginTop: -14,
            background: isDone ? "transparent" : "linear-gradient(180deg, #C89B3C 0%, #a0782a 50%, #C89B3C 100%)",
            borderRadius: ribbonPieces.left ? "0 0 4px 4px" : 0,
            transformOrigin: "left center",
            transform: ribbonPieces.left ? "rotate(15deg) translateX(-10px) translateY(20px)" : "none",
            transition: "transform 0.5s cubic-bezier(0.68,-0.6,0.32,1.6), background 0.3s",
            overflow: "hidden",
            zIndex: 3,
          }}>
            {!isDone && (
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 4px, transparent 4px, transparent 12px)" }} />
            )}
          </div>

          {/* Ribbon — right half */}
          <div style={{
            position: "absolute",
            left: "calc(50% + 2px)",
            right: "calc(8% + 18px)",
            top: "50%",
            height: 28,
            marginTop: -14,
            background: isDone ? "transparent" : "linear-gradient(180deg, #C89B3C 0%, #a0782a 50%, #C89B3C 100%)",
            borderRadius: ribbonPieces.right ? "0 0 4px 4px" : 0,
            transformOrigin: "right center",
            transform: ribbonPieces.right ? "rotate(-15deg) translateX(10px) translateY(20px)" : "none",
            transition: "transform 0.5s cubic-bezier(0.68,-0.6,0.32,1.6) 0.05s, background 0.3s",
            overflow: "hidden",
            zIndex: 3,
          }}>
            {!isDone && (
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 4px, transparent 4px, transparent 12px)" }} />
            )}
          </div>

          {/* Bow at center */}
          {!isDone && (
            <div style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
              pointerEvents: "none",
            }}>
              {/* Bow loops */}
              <svg width="60" height="48" viewBox="0 0 60 48" fill="none">
                <ellipse cx="15" cy="24" rx="14" ry="9" fill="#C89B3C" opacity="0.9" />
                <ellipse cx="45" cy="24" rx="14" ry="9" fill="#C89B3C" opacity="0.9" />
                <ellipse cx="15" cy="24" rx="10" ry="6" fill="#E8B84B" opacity="0.6" />
                <ellipse cx="45" cy="24" rx="10" ry="6" fill="#E8B84B" opacity="0.6" />
                <circle cx="30" cy="24" r="7" fill="#C89B3C" />
                <circle cx="30" cy="24" r="4" fill="#E8B84B" />
                {/* Ribbon tails */}
                <path d="M26 28 L18 42 M34 28 L42 42" stroke="#C89B3C" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
              </svg>
            </div>
          )}

          {/* Scissors — interactive */}
          {!isDone && (
            <button
              onMouseEnter={() => { if (phase === "idle") setPhase("hover") }}
              onMouseLeave={() => { if (phase === "hover") setPhase("idle") }}
              onMouseMove={e => {
                if (isDone || phase === "cutting") return
                const btn = e.currentTarget
                const rect = btn.getBoundingClientRect()
                const cx = rect.left + rect.width / 2
                const stage = btn.closest("div[style*='height: 220px']")
                if (!stage) return
                const sr = stage.getBoundingClientRect()
                const pct = ((e.clientX - sr.left) / sr.width - 0.5) * 100
                setScissorPos(Math.max(-38, Math.min(38, pct)))
              }}
              onClick={handleCut}
              aria-label="Cut the ribbon"
              style={{
                position: "absolute",
                top: "50%",
                left: `calc(50% + ${scissorPos}%)`,
                transform: "translate(-50%, -50%)",
                zIndex: 15,
                background: "none",
                border: "none",
                cursor: phase === "idle" ? "crosshair" : "pointer",
                padding: 12,
                borderRadius: "50%",
                transition: phase === "cutting" ? "none" : "left 0.08s ease, transform 0.08s ease",
                animation: phase === "hover" ? "scissors-pulse 0.8s ease infinite" : phase === "cutting" ? "scissors-snip 0.3s ease" : "none",
              }}
            >
              <div style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: phase === "hover" ? "rgba(200,155,60,0.2)" : "rgba(255,255,255,0.05)",
                border: `2px solid ${phase === "hover" ? "var(--gold)" : "rgba(255,255,255,0.2)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
                boxShadow: phase === "hover" ? "0 0 24px rgba(200,155,60,0.4)" : "none",
              }}>
                <Scissors
                  size={26}
                  color={phase === "hover" ? "#C89B3C" : "rgba(255,255,255,0.7)"}
                  style={{ transform: phase === "cutting" ? "rotate(30deg) scale(1.3)" : "rotate(-20deg)", transition: "all 0.15s" }}
                />
              </div>
              {phase === "idle" && (
                <div style={{
                  position: "absolute",
                  top: -36,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(200,155,60,0.95)",
                  color: "white",
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: "var(--font-sans)",
                  letterSpacing: "0.06em",
                  padding: "5px 10px",
                  borderRadius: 4,
                  whiteSpace: "nowrap",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                }}>Click to cut!</div>
              )}
            </button>
          )}

          {/* Celebration sparkles */}
          {phase === "celebrating" && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 25 }}>
              {["✨", "🎊", "🎉", "⭐", "✨", "🌟"].map((e, i) => (
                <span key={i} style={{
                  position: "absolute",
                  fontSize: 24 + (i % 3) * 8,
                  top: `${20 + Math.sin(i * 1.2) * 30}%`,
                  left: `${15 + i * 14}%`,
                  animation: `sparkle-pop 0.6s ${i * 0.1}s ease both`,
                }}>{e}</span>
              ))}
            </div>
          )}
        </div>

        {/* CTA after cut */}
        {isDone ? (
          <Reveal>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginTop: 8 }}>
              <a href="#contact" className="btn-gold">Book Your Free Consultation →</a>
              <button onClick={handleReset} className="btn-outline-light" style={{ cursor: "pointer" }}>Cut Again ✂</button>
            </div>
          </Reveal>
        ) : (
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em", marginTop: 0 }}>
            HOVER OVER THE SCISSORS AND CLICK TO SNIP
          </p>
        )}
      </div>

      <style>{`
        @keyframes scissors-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.08); }
        }
        @keyframes scissors-snip {
          0% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
          40% { transform: translate(-50%, -50%) scale(1.3) rotate(15deg); }
          70% { transform: translate(-50%, -50%) scale(0.9) rotate(-5deg); }
          100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
        }
        @keyframes sparkle-pop {
          0% { opacity: 0; transform: scale(0) translateY(20px); }
          60% { opacity: 1; transform: scale(1.2) translateY(-5px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CONSULTATION CTA
// ─────────────────────────────────────────────────────────────────────────────
function ConsultationCTA() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", type: "", budget: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value }))
  const inp: React.CSSProperties = { width: "100%", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 4, padding: "12px 14px", fontFamily: "var(--font-sans)", fontSize: 14, color: "white", outline: "none", boxSizing: "border-box" }
  const lbl: React.CSSProperties = { fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", display: "block", marginBottom: 7 }

  return (
    <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }} id="contact" className="cta-grid">
      {/* Image */}
      <div style={{ position: "relative", background: "#d4c9b0", minHeight: 580 }} className="cta-img-col">
        <img src={IMG.cta} alt="Luxury bedroom interior" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(7,59,92,0.55), rgba(7,59,92,0.1))" }} />
        <div style={{ position: "absolute", bottom: 40, left: 36, right: 36 }} className="cta-img-overlay">
          <div style={{ fontFamily: "var(--font-serif)", fontSize: 21, color: "white", fontWeight: 700, lineHeight: 1.4, marginBottom: 12 }}>
            "Every space we touch is a story we help tell."
          </div>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "rgba(255,255,255,0.55)", letterSpacing: "0.1em" }}>— KANHA DESIGN STUDIO</div>
          <div style={{ display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap" }}>
            {[["★ 5.0", "Rated"], ["120+", "Projects"], ["Free", "3D Design"]].map(([v, l]) => (
              <div key={l} style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", borderRadius: 6, padding: "9px 14px", textAlign: "center", border: "1px solid rgba(255,255,255,0.2)" }}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 15, fontWeight: 700, color: "white" }}>{v}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 9, color: "rgba(255,255,255,0.6)", letterSpacing: "0.08em", marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div style={{ background: "var(--navy)", padding: "60px 48px" }} className="cta-form-col">
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", color: "var(--gold)", display: "block", marginBottom: 14 }}>GET IN TOUCH</span>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(24px, 2.6vw, 36px)", fontWeight: 700, color: "white", margin: "0 0 10px", lineHeight: 1.22 }}>
          Let's Build a Space<br />
          <em style={{ color: "var(--teal)", fontStyle: "italic" }}>That Feels Like Yours.</em>
        </h2>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 13.5, color: "rgba(255,255,255,0.5)", margin: "0 0 24px", lineHeight: 1.65 }}>
          Tell us about your space and our team will respond within 2 hours during business hours.
        </p>

        {submitted ? (
          <div style={{ background: "rgba(8,127,91,0.15)", border: "1px solid rgba(8,127,91,0.3)", borderRadius: 6, padding: "28px 24px", textAlign: "center" }}>
            <div style={{ fontSize: 36, marginBottom: 14 }}>✅</div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 600, color: "white", marginBottom: 8 }}>Enquiry Sent!</div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, margin: "0 0 18px" }}>We'll reach out within 2 hours. For faster response, WhatsApp us directly.</p>
            <a href="https://wa.me/910000000000" className="btn-gold btn-mobile-full" style={{ fontSize: 13 }}>Continue on WhatsApp →</a>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="cta-input-row">
              <div><label style={lbl}>Name *</label><input required value={form.name} onChange={update("name")} placeholder="Your name" style={inp} /></div>
              <div><label style={lbl}>WhatsApp *</label><input required value={form.phone} onChange={update("phone")} placeholder="+91 98765 43210" style={inp} /></div>
            </div>
            <div><label style={lbl}>Email</label><input type="email" value={form.email} onChange={update("email")} placeholder="your@email.com" style={inp} /></div>
            <div className="cta-input-row">
              <div>
                <label style={lbl}>Service *</label>
                <select required value={form.type} onChange={update("type")} style={{ ...inp, appearance: "none" as const }}>
                  <option value="">Select service</option>
                  <option>Full Home Interiors</option><option>Modular Kitchen</option>
                  <option>Wardrobe &amp; Storage</option><option>Office Interiors</option>
                  <option>Commercial Interiors</option><option>Material Procurement</option>
                </select>
              </div>
              <div>
                <label style={lbl}>Budget Range *</label>
                <select required value={form.budget} onChange={update("budget")} style={{ ...inp, appearance: "none" as const }}>
                  <option value="">Select range</option>
                  <option>Under ₹5 Lakhs</option><option>₹5 – 10 Lakhs</option>
                  <option>₹10 – 25 Lakhs</option><option>₹25 – 50 Lakhs</option><option>₹50 Lakhs+</option>
                </select>
              </div>
            </div>
            <div><label style={lbl}>Project Details</label><textarea value={form.message} onChange={update("message")} rows={3} placeholder="Describe your space, timeline and any specific requirements..." style={{ ...inp, resize: "vertical" as const }} /></div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 4 }}>
              <button type="submit" className="btn-gold btn-mobile-full" style={{ fontSize: 14 }}>Send Enquiry →</button>
              <a href="https://wa.me/910000000000" className="btn-outline-light btn-mobile-full" style={{ fontSize: 14 }}>WhatsApp Instead</a>
            </div>
          </form>
        )}
      </div>
      <style>{`
        @media (max-width: 900px) {
          .cta-grid { grid-template-columns: 1fr !important; }
          .cta-img-col { min-height: 260px !important; }
          .cta-img-overlay { bottom: 18px !important; left: 16px !important; right: 16px !important; }
          .cta-img-overlay > div:first-child { font-size: 16px !important; margin-bottom: 8px !important; }
          .cta-form-col { padding: 36px 20px 40px !important; }
        }
        @media (max-width: 480px) {
          .cta-form-col { padding: 28px 16px 36px !important; }
        }
      `}</style>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────
function Footer() {
  const [email, setEmail] = useState("")
  const [subDone, setSubDone] = useState(false)

  const FOOTER_COLS = [
    {
      h: "INTERIOR SERVICES",
      links: [
        { label: "Full Home Interiors", href: "#services" },
        { label: "Modular Kitchens", href: "#services" },
        { label: "Wardrobes & Storage", href: "#services" },
        { label: "False Ceilings", href: "#services" },
        { label: "Living & Bedroom", href: "#services" },
        { label: "Office Interiors", href: "#services" },
        { label: "Commercial Interiors", href: "#services" },
      ],
    },
    {
      h: "MATERIALS",
      links: [
        { label: "BWP Plywood", href: "#materials" },
        { label: "BWR Plywood", href: "#materials" },
        { label: "MR Plywood", href: "#materials" },
        { label: "Laminates", href: "#materials" },
        { label: "Natural Veneers", href: "#materials" },
        { label: "Flush Doors", href: "#materials" },
        { label: "Hardware & Fittings", href: "#materials" },
      ],
    },
    {
      h: "COMPANY",
      links: [
        { label: "About KANHA", href: "#about" },
        { label: "Why KANHA", href: "#why" },
        { label: "Our Projects", href: "#projects" },
        { label: "Our Process", href: "#process" },
        { label: "Client Reviews", href: "#reviews" },
        { label: "Brand Partners", href: "#" },
        { label: "Contact Us", href: "#contact" },
      ],
    },
    {
      h: "SUPPORT",
      links: [
        { label: "Book a Consultation", href: "#contact" },
        { label: "Get a Quote", href: "#contact" },
        { label: "WhatsApp Us", href: "https://wa.me/910000000000" },
        { label: "FAQs", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Use", href: "#" },
        { label: "Sitemap", href: "#" },
      ],
    },
  ]

  const SOCIAL = [
    {
      label: "Instagram",
      href: "#",
      icon: (
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/>
          <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
        </svg>
      ),
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/910000000000",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
    },
    {
      label: "YouTube",
      href: "#",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: "#",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
  ]

  return (
    <footer style={{ background: "#181c1a" }}>
      {/* Top gradient bar */}
      <div style={{ height: 4, background: "linear-gradient(to right, var(--navy), var(--peacock), var(--teal), var(--emerald), var(--gold))" }} />

      {/* Newsletter strip */}
      <div style={{ background: "var(--navy)" }} className="footer-newsletter-wrap">
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 600, color: "white", marginBottom: 4 }}>
              Design ideas. Material guides. <em style={{ color: "var(--gold)" }}>In your inbox.</em>
            </div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
              No spam — just curated interior & material insights from the KANHA studio.
            </div>
          </div>
          {subDone ? (
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--teal)", fontWeight: 600 }}>✓ You're subscribed — thank you!</div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSubDone(true) }} className="newsletter-form">
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{ flex: 1, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRight: "none", borderRadius: "3px 0 0 3px", padding: "12px 16px", fontFamily: "var(--font-sans)", fontSize: 13, color: "white", outline: "none" }} />
              <button type="submit" style={{ background: "var(--gold)", border: "none", borderRadius: "0 3px 3px 0", padding: "12px 20px", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: "white", cursor: "pointer", whiteSpace: "nowrap", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#b8880e")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--gold)")}>
                Subscribe →
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main footer body */}
      <div style={{ maxWidth: 1320, margin: "0 auto" }} className="footer-body-wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr repeat(4, 1fr)", gap: 40, paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,0.06)" }} className="footer-main-grid">

          {/* Brand column */}
          <div>
            <img src={kanhaLogo} alt="KANHA" style={{ height: 60, width: "auto", objectFit: "contain", marginBottom: 14, filter: "brightness(1.05)" }} />
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 10.5, letterSpacing: "0.14em", color: "var(--gold)", marginBottom: 12, fontWeight: 600 }}>PLYWOOD · INTERIORS · BEYOND</div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "rgba(255,255,255,0.38)", lineHeight: 1.7, margin: "0 0 24px", maxWidth: 260 }}>
              From selecting the right material to handing over a finished space — every step coordinated by one committed team.
            </p>

            {/* Trust badges */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
              {[
                { icon: "★", text: "5.0 Rating on Google" },
                { icon: "✓", text: "120+ Projects Completed" },
                { icon: "🛡", text: "Quality Assured Materials" },
              ].map(b => (
                <div key={b.text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ color: "var(--gold)", fontSize: 13, width: 16, textAlign: "center" }}>{b.icon}</span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{b.text}</span>
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div style={{ display: "flex", gap: 10 }}>
              {SOCIAL.map(s => (
                <a key={s.label} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" title={s.label}
                  style={{ width: 38, height: 38, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold)"; e.currentTarget.style.background = "rgba(200,155,60,0.1)" }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; e.currentTarget.style.background = "transparent" }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map(col => (
            <div key={col.h}>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 9, fontWeight: 800, letterSpacing: "0.2em", color: "var(--gold)", marginBottom: 18, textTransform: "uppercase" }}>{col.h}</div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map(l => (
                  <li key={l.label}>
                    <a href={l.href}
                      style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, color: "rgba(255,255,255,0.38)", textDecoration: "none", transition: "color 0.2s", display: "flex", alignItems: "center", gap: 6 }}
                      onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.82)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.38)")}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact bar */}
        <div className="footer-contact-bar" style={{ display: "flex", flexWrap: "wrap", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          {[
            { icon: "📞", label: "Call / WhatsApp", value: "+91 98765 43210", href: "tel:+919876543210" },
            { icon: "✉", label: "Email", value: "hello@kanha.in", href: "mailto:hello@kanha.in" },
            { icon: "📍", label: "Studio", value: "Pune, Maharashtra, India", href: "#" },
            { icon: "🕐", label: "Hours", value: "Mon – Sat, 10am – 7pm", href: "#" },
          ].map(c => (
            <a key={c.label} href={c.href} style={{ display: "flex", alignItems: "flex-start", gap: 10, textDecoration: "none" }}>
              <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{c.icon}</span>
              <div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", color: "var(--gold)", marginBottom: 3 }}>{c.label}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, color: "rgba(255,255,255,0.5)" }}>{c.value}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom-bar">
          <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.03em" }}>
            © 2024 KANHA Design Studio. All rights reserved. | Pune, Maharashtra.
          </div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {["Privacy Policy", "Terms of Use", "Sitemap"].map(l => (
              <a key={l} href="#" style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "rgba(255,255,255,0.2)", textDecoration: "none", transition: "color 0.2s", letterSpacing: "0.03em" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .footer-newsletter-wrap { padding: 36px 32px; }
        .footer-body-wrap { padding: 56px 32px 0; }
        .footer-contact-bar { padding: 26px 0; gap: 40px; }
        .footer-bottom-bar { padding: 20px 0 28px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }

        @media (max-width: 1100px) { .footer-main-grid { grid-template-columns: 1fr 1fr 1fr !important; } }
        @media (max-width: 700px) {
          .footer-newsletter-wrap { padding: 28px 20px !important; }
          .footer-body-wrap { padding: 40px 20px 0 !important; }
          .footer-main-grid { grid-template-columns: 1fr 1fr !important; gap: 28px !important; }
          .footer-contact-bar { padding: 20px 0 !important; gap: 18px !important; }
          .footer-bottom-bar { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
        }
        @media (max-width: 480px) { .footer-main-grid { grid-template-columns: 1fr !important; gap: 24px !important; } }
      `}</style>
    </footer>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ minHeight: "100%", background: "var(--ivory)", overflowX: "hidden" }}>
      <Header />
      <main>
        <Hero />
        <RibbonCutting />
        <StatsBar />
        <About />
        <FeaturedProjects />
        <Services />
        <ThreeDStudio />
        <BeforeAfter />
        <Materials />
        <WhyKanha />
        <Process />
        <Testimonials />
        <BrandPartners />
        <Pricing />
        <ConsultationCTA />
      </main>
      <Footer />
    </div>
  )
}
