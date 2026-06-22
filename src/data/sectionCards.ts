/**
 * Product category cards — data-driven source for the homepage
 * ProductCategories grid and the /products/[slug] pages.
 *
 * Images live in /public/assets/images/sections/ (next/image friendly).
 */

export interface SectionCard {
  /** URL slug → /products/[slug] */
  slug: string;
  /** Display title */
  title: string;
  /** Short premium description (1 line) */
  description: string;
  /** Image path under /public */
  image: string;
}

export const sectionCards: SectionCard[] = [
  {
    slug: "wire-mesh-fencing",
    title: "Wire Mesh & Fencing",
    description:
      "Durable mesh and fencing systems for security, agriculture, and construction sites.",
    image: "/assets/images/sections/wire-mesh-fencing.png",
  },
  {
    slug: "farm-tools",
    title: "Farm Tools",
    description:
      "Heavy-duty agricultural and groundwork hand tools built for daily field use.",
    image: "/assets/images/sections/farm-tools.png",
  },
  {
    slug: "iron-wire",
    title: "Iron Wire",
    description:
      "Industrial wire in galvanized, black, and twisted forms for binding and reinforcement.",
    image: "/assets/images/sections/iron-wire.png",
  },
  {
    slug: "safety-products",
    title: "Safety Products",
    description:
      "Certified personal protective equipment for industrial and construction safety.",
    image: "/assets/images/sections/safety-products.png",
  },
  {
    slug: "nails-fasteners",
    title: "Nails & Fasteners",
    description:
      "Complete fixing solutions from drywall nails to bolts, ties, and hinges.",
    image: "/assets/images/sections/nails-fasteners.png",
  },
  {
    slug: "tools-equipment",
    title: "Tools & Equipment",
    description:
      "Professional power tools and material-handling equipment for site productivity.",
    image: "/assets/images/sections/tools-equipment.png",
  },
  {
    slug: "plastic-polymer",
    title: "Plastic & Polymer Materials",
    description:
      "Industrial-grade plastic and polymer materials — PVC compounds, PP sheets, HDPE pipes, and engineered resins for manufacturing, construction, and infrastructure projects.",
    image: "/assets/images/sections/plastic-polymer.png",
  },
  {
    slug: "steel-pipes-valves",
    title: "Steel Pipes & Valves",
    description:
      "Structural pipes, steel products, and industrial flow-control valves.",
    image: "/assets/images/sections/steel-pipes-valves.png",
  },
  {
    slug: "ppgi",
    title: "PPGI Steel Coils",
    description:
      "Pre-painted galvanized steel coils in multiple colors for roofing, cladding, and appliances.",
    image: "/assets/images/sections/ppgi.png",
  },
  {
    slug: "crc",
    title: "CRC Steel Coils",
    description:
      "Cold-rolled steel coils with a smooth, precise finish for fabrication, automotive, and appliances.",
    image: "/assets/images/sections/crc.png",
  },
  {
    slug: "hrc",
    title: "HRC Steel Coils",
    description:
      "Hot-rolled steel coils for structural, fabrication, and heavy industrial applications.",
    image: "/assets/images/sections/hrc.png",
  },
];

/** Helper for category pages */
export function getSectionBySlug(slug: string): SectionCard | undefined {
  return sectionCards.find((c) => c.slug === slug);
}
