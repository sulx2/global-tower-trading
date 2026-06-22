"use client";

import Reveal from "@/components/ui/Reveal";
import AnimatedStat from "@/components/ui/AnimatedStat";
import { companyInfo } from "@/data/companyInfo";
import { sectionCards } from "@/data/sectionCards";
import { useLang } from "@/i18n/LanguageProvider";

export default function About() {
  const { t } = useLang();
  return (
    <section
      id="about"
      className="relative scroll-mt-20 border-t border-white/5 bg-[#0a1628] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              {t.about.eyebrow}
            </p>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              {t.about.title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-400">
              {companyInfo.name} {t.about.p1}
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-400">
              {t.about.p2}
            </p>
          </Reveal>

          {/* Stats panel */}
          <Reveal delay={0.15}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0d2244] to-[#0a1628] p-6">
                <AnimatedStat value={sectionCards.length} suffix="+" caption={t.about.statCategories} />
              </div>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0d2244] to-[#0a1628] p-6">
                <AnimatedStat staticValue={t.about.statExperienceValue} caption={t.about.statExperience} />
              </div>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0d2244] to-[#0a1628] p-6">
                <AnimatedStat staticValue={t.about.statSecureValue} caption={t.about.statSecure} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
