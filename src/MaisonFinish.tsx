
import { useEffect, useRef, useState } from 'react'
import './MaisonFinish.css'
import './MaisonWordmark.css'

export function MaisonAtmosphere() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px 100px 0px' }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`mf-signature ${visible ? 'mf-signature-visible' : ''}`}
      aria-labelledby="mf-signature-title"
    >
      <div className="mf-signature-inner">
        <div className="mf-signature-top">
          <span>04 / THE MAISON SIGNATURE</span>
          <span>AN INVITATION TO STAY</span>
        </div>

        <div className="mf-signature-content">
          <span className="mf-signature-index">M / 04</span>

          <p className="mf-signature-eyebrow">
            SOME MOMENTS ARE MEANT TO LAST
          </p>

          <h2 id="mf-signature-title">
            <span>Made for</span>
            <span>
              <em>the moments</em>
            </span>
            <span>that matter.</span>
          </h2>

          <div className="mf-signature-motion" aria-hidden="true">
            <span className="mf-signature-motion-line" />
            <span className="mf-signature-motion-point" />
          </div>

          <div className="mf-signature-details">
            <p>
              More than a dinner.
              <br />
              A memory in the making.
            </p>

            <a href="#reservation">
              YOUR TABLE AWAITS <span>↗</span>
            </a>
          </div>
        </div>

        <div className="mf-signature-bottom">
          <span>MAISON — CONTEMPORARY FINE DINING</span>
          <span>THE ART OF BEING PRESENT</span>
        </div>
      </div>
    </section>
  )
}

export function MaisonFooter() {
  const footerRef = useRef<HTMLElement | null>(null)
  const wordmarkRef = useRef<HTMLAnchorElement | null>(null)
  const [visible, setVisible] = useState(false)
  const [wordmarkVisible, setWordmarkVisible] = useState(false)

  useEffect(() => {
    const element = footerRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.08 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const element = wordmarkRef.current
    if (!element) return

    if (!('IntersectionObserver' in window)) {
      setWordmarkVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWordmarkVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.5,
        rootMargin: '0px 0px -40px 0px'
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <footer
      ref={footerRef}
      className={`mf-footer ${visible ? 'mf-footer-visible' : ''}`}
      id="contact"
      style={{
        display: 'block',
        padding: 0,
        borderTop: 'none',
        letterSpacing: 'normal'
      }}
    >
      <div className="mf-footer-inner">
        <div className="mf-footer-top">
          <div>
            <span className="mf-footer-eyebrow">
              YOUR EVENING STARTS HERE
            </span>

            <h2>
              Stay a little
              <br />
              <em>longer.</em>
            </h2>
          </div>

          <a className="mf-footer-reserve" href="#reservation">
            RESERVE YOUR TABLE
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="mf-footer-divider" />

        <div className="mf-footer-grid">
          <div className="mf-footer-about">
            <span className="mf-footer-small-title">
              THE MAISON PHILOSOPHY
            </span>

            <p>
              An intimate dining experience where every
              detail is designed to be remembered.
            </p>
          </div>

          <nav
            className="mf-footer-links"
            aria-label="Footer navigation"
          >
            <span className="mf-footer-small-title">
              EXPLORE
            </span>

            <a href="#home">HOME ↗</a>
            <a href="#about">OUR STORY ↗</a>
            <a href="#menu">THE MENU ↗</a>
            <a href="#experience">THE EXPERIENCE ↗</a>
            <a href="#reservation">RESERVATIONS ↗</a>
          </nav>

          <div className="mf-footer-contact">
            <span className="mf-footer-small-title">
              GET IN TOUCH
            </span>

            <a href="mailto:hello@maison.example">
              hello@maison.example ↗
            </a>

            <span>AN EDITORIAL DINING CONCEPT</span>
            <span>EST. 2026</span>
          </div>
        </div>

        <a
          ref={wordmarkRef}
          className={`mf-footer-wordmark ${
            wordmarkVisible ? 'mf-wordmark-animate' : ''
          }`}
          href="#home"
          aria-label="MAISON, back to top"
        >
          MAISON.
        </a>

        <div className="mf-footer-bottom">
          <span>© 2026 MAISON. ALL RIGHTS RESERVED.</span>
          <span>FINE DINING, REIMAGINED.</span>
          <a href="#home">BACK TO TOP ↑</a>
        </div>

        <p className="mf-demo-note">
          MAISON is a fictional restaurant concept created
          as a frontend portfolio project. Reservations are
          for demonstration only.
        </p>
      </div>
    </footer>
  )
}

export function MaisonEffects() {
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(true)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    let frame = 0

    const update = () => {
      if (frame) return

      frame = window.requestAnimationFrame(() => {
        const max =
          document.documentElement.scrollHeight -
          window.innerHeight

        setProgress(
          max > 0
            ? Math.min(100, Math.max(0, (window.scrollY / max) * 100))
            : 0
        )

        frame = 0
      })
    }

    update()

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const closeTimer = window.setTimeout(
      () => setClosing(true),
      reduceMotion ? 100 : 900
    )

    const removeTimer = window.setTimeout(
      () => setLoading(false),
      reduceMotion ? 150 : 1450
    )

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      window.cancelAnimationFrame(frame)
      window.clearTimeout(closeTimer)
      window.clearTimeout(removeTimer)
    }
  }, [])

  return (
    <>
      <div
        className="mf-scroll-progress"
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        style={{ transform: `scaleX(${progress / 100})` }}
      />

      {loading && (
        <div
          className={`mf-loader ${closing ? 'mf-loader-exit' : ''}`}
          aria-hidden="true"
        >
          <div className="mf-loader-content">
            <span className="mf-loader-brand">
              MAISON<span>.</span>
            </span>

            <span className="mf-loader-subtitle">
              MORE THAN A TABLE
            </span>

            <span className="mf-loader-line" />
          </div>
        </div>
      )}
    </>
  )
}
