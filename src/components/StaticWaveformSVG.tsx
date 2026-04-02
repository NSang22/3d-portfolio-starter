import { DOMAIN_COLORS } from "@/data/domainColors";

const streams = [
  {
    key: "biomedical",
    label: "BIOMEDICAL",
    color: DOMAIN_COLORS.biomedical,
    y: 25,
    points:
      "0,25 80,25 100,15 120,35 140,18 160,30 200,25 300,22 400,25",
  },
  {
    key: "civic",
    label: "CIVIC AI",
    color: DOMAIN_COLORS.civic,
    y: 42,
    points:
      "0,42 60,42 85,32 110,52 130,35 155,48 200,42 300,40 400,42",
  },
  {
    key: "data",
    label: "DATA INFRA",
    color: DOMAIN_COLORS.data,
    y: 58,
    points:
      "0,58 50,58 75,68 95,48 120,65 145,52 200,58 300,56 400,58",
  },
  {
    key: "ml",
    label: "APPLIED ML",
    color: DOMAIN_COLORS.ml,
    y: 75,
    points:
      "0,75 70,75 90,65 115,85 135,70 160,78 200,75 300,73 400,75",
  },
];

export default function StaticWaveformSVG({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 400 100"
      preserveAspectRatio="none"
      className={className}
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    >
      {streams.map((s) => (
        <g key={s.key}>
          <text
            x="2"
            y={s.y - 4}
            fontSize="4"
            fill={s.color}
            opacity={0.35}
            letterSpacing="0.5"
            fontFamily="monospace"
          >
            {s.label}
          </text>
          <polyline
            points={s.points}
            fill="none"
            stroke={s.color}
            strokeWidth="0.8"
            opacity={0.5}
          />
        </g>
      ))}
    </svg>
  );
}
