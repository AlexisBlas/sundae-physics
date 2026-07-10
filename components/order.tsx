import { Clock, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import { MagneticButton } from "./magnetic-button";
import { Reveal, RevealItem } from "./reveal";
import { CherrySVG } from "./toppings";

const LOCATIONS = [
  {
    lab: "Lab 001",
    address: "448 Orchard Ave, Marfa, TX",
    hours: "Tue–Sun, 12:00–22:00",
  },
  {
    lab: "Lab 002",
    address: "91 Pearl Street, Portland, ME",
    hours: "Wed–Mon, 13:00–23:00",
  },
];

export function Order() {
  return (
    <section id="locations" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-[linear-gradient(120deg,var(--color-blush)_0%,var(--color-sky)_100%)] p-8 shadow-[0_32px_64px_-32px_rgba(107,74,50,0.3)] md:p-16">
          <CherrySVG className="floaty absolute -top-2 right-10 w-12 opacity-80 [--r:-10deg]" />

          <Reveal className="grid grid-cols-1 gap-12 md:grid-cols-[1.2fr_1fr]">
            <RevealItem>
              <p className="font-mono text-[11px] tracking-[0.22em] text-ink/60 uppercase">
                Locations — Open trials
              </p>
              <h2 className="font-display mt-4 text-4xl font-extrabold tracking-tighter md:text-6xl">
                Run your own trial.
              </h2>
              <p className="mt-5 max-w-[46ch] leading-relaxed text-ink/70">
                Two labs. Open late. Walk-ins always welcome — bring your
                appetite and your skepticism.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <MagneticButton
                  href="#locations"
                  className="inline-block rounded-full bg-cherry px-7 py-3.5 font-bold text-white transition-colors duration-300 hover:bg-cherry-deep active:bg-cherry-press"
                >
                  Order ahead
                </MagneticButton>
                <a
                  href="tel:+14322098817"
                  className="flex items-center gap-2 font-medium underline-offset-4 transition-colors duration-300 hover:text-cherry hover:underline"
                >
                  <Phone size={18} weight="bold" />
                  +1 (432) 209-8817
                </a>
              </div>
            </RevealItem>

            <RevealItem className="divide-y divide-ink/10 self-center">
              {LOCATIONS.map((location) => (
                <div key={location.lab} className="py-6 first:pt-0 last:pb-0">
                  <p className="font-mono text-[11px] tracking-[0.22em] text-cherry uppercase">
                    {location.lab}
                  </p>
                  <p className="font-display mt-2 text-xl font-bold tracking-tight">
                    {location.address}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-ink/70">
                    <span className="flex items-center gap-1.5">
                      <Clock size={15} weight="bold" />
                      {location.hours}
                    </span>
                    <a
                      href="#locations"
                      className="flex items-center gap-1.5 font-medium underline-offset-4 transition-colors duration-300 hover:text-cherry hover:underline"
                    >
                      <MapPin size={15} weight="bold" />
                      Get directions
                    </a>
                  </div>
                </div>
              ))}
            </RevealItem>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
