"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Ship, Search, MessageCircle, Loader2, CheckCircle, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { companyInfo } from "@/data/companyInfo";
import { useLang } from "@/i18n/LanguageProvider";

// Lazy-loaded world-map visual (decorative only — tracking logic is untouched).
const WorldShippingMap = dynamic(
  () => import("@/components/maps/WorldShippingMap"),
  {
    ssr: false,
    loading: () => <div className="h-[420px] bg-[#040d1a]" />,
  }
);

// ── State machine ────────────────────────────────────────────────────────────
type TrackState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "found";    shipmentStatus: string }
  | { status: "notFound"; message: string }
  | { status: "error" };

// ── Component ────────────────────────────────────────────────────────────────
export default function TrackClient() {
  const { t } = useLang();
  const [orderCode, setOrderCode] = useState("");
  const [state, setState] = useState<TrackState>({ status: "idle" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const code = orderCode.trim();
    if (!code) return;

    setState({ status: "loading" });

    try {
      // Call our own API route — avoids CORS with Google Apps Script
      const res = await fetch(`/api/track?code=${encodeURIComponent(code)}`);
      if (!res.ok) throw new Error("HTTP error");

      const data = await res.json() as
        | { found: true;  status: string }
        | { found: false; message: string };

      if (data.found) {
        setState({ status: "found", shipmentStatus: data.status });
      } else {
        setState({ status: "notFound", message: data.message });
      }
    } catch {
      setState({ status: "error" });
    }
  }

  function reset() {
    setState({ status: "idle" });
  }

  const isLoading  = state.status === "loading";
  const hasResult  = state.status !== "idle" && state.status !== "loading";

  return (
    <div className="min-h-screen bg-[#0a1628]">
      <WorldShippingMap title={t.track.title} subtitle={t.track.subtitle} />

      <div className="mx-auto max-w-lg px-4 py-14 sm:px-6 sm:py-20">

        {/* ── Tracking form card ── */}
        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.03] p-8 backdrop-blur-xl sm:p-10">
          <div className="mb-7 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
              <Ship className="h-5 w-5" strokeWidth={1.6} />
            </span>
            <h2 className="text-xl font-bold text-white">{t.track.heading}</h2>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="order-code"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400"
              >
                {t.track.orderCode}
              </label>
              <input
                id="order-code"
                type="text"
                value={orderCode}
                onChange={(e) => {
                  setOrderCode(e.target.value);
                  if (hasResult) reset();
                }}
                placeholder={t.track.placeholder}
                autoComplete="off"
                disabled={isLoading}
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm text-white placeholder-slate-600 outline-none transition focus:border-sky-500/50 focus:bg-white/[0.08] focus:ring-1 focus:ring-sky-500/30 disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !orderCode.trim()}
              className="flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-900/30 transition-all duration-200 hover:scale-105 hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                  {t.track.tracking}
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" strokeWidth={2} />
                  {t.track.trackNow}
                </>
              )}
            </button>
          </form>

          {/* ── Result area ── */}
          <AnimatePresence mode="wait">

            {/* FOUND */}
            {state.status === "found" && (
              <motion.div
                key="found"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.07] p-5"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 shrink-0 text-emerald-400" strokeWidth={1.8} />
                  <p className="text-sm font-semibold text-white">
                    {t.track.shipmentStatus}{" "}
                    <span className="text-emerald-300">{state.shipmentStatus}</span>
                  </p>
                </div>
              </motion.div>
            )}

            {/* NOT FOUND */}
            {state.status === "notFound" && (
              <motion.div
                key="notFound"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/[0.06] p-5"
              >
                <div className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" strokeWidth={1.8} />
                  <p className="text-sm leading-relaxed text-slate-300">{state.message}</p>
                </div>

                {/* WhatsApp contacts */}
                <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
                  {companyInfo.team.map((member) => (
                    <a
                      key={member.name}
                      href={member.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366]/10 px-5 py-3 text-sm font-semibold text-[#25D366] transition hover:bg-[#25D366]/20"
                    >
                      <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
                      {t.track.whatsapp} {member.name}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}

            {/* NETWORK / SERVER ERROR */}
            {state.status === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/[0.06] p-5"
              >
                <div className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" strokeWidth={1.8} />
                  <p className="text-sm text-slate-300">
                    {t.track.errorReach}{" "}
                    <a
                      href={companyInfo.team[0].whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-sky-400 underline underline-offset-4 hover:text-sky-300"
                    >
                      {t.track.contactWhatsapp}
                    </a>
                    .
                  </p>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Static hint (idle only) */}
          {state.status === "idle" && (
            <p className="mt-6 text-center text-sm text-slate-500">
              {t.track.needUpdate}{" "}
              <a
                href={companyInfo.team[0].whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-sky-400 underline underline-offset-4 transition hover:text-sky-300"
              >
                {t.track.contactUsWhatsapp}
              </a>
            </p>
          )}
        </div>

        {/* Back to home */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-white/[0.06] px-6 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            ← {t.track.backToHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
