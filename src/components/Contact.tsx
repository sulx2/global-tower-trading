import Reveal from "@/components/ui/Reveal";
import { companyInfo } from "@/data/companyInfo";
import type { TeamMember } from "@/data/companyInfo";

export default function Contact() {
  const { contact, availability, links, team } = companyInfo;

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 border-t border-white/5 bg-[#0a1628] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0d2244] to-[#0a1628] p-8 sm:p-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">

            {/* Left: copy + CTA */}
            <Reveal>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                Get In Touch
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Let&apos;s talk supply
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-400">
                Tell us what you need — hardware, steel, mesh, tools, or safety
                products. We&apos;ll source it and coordinate delivery for your
                project.
              </p>

              {availability.email && (
                <a
                  href={links.email}
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition-all duration-200 hover:scale-105 hover:bg-blue-500"
                >
                  Contact Us
                  <ArrowRightIcon />
                </a>
              )}
            </Reveal>

            {/* Right: contact details */}
            <Reveal delay={0.15}>
              <ul className="space-y-3">

                {/* Team members — phone + WhatsApp per person */}
                {availability.phone &&
                  team.map((member: TeamMember) => (
                    <li key={member.name}>
                      <TeamRow member={member} />
                    </li>
                  ))}

                {/* Email */}
                <li>
                  <ContactRow
                    label="Email"
                    value={contact.email}
                    href={availability.email ? links.email : null}
                    icon={<EmailIcon />}
                  />
                </li>

                {/* Location */}
                <li>
                  <ContactRow
                    label="Location"
                    value={contact.location}
                    href={null}
                    icon={<LocationIcon />}
                  />
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Team member row — name, phone number, call + WhatsApp icon buttons */
function TeamRow({ member }: { member: TeamMember }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-colors duration-200 hover:border-blue-500/30">
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/15 text-blue-400 ring-1 ring-blue-500/20">
        <PersonIcon />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs uppercase tracking-wider text-slate-500">
          {member.name}
        </span>
        <span className="block truncate text-sm font-medium text-white">
          {member.phone}
        </span>
      </span>
      {/* Action buttons */}
      <div className="flex shrink-0 gap-2">
        <a
          href={member.phoneLink}
          aria-label={`Call ${member.name}`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/15 text-blue-400 ring-1 ring-blue-500/20 transition-colors hover:bg-blue-600/30"
        >
          <PhoneIcon />
        </a>
        <a
          href={member.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`WhatsApp ${member.name}`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#25D366]/15 text-[#25D366] ring-1 ring-[#25D366]/20 transition-colors hover:bg-[#25D366]/30"
        >
          <WhatsAppIcon />
        </a>
      </div>
    </div>
  );
}

/* Generic contact row (email, location) */
function ContactRow({
  label,
  value,
  href,
  icon,
}: {
  label: string;
  value: string;
  href: string | null;
  icon: React.ReactNode;
}) {
  const inner = (
    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-colors duration-200 hover:border-blue-500/30">
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/15 text-blue-400 ring-1 ring-blue-500/20">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-xs uppercase tracking-wider text-slate-500">
          {label}
        </span>
        <span className="block truncate text-sm font-medium text-white">
          {value}
        </span>
      </span>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
      >
        {inner}
      </a>
    );
  }
  return inner;
}

/* ── Icons ─────────────────────────────────────────────────────── */

function PersonIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}
