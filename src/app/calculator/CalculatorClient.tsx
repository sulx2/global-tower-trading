"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, ChevronDown, ChevronUp, Phone, MessageCircle, Info, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { companyInfo } from "@/data/companyInfo";
import RouteMapVisual from "@/components/ui/RouteMapVisual";
import { useLang } from "@/i18n/LanguageProvider";

// ── Pricing tiers ─────────────────────────────────────────────
const TIERS = [
  { min: 0.01, max: 0.10, price: 7,  label: "0.01 – 0.10" },
  { min: 0.11, max: 0.20, price: 13, label: "0.11 – 0.20" },
  { min: 0.21, max: 0.30, price: 20, label: "0.21 – 0.30" },
  { min: 0.31, max: 0.40, price: 26, label: "0.31 – 0.40" },
  { min: 0.41, max: 0.50, price: 33, label: "0.41 – 0.50" },
  { min: 0.51, max: 0.60, price: 39, label: "0.51 – 0.60" },
  { min: 0.61, max: 0.70, price: 46, label: "0.61 – 0.70" },
  { min: 0.71, max: 0.80, price: 52, label: "0.71 – 0.80" },
  { min: 0.81, max: 0.95, price: 62, label: "0.81 – 0.95" },
];

function getPrice(cbm: number): { price: number; formula: boolean; tierIdx: number } {
  for (let i = 0; i < TIERS.length; i++) {
    const t = TIERS[i];
    if (cbm >= t.min && cbm <= t.max) return { price: t.price, formula: false, tierIdx: i };
  }
  // Above 0.95
  return { price: Math.ceil(cbm * 65), formula: true, tierIdx: TIERS.length };
}

// ── Input field ────────────────────────────────────────────────
function Field({
  label, value, onChange, placeholder = "0",
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</label>
      <input
        type="number"
        min="0"
        step="any"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-slate-600 outline-none ring-0 transition focus:border-blue-500/50 focus:bg-white/[0.08] focus:ring-1 focus:ring-blue-500/30"
      />
    </div>
  );
}

// ── Result row ─────────────────────────────────────────────────
function ResultRow({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <span className="text-sm text-slate-400">{label}</span>
      <span className={`text-right text-sm font-semibold ${accent ? "text-blue-300" : "text-white"}`}>
        {value}
      </span>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────
export default function CalculatorClient() {
  const { t } = useLang();
  const [length, setLength]   = useState("");
  const [width,  setWidth]    = useState("");
  const [height, setHeight]   = useState("");
  const [weight, setWeight]   = useState("");
  const [result, setResult]   = useState<{
    volume: number; volWeight: number | null; billable: number; price: number; formula: boolean; tierIdx: number;
  } | null>(null);
  const [contactOpen, setContactOpen] = useState(false);

  function calculate() {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);
    if (!l || !w || !h || l <= 0 || w <= 0 || h <= 0) return;

    const volume    = (l * w * h) / 1_000_000;
    const volWeight = weight && parseFloat(weight) > 0 ? parseFloat(weight) / 500 : null;
    const billable  = volWeight !== null ? Math.max(volume, volWeight) : volume;
    const { price, formula, tierIdx } = getPrice(billable);

    setResult({ volume, volWeight, billable, price, formula, tierIdx });
  }

  function reset() {
    setLength(""); setWidth(""); setHeight(""); setWeight(""); setResult(null);
  }

  return (
    <div className="min-h-screen bg-[#0a1628]">
      <RouteMapVisual title={t.calculator.title} subtitle={t.calculator.subtitle} />

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">

        {/* ── CBM Calculator Card ── */}
        <section className="rounded-3xl border border-white/[0.07] bg-white/[0.03] p-7 backdrop-blur-xl sm:p-9">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <Calculator className="h-5 w-5" strokeWidth={1.6} />
            </span>
            <h2 className="text-xl font-bold text-white">{t.calculator.cbmCalculator}</h2>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Field label={t.calculator.length} value={length} onChange={setLength} />
            <Field label={t.calculator.width}  value={width}  onChange={setWidth}  />
            <Field label={t.calculator.height} value={height} onChange={setHeight} />
            <Field label={t.calculator.weight} value={weight} onChange={setWeight} placeholder={t.calculator.optional} />
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={calculate}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition-all duration-200 hover:scale-105 hover:bg-blue-500"
            >
              <Calculator className="h-4 w-4" strokeWidth={2} />
              {t.calculator.calculate}
            </button>
            {result && (
              <button
                onClick={reset}
                className="rounded-xl border border-white/10 px-6 py-3 text-sm font-semibold text-slate-400 transition hover:border-white/20 hover:text-white"
              >
                {t.calculator.reset}
              </button>
            )}
          </div>

          {/* Results */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.35 }}
                className="mt-7 divide-y divide-white/[0.06] rounded-2xl border border-white/[0.08] bg-white/[0.04] px-6 py-2"
              >
                <ResultRow label={t.calculator.actualVolume}    value={`${result.volume.toFixed(4)} CBM`} />
                <ResultRow
                  label={t.calculator.volumetricWeight}
                  value={result.volWeight !== null ? `${result.volWeight.toFixed(4)} CBM` : t.calculator.notProvided}
                />
                <ResultRow label={t.calculator.billableCbm}     value={`${result.billable.toFixed(4)} CBM`} />
                <ResultRow
                  label={t.calculator.estimatedPrice}
                  value={result.formula ? `${result.price} OMR  (${result.billable.toFixed(3)} × 65)` : `${result.price} OMR`}
                  accent
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Professional note */}
          <div className="mt-7 rounded-2xl border border-blue-500/15 bg-blue-500/[0.05] p-5">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-relaxed text-slate-300">
                  {t.calculator.note}
                </p>
                <button
                  onClick={() => setContactOpen((v) => !v)}
                  className="mt-3 flex items-center gap-2 text-sm font-semibold text-blue-400 transition-colors hover:text-blue-300"
                >
                  <Users className="h-4 w-4" />
                  {t.calculator.contactTeam}
                  {contactOpen
                    ? <ChevronUp className="h-4 w-4" />
                    : <ChevronDown className="h-4 w-4" />
                  }
                </button>

                <AnimatePresence>
                  {contactOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 space-y-3">
                        {companyInfo.team.map((member) => (
                          <div
                            key={member.name}
                            className="flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 py-3.5"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-white">{member.name}</p>
                              <p className="text-xs text-slate-500">{member.phone}</p>
                            </div>
                            <div className="flex gap-2">
                              <a
                                href={member.phoneLink}
                                aria-label={`Call ${member.name}`}
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] text-slate-300 transition hover:bg-white/10 hover:text-white"
                              >
                                <Phone className="h-4 w-4" strokeWidth={1.8} />
                              </a>
                              <a
                                href={member.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`WhatsApp ${member.name}`}
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#25D366]/10 text-[#25D366] transition hover:bg-[#25D366]/20"
                              >
                                <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* ── Pricing Table ── */}
        <section className="mt-8 rounded-3xl border border-white/[0.07] bg-white/[0.03] p-7 backdrop-blur-xl sm:p-9">
          <h2 className="mb-5 text-xl font-bold text-white">{t.calculator.priceTable}</h2>
          <p className="mb-5 text-sm text-slate-500">{t.calculator.ratesApply}</p>

          <div className="overflow-hidden rounded-2xl border border-white/[0.07]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.07] bg-white/[0.04]">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">{t.calculator.cbmRange}</th>
                  <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">{t.calculator.priceColumn}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {TIERS.map((tier, i) => {
                  const isActive = result && !result.formula && result.tierIdx === i;
                  return (
                    <tr
                      key={tier.label}
                      className={`transition-colors ${isActive ? "bg-blue-600/15" : "hover:bg-white/[0.025]"}`}
                    >
                      <td className={`px-5 py-3.5 font-mono ${isActive ? "text-blue-300 font-semibold" : "text-slate-300"}`}>
                        {tier.label}
                      </td>
                      <td className={`px-5 py-3.5 text-right font-semibold ${isActive ? "text-blue-300" : "text-white"}`}>
                        {tier.price} OMR
                      </td>
                    </tr>
                  );
                })}
                {/* Above 0.95 row */}
                <tr className={`transition-colors ${result?.formula ? "bg-blue-600/15" : "hover:bg-white/[0.025]"}`}>
                  <td className={`px-5 py-3.5 font-mono ${result?.formula ? "text-blue-300 font-semibold" : "text-slate-300"}`}>
                    {t.calculator.above}
                  </td>
                  <td className={`px-5 py-3.5 text-right font-semibold ${result?.formula ? "text-blue-300" : "text-white"}`}>
                    {t.calculator.formulaRow}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {result && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center text-sm font-semibold text-blue-300"
            >
              {t.calculator.yourBillable}: {result.billable.toFixed(4)} → {t.calculator.estPriceShort}: {result.price} OMR
            </motion.p>
          )}
        </section>

        {/* Back to home */}
        <div className="mt-10 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-white/[0.06] px-6 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            ← {t.calculator.backToHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
