interface RouteMapVisualProps {
  title: string;
  subtitle?: string;
}

/**
 * Decorative shipping-route header used on /calculator and /track pages.
 * Pure SVG + CSS — no client-side JS needed.
 * ViewBox 0 0 800 200 — Oman at (160,145), China at (640,125).
 */
export default function RouteMapVisual({ title, subtitle }: RouteMapVisualProps) {
  return (
    <div className="relative overflow-hidden bg-[#040d1a] pb-2 pt-24 sm:pt-28">
      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(74,122,199,0.14) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      {/* Side fades */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#040d1a] to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#040d1a] to-transparent" />
      {/* Bottom fade into page bg */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0a1628] to-transparent" />

      <div className="relative mx-auto max-w-4xl px-4">
        {/* Page title */}
        <div className="mb-8 text-center sm:mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-base text-slate-400">{subtitle}</p>
          )}
        </div>

        {/* Route map SVG */}
        <div className="relative">
          <svg
            viewBox="0 0 800 200"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="block w-full"
          >
            <defs>
              <filter id="rmv-glow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Subtle grid lines */}
            {[55, 100, 145].map((y) => (
              <line key={`h${y}`} x1="0" y1={y} x2="800" y2={y} stroke="rgba(74,122,199,0.05)" strokeWidth="1" />
            ))}
            {[160, 320, 480, 640].map((x) => (
              <line key={`v${x}`} x1={x} y1="0" x2={x} y2="200" stroke="rgba(74,122,199,0.05)" strokeWidth="1" />
            ))}

            {/* Dashed arc baseline */}
            <path
              d="M 640 125 Q 400 18 160 145"
              fill="none"
              stroke="rgba(74,144,210,0.14)"
              strokeWidth="1.5"
              strokeDasharray="8 5"
            />

            {/* Animated glowing travel line */}
            <path
              d="M 640 125 Q 400 18 160 145"
              fill="none"
              stroke="rgba(96,165,250,0.9)"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#rmv-glow)"
              strokeDasharray="100 900"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="1000;-1000"
                dur="4s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </path>

            {/* ─ Oman marker @ (160, 145) ─ */}
            <circle cx="160" cy="145" r="5" fill="#60a5fa" />
            <circle cx="160" cy="145" r="11" fill="none" stroke="rgba(96,165,250,0.45)" strokeWidth="1.5">
              <animate attributeName="r"              values="9;21;9"    dur="2.2s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="2.2s" repeatCount="indefinite" />
            </circle>

            {/* ─ China marker @ (640, 125) ─ */}
            <circle cx="640" cy="125" r="5" fill="#60a5fa" />
            <circle cx="640" cy="125" r="11" fill="none" stroke="rgba(96,165,250,0.45)" strokeWidth="1.5">
              <animate attributeName="r"              values="9;21;9"    dur="2.2s" begin="0.8s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="2.2s" begin="0.8s" repeatCount="indefinite" />
            </circle>
          </svg>

          {/* Oman flag — centered at SVG x=160 (20% of 800) */}
          <div
            aria-label="Oman"
            className="pointer-events-none absolute flex flex-col items-center gap-0.5"
            style={{ left: "20%", top: "72.5%", transform: "translate(-50%, -100%)" }}
          >
            <span className="text-xl sm:text-2xl" role="img" aria-label="Oman flag">🇴🇲</span>
            <span className="rounded-md bg-[#040d1a]/85 px-2 py-0.5 text-[10px] font-semibold text-white/90 backdrop-blur-sm sm:text-xs">
              Oman
            </span>
          </div>

          {/* China flag — centered at SVG x=640 (80% of 800) */}
          <div
            aria-label="China"
            className="pointer-events-none absolute flex flex-col items-center gap-0.5"
            style={{ left: "80%", top: "62.5%", transform: "translate(-50%, -100%)" }}
          >
            <span className="text-xl sm:text-2xl" role="img" aria-label="China flag">🇨🇳</span>
            <span className="rounded-md bg-[#040d1a]/85 px-2 py-0.5 text-[10px] font-semibold text-white/90 backdrop-blur-sm sm:text-xs">
              China
            </span>
          </div>
        </div>

        {/* Route label */}
        <p className="mt-1 pb-6 text-center text-[11px] tracking-wider text-slate-600 sm:text-xs">
          Sea Freight Route &nbsp;·&nbsp; China → Oman
        </p>
      </div>
    </div>
  );
}
