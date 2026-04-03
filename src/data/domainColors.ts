export const DOMAIN_COLORS = {
  biomedical: "#7B4FD4",
  bioinformatics: "#22C55E",
  civic: "#3B82F6",
  data: "#06B6D4",
  ml: "#A78BFA",
} as const;

export type Domain = keyof typeof DOMAIN_COLORS;
