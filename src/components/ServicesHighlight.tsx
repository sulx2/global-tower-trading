"use client";

import Link from "next/link";
import { Package, Calculator, Ship, ArrowRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useLang } from "@/i18n/LanguageProvider";

const cards = [
  {
    Icon: Package,
    key: "products",
    href: "/#products",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10",
    ctaColor: "text-blue-400 border-blue-400/30 hover:bg-blue-500/10",
    glowColor: "hover:shadow-blue-900/25",
  },
  {
    Icon: Calculator,
    key: "calculator",
    href: "/calculator",
    iconColor: "text-[#4A90D9]",
    iconBg: "bg-[#4A90D9]/10",
    ctaColor: "text-[#4A90D9] border-[#4A90D9]/30 hover:bg-[#4A90D9]/10",
    glowColor: "hover:shadow-[#4A90D9]/20",
  },
  {
    Icon: Ship,
    key: "track",
    href: "/track",
    iconColor: "text-sky-400",
    iconBg: "bg-sky-500/10",
    ctaColor: "text-sky-400 border-sky-400/30 hover:bg-sky-500/10",
    glowColor: "hover:shadow-sky-900/25",
  },
] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const cardVariants: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function ServicesHighlight() {
  const { t } = useLang();
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#060f1e] py-20 sm:py-24"
    >
      {/* Top separator glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
        <div className="h-px w-2/3 bg-gradient-to-r from-transparent via-blue-500/25 to-transparent" />
      </div>

      {/* Background radial */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(13,34,68,0.6) 0%, transparent 100%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="mb-14 text-center sm:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-300 backdrop-blur-sm">
            {t.servicesHighlight.eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t.servicesHighlight.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-400">
            {t.servicesHighlight.subtitle}
          </p>
        </div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6 lg:gap-8"
        >
          {cards.map((card) => {
            const Icon = card.Icon;
            const copy = t.servicesHighlight[card.key];
            return (
              <motion.div
                key={card.key}
                variants={cardVariants}
                className={[
                  "group flex flex-col gap-8 rounded-3xl border border-white/[0.06] p-8 lg:p-10",
                  "bg-gradient-to-br from-[#0d1f3a]/50 to-[#060e1e]/70 backdrop-blur-xl",
                  "transition-all duration-300",
                  "hover:-translate-y-2 hover:border-white/10 hover:shadow-2xl",
                  card.glowColor,
                ].join(" ")}
              >
                {/* Icon */}
                <span
                  className={[
                    "inline-flex h-16 w-16 items-center justify-center rounded-2xl",
                    "transition-transform duration-300 group-hover:scale-110",
                    card.iconBg,
                    card.iconColor,
                  ].join(" ")}
                >
                  <Icon className="h-8 w-8" strokeWidth={1.5} />
                </span>

                {/* Text */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white">{copy.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate-400">{copy.desc}</p>
                </div>

                {/* CTA button */}
                <Link
                  href={card.href}
                  className={[
                    "inline-flex w-fit items-center gap-2.5 rounded-xl border px-6 py-3 text-sm font-semibold",
                    "transition-all duration-200 hover:gap-3.5",
                    card.ctaColor,
                  ].join(" ")}
                >
                  {copy.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
