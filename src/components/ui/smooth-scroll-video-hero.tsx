"use client";

import * as React from "react";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { companyInfo } from "@/data/companyInfo";

interface SmoothScrollVideoHeroProps {
  /** px of scroll travel before the hero fully expands — default 1100 */
  scrollHeight?: number;
  initialClipPercentage?: number;
  finalClipPercentage?: number;
}

/* ── Video background with scroll clip-path + parallax scale ── */
const VideoBackground: React.FC<Required<SmoothScrollVideoHeroProps>> = ({
  scrollHeight,
  initialClipPercentage,
  finalClipPercentage,
}) => {
  const { scrollY } = useScroll();

  const clipStart = useTransform(scrollY, [0, scrollHeight], [initialClipPercentage, 0]);
  const clipEnd = useTransform(scrollY, [0, scrollHeight], [finalClipPercentage, 100]);
  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;

  const scale = useTransform(scrollY, [0, scrollHeight], [1.1, 1]);
  const contentOpacity = useTransform(scrollY, [0, scrollHeight * 0.5], [1, 0]);

  return (
    <motion.div
      className="sticky top-0 h-screen w-full overflow-hidden bg-[#0a1628]"
      style={{ clipPath, willChange: "clip-path" }}
    >
      {/* Fallback gradient (always behind video) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #0a1628 0%, #0d2244 40%, #1e3a5f 70%, #0a1628 100%)",
        }}
      />

      {/* Background video */}
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster=""
        style={{ scale, willChange: "transform" }}
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      >
        <source src={companyInfo.assets.heroVideo} type="video/mp4" />
      </motion.video>

      {/* Overlay 1 — strong full-screen dark gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,22,40,0.88) 0%, rgba(13,34,68,0.62) 45%, rgba(10,22,40,0.95) 100%)",
        }}
      />

      {/* Overlay 2 — radial darkening concentrated behind text */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 65% at 50% 48%, rgba(10,22,40,0.55) 0%, transparent 100%)",
        }}
      />

      {/* Overlay 3 — top bar keeps navbar area always dark */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0a1628]/95 to-transparent" />

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute inset-0"
      >
        <HeroContent />
      </motion.div>
    </motion.div>
  );
};

function HeroContent() {
  return (
    /*
     * absolute inset-0 → fills the full sticky container so justify-center
     * works correctly. pt-20/pt-24 clears the fixed navbar (h≈64–80px).
     */
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-5 pb-12 pt-20 text-center sm:px-8 sm:pt-24">

      {/* Inner max-width wrapper keeps text from stretching too wide */}
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-300 sm:text-[11px]"
        >
          {companyInfo.name}
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="text-[1.75rem] font-bold leading-[1.12] tracking-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl"
          style={{ textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}
        >
          Global Trading.{" "}
          <span className="text-blue-400">Reliable Supply.</span>{" "}
          Industrial Solutions.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-5 max-w-[16rem] text-sm leading-relaxed text-slate-200 drop-shadow sm:max-w-lg sm:text-base md:max-w-2xl md:text-lg"
        >
          Import, export, equipment rental, and hardware supply for
          construction, industrial, and commercial needs.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 flex w-full max-w-[17rem] flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center"
        >
          <Link
            href="/#products"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition-all duration-200 hover:scale-105 hover:bg-blue-500 sm:w-auto"
          >
            Explore Products
            <ArrowRightIcon />
          </Link>
          <Link
            href="/#contact"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/[0.07] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white/[0.14] sm:w-auto"
          >
            Contact Us
          </Link>
        </motion.div>

        {/* Stats / badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:mt-12 sm:gap-3"
        >
          {["7+ Product Categories", "Global Trading", "Quality Focus"].map((s) => (
            <span
              key={s}
              className="rounded-xl border border-white/15 bg-white/[0.07] px-4 py-2.5 text-[11px] font-semibold text-white shadow-sm backdrop-blur-sm sm:text-sm"
            >
              {s}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint — pinned to the bottom of the sticky container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 sm:bottom-8"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1.5 text-white/40"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <ChevronDownIcon />
        </motion.div>
      </motion.div>
    </div>
  );
}

const SmoothScrollVideoHero: React.FC<SmoothScrollVideoHeroProps> = ({
  scrollHeight = 1100,
  initialClipPercentage = 15,
  finalClipPercentage = 85,
}) => {
  return (
    <section
      style={{ height: `calc(${scrollHeight}px + 100vh)` }}
      className="relative w-full"
      aria-label="Hero"
    >
      <VideoBackground
        scrollHeight={scrollHeight}
        initialClipPercentage={initialClipPercentage}
        finalClipPercentage={finalClipPercentage}
      />
    </section>
  );
};

export default SmoothScrollVideoHero;

function ArrowRightIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}
