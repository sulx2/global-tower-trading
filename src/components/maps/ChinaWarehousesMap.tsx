"use client";

import { useMemo } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { countries, chinaFeature, type LngLat } from "@/lib/worldGeo";

export interface MapCity {
  label: string; // already resolved to the active language
  coords: LngLat; // [lng, lat]
  /** Label offset from the dot, in SVG units. */
  dx: number;
  dy: number;
  anchor: "start" | "middle" | "end";
}

const W = 800;
const H = 600;

/**
 * Accurate, data-driven map of China (Natural Earth borders) with glowing
 * markers + always-visible city labels for each warehouse. Purely client-side.
 */
export default function ChinaWarehousesMap({ cities }: { cities: MapCity[] }) {
  const { chinaPath, contextPaths, points } = useMemo(() => {
    const projection = geoMercator();
    if (chinaFeature) {
      projection.fitExtent(
        [
          [70, 60],
          [W - 70, H - 60],
        ],
        chinaFeature
      );
    }
    const pathGen = geoPath(projection);

    const chinaPath = chinaFeature ? pathGen(chinaFeature) ?? "" : "";
    const contextPaths = countries
      .filter((f) => f.properties?.name !== "China")
      .map((f) => pathGen(f) ?? "")
      .filter(Boolean);

    const points = cities.map((c) => {
      const xy = projection(c.coords);
      return { x: xy?.[0] ?? 0, y: xy?.[1] ?? 0 };
    });

    return { chinaPath, contextPaths, points };
  }, [cities]);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      xmlns="http://www.w3.org/2000/svg"
      className="block h-auto w-full"
      role="img"
      aria-label="Map of our warehouse locations across China"
    >
      <defs>
        <filter id="cw-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="cw-china-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0d2244" />
          <stop offset="100%" stopColor="#0a1628" />
        </linearGradient>
      </defs>

      {/* Neighbouring countries — faint context, clipped by the viewBox */}
      <g aria-hidden="true">
        {contextPaths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="#0b1a30"
            stroke="rgba(74,122,199,0.10)"
            strokeWidth={0.5}
          />
        ))}
      </g>

      {/* China — brand fill with a soft glowing outline */}
      <path
        d={chinaPath}
        fill="url(#cw-china-fill)"
        stroke="#4a7ac7"
        strokeWidth={1.4}
        strokeLinejoin="round"
        filter="url(#cw-glow)"
      />

      {/* City markers + always-on labels */}
      {cities.map((city, i) => {
        const { x, y } = points[i];
        return (
          <g key={city.label} transform={`translate(${x} ${y})`}>
            {/* Pulsing ring */}
            <circle
              r={7}
              fill="none"
              stroke="#60a5fa"
              strokeWidth={1.5}
              className="marker-pulse"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
            {/* Solid dot */}
            <circle r={5} fill="#60a5fa" stroke="#0a1628" strokeWidth={1.5} />
            {/* Label with dark halo for readability on any background */}
            <text
              x={city.dx}
              y={city.dy}
              textAnchor={city.anchor}
              fontSize={17}
              fontWeight={700}
              fill="#e2e8f0"
              stroke="#040d1a"
              strokeWidth={4}
              paintOrder="stroke"
              style={{ dominantBaseline: "middle" }}
            >
              {city.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
