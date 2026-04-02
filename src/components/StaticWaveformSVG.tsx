export default function StaticWaveformSVG({ className }: { className?: string }) {
  const samples = [
    0, 0.1, 0.3, 0.6, 1, 0.8, 0.2, -0.2, -0.5, -0.9, -1, -0.7, -0.3, 0.1,
    0.4, 0.7, 0.95, 0.6, 0.1, -0.3, -0.6, -0.85, -0.5, -0.1, 0.2, 0.5, 0.8,
    1, 0.7, 0.3, -0.1, -0.4, -0.75, -0.95, -0.6, -0.2, 0.15, 0.45, 0.7, 0.5,
    0.2, 0, -0.2, -0.4, -0.2, 0, 0.2, 0.1, 0,
  ];
  const w = 480;
  const h = 60;
  const mid = h / 2;
  const step = w / (samples.length - 1);
  const pts = samples
    .map((v, i) => `${(i * step).toFixed(1)},${(mid - v * (mid - 4)).toFixed(1)}`)
    .join(" ");
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={className}
      aria-hidden
      preserveAspectRatio="none"
    >
      <polyline
        points={pts}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
