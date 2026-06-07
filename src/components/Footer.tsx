import Image from "next/image";
import Link from "next/link";
import { companyInfo } from "@/data/companyInfo";
import { navLinks } from "@/data/navigation";
import { sectionCards } from "@/data/sectionCards";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#070f1d]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">

          {/* Brand */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex" aria-label={companyInfo.name}>
              <span className="flex items-center rounded-xl bg-white px-4 py-2.5 shadow-md">
                <span className="relative block h-9 w-36">
                  <Image
                    src={companyInfo.assets.logo}
                    alt={companyInfo.name}
                    fill
                    sizes="144px"
                    className="object-contain"
                  />
                </span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              International trading partner for hardware, steel, mesh, tools, and
              safety products — providing sourcing, shipping, and supply services
              worldwide.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-blue-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product categories */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Products
            </h3>
            <ul className="space-y-2.5">
              {sectionCards.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/products/${cat.slug}`}
                    className="text-sm text-slate-400 transition-colors hover:text-blue-400"
                  >
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <LocationIcon />
                <span>{companyInfo.contact.location}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <PhoneIcon />
                {companyInfo.availability.phone && companyInfo.links.phone ? (
                  <a href={companyInfo.links.phone} className="transition-colors hover:text-blue-400">
                    {companyInfo.contact.phone}
                  </a>
                ) : (
                  <span>{companyInfo.contact.phone}</span>
                )}
              </li>
              <li className="flex items-start gap-2.5">
                <EmailIcon />
                {companyInfo.availability.email ? (
                  <a href={companyInfo.links.email} className="transition-colors hover:text-blue-400">
                    {companyInfo.contact.email}
                  </a>
                ) : (
                  <span>{companyInfo.contact.email}</span>
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-2 border-t border-white/10 py-6 text-xs text-slate-500 sm:flex-row">
          <p>
            &copy; {year} {companyInfo.name}. All rights reserved.
          </p>
          <p>Oman &amp; China Operations</p>
        </div>
      </div>
    </footer>
  );
}

/* Icons */
function LocationIcon() {
  return (
    <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}
function EmailIcon() {
  return (
    <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
