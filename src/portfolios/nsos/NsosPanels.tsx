"use client";

import * as d3 from "d3";
import { motion, useInView } from "framer-motion";
import { type ReactNode, useEffect, useRef, useState } from "react";
import StaticWaveformSVG from "@/components/StaticWaveformSVG";
import type { Domain } from "@/data/domainColors";
import type { Project } from "@/data/projects";
import { projects } from "@/data/projects";
import NsosTerminal from "@/portfolios/nsos/NsosTerminal";
import {
  NSOS_HOME_ASCII,
  nsosAboutWhoami,
  nsosBeyond,
  nsosExperience,
  nsosLinks,
  nsosSkills,
  nsosStats,
} from "@/portfolios/nsos/content";
import { BMO_CARE_BLOCK_ART } from "@/portfolios/nsos/bmoCareBlockArt";
import { PATCHLAB_BLOCK_ART } from "@/portfolios/nsos/patchlabBlockArt";
import { DRIFT_ZERO_ART } from "@/portfolios/nsos/driftZeroArt";

/** Light / medium / dark shade blocks in Mario-style art → red fills; rest stays base color. */
function patchlabArtLineNodes(line: string, lineIndex: number): ReactNode {
  const LIGHT = "\u2591";
  const MEDIUM = "\u2592";
  const DARK = "\u2593";
  const parts: ReactNode[] = [];
  let buf = "";
  let part = 0;
  const flush = () => {
    if (buf.length > 0) {
      parts.push(buf);
      buf = "";
    }
  };
  for (let j = 0; j < line.length; j++) {
    const ch = line[j];
    if (ch === LIGHT || ch === MEDIUM || ch === DARK) {
      flush();
      const cls =
        ch === LIGHT
          ? "nsos-patchlab-art-fill-light"
          : ch === MEDIUM
            ? "nsos-patchlab-art-fill-mid"
            : "nsos-patchlab-art-fill-dark";
      parts.push(
        <span key={`${lineIndex}-${part++}`} className={cls}>
          {ch}
        </span>,
      );
    } else {
      buf += ch;
    }
  }
  flush();
  return parts.length > 0 ? parts : "\u00a0";
}

const NSOS_SCROLL_VIEWPORT = {
  once: true,
  amount: 0.12,
  margin: "0px 0px -32px 0px",
} as const;

const NSOS_SCROLL_EASE = "easeOut" as const;

const nsosRevealChild = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: NSOS_SCROLL_EASE },
  },
} as const;

const nsosRevealStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.06 },
  },
} as const;

/** Terminal: same reveal as hero blocks but slightly stronger motion (part of home stagger). */
const nsosRevealTerminal = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.32,
      duration: 0.62,
      ease: [0.22, 1, 0.36, 1],
    },
  },
} as const;


function ScrollIn({
  children,
  className,
  delay = 0,
  y = 16,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={NSOS_SCROLL_VIEWPORT}
      transition={{ duration: 0.5, delay, ease: NSOS_SCROLL_EASE }}
    >
      {children}
    </motion.div>
  );
}

function domainPtagClass(d: Domain): string {
  if (d === "biomedical") return "nsos-ptag-bio";
  if (d === "bioinformatics") return "nsos-ptag-bioinf";
  if (d === "ml") return "nsos-ptag-ml";
  if (d === "data" || d === "civic") return "nsos-ptag-sys";
  if (d === "fullstack") return "nsos-ptag-fullstack";
  if (d === "aerospace") return "nsos-ptag-aerospace";
  return "nsos-ptag-def";
}

function domainLabel(d: Domain): string {
  if (d === "biomedical") return "biotech";
  if (d === "bioinformatics") return "bioinformatics";
  if (d === "ml") return "ai/ml";
  if (d === "data") return "data";
  if (d === "fullstack") return "fullstack";
  if (d === "aerospace") return "aerospace";
  return "civic";
}

function useCountUp(target: number, start: boolean, duration = 900) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (target <= 0) {
      setValue(0);
      return;
    }

    let frame = 0;
    const totalFrames = Math.max(24, Math.round(duration / 16));
    const timer = window.setInterval(() => {
      frame += 1;
      const progress = Math.min(frame / totalFrames, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(target * eased));

      if (progress >= 1) {
        window.clearInterval(timer);
      }
    }, 16);

    return () => window.clearInterval(timer);
  }, [duration, start, target]);

  return value;
}

function CountUpStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.7 });
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : null;
  const suffix = match?.[2] ?? "";
  const animated = useCountUp(target ?? 0, inView);
  const displayValue = target === null ? value : `${animated}${suffix}`;

  return (
    <motion.div
      ref={ref}
      className="nsos-stat-block"
      variants={nsosRevealChild}
    >
      <div className="nsos-stat-value">{displayValue}</div>
      <div className="nsos-stat-label">{label}</div>
    </motion.div>
  );
}

function NeuroSignalPanel() {
  return (
    <div className="nsos-signal-bg" aria-hidden>
      <motion.div
        className="nsos-signal-track"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity }}
      >
        <div className="nsos-signal-frame">
          <StaticWaveformSVG className="nsos-signal-waveform" />
        </div>
        <div className="nsos-signal-frame">
          <StaticWaveformSVG className="nsos-signal-waveform" />
        </div>
      </motion.div>
      <div className="nsos-signal-overlay" />
      <div className="nsos-signal-readout">
        <span>feature vector: 55</span>
        <span>diagnostic copilot: active</span>
        <span>signal sync: nominal</span>
      </div>
    </div>
  );
}

function RnaSeqVolcanoPlot() {
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef, { once: true, amount: 0.35 });

  useEffect(() => {
    if (!inView || !svgRef.current) return;

    const width = 620;
    const height = 320;
    const margin = { top: 20, right: 22, bottom: 40, left: 52 };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const points = Array.from({ length: 48 }, (_, index) => {
      const normalized = index / 47;
      const direction = index % 2 === 0 ? -1 : 1;
      const foldChange = direction * (0.35 + normalized * 2.8);
      const significance = 1.1 + Math.abs(foldChange) * 1.45 + (index % 5) * 0.22;

      return {
        id: `gene-${index + 1}`,
        foldChange,
        significance,
        highlighted: Math.abs(foldChange) > 1.6 && significance > 3.2,
      };
    });

    const x = d3.scaleLinear().domain([-3.6, 3.6]).range([margin.left, width - margin.right]);
    const y = d3.scaleLinear().domain([0, 6.6]).range([height - margin.bottom, margin.top]);

    const defs = svg.append("defs");
    const gradient = defs
      .append("linearGradient")
      .attr("id", "volcano-gradient")
      .attr("x1", "0%")
      .attr("x2", "100%")
      .attr("y1", "0%")
      .attr("y2", "0%");

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#e070a0");
    gradient.append("stop").attr("offset", "50%").attr("stop-color", "#7a8599");
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#00d4aa");

    svg
      .append("line")
      .attr("x1", margin.left)
      .attr("x2", width - margin.right)
      .attr("y1", y(1.3))
      .attr("y2", y(1.3))
      .attr("stroke", "rgba(224,228,237,0.18)")
      .attr("stroke-dasharray", "4 6");

    svg
      .append("line")
      .attr("x1", x(-1))
      .attr("x2", x(-1))
      .attr("y1", margin.top)
      .attr("y2", height - margin.bottom)
      .attr("stroke", "rgba(224,228,237,0.12)")
      .attr("stroke-dasharray", "4 6");

    svg
      .append("line")
      .attr("x1", x(1))
      .attr("x2", x(1))
      .attr("y1", margin.top)
      .attr("y2", height - margin.bottom)
      .attr("stroke", "rgba(224,228,237,0.12)")
      .attr("stroke-dasharray", "4 6");

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(7).tickSizeOuter(0))
      .call((axis) => axis.selectAll("path,line").attr("stroke", "rgba(224,228,237,0.2)"))
      .call((axis) => axis.selectAll("text").attr("fill", "#7a8599").attr("font-size", 10));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(5).tickSizeOuter(0))
      .call((axis) => axis.selectAll("path,line").attr("stroke", "rgba(224,228,237,0.2)"))
      .call((axis) => axis.selectAll("text").attr("fill", "#7a8599").attr("font-size", 10));

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - 8)
      .attr("fill", "#7a8599")
      .attr("font-size", 10)
      .attr("text-anchor", "middle")
      .text("log2 fold change");

    svg
      .append("text")
      .attr("transform", `translate(14 ${height / 2}) rotate(-90)`)
      .attr("fill", "#7a8599")
      .attr("font-size", 10)
      .attr("text-anchor", "middle")
      .text("-log10 p-value");

    const dots = svg
      .append("g")
      .selectAll("circle")
      .data(points)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.foldChange))
      .attr("cy", (d) => y(d.significance))
      .attr("r", 0)
      .attr("fill", (d) =>
        d.highlighted ? "url(#volcano-gradient)" : "rgba(122,133,153,0.55)",
      )
      .attr("stroke", (d) =>
        d.highlighted ? "rgba(224,228,237,0.9)" : "rgba(224,228,237,0.14)",
      )
      .attr("stroke-width", (d) => (d.highlighted ? 1.2 : 0.7))
      .attr("opacity", 0.95);

    dots
      .transition()
      .delay((_, index) => index * 28)
      .duration(480)
      .ease(d3.easeCubicOut)
      .attr("r", (d) => (d.highlighted ? 6.5 : 4.2));
  }, [inView]);

  return (
    <motion.div className="nsos-volcano-inline" variants={nsosRevealChild}>
      <div className="nsos-volcano-copy">
        <div>
          {/* <strong>Animated volcano plot</strong> in D3, showing differential-expression
          signal emerging progressively across the cohort. */}
        </div>
        <div className="nsos-volcano-legend">
          <span>48 DEGs</span>
          <span>cross-reactive immunity</span>
          <span>Zika/Dengue cohort</span>
        </div>
      </div>
      <svg
        ref={svgRef}
        className="nsos-volcano-svg"
        aria-label="RNA-seq volcano plot"
      />
    </motion.div>
  );
}

/** Unicode block-art Pikachu (Buddy / Lock In companion). */
const BUDDY_PIKACHU_ASCII = `
⠸⣷⣦⠤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣠⣤⠀⠀⠀
⠀⠙⣿⡄⠈⠑⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠔⠊⠉⣿⡿⠁⠀⠀⠀
⠀⠀⠈⠣⡀⠀⠀⠑⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀⡠⠊⠁⠀⠀⣰⠟⠀⠀⠀⣀⣀
⠀⠀⠀⠀⠈⠢⣄⠀⡈⠒⠊⠉⠁⠀⠈⠉⠑⠚⠀⠀⣀⠔⢊⣠⠤⠒⠊⠉⠀⡜
⠀⠀⠀⠀⠀⠀⠀⡽⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠩⡔⠊⠁⠀⠀⠀⠀⠀⠀⠇
⠀⠀⠀⠀⠀⠀⠀⡇⢠⡤⢄⠀⠀⠀⠀⠀⡠⢤⣄⠀⡇⠀⠀⠀⠀⠀⠀⠀⢰⠀
⠀⠀⠀⠀⠀⠀⢀⠇⠹⠿⠟⠀⠀⠤⠀⠀⠻⠿⠟⠀⣇⠀⠀⡀⠠⠄⠒⠊⠁⠀
⠀⠀⠀⠀⠀⠀⢸⣿⣿⡆⠀⠰⠤⠖⠦⠴⠀⢀⣶⣿⣿⠀⠙⢄⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢻⣿⠃⠀⠀⠀⠀⠀⠀⠀⠈⠿⡿⠛⢄⠀⠀⠱⣄⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢸⠈⠓⠦⠀⣀⣀⣀⠀⡠⠴⠊⠹⡞⣁⠤⠒⠉⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣠⠃⠀⠀⠀⠀⡌⠉⠉⡤⠀⠀⠀⠀⢻⠿⠆⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠰⠁⡀⠀⠀⠀⠀⢸⠀⢰⠃⠀⠀⠀⢠⠀⢣⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢶⣗⠧⡀⢳⠀⠀⠀⠀⢸⣀⣸⠀⠀⠀⢀⡜⠀⣸⢤⣶⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠈⠻⣿⣦⣈⣧⡀⠀⠀⢸⣿⣿⠀⠀⢀⣼⡀⣨⣿⡿⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠈⠻⠿⠿⠓⠄⠤⠘⠉⠙⠤⢀⠾⠿⣿⠟⠋
`.trim();

function BuddyPikachuAscii() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.35 });
  const lines = BUDDY_PIKACHU_ASCII.split("\n");

  return (
    <motion.div
      ref={containerRef}
      className="nsos-buddy-pikachu"
      variants={nsosRevealChild}
      role="img"
      aria-label="Unicode Pikachu block art for the Buddy Lock In project"
    >
      <div className="nsos-buddy-pikachu-copy">
        <span className="nsos-buddy-pikachu-label" aria-hidden>
        </span>
      </div>
      <div className="nsos-buddy-pikachu-pre" aria-hidden>
        {lines.map((line, i) => (
          <motion.div
            key={i}
            className="nsos-buddy-pikachu-line"
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={
              inView
                ? { opacity: 1, filter: "blur(0px)" }
                : { opacity: 0, filter: "blur(6px)" }
            }
            transition={{
              delay: i * 0.055,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line || "\u00a0"}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function PatchlabBlockArt() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.2 });
  const lines = PATCHLAB_BLOCK_ART.split("\n");

  return (
    <motion.div
      ref={containerRef}
      className="nsos-patchlab-art"
      variants={nsosRevealChild}
      role="img"
      aria-label="Unicode block art for the PatchLab project"
    >
      <div className="nsos-patchlab-art-copy">
        <span className="nsos-patchlab-art-label" aria-hidden>        </span>
      </div>
      <div className="nsos-patchlab-art-pre" aria-hidden>
        {lines.map((line, i) => (
          <motion.div
            key={i}
            className="nsos-patchlab-art-line"
            initial={{ opacity: 0, filter: "blur(5px)" }}
            animate={
              inView
                ? { opacity: 1, filter: "blur(0px)" }
                : { opacity: 0, filter: "blur(5px)" }
            }
            transition={{
              delay: i * 0.028,
              duration: 0.42,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line ? patchlabArtLineNodes(line, i) : "\u00a0"}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function BmoCareBlockArt() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.2 });
  const lines = BMO_CARE_BLOCK_ART.split("\n");

  return (
    <motion.div
      ref={containerRef}
      className="nsos-bmocare-art"
      variants={nsosRevealChild}
      role="img"
      aria-label="Unicode block art for the BMO Care project"
    >
      <div className="nsos-bmocare-art-copy">
        <span className="nsos-bmocare-art-label" aria-hidden>
          BMO Care — bedside companion
        </span>
      </div>
      <div className="nsos-bmocare-art-pre" aria-hidden>
        {lines.map((line, i) => (
          <motion.div
            key={i}
            className="nsos-bmocare-art-line"
            initial={{ opacity: 0, filter: "blur(5px)" }}
            animate={
              inView
                ? { opacity: 1, filter: "blur(0px)" }
                : { opacity: 0, filter: "blur(5px)" }
            }
            transition={{
              delay: i * 0.028,
              duration: 0.42,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line || "\u00a0"}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function DriftZeroArt() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.2 });
  const lines = DRIFT_ZERO_ART.split("\n");

  return (
    <motion.div
      ref={containerRef}
      className="nsos-driftzero-art"
      variants={nsosRevealChild}
      role="img"
      aria-label="ASCII art for the Drift Zero satellite project"
    >
      <div className="nsos-driftzero-art-copy">
        <span className="nsos-driftzero-art-label" aria-hidden>
          Drift Zero — orbital proximity
        </span>
      </div>
      <div className="nsos-driftzero-art-pre" aria-hidden>
        {lines.map((line, i) => (
          <motion.div
            key={i}
            className="nsos-driftzero-art-line"
            initial={{ opacity: 0, filter: "blur(5px)" }}
            animate={
              inView
                ? { opacity: 1, filter: "blur(0px)" }
                : { opacity: 0, filter: "blur(5px)" }
            }
            transition={{
              delay: i * 0.03,
              duration: 0.42,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line || " "}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/** Home panel (virtual `home.tsx`): hero, full-width terminal, below-fold. Reveal runs every mount. */
function NsosHomePanel({
  activePanel,
  openPanel,
  openExternal,
}: {
  activePanel: string;
  openPanel: (panelId: string) => void;
  openExternal: (url: string) => void;
}) {
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    setReveal(false);
    const t = window.setTimeout(() => setReveal(true), 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="nsos-panel active">
      <div className="nsos-home-hero">
        <motion.div
          className="nsos-home-top"
          initial="hidden"
          animate={reveal ? "visible" : "hidden"}
          variants={nsosRevealStagger}
        >
          <motion.div variants={nsosRevealChild}>
            <div className="nsos-home-ascii">{NSOS_HOME_ASCII}</div>
          </motion.div>
          <motion.div variants={nsosRevealChild}>
            <h1 className="nsos-home-name">
              Nikhil <span className="nsos-highlight">Sangamkar</span>
            </h1>
          </motion.div>
          <motion.div variants={nsosRevealChild}>
            <p className="nsos-home-tagline">
              Building the engineering layer between AI and real-world systems.
            </p>
            <p className="nsos-home-tagline">
              CS + Math @ University of Florida.
            </p>
          </motion.div>
          <motion.div className="nsos-home-stats" variants={nsosRevealStagger}>
            {(nsosStats as ReadonlyArray<{ value: string; label: string }>).map((s) => (
              <CountUpStat key={s.label} value={s.value} label={s.label} />
            ))}
          </motion.div>
          <motion.div className="nsos-home-terminal-wrap" variants={nsosRevealTerminal}>
            <NsosTerminal
              projects={projects}
              activePanel={activePanel}
              openPanel={openPanel}
              openExternal={openExternal}
              embedded
            />
          </motion.div>
          <motion.section
            className="nsos-home-below-fold"
            variants={nsosRevealChild}
            aria-label="More on this portfolio"
          >
            <h2 className="nsos-home-below-title">
              <span className="nsos-hash">#</span> keep exploring
            </h2>
            <p className="nsos-home-below-lede">
              Open a panel from the sidebar or jump here!
            </p>
            <div className="nsos-home-below-actions">
              <button
                type="button"
                className="nsos-home-below-btn"
                onClick={() => openPanel("projects")}
              >
                Projects
              </button>
              <button
                type="button"
                className="nsos-home-below-btn"
                onClick={() => openPanel("about")}
              >
                About
              </button>
              <button
                type="button"
                className="nsos-home-below-btn"
                onClick={() => openPanel("experience")}
              >
                Experience
              </button>
              <button
                type="button"
                className="nsos-home-below-btn"
                onClick={() => openPanel("contact")}
              >
                Contact
              </button>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}

export function NsosPanelBody({
  panelId,
  openProject,
  activePanel,
  openPanel,
  openExternal,
}: {
  panelId: string;
  openProject: (id: string) => void;
  activePanel: string;
  openPanel: (panelId: string) => void;
  openExternal: (url: string) => void;
}) {
  if (panelId === "home") {
    return (
      <NsosHomePanel
        activePanel={activePanel}
        openPanel={openPanel}
        openExternal={openExternal}
      />
    );
  }

  if (panelId === "projects") {
    return (
      <div className="nsos-panel active">
        <div className="nsos-panel-inner">
          <ScrollIn>
            <div
              style={{
                marginBottom: 20,
                fontSize: 11,
                color: "var(--nsos-text-muted)",
              }}
            >
              <span style={{ color: "var(--nsos-accent)" }}>&gt;</span> ls
              ~/projects -sort=impact
            </div>
          </ScrollIn>
          <motion.div
            className="nsos-projects-grid"
            initial="hidden"
            whileInView="visible"
            viewport={NSOS_SCROLL_VIEWPORT}
            variants={nsosRevealStagger}
          >
            {projects.map((p) => (
              <motion.button
                key={p.id}
                type="button"
                className="nsos-project-card"
                variants={nsosRevealChild}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.99 }}
                onClick={() => openProject(p.id)}
              >
                <span className={`nsos-ptag ${domainPtagClass(p.domains[0])}`}>
                  {domainLabel(p.domains[0])}
                </span>
                <h3>{p.title}</h3>
                <p>{p.summary}</p>
                <div className="nsos-project-meta">
                  {p.metrics.slice(0, 2).map((m) => (
                    <span key={m.label}>
                      {m.value} · {m.label}
                    </span>
                  ))}
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    );
  }

  if (panelId.startsWith("project:")) {
    const id = panelId.slice("project:".length);
    const p = projects.find((x) => x.id === id);
    if (!p) {
      return (
        <div className="nsos-panel active">
          <div className="nsos-panel-inner">File not found.</div>
        </div>
      );
    }
    return <ProjectDetailPanel project={p} />;
  }

  if (panelId === "about") {
    return (
      <div className="nsos-panel active">
        <div className="nsos-panel-inner">
          <ScrollIn>
            <div
              style={{
                marginBottom: 24,
                fontSize: 11,
                color: "var(--nsos-text-muted)",
              }}
            >
              <span style={{ color: "var(--nsos-accent)" }}>&gt;</span> cat
              about.md | render
            </div>
          </ScrollIn>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={NSOS_SCROLL_VIEWPORT}
            variants={nsosRevealStagger}
            style={{ display: "flex", flexDirection: "column", gap: 0 }}
          >
            <motion.div
              className="nsos-about-section"
              variants={nsosRevealChild}
            >
              <h2>
                <span className="nsos-hash">#</span> whoami
              </h2>
              <div className="nsos-about-body">{nsosAboutWhoami}</div>
            </motion.div>
            <motion.div
              className="nsos-about-section"
              variants={nsosRevealChild}
            >
              <h2>
                <span className="nsos-hash">#</span> tech_stack
              </h2>
              <div className="nsos-skills-grid">
                {nsosSkills.map((s) => (
                  <span key={s} className="nsos-skill-chip">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div
              className="nsos-about-section"
              variants={nsosRevealChild}
            >
              <h2>
                <span className="nsos-hash">#</span> beyond_code
              </h2>
              <div className="nsos-about-body">{nsosBeyond}</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (panelId === "experience") {
    return (
      <div className="nsos-panel active">
        <div className="nsos-panel-inner">
          <ScrollIn>
            <div
              style={{
                marginBottom: 24,
                fontSize: 11,
                color: "var(--nsos-text-muted)",
              }}
            >
              <span style={{ color: "var(--nsos-accent)" }}>&gt;</span> tail -f
              experience.log
            </div>
          </ScrollIn>
          <motion.div
            className="nsos-exp-timeline"
            initial="hidden"
            whileInView="visible"
            viewport={NSOS_SCROLL_VIEWPORT}
            variants={nsosRevealStagger}
          >
            {nsosExperience.map((e) => (
              <motion.div
                key={e.role + e.org}
                className={`nsos-exp-item ${e.current ? "nsos-current" : ""}`}
                variants={nsosRevealChild}
              >
                <div className="nsos-exp-role">{e.role}</div>
                <div className="nsos-exp-org">{e.org}</div>
                <div className="nsos-exp-date">{e.date}</div>
                <div className="nsos-exp-desc">{e.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    );
  }

  if (panelId === "contact") {
    return (
      <div className="nsos-panel active">
        <div className="nsos-panel-inner">
          <ScrollIn>
            <div
              style={{
                marginBottom: 24,
                fontSize: 11,
                color: "var(--nsos-text-muted)",
              }}
            >
              <span style={{ color: "var(--nsos-accent)" }}>&gt;</span>{" "}
              ./connect.sh
            </div>
          </ScrollIn>
          <ScrollIn delay={0.08} className="nsos-contact-terminal">
            <div className="nsos-ct-bar">
              <div className="nsos-ct-dots">
                <span />
                <span />
                <span />
              </div>
              <span className="nsos-ct-title">connect.sh - 80x24</span>
            </div>
            <div className="nsos-ct-body">
              <div className="nsos-cl">
                <span className="nsos-p">$</span>
                <span className="nsos-c">echo $EMAIL</span>
                <a className="nsos-o" href={`mailto:${nsosLinks.email}`}>
                  {nsosLinks.email}
                </a>
              </div>
              <div className="nsos-cl">
                <span className="nsos-p">$</span>
                <span className="nsos-c">echo $GITHUB</span>
                <a
                  className="nsos-o"
                  href={nsosLinks.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  {nsosLinks.github.replace("https://", "")}
                </a>
              </div>
              <div className="nsos-cl">
                <span className="nsos-p">$</span>
                <span className="nsos-c">echo $LINKEDIN</span>
                <a
                  className="nsos-o"
                  href={nsosLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  linkedin.com/in/nikhilsangamkar
                </a>
              </div>
              <div className="nsos-cl" style={{ marginTop: 12 }}>
                <span className="nsos-p">$</span>
                <span className="nsos-c">echo &quot;Reach out anytime!&quot;</span>
              </div>
              <div className="nsos-cl" style={{ marginTop: 16 }}>
                <span className="nsos-p">$</span>
                <span className="nsos-c" style={{ color: "var(--nsos-accent)" }}>
                  <span className="nsos-cursor-blink" aria-hidden />
                </span>
              </div>
            </div>
          </ScrollIn>
        </div>
      </div>
    );
  }

  return null;
}

function ProjectDetailPanel({ project: p }: { project: Project }) {
  const techBits = [
    ...p.metrics.map((m) => m.value),
    ...p.domains.map((d) => d),
  ].slice(0, 8);
  const isNeuro = p.id === "neurophenotype";
  const isRnaSeq = p.id === "rna-seq";
  const isBuddy = p.id === "buddy";
  const isPatchlab = p.id === "patchlab";
  const isBmoCare = p.id === "bmo-care";
  const isDriftZero = p.id === "drift-zero";
  const showProjectAside = isRnaSeq || isBuddy || isPatchlab || isBmoCare || isDriftZero;

  return (
    <div className="nsos-panel active">
      <motion.div
        className={`nsos-project-detail ${isNeuro ? "nsos-project-detail-neuro" : ""} ${isRnaSeq ? "nsos-project-detail-rna" : ""} ${isBuddy ? "nsos-project-detail-buddy" : ""} ${isPatchlab ? "nsos-project-detail-patchlab" : ""} ${isBmoCare ? "nsos-project-detail-bmocare" : ""}`}
        initial="hidden"
        whileInView="visible"
        viewport={NSOS_SCROLL_VIEWPORT}
        variants={nsosRevealStagger}
      >
        {isNeuro && <NeuroSignalPanel />}
        <div
          className={`nsos-project-layout ${showProjectAside ? "nsos-project-layout-split" : ""}`}
        >
          <div className="nsos-project-main">
            <motion.div className="nsos-pd-header" variants={nsosRevealChild}>
              <span className={`nsos-ptag ${domainPtagClass(p.domains[0])}`}>
                {domainLabel(p.domains[0])}
              </span>
              <h1>{p.title}</h1>
              <div className="nsos-pd-sub">{p.summary}</div>
            </motion.div>
            <motion.div className="nsos-pd-chips" variants={nsosRevealChild}>
              <div className="nsos-pd-chip">
                <span className="nsos-l">id:</span> {p.id}
              </div>
              <div className="nsos-pd-chip">
                <span className="nsos-l">no:</span> {p.number}
              </div>
              {p.award && (
                <div className="nsos-pd-chip">
                  <span className="nsos-l">award:</span> {p.award}
                </div>
              )}
            </motion.div>
            <motion.div className="nsos-pd-sec" variants={nsosRevealChild}>
              <h2>{"// overview"}</h2>
              <p>{p.detail}</p>
            </motion.div>
            <motion.div className="nsos-pd-sec" variants={nsosRevealChild}>
              <h2>{"// metrics"}</h2>
              <ul>
                {p.metrics.map((m) => (
                  <li key={m.label}>
                    <strong>{m.value}</strong> - {m.label}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div className="nsos-pd-sec" variants={nsosRevealChild}>
              <h2>{"// stack"}</h2>
              <div className="nsos-pd-tech">
                {(p.stack ?? techBits).map((t) => (
                  <span key={t} className="nsos-pd-t">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
            {p.projectUrl ? (
              <motion.div className="nsos-pd-sec" variants={nsosRevealChild}>
                <h2>{"// link"}</h2>
                <p>
                  <a
                    href={p.projectUrl}
                    className="nsos-pd-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {p.projectUrl.replace(/^https?:\/\//, "")}
                  </a>
                </p>
              </motion.div>
            ) : null}
          </div>
          {isRnaSeq && (
            <aside className="nsos-project-side">
              <RnaSeqVolcanoPlot />
            </aside>
          )}
          {isBuddy && (
            <aside className="nsos-project-side">
              <BuddyPikachuAscii />
            </aside>
          )}
          {isPatchlab && (
            <aside className="nsos-project-side">
              <PatchlabBlockArt />
            </aside>
          )}
          {isBmoCare && (
            <aside className="nsos-project-side">
              <BmoCareBlockArt />
            </aside>
          )}
          {isDriftZero && (
            <aside className="nsos-project-side">
              <DriftZeroArt />
            </aside>
          )}
        </div>
      </motion.div>
    </div>
  );
}
