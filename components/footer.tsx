import {
  Flask,
  InstagramLogo,
  TiktokLogo,
  XLogo,
} from "@phosphor-icons/react/dist/ssr";
import { NewsletterForm } from "./newsletter-form";

const INDEX_LINKS = [
  { label: "The Experiment", href: "#experiment" },
  { label: "Flavors", href: "#flavors" },
  { label: "Method", href: "#method" },
  { label: "Locations", href: "#locations" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com", Icon: InstagramLogo },
  { label: "TikTok", href: "https://tiktok.com", Icon: TiktokLogo },
  { label: "X", href: "https://x.com", Icon: XLogo },
];

export function Footer() {
  return (
    <footer className="rounded-t-[2.5rem] bg-ink pt-20 pb-10 text-cream">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Flask size={24} weight="bold" className="text-cherry" />
              <span className="font-display text-xl font-extrabold tracking-tight">
                Sundae Physics
              </span>
            </div>
            <p className="mt-4 max-w-[36ch] leading-relaxed text-cream/60">
              Dessert research, est. 2019. Findings published monthly, eaten
              daily.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="rounded-full border border-white/15 p-2.5 transition-colors duration-300 hover:border-cherry hover:text-cherry"
                >
                  <Icon size={18} weight="bold" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer">
            <p className="font-mono text-[11px] tracking-[0.22em] text-cream/60 uppercase">
              Index
            </p>
            <ul className="mt-4 space-y-3">
              {INDEX_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-medium text-cream/80 transition-colors duration-300 hover:text-cherry"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <NewsletterForm />
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-cream/50 md:flex-row md:justify-between">
          <p>© 2026 Sundae Physics LLC. Bananas were harmed, deliciously.</p>
          <p>A fictional brand study by humbol.studio</p>
        </div>
      </div>
    </footer>
  );
}
