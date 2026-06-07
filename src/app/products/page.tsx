import type { Metadata } from "next";
import ProductCategories from "@/components/ProductCategories";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore our seven product categories — wire mesh, fencing, steel, tools, safety products, nails, fasteners, pipes & valves.",
};

export default function ProductsIndexPage() {
  return (
    <div className="pt-16 md:pt-20">
      <ProductCategories />
    </div>
  );
}
