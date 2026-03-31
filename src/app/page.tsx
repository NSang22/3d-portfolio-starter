import { getProductionVariant } from "@/config/portfolio";
import { portfolioComponents } from "@/portfolios/registry";

export default function Home() {
  const id = getProductionVariant();
  const Portfolio = portfolioComponents[id];
  return <Portfolio />;
}
