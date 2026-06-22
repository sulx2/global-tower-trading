import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { companyInfo } from "@/data/companyInfo";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://globaltowertrading.com"
  ),
  title: {
    default: `${companyInfo.name} — ${companyInfo.tagline}`,
    template: `%s | ${companyInfo.name}`,
  },
  description:
    "GLOBAL TOWER FOR TRADING — import, export, equipment rental, and hardware supply. Wire mesh, fencing, steel, safety products, nails, fasteners, pipes & valves for worldwide industrial markets.",
  keywords: [
    "hardware supplier Oman",
    "industrial trading Oman",
    "wire mesh supplier UAE",
    "steel pipes valves Oman",
    "construction materials trading",
    "equipment rental Oman",
  ],
  // Favicon / app icons are provided by src/app/icon.png and apple-icon.png
  // (Next.js file convention auto-injects the optimized <link> tags).
  verification: {
    google: "2TqkznWUIU3QecNSTEqGFGpoVWLfwr5qm_ETASo1BDU",
  },
  openGraph: {
    title: companyInfo.name,
    description:
      "Import, export, equipment rental, and hardware supply for construction, industrial, and commercial needs.",
    siteName: companyInfo.name,
    locale: "en_US",
    type: "website",
    images: [{ url: companyInfo.assets.logo }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#0a1628] font-sans text-white antialiased">
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </LanguageProvider>
      </body>
    </html>
  );
}
