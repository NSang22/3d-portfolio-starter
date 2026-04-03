/**
 * Portfolio design variants - one active in production via env, all reachable in /lab when enabled.
 */

export type PortfolioVariantId = "signal" | "nsos";

export const PORTFOLIO_VARIANTS: {
  id: PortfolioVariantId;
  label: string;
  description: string;
}[] = [
  {
    id: "signal",
    label: "Signal pipeline",
    description: "Waveform hero, domain colors, project grid (current default).",
  },
  {
    id: "nsos",
    label: "nsOS",
    description: "Research OS shell - replace placeholder with full UI in portfolios/nsos.",
  },
];

const VALID_IDS = new Set<PortfolioVariantId>(
  PORTFOLIO_VARIANTS.map((v) => v.id),
);

export function parsePortfolioVariant(
  value: string | null | undefined,
): PortfolioVariantId | null {
  const raw = value?.trim().toLowerCase() ?? "";
  if (!raw) return null;
  if (VALID_IDS.has(raw as PortfolioVariantId)) {
    return raw as PortfolioVariantId;
  }
  return null;
}

/** Which design serves `/` in production (and locally unless you use /lab). */
export function getProductionVariant(): PortfolioVariantId {
  const parsed = parsePortfolioVariant(process.env.NEXT_PUBLIC_PORTFOLIO_VARIANT);
  if (parsed) {
    return parsed;
  }

  const raw = process.env.NEXT_PUBLIC_PORTFOLIO_VARIANT?.trim().toLowerCase() ?? "";
  if (raw && process.env.NODE_ENV === "development") {
    console.warn(
      `[portfolio] Invalid NEXT_PUBLIC_PORTFOLIO_VARIANT="${raw}" - falling back to "signal".`,
    );
  }
  return "signal";
}

/**
 * /lab/* is available in development, or in any env when this is set to "true"
 * (useful for staging previews). Production should leave it unset/false.
 */
export function isDesignLabEnabled(): boolean {
  if (process.env.NODE_ENV === "development") return true;
  return process.env.NEXT_PUBLIC_ENABLE_DESIGN_LAB === "true";
}

export function isRegisteredVariant(id: string): id is PortfolioVariantId {
  return VALID_IDS.has(id as PortfolioVariantId);
}
