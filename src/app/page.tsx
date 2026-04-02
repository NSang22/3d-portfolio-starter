import type { Metadata } from "next";
import NsosPortfolio from "@/portfolios/nsos/NsosPortfolio";

export const metadata: Metadata = {
  title: "Nikhil Sangamkar",
  description: "Software engineer — research OS portfolio.",
};

export default function Home() {
  return <NsosPortfolio />;
}
