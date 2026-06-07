/**
 * Central source of truth for all company information.
 * Source: public/assets/documents/contact-info.txt + Brochure.pdf
 *
 * IMPORTANT: Do not hardcode company name / contact details inside components.
 * Always import from here.
 */

export const companyInfo = {
  name: "GLOBAL TOWER FOR TRADING",
  tagline: "Global Trading. Reliable Supply. Industrial Solutions.",

  /** Branding assets served from /public */
  assets: {
    logo: "/assets/logo/logo.png",
    heroVideo: "/assets/videos/hero-video.mp4",
  },

  /**
   * Contact details. Phone & WhatsApp are placeholders ("Coming soon") until
   * the client confirms the public number. Components must check the matching
   * `available` flags before rendering links.
   */
  contact: {
    phone: "+968 94947565",
    whatsapp: "+968 94947565",
    email: "Aljabri0999@gmail.com",
    location: "Oman / China",
  },

  /** Feature flags — drive whether a contact channel renders as a live link */
  availability: {
    phone: true,
    whatsapp: true,
    email: true,
  },

  /**
   * Convenience link builders. Only use when the matching availability flag is
   * true. The whatsapp number must be digits only (no +, spaces) when enabled.
   */
  links: {
    phone: "tel:+96894947565",
    whatsapp: "https://wa.me/96894947565",
    email: "mailto:Aljabri0999@gmail.com",
  },
} as const;

export type CompanyInfo = typeof companyInfo;
