"use client";

import Reveal from "@/components/ui/Reveal";
import { useLang } from "@/i18n/LanguageProvider";

const coreServices = [
  { key: "import", icon: <ImportIcon /> },
  { key: "export", icon: <ExportIcon /> },
  { key: "rental", icon: <RentalIcon /> },
  { key: "supply", icon: <SupplyIcon /> },
] as const;

export default function Services() {
  const { t } = useLang();
  const supporting = [t.services.sourcing, t.services.coordination, t.services.delivery];
  return (
    <section
      id="services"
      className="relative scroll-mt-20 border-t border-white/5 bg-[#070f1d] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            {t.services.eyebrow}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t.services.title}
          </h2>
          <p className="mt-4 text-base text-slate-400">
            {t.services.subtitle}
          </p>
        </Reveal>

        {/* Core service cards */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {coreServices.map((service, i) => (
            <Reveal as="article" key={service.key} delay={i * 0.08}>
              <div className="group h-full rounded-2xl border border-white/10 bg-gradient-to-br from-[#0d2244] to-[#0a1628] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-900/20">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/15 text-blue-400 ring-1 ring-blue-500/20 transition-colors group-hover:bg-blue-600/25">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {t.services[service.key].title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {t.services[service.key].desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Supporting points */}
        <Reveal className="mt-10" delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm text-slate-500">{t.services.alsoOffering}</span>
            {supporting.map((point) => (
              <span
                key={point}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-slate-300"
              >
                {point}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* Icons */
function ImportIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
    </svg>
  );
}
function ExportIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V9m0 0l-4 4m4-4l4 4M4 7V5a2 2 0 012-2h12a2 2 0 012 2v2" />
    </svg>
  );
}
function RentalIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13l2-5h11l3 4h2v4h-2m-3 0H8m-5 0h2m0 0a2 2 0 104 0 2 2 0 00-4 0zm10 0a2 2 0 104 0 2 2 0 00-4 0z" />
    </svg>
  );
}
function SupplyIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}
