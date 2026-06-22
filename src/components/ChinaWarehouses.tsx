"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageProvider";
import type { LngLat } from "@/lib/worldGeo";
import type { MapCity } from "@/components/maps/ChinaWarehousesMap";

/**
 * Warehouse coordinates ([longitude, latitude] — the order d3-geo expects;
 * the source figures were given as lat,long and converted here) plus per-city
 * label placement to keep the two northern cities from overlapping.
 */
const WAREHOUSES: {
  key: "shijiazhuang" | "baoding" | "yiwu" | "guangzhou";
  coords: LngLat;
  dx: number;
  dy: number;
  anchor: "start" | "middle" | "end";
}[] = [
  { key: "shijiazhuang", coords: [114.5149, 38.0428], dx: -14, dy: 6, anchor: "end" },
  { key: "baoding", coords: [115.4646, 38.874], dx: 14, dy: -10, anchor: "start" },
  { key: "yiwu", coords: [120.0745, 29.3117], dx: 14, dy: 2, anchor: "start" },
  { key: "guangzhou", coords: [113.2644, 23.1291], dx: 0, dy: 22, anchor: "middle" },
];

const ChinaWarehousesMap = dynamic(
  () => import("@/components/maps/ChinaWarehousesMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl border border-white/10 bg-[#0b1a30]/50">
        <span className="text-sm text-slate-500">…</span>
      </div>
    ),
  }
);

export default function ChinaWarehouses() {
  const { t } = useLang();

  const cities: MapCity[] = WAREHOUSES.map((w) => ({
    label: t.warehouses.cities[w.key],
    coords: w.coords,
    dx: w.dx,
    dy: w.dy,
    anchor: w.anchor,
  }));

  return (
    <section
      id="warehouses"
      className="relative scroll-mt-20 border-t border-white/5 bg-[#070f1d] py-20 sm:py-24 lg:py-28"
    >
      {/* Background radial accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(13,34,68,0.55) 0%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            {t.warehouses.eyebrow}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t.warehouses.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            {t.warehouses.subtitle}
          </p>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto mt-12 max-w-3xl rounded-3xl border border-white/10 bg-gradient-to-br from-[#0b1a30] to-[#070f1d] p-3 sm:p-6"
        >
          <ChinaWarehousesMap cities={cities} />
        </motion.div>
      </div>
    </section>
  );
}
