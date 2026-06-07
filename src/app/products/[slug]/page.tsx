import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import { sectionCards, getSectionBySlug } from "@/data/sectionCards";
import { getProductsForCategory } from "@/data/products";
import { companyInfo } from "@/data/companyInfo";

/** Pre-render all 7 category pages at build time */
export function generateStaticParams() {
  return sectionCards.map((card) => ({ slug: card.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getSectionBySlug(slug);
  if (!category) return { title: "Product Not Found" };
  return {
    title: category.title,
    description: category.description,
    openGraph: {
      title: `${category.title} | ${companyInfo.name}`,
      description: category.description,
      images: [{ url: category.image }],
    },
  };
}

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getSectionBySlug(slug);
  if (!category) notFound();

  const products = getProductsForCategory(slug);
  const hasProducts = products.length > 0;

  return (
    <>
      {/* ── Category banner ── */}
      <section className="relative h-[55vh] min-h-[360px] w-full overflow-hidden">
        <Image
          src={category.image}
          alt={category.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/80 via-[#0a1628]/65 to-[#0a1628]" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link href="/#products" className="transition-colors hover:text-white">
              Products
            </Link>
            <span>/</span>
            <span className="text-blue-400">{category.title}</span>
          </nav>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {category.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">
            {category.description}
          </p>
        </div>
      </section>

      {/* ── Product grid ── */}
      <section className="bg-[#0a1628] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                Available Products
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {category.title} Range
              </h2>
            </div>
            <p className="text-sm text-slate-500">
              Full specifications available on request.
            </p>
          </Reveal>

          {hasProducts ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((name, i) => (
                <Reveal as="article" key={name} delay={(i % 4) * 0.05}>
                  <div className="group flex h-full items-center gap-3 rounded-xl border border-white/10 bg-gradient-to-br from-[#0d2244] to-[#0a1628] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-900/20">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600/15 text-blue-400 ring-1 ring-blue-500/20">
                      <CubeIcon />
                    </span>
                    <span className="text-sm font-medium text-white">{name}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-[#0d2244]/50 p-10 text-center">
              <p className="text-base text-slate-400">
                Product details will be added soon. Contact us for the latest
                {" "}
                {category.title.toLowerCase()} catalog and pricing.
              </p>
            </div>
          )}

          {/* ── CTA ── */}
          <Reveal className="mt-14">
            <div className="flex flex-col items-center gap-5 rounded-2xl border border-white/10 bg-gradient-to-br from-[#0d2244] to-[#0a1628] p-8 text-center sm:p-10">
              <h3 className="text-2xl font-bold tracking-tight text-white">
                Need {category.title.toLowerCase()}?
              </h3>
              <p className="max-w-xl text-sm text-slate-400">
                Request product details, specifications, and pricing. We&apos;ll
                source the right products and coordinate delivery for your project.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition-all duration-200 hover:scale-105 hover:bg-blue-500"
                >
                  Request Product Details
                </Link>
                <Link
                  href="/#products"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-white/10"
                >
                  All Categories
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function CubeIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}
