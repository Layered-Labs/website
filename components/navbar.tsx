"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Research", href: "#research" },
  { label: "GitHub", href: "https://github.com/layered-labs", external: true },
]

function scrollTo(href: string) {
  if (href.startsWith("#")) {
    const el = document.querySelector(href)
    if (el && window.__lenis) {
      window.__lenis.scrollTo(el as HTMLElement, { duration: 1.2 })
    } else if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  } else {
    window.open(href, "_blank", "noopener,noreferrer")
  }
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 transition-all duration-300"
        style={{
          background: scrolled || menuOpen ? "rgba(0,0,0,0.80)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
          borderBottom: scrolled || menuOpen ? "1px solid rgba(255,255,255,0.05)" : "none",
        }}
      >
        {/* Wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.__lenis?.scrollTo(0, { duration: 1.2 })
          }}
          className="flex items-center gap-4"
        >
          <Image src="/logo2.svg" alt="Layered Labs" width={16} height={16} />
          <span className="flex items-baseline gap-[0.40em]">
            <span
              className="text-lg text-white"
              style={{ fontFamily: "var(--font-satoshi)", fontWeight: 300 }}
            >
              Layered
            </span>

            <span
              className="text-lg text-white"
              style={{ fontFamily: "var(--font-editors)", fontStyle: "italic", fontWeight: 400 }}
            >
              Labs
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                if (!link.external) {
                  e.preventDefault()
                  scrollTo(link.href)
                }
              }}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-xs tracking-widest text-white uppercase transition-opacity hover:opacity-70"
              style={{ fontFamily: "var(--font-satoshi)", fontWeight: 300 }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:hello@layeredlabs.ai"
            className="rounded-full border border-white/20 px-4 py-1.5 text-xs tracking-widest text-white uppercase transition-all hover:border-white/50"
            style={{ fontFamily: "var(--font-satoshi)", fontWeight: 300 }}
          >
            Contact
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className="block h-px w-5 bg-white transition-all duration-300"
            style={{ transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none" }}
          />
          <span
            className="block h-px w-5 bg-white transition-all duration-300"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block h-px w-5 bg-white transition-all duration-300"
            style={{ transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none" }}
          />
        </button>
      </header>

      {/* Mobile menu overlay */}
      <div
        className="fixed inset-0 z-40 flex flex-col justify-center items-center gap-8 md:hidden transition-all duration-300"
        style={{
          background: "rgba(0,0,0,0.95)",
          backdropFilter: "blur(16px)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => {
              if (!link.external) {
                e.preventDefault()
                setMenuOpen(false)
                setTimeout(() => scrollTo(link.href), 50)
              } else {
                setMenuOpen(false)
              }
            }}
            {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="text-2xl tracking-widest text-white uppercase"
            style={{ fontFamily: "var(--font-satoshi)", fontWeight: 200 }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="mailto:hello@layeredlabs.ai"
          onClick={() => setMenuOpen(false)}
          className="text-2xl tracking-widest text-white uppercase"
          style={{ fontFamily: "var(--font-satoshi)", fontWeight: 200 }}
        >
          Contact
        </a>
      </div>
    </>
  )
}
