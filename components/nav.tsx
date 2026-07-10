import { Flask } from "@phosphor-icons/react/dist/ssr";
import { MagneticButton } from "./magnetic-button";

const LINKS = [
  { label: "The Experiment", href: "#experiment" },
  { label: "Flavors", href: "#flavors" },
  { label: "Method", href: "#method" },
  { label: "Locations", href: "#locations" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-4 z-40 px-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/70 bg-white/70 py-2.5 pr-2.5 pl-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_16px_40px_-20px_rgba(46,37,48,0.25)] backdrop-blur-xl">
        <a href="#experiment" className="flex items-center gap-2.5">
          <Flask size={22} weight="bold" className="text-cherry" />
          <span className="font-display text-lg font-extrabold tracking-tight">
            Sundae Physics
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] font-medium tracking-[0.18em] text-fog uppercase transition-colors duration-300 hover:text-cherry"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <MagneticButton
          href="#locations"
          className="inline-block rounded-full bg-cherry px-5 py-2.5 text-sm font-bold text-white transition-colors duration-300 hover:bg-cherry-deep active:bg-cherry-press"
        >
          Run a Trial
        </MagneticButton>
      </div>
    </header>
  );
}
