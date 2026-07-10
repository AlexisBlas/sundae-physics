type SVGProps = {
  className?: string;
};

export function CherrySVG({ className }: SVGProps) {
  return (
    <svg
      viewBox="0 0 48 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M24 30C24 30 20 14 34 4"
        stroke="#6b4a32"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="24" cy="44" r="16" fill="#e14b5a" />
      <ellipse cx="18" cy="38" rx="5" ry="3.5" fill="#f2949e" transform="rotate(-24 18 38)" />
    </svg>
  );
}

export function SprinkleSVG({ className, color = "#e14b5a" }: SVGProps & { color?: string }) {
  return (
    <svg
      viewBox="0 0 24 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="1" y="1" width="22" height="8" rx="4" fill={color} />
    </svg>
  );
}

export function ScoopTrioSVG({
  className,
  colors = ["#f6e8c4", "#6b4a32", "#eec3d2"],
}: SVGProps & { colors?: [string, string, string] | string[] }) {
  return (
    <svg
      viewBox="0 0 120 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 44C6 50 18 54 60 54C102 54 114 50 114 44"
        stroke="#2e2530"
        strokeOpacity="0.25"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="34" cy="34" r="16" fill={colors[0]} />
      <circle cx="60" cy="28" r="18" fill={colors[1]} />
      <circle cx="87" cy="34" r="16" fill={colors[2]} />
      <path d="M60 12C60 12 59 4 64 1" stroke="#6b4a32" strokeWidth="2" strokeLinecap="round" />
      <circle cx="66" cy="4" r="4" fill="#e14b5a" />
    </svg>
  );
}

/**
 * Blueprint-style schematic of a banana split: dashed strokes,
 * leader lines, and mono annotations. Used in the Method section.
 */
export function SplitSchematic({ className }: SVGProps) {
  const label = {
    fontFamily: "var(--font-mono)",
    fontSize: "9px",
    letterSpacing: "0.14em",
    fill: "var(--color-fog)",
  } as const;
  return (
    <svg
      viewBox="0 0 520 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Schematic diagram of a banana split: two banana halves, three scoops, one cherry, one dish"
    >
      {/* dish */}
      <path
        d="M96 218C96 248 160 264 260 264C360 264 424 248 424 218"
        stroke="var(--color-ink)"
        strokeWidth="2"
        strokeDasharray="6 6"
        strokeLinecap="round"
      />
      <path
        d="M84 206L436 206"
        stroke="var(--color-ink)"
        strokeWidth="2"
        strokeDasharray="6 6"
        strokeLinecap="round"
      />
      {/* banana halves */}
      <path
        d="M110 200C130 156 200 128 260 128C320 128 390 156 410 200"
        stroke="var(--color-cocoa)"
        strokeWidth="2.5"
        strokeDasharray="2 7"
        strokeLinecap="round"
      />
      {/* scoops */}
      <circle cx="192" cy="164" r="38" stroke="var(--color-ink)" strokeWidth="2" strokeDasharray="6 6" />
      <circle cx="260" cy="148" r="42" stroke="var(--color-ink)" strokeWidth="2" strokeDasharray="6 6" />
      <circle cx="328" cy="164" r="38" stroke="var(--color-ink)" strokeWidth="2" strokeDasharray="6 6" />
      {/* cherry */}
      <circle cx="260" cy="88" r="10" fill="var(--color-cherry)" />
      <path d="M262 76C262 76 260 64 270 58" stroke="var(--color-cocoa)" strokeWidth="2" strokeLinecap="round" />
      {/* leader lines + labels */}
      <path d="M260 88L332 66" stroke="var(--color-fog)" strokeWidth="1" />
      <text x="338" y="64" style={label}>
        CHERRY N.001
      </text>
      <path d="M192 132L128 96" stroke="var(--color-fog)" strokeWidth="1" />
      <text x="46" y="90" style={label}>
        SCOOP A / VANILLA
      </text>
      <path d="M260 190L260 232" stroke="var(--color-fog)" strokeWidth="1" />
      <text x="270" y="240" style={label}>
        BANANA, HALVED x2
      </text>
      <path d="M328 132L392 108" stroke="var(--color-fog)" strokeWidth="1" />
      <text x="398" y="106" style={label}>
        SCOOP C / STRAWBERRY
      </text>
      <path d="M96 218L64 240" stroke="var(--color-fog)" strokeWidth="1" />
      <text x="14" y="254" style={label}>
        DISH, GLASS
      </text>
      {/* scale bar */}
      <path d="M420 282L480 282" stroke="var(--color-fog)" strokeWidth="1.5" />
      <path d="M420 277L420 287M480 277L480 287" stroke="var(--color-fog)" strokeWidth="1.5" />
      <text x="428" y="274" style={label}>
        10 CM
      </text>
    </svg>
  );
}
