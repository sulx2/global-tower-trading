"use client";

import { useMemo } from "react";
import { geoEqualEarth, geoPath, geoInterpolate } from "d3-geo";
import { countries, chinaFeature, type LngLat } from "@/lib/worldGeo";

interface WorldShippingMapProps {
  title: string;
  subtitle?: string;
}

const W = 980;
const H = 480;

const BEIJING: LngLat = [116.4074, 39.9042];

// Primary destination — Oman (gold, emphasised)
const OMAN_PORTS: { name: string; coords: LngLat }[] = [
  { name: "Muscat", coords: [58.3829, 23.588] },
  { name: "Sohar", coords: [56.7094, 24.3417] },
];

// Secondary destinations — "to the world"
const WORLD_DESTS: LngLat[] = [
  [46.6753, 24.7136], // Riyadh
  [55.2708, 25.2048], // Dubai
  [13.405, 52.52], // Berlin
  [-0.1276, 51.5072], // London
  [-74.006, 40.7128], // New York
  [-46.633, -23.55], // São Paulo
  [28.0473, -26.2041], // Johannesburg
  [36.8219, -1.2921], // Nairobi
];

/** SVG path string for a 5-pointed star centred at (cx,cy). */
function star(cx: number, cy: number, r: number, rot = -Math.PI / 2): string {
  const inner = r * 0.382;
  let d = "";
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? r : inner;
    const a = rot + (i * Math.PI) / 5;
    const x = cx + rad * Math.cos(a);
    const y = cy + rad * Math.sin(a);
    d += `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
  }
  return d + "Z";
}

export default function WorldShippingMap({
  title,
  subtitle,
}: WorldShippingMapProps) {
  const data = useMemo(() => {
    const projection = geoEqualEarth().fitExtent(
      [
        [12, 12],
        [W - 12, H - 12],
      ],
      { type: "Sphere" }
    );
    const pathGen = geoPath(projection);

    const countryPaths = countries
      .map((f) => pathGen(f) ?? "")
      .filter(Boolean);

    const chinaPath = chinaFeature ? pathGen(chinaFeature) ?? "" : "";
    const chinaBounds = chinaFeature
      ? pathGen.bounds(chinaFeature)
      : [
          [0, 0],
          [0, 0],
        ];

    // Great-circle arc, split at the antimeridian to avoid wrap-around streaks.
    const arc = (from: LngLat, to: LngLat, n = 50): string => {
      const interp = geoInterpolate(from, to);
      let d = "";
      let prev: [number, number] | null = null;
      for (let k = 0; k <= n; k++) {
        const p = projection(interp(k / n));
        if (!p) {
          prev = null;
          continue;
        }
        if (!prev || Math.abs(p[0] - prev[0]) > W * 0.5) {
          d += `M${p[0].toFixed(1)},${p[1].toFixed(1)}`;
        } else {
          d += `L${p[0].toFixed(1)},${p[1].toFixed(1)}`;
        }
        prev = p;
      }
      return d;
    };

    const primaryLanes = OMAN_PORTS.map((p) => arc(BEIJING, p.coords));
    const secondaryLanes = WORLD_DESTS.map((c) => arc(BEIJING, c));

    const origin = projection(BEIJING) ?? [0, 0];
    const omanPins = OMAN_PORTS.map((p) => ({
      name: p.name,
      xy: projection(p.coords) ?? [0, 0],
    }));
    const worldDots = WORLD_DESTS.map((c) => projection(c) ?? [0, 0]);

    // Chinese-flag star layout, sized to China's bbox (canton in upper-left).
    const [[bx0, by0], [bx1]] = chinaBounds;
    const bw = bx1 - bx0;
    const big = bw * 0.085;
    const small = big * 0.34;
    const cx = bx0 + bw * 0.2;
    const cy = by0 + bw * 0.16;
    const stars = [
      star(cx, cy, big),
      star(cx + big * 1.7, cy - big * 0.7, small),
      star(cx + big * 2.2, cy + big * 0.25, small),
      star(cx + big * 2.0, cy + big * 1.1, small),
      star(cx + big * 1.4, cy + big * 1.7, small),
    ];

    return {
      countryPaths,
      chinaPath,
      chinaBounds,
      primaryLanes,
      secondaryLanes,
      origin,
      omanPins,
      worldDots,
      stars,
    };
  }, []);

  const [[cbx0, cby0], [cbx1, cby1]] = data.chinaBounds;

  return (
    <div className="relative overflow-hidden bg-[#040d1a] pb-2 pt-24 sm:pt-28">
      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(74,122,199,0.14) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      {/* Side + bottom fades */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#040d1a] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#040d1a] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0a1628] to-transparent"
      />

      <div className="relative mx-auto max-w-5xl px-4">
        {/* Title */}
        <div className="mb-8 text-center sm:mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h1>
          {subtitle && <p className="mt-2 text-base text-slate-400">{subtitle}</p>}
        </div>

        {/* World map */}
        <svg
          viewBox={`0 0 ${W} ${H}`}
          xmlns="http://www.w3.org/2000/svg"
          className="block h-auto w-full"
          role="img"
          aria-label="World shipping map — routes from China to Oman and worldwide"
        >
          <defs>
            <filter id="ws-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="3.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <clipPath id="ws-china-clip">
              <path d={data.chinaPath} />
            </clipPath>
          </defs>

          {/* Continents — muted */}
          <g aria-hidden="true">
            {data.countryPaths.map((d, i) => (
              <path
                key={i}
                d={d}
                fill="#0e2138"
                stroke="rgba(74,122,199,0.12)"
                strokeWidth={0.5}
              />
            ))}
          </g>

          {/* China = Chinese flag clipped exactly to China's borders */}
          <g clipPath="url(#ws-china-clip)">
            <rect
              x={cbx0}
              y={cby0}
              width={cbx1 - cbx0}
              height={cby1 - cby0}
              fill="#de2910"
            />
            {data.stars.map((d, i) => (
              <path key={i} d={d} fill="#ffde00" />
            ))}
          </g>
          {/* China outline on top of the flag */}
          <path
            d={data.chinaPath}
            fill="none"
            stroke="rgba(255,222,0,0.55)"
            strokeWidth={0.8}
          />

          {/* Secondary lanes — thin accent, "to the world" */}
          {data.secondaryLanes.map((d, i) => (
            <g key={`s${i}`}>
              <path d={d} fill="none" stroke="rgba(96,165,250,0.18)" strokeWidth={1} />
              <path
                d={d}
                fill="none"
                stroke="rgba(96,165,250,0.85)"
                strokeWidth={1.1}
                strokeLinecap="round"
                strokeDasharray="3 22"
                className="lane-flow"
                style={{ animationDelay: `${i * 0.35}s` }}
              />
            </g>
          ))}

          {/* Primary lanes — bright blue, thick, emphasised (Oman) */}
          {data.primaryLanes.map((d, i) => (
            <g key={`p${i}`}>
              <path d={d} fill="none" stroke="rgba(96,165,250,0.35)" strokeWidth={2.4} />
              <path
                d={d}
                fill="none"
                stroke="#93c5fd"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeDasharray="6 18"
                filter="url(#ws-glow)"
                className="lane-flow"
                style={{ animationDelay: `${i * 0.6}s` }}
              />
            </g>
          ))}

          {/* Secondary destination dots */}
          {data.worldDots.map(([x, y], i) => (
            <circle key={`wd${i}`} cx={x} cy={y} r={2.6} fill="#60a5fa" />
          ))}

          {/* Origin — Beijing */}
          <g transform={`translate(${data.origin[0]} ${data.origin[1]})`}>
            <circle
              r={6}
              fill="none"
              stroke="#ffde00"
              strokeWidth={1.4}
              className="marker-pulse"
            />
            <circle r={3.5} fill="#ffde00" stroke="#7f1d1d" strokeWidth={1} />
          </g>

          {/* Oman ports — blue glowing pins + labels */}
          {data.omanPins.map((p) => (
            <g key={p.name} transform={`translate(${p.xy[0]} ${p.xy[1]})`}>
              <circle
                r={7}
                fill="none"
                stroke="#60a5fa"
                strokeWidth={1.5}
                className="marker-pulse"
              />
              <circle
                r={4.5}
                fill="#60a5fa"
                stroke="#0a1628"
                strokeWidth={1.3}
                filter="url(#ws-glow)"
              />
              <g transform="translate(0 -11)">
                <rect
                  x={-p.name.length * 3.6 - 6}
                  y={-15}
                  width={p.name.length * 7.2 + 12}
                  height={16}
                  rx={5}
                  fill="#040d1a"
                  stroke="rgba(96,165,250,0.5)"
                  strokeWidth={0.8}
                />
                <text
                  x={0}
                  y={-3.5}
                  textAnchor="middle"
                  fontSize={10}
                  fontWeight={700}
                  fill="#bfdbfe"
                >
                  {p.name}
                </text>
              </g>
            </g>
          ))}
        </svg>

        {/* Route label */}
        <p className="mt-1 pb-6 text-center text-[11px] tracking-wider text-slate-600 sm:text-xs">
          Global Shipping Network &nbsp;·&nbsp; China → Oman &amp; Worldwide
        </p>
      </div>
    </div>
  );
}
