"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/servizi/marketing-digitale", label: "Marketing" },
  { href: "/servizi/automazione-ai", label: "AI Automation" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/chi-sono", label: "Chi sono" },
  { href: "/agenzie", label: "Agenzie" },
  { href: "/risorse/bandi-digitalizzazione-romagna", label: "Bandi" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-bg/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-lv.png"
            alt="Luca Vizza"
            width={52}
            height={58}
            priority
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm text-primary/70 hover:text-primary transition-colors duration-200"
                style={{ fontFamily: "Sailors, Georgia, serif" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/audit"
            className="px-4 py-2 rounded-full bg-gradient-to-br from-[#ee826d] to-[#c8582e] text-white text-sm font-bold hover:from-[#d4602a] hover:to-[#b84d24] transition-colors"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Calcolatore gratuito
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-primary transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-primary transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-primary transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-bg/98 backdrop-blur-sm border-t border-primary/10 px-6 py-6"
          >
            <ul className="flex flex-col gap-4">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-lg text-primary hover:text-coral transition-colors"
                    style={{ fontFamily: "Sailors, Georgia, serif" }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/audit"
                  className="inline-block px-6 py-3 rounded-full bg-gradient-to-br from-[#ee826d] to-[#c8582e] text-white font-bold hover:from-[#d4602a] hover:to-[#b84d24] transition-colors"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                  onClick={() => setMenuOpen(false)}
                >
                  Calcolatore gratuito
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
