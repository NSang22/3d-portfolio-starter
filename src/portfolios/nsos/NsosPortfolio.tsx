import { DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "./nsos.css";
import NsosShell from "@/portfolios/nsos/NsosShell";

const nsosMono = IBM_Plex_Mono({
  variable: "--font-nsos-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const nsosSans = DM_Sans({
  variable: "--font-nsos-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function NsosPortfolio() {
  return (
    <div
      className={`${nsosMono.variable} ${nsosSans.variable} nsos-root`}
    >
      <NsosShell />
    </div>
  );
}
