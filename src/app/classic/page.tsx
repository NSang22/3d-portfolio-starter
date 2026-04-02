import type { Metadata } from "next";
import ClassicPortfolioHome from "@/components/ClassicPortfolioHome";

export const metadata: Metadata = {
  title: "Classic portfolio | Nikhil Sangamkar",
  description: "Original single-page layout (archived route).",
};

export default function ClassicPortfolioPage() {
  return <ClassicPortfolioHome />;
}
