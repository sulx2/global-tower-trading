import type { Metadata } from "next";
import ProductCategories from "@/components/ProductCategories";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore our eleven product categories — wire mesh, fencing, steel coils, pipes, plastics & polymers, tools, safety products, nails & fasteners.",
};

export default function ProductsIndexPage() {
  return (
    <div className="pt-16 md:pt-20">
      <ProductCategories />
    </div>
  );
}
