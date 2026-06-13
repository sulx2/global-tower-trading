"use client";

import * as React from "react";
import Link from "next/link";
import { Package, Calculator, Ship } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { companyInfo } from "@/data/companyInfo";

interface SmoothScrollVideoHeroProps {
  scrollHeight?: number;
  initialClipPercentage?: number;
  finalClipPercentage?: number;
}

const shortcuts = [
  { Icon: Package,    label: "Products",           tag: "a"    as const, href: "#services"   },
  { Icon: Calculator, label: "Shipping Calculator", tag: "link" as const, href: "/calculator" },
  { Icon: Ship,       label: "Track Shipment",      tag: "link" as const, href: "/track"      },
];

const VideoBackground: React.FC<Required<SmoothScrollVideoHeroProps>> = ({
  scrollHeight,
  initialClipPercentage,
  finalClipPercentage,
}) => {
  const { scrollY } = useScroll();
  const clipStart      = useTransform(scrollY, [0, scrollHeight], [initialClipPercentage, 0]);
  const clipEnd        = useTransform(scrollY, [0, scrollHeight], [finalClipPercentage, 100]);
  const clipPath       = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;
  const scale          = useTransform(scrollY, [0, scrollHeight], [1.1, 1]);
  const contentOpacity = useTransform(scrollY, [0, scrollHeight * 0.5], [1, 0]);

  return (
    <motion.div
      className="sticky top-0 h-screen w-full overflow-hidden bg-[#0a1628]"
      style={{ clipPath, willChange: "clip-path" }}
    >
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, #0a1628 0%, #0d2244 40%, #1e3a5f 70%, #0a1628 100%)" }}
      />
      <motion.video
        autoPlay loop muted playsInline preload="auto"
        style={{ scale, willChange: "transform" }}
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      >
        <source src={companyInfo.assets.heroVideo} type="video/mp4" />
      </motion.video>
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,22,40,0.88) 0%, rgba(13,34,68,0.62) 45%, rgba(10,22,40,0.95) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 65% at 50% 48%, rgba(10,22,40,0.55) 0%, transparent 100%)" }} />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0a1628]/95 to-transparent" />

      <motion.div style={{ opacity: contentOpacity }} className="absolute inset-0">
        <HeroContent />
      </motion.div>
    </motion.div>
  );
};

function HeroContent() {
  return (
    /*
     * absolute inset-0 → fills the sticky container. justify-center centers
     * the content block. Icons replace the old stat-badge row and sit in the
     * normal flex flow, so there is zero overlap risk.
     */
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-5 pt-20 pb-10 text-center sm:px-8 sm:pt-24 sm:pb-14">

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

        {/* ── Service icon shortcuts (replace static stat badges) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-10 flex items-start justify-center gap-8 sm:mt-12 sm:gap-14"
        >
          {shortcuts.map(({ Icon, label, tag, href }, i) => {
            const circle = (
              <motion.span
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.85 + i * 0.12, type: "spring", stiffness: 210, damping: 18 }}
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.93 }}
                className="flex flex-col items-center gap-2.5"
              >
                {/* Pulse ring + icon circle */}
                <span className="relative flex h-14 w-14 items-center justify-center">
                  <motion.span
                    animate={{ scale: [1, 1.85], opacity: [0.3, 0] }}
                    transition={{ duration: 2.3, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full bg-white/30"
                  />
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-xl shadow-black/30 ring-2 ring-white/50">
                    <Icon className="h-6 w-6 text-[#0a1628]" strokeWidth={1.8} />
                  </span>
                </span>
                {/* Label */}
                <span className="max-w-[62px] text-center text-[10px] font-semibold leading-tight text-white/90 sm:max-w-[70px] sm:text-[11px]">
                  {label}
                </span>
              </motion.span>
            );

            return tag === "a" ? (
              <a key={label} href={href} aria-label={label}>
                {circle}
              </a>
            ) : (
              <Link key={label} href={href} aria-label={label}>
                {circle}
              </Link>
            );
          })}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 sm:bottom-7"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1.5 text-white/35"
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
}) => (
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

export default SmoothScrollVideoHero;

function ArrowRightIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
