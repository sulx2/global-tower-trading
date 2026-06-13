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

  /** Shared contact fields (email + location) */
  contact: {
    email: "globaltower.om@gmail.com",
    location: "Oman / China",
  },

  /**
   * Named team contacts — used by the Contact section, Footer, and
   * the FloatingWhatsApp popup. Add or remove entries here to update
   * every place they appear in the UI.
   */
  team: [
    {
      name: "Ahmed",
      phone: "+968 9494 7565",
      phoneLink: "tel:+96894947565",
      whatsapp: "https://wa.me/96894947565",
    },
    {
      name: "Sultan",
      phone: "+968 7753 9161",
      phoneLink: "tel:+96877539161",
      whatsapp: "https://wa.me/96877539161",
    },
  ],

  /** Feature flags — drive whether contact channels render as live links */
  availability: {
    phone: true,
    whatsapp: true,
    email: true,
  },

  /** Convenience link builders */
  links: {
    email: "mailto:globaltower.om@gmail.com",
  },
} as const;

export type CompanyInfo = typeof companyInfo;
export type TeamMember = (typeof companyInfo.team)[number];
