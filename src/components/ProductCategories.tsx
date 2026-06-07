import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { sectionCards } from "@/data/sectionCards";

export default function ProductCategories() {
  return (
    <section
      id="products"
      className="relative scroll-mt-20 border-t border-white/5 bg-[#0a1628] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            Our Range
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Product Categories
          </h2>
          <p className="mt-4 text-base text-slate-400">
            Seven core categories covering hardware, industrial, and construction supply.
          </p>
        </Reveal>

        {/* Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sectionCards.map((card, i) => (
            <Reveal as="article" key={card.slug} delay={(i % 3) * 0.08}>
              <Link
                href={`/products/${card.slug}`}
                className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-[#0d2244] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-900/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
              >
                {/* Image */}
                <div className="relative aspect-[3/2] w-full overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/20 to-transparent" />
                </div>

                {/* Text */}
                <div className="p-5">
                  <h3 className="flex items-center justify-between text-lg font-semibold text-white">
                    {card.title}
                    <span className="translate-x-0 text-blue-400 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                      <ArrowRightIcon />
                    </span>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {card.description}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}
