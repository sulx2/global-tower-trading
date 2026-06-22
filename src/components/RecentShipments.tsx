"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { useLang } from "@/i18n/LanguageProvider";

/**
 * Recent Shipments — real-order media (photos + one loading clip). Card copy is
 * kept in English (specific order descriptions); only the section header is
 * translated, consistent with the rest of the site.
 */
type ShipmentItem =
  | {
      type: "image";
      src: string;
      title: string;
      detail: string;
      caption: string;
    }
  | {
      type: "video";
      src: string;
      title: string;
      detail: string;
      caption: string;
    };

const items: ShipmentItem[] = [
  {
    type: "image",
    src: "/assets/images/shipments/44c6db7c-4f37-42b9-9e51-1e42c95666e9.jpeg",
    title: "Steel Pipe Fittings — Factory Order",
    detail: "Pipe Elbows & Reducers · China",
    caption: "Sourced directly from the manufacturer — inspected and ready for export.",
  },
  {
    type: "image",
    src: "/assets/images/shipments/51834e41-703a-4d44-bf5c-cbc25bec81ad.jpeg",
    title: "Galvanized Steel Coil",
    detail: "Heavy Gauge Coil · Steel Mill, China",
    caption: "Large-format steel coil supplied to client specification, fresh from the rolling mill.",
  },
  {
    type: "image",
    src: "/assets/images/shipments/ecbd6ffa-5eed-428d-bd38-40f0e076742e.jpeg",
    title: "Iron Wire — Ready for Dispatch",
    detail: "Galvanized Wire Coils · Warehouse, China",
    caption: "Palletized and wrapped — client order consolidated and cleared for shipment.",
  },
  {
    type: "image",
    src: "/assets/images/shipments/ece00a08-f1a5-4508-8415-9076d7880afe.jpeg",
    title: "Iron Wire Shipment — Port Loading",
    detail: "Full Vessel Load · Departure Port, China",
    caption: "Bulk iron wire coils loaded and secured on deck for sea freight to Oman.",
  },
  {
    type: "video",
    src: "/assets/videos/shipments/shipment-video.mp4",
    title: "Live Loading Operation",
    detail: "Port Operations · China",
    caption: "Our team coordinating a full shipment load — from warehouse to vessel.",
  },
];

export default function RecentShipments() {
  const { t } = useLang();

  return (
    <section
      id="shipments"
      className="relative scroll-mt-20 border-t border-white/5 bg-[#0a1628] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            {t.shipments.eyebrow}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t.shipments.title}
          </h2>
          <p className="mt-4 text-base text-slate-400">{t.shipments.subtitle}</p>
        </Reveal>

        {/* Grid: 1 col mobile, 2 col desktop */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {items.map((item, i) => (
            <Reveal as="article" key={item.src} delay={(i % 2) * 0.08}>
              <div className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-[#0d2244] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-900/30">
                {/* Media */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#070f1d]">
                  {item.type === "image" ? (
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <video
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="none"
                      aria-label={item.title}
                    >
                      <source src={item.src} type="video/mp4" />
                    </video>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1628]/70 via-transparent to-transparent" />
                </div>

                {/* Text */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold leading-snug text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-blue-400">
                    {item.detail}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {item.caption}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
