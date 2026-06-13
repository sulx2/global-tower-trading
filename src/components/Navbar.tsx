"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { companyInfo } from "@/data/companyInfo";
import { navLinks } from "@/data/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white transition-all duration-200 ${
        scrolled || menuOpen
          ? "border-b border-slate-200 shadow-sm"
          : "border-b border-slate-100"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-20 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center"
          onClick={() => setMenuOpen(false)}
          aria-label={companyInfo.name}
        >
          <span className="flex items-center rounded-xl bg-white px-3 py-1.5 shadow-md ring-1 ring-black/8 md:px-4 md:py-2">
            <span className="relative block h-7 w-28 md:h-9 md:w-36">
              <Image
                src={companyInfo.assets.logo}
                alt={companyInfo.name}
                fill
                sizes="(max-width: 768px) 112px, 144px"
                className="object-contain"
                priority
              />
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-[#0a1628]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-200 transition-all duration-200 hover:bg-blue-700 hover:scale-105"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t border-slate-200 bg-white md:hidden"
          >
            <ul className="space-y-1 px-4 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-[#0a1628]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/#contact"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg bg-blue-600 px-4 py-3.5 text-center text-base font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Get a Quote
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MenuIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
