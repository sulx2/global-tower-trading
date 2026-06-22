/**
 * Shared geographic data for the map visuals (China Warehouses + World Shipping).
 *
 * Source: `world-atlas` (Natural Earth 110m, accurate real-world borders) —
 * decoded once here and re-used by both maps so the TopoJSON is bundled into a
 * single shared chunk. No runtime/CDN fetch, no hand-drawn shapes.
 */

import { feature } from "topojson-client";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import type { Topology, GeometryCollection } from "topojson-specification";
import worldData from "world-atlas/countries-110m.json";

interface CountryProps {
  name: string;
}

const topology = worldData as unknown as Topology;

const collection = feature(
  topology,
  topology.objects.countries as GeometryCollection
) as unknown as FeatureCollection<Geometry, CountryProps>;

/** All country features (Natural Earth 110m). */
export const countries = collection.features;

/** Full FeatureCollection — handy for projection `fitExtent` against the world. */
export const worldFeatureCollection = collection;

/** Look up a single country feature by its English name. */
export function getCountryByName(
  name: string
): Feature<Geometry, CountryProps> | undefined {
  return countries.find((f) => f.properties?.name === name);
}

/** China feature — used as the focus of the warehouses map and the flag clip. */
export const chinaFeature = getCountryByName("China");

/** [longitude, latitude] tuple — the order d3-geo projections expect. */
export type LngLat = [number, number];
