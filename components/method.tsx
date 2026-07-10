import { Reveal, RevealItem } from "./reveal";
import { SplitSchematic } from "./toppings";

const STEPS = [
  {
    number: "01",
    label: "Hypothesis",
    title: "What if more?",
    body: "Every experiment starts with a banana at peak ripeness and a hunch that dessert can go further.",
    chips: ["Ripeness 6.8 / 10", "Sample mass 118 g"],
  },
  {
    number: "02",
    label: "Experiment",
    title: "Load. Layer. Detonate.",
    body: "Three scoops are placed under whipped-cream pressure. Toppings are applied at speed. The structure holds — briefly.",
    chips: ["Scoops x3", "Application 3.2 m/s"],
  },
  {
    number: "03",
    label: "Observation",
    title: "Record the findings.",
    body: "The sample is consumed in full. Notes are compared. The experiment repeats until certainty — or seconds — run out.",
    chips: ["Trials 1,204", "Confidence 98.2%"],
  },
];

export function Method() {
  return (
    <section id="method" className="border-y border-ink/5 bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <RevealItem>
            <p className="font-mono text-[11px] tracking-[0.22em] text-fog uppercase">
              Process — The method
            </p>
            <h2 className="font-display mt-4 max-w-xl text-4xl font-extrabold tracking-tighter md:text-6xl">
              Rigorously unserious.
            </h2>
          </RevealItem>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-2">
          <Reveal className="md:sticky md:top-32 md:self-start">
            <RevealItem>
              <SplitSchematic className="w-full max-w-xl" />
              <p className="mt-4 font-mono text-[10px] tracking-[0.2em] text-fog uppercase">
                Fig. 1 — Standard split, exploded view pending
              </p>
            </RevealItem>
          </Reveal>

          <Reveal className="flex flex-col gap-12">
            {STEPS.map((step) => (
              <RevealItem key={step.number} className="border-t border-ink/10 pt-8">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-cherry">{step.number}</span>
                  <span className="font-mono text-[11px] tracking-[0.22em] text-fog uppercase">
                    {step.label}
                  </span>
                </div>
                <h3 className="font-display mt-4 text-2xl font-bold tracking-tight md:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[52ch] leading-relaxed text-fog">{step.body}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {step.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-ink/10 bg-cream px-3 py-1.5 font-mono text-[10px] tracking-[0.16em] uppercase"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
