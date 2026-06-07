import Reveal from "@/components/ui/Reveal";
import AnimatedStat from "@/components/ui/AnimatedStat";
import { companyInfo } from "@/data/companyInfo";

export default function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-20 border-t border-white/5 bg-[#0a1628] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              About Us
            </p>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              A trusted trading partner for industry and construction
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-400">
              {companyInfo.name} connects global manufacturing with clients
              worldwide, with operations based in Oman and sourcing support from
              China. We deliver hardware, steel, mesh, tools, and safety products
              through one reliable supply chain.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-400">
              Our business is built on four pillars — import, export, equipment
              rental, and hardware supply — backed by responsive coordination and
              competitive sourcing.
            </p>
          </Reveal>

          {/* Stats panel */}
          <Reveal delay={0.15}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0d2244] to-[#0a1628] p-6">
                <AnimatedStat value={7} suffix="+" caption="Product Categories" />
              </div>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0d2244] to-[#0a1628] p-6">
                <AnimatedStat staticValue="5+ Years" caption="Industry Experience" />
              </div>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0d2244] to-[#0a1628] p-6">
                <AnimatedStat staticValue="Secure" caption="Guaranteed & Reliable" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
