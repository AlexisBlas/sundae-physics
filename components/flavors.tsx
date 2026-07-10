import Image from "next/image";
import { Reveal, RevealItem } from "./reveal";
import { CherrySVG, SprinkleSVG } from "./toppings";

const FLAVORS = [
  {
    number: "01",
    tag: "Baseline",
    name: "The Control Group",
    description:
      "Vanilla, chocolate, strawberry. Whipped cream, one cherry. The formula every other formula answers to.",
    price: "$8.75",
    wash: "hover:bg-banana/60",
    image: "/flavors/vanilla.png",
    alt: "Vanilla and chocolate scoops under whipped cream, topped with a cherry",
  },
  {
    number: "02",
    tag: "High energy",
    name: "Strawberry Supercollider",
    description:
      "Double strawberry at speed, crushed meringue, freeze-dried berries.",
    price: "$9.25",
    wash: "hover:bg-blush/60",
    image: "/flavors/strawberry.png",
    alt: "Strawberry scoop with whipped cream, sprinkles and a wafer roll",
  },
  {
    number: "03",
    tag: "Dense",
    name: "Chocolate Event Horizon",
    description:
      "Dark chocolate, hot fudge, cocoa crumble. Past the first spoonful, nothing escapes.",
    price: "$9.50",
    wash: "hover:bg-sky/60",
    image: "/flavors/chocolate.png",
    alt: "Dark chocolate scoop under dripping fudge and whipped cream",
  },
  {
    number: "04",
    tag: "Unpredictable",
    name: "Neapolitan Uncertainty",
    description:
      "Three scoops, deliberately unlabeled. You will not know which is which until you taste. That is the point.",
    price: "$8.95",
    wash: "hover:bg-mint/60",
    image: "/flavors/cherry.png",
    alt: "A single cherry and wafer roll against a pale blue sky",
  },
];

function Specimen({
  image,
  alt,
  number,
}: {
  image: string;
  alt: string;
  number: string;
}) {
  return (
    <div className="relative shrink-0">
      {/* Measurement ring */}
      <div className="absolute -inset-2.5 rounded-full border border-dashed border-ink/25 transition-transform duration-700 group-hover:rotate-45" />
      <div className="h-24 w-24 overflow-hidden rounded-full shadow-[0_20px_40px_-18px_rgba(107,74,50,0.45)] ring-4 ring-white/80 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2 md:h-32 md:w-32">
        <Image
          src={image}
          alt={alt}
          width={320}
          height={320}
          className="h-full w-full object-cover"
        />
      </div>
      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[9px] tracking-[0.18em] whitespace-nowrap uppercase shadow-sm">
        Specimen {number}
      </span>
    </div>
  );
}

export function Flavors() {
  return (
    <section id="flavors" className="relative overflow-hidden py-24 md:py-32">
      <CherrySVG className="floaty absolute top-16 right-[6%] hidden w-10 opacity-70 md:block [--r:12deg]" />
      <SprinkleSVG className="floaty absolute bottom-24 left-[4%] hidden w-8 md:block [--d:1.2s] [--r:-30deg]" color="#bcd9ea" />

      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <RevealItem>
            <p className="font-mono text-[11px] tracking-[0.22em] text-fog uppercase">
              Menu — Field results
            </p>
            <h2 className="font-display mt-4 text-4xl font-extrabold tracking-tighter md:text-6xl">
              Four proven formulas.
            </h2>
          </RevealItem>
          <RevealItem className="md:max-w-sm md:pb-2">
            <p className="leading-relaxed text-fog">
              Every split leaves the lab only after repeated testing. These four
              survived peer review.
            </p>
          </RevealItem>
        </Reveal>

        <Reveal className="mt-14 grid grid-cols-1 border-t border-ink/10 md:grid-cols-2 md:gap-x-14">
          {FLAVORS.map((flavor) => (
            <RevealItem key={flavor.name} className="border-b border-ink/10">
              <article
                className={`group flex h-full items-center gap-6 rounded-[2rem] px-8 py-8 transition-colors duration-300 md:gap-8 ${flavor.wash}`}
              >
                <Specimen
                  image={flavor.image}
                  alt={flavor.alt}
                  number={flavor.number}
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-cherry">
                      {flavor.number}
                    </span>
                    <span className="rounded-full bg-white/70 px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase shadow-sm">
                      {flavor.tag}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-2xl font-bold tracking-tight">
                      {flavor.name}
                    </h3>
                    <span className="font-mono text-base font-medium">
                      {flavor.price}
                    </span>
                  </div>
                  <p className="mt-2 leading-relaxed text-ink/70">
                    {flavor.description}
                  </p>
                </div>
              </article>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
