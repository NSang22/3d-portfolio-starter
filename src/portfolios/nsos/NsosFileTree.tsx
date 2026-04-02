"use client";

import { AnimatePresence, motion } from "framer-motion";
import { type MouseEvent, useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import {
  projectFileName,
  projectFolderKey,
} from "@/portfolios/nsos/explorer";

type Props = {
  projects: Project[];
  activePanel: string;
  openFolders: Set<string>;
  toggleFolder: (key: string) => void;
  collapseAll: () => void;
  openPanel: (panelId: string) => void;
  openExternal: (url: string) => void;
};

export default function NsosFileTree({
  projects,
  activePanel,
  openFolders,
  toggleFolder,
  collapseAll,
  openPanel,
  openExternal,
}: Props) {
  const biotech = projects.filter((p) => projectFolderKey(p) === "biotech");
  const systems = projects.filter((p) => projectFolderKey(p) === "systems");
  const [tooltip, setTooltip] = useState<{ text: string; y: number } | null>(null);
  const tooltipTimeout = useRef<number | null>(null);

  const isOpen = (k: string) => openFolders.has(k);

  useEffect(() => {
    return () => {
      if (tooltipTimeout.current) window.clearTimeout(tooltipTimeout.current);
    };
  }, []);

  const showTooltip = (text: string, y: number) => {
    if (tooltipTimeout.current) window.clearTimeout(tooltipTimeout.current);
    tooltipTimeout.current = window.setTimeout(() => {
      setTooltip({ text, y });
    }, 150);
  };

  const hideTooltip = () => {
    if (tooltipTimeout.current) window.clearTimeout(tooltipTimeout.current);
    setTooltip(null);
  };

  const hoverHandlers = (text: string) => ({
    onMouseEnter: (event: MouseEvent<HTMLElement>) =>
      showTooltip(text, event.currentTarget.getBoundingClientRect().top),
    onMouseLeave: hideTooltip,
  });

  return (
    <div className="nsos-tree-wrap flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="nsos-sidebar-header">
        <span>explorer</span>
        <button
          type="button"
          className="nsos-collapse-all"
          title="Collapse folders (keep root)"
          onClick={collapseAll}
        >
          ⊟
        </button>
      </div>
      <div className="nsos-file-tree">
        <div className={`nsos-folder nsos-d0 ${isOpen("fp") ? "open" : ""}`}>
          <div
            className="nsos-folder-header"
            onClick={() => toggleFolder("fp")}
            onKeyDown={(e) =>
              e.key === "Enter" && toggleFolder("fp")
            }
            role="button"
            tabIndex={0}
            {...hoverHandlers("Start here")}
          >
            <span className="nsos-folder-chevron">▶</span>
            <span className="nsos-folder-icon">📁</span>
            <span className="nsos-folder-name" style={{ fontWeight: 500 }}>
              nikhil-portfolio
            </span>
          </div>
          <div className="nsos-folder-children">
            <button
              type="button"
              className={`nsos-file-item nsos-d0 ${activePanel === "home" ? "active" : ""}`}
              onClick={() => openPanel("home")}
              {...hoverHandlers("Start here")}
            >
              <span className="nsos-file-icon nsos-fi-tsx">♢</span>
              <span className="nsos-file-name">home.tsx</span>
            </button>

            <div className={`nsos-folder nsos-d1 ${isOpen("fp:projects") ? "open" : ""}`}>
              <div
                className="nsos-folder-header"
                onClick={() => toggleFolder("fp:projects")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" && toggleFolder("fp:projects")
                }
                {...hoverHandlers("7 projects across biotech and systems")}
              >
                <span className="nsos-folder-chevron">▶</span>
                <span className="nsos-folder-icon">📁</span>
                <span className="nsos-folder-name">projects</span>
                <span className="nsos-folder-count">{projects.length}</span>
              </div>
              <div className="nsos-folder-children">
                <div
                  className={`nsos-folder nsos-d2 ${isOpen("fp:projects:biotech") ? "open" : ""}`}
                >
                  <div
                    className="nsos-folder-header"
                    onClick={() => toggleFolder("fp:projects:biotech")}
                    role="button"
                    tabIndex={0}
                    {...hoverHandlers("NeuroPhenotype, iGEM, RNA-seq")}
                  >
                    <span className="nsos-folder-chevron">▶</span>
                    <span className="nsos-folder-icon">📁</span>
                    <span className="nsos-folder-name">biotech</span>
                    <span className="nsos-folder-count">{biotech.length}</span>
                  </div>
                  <div className="nsos-folder-children">
                    {biotech.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        className={`nsos-file-item nsos-d2 ${activePanel === `project:${p.id}` ? "active" : ""}`}
                        onClick={() => openPanel(`project:${p.id}`)}
                        {...hoverHandlers(p.summary)}
                      >
                        <span className="nsos-file-icon nsos-fi-py">◇</span>
                        <span className="nsos-file-name">{projectFileName(p)}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div
                  className={`nsos-folder nsos-d2 ${isOpen("fp:projects:systems") ? "open" : ""}`}
                >
                  <div
                    className="nsos-folder-header"
                    onClick={() => toggleFolder("fp:projects:systems")}
                    role="button"
                    tabIndex={0}
                    {...hoverHandlers("PatchLab, Buddy Lock In, DataSmart, ResearchHub")}
                  >
                    <span className="nsos-folder-chevron">▶</span>
                    <span className="nsos-folder-icon">📁</span>
                    <span className="nsos-folder-name">systems</span>
                    <span className="nsos-folder-count">{systems.length}</span>
                  </div>
                  <div className="nsos-folder-children">
                    {systems.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        className={`nsos-file-item nsos-d2 ${activePanel === `project:${p.id}` ? "active" : ""}`}
                        onClick={() => openPanel(`project:${p.id}`)}
                        {...hoverHandlers(p.summary)}
                      >
                        <span className="nsos-file-icon nsos-fi-tsx">♢</span>
                        <span className="nsos-file-name">{projectFileName(p)}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  className={`nsos-file-item nsos-d1 ${activePanel === "projects" ? "active" : ""}`}
                  onClick={() => openPanel("projects")}
                  {...hoverHandlers("Systems and backend projects")}
                >
                  <span className="nsos-file-icon nsos-fi-tsx">♢</span>
                  <span className="nsos-file-name">index.tsx</span>
                  <span className="nsos-file-ext">overview</span>
                </button>
              </div>
            </div>

            <button
              type="button"
              className={`nsos-file-item nsos-d0 ${activePanel === "about" ? "active" : ""}`}
              onClick={() => openPanel("about")}
              {...hoverHandlers("Background and education")}
            >
              <span className="nsos-file-icon nsos-fi-md">✎</span>
              <span className="nsos-file-name">about.md</span>
            </button>
            <button
              type="button"
              className={`nsos-file-item nsos-d0 ${activePanel === "experience" ? "active" : ""}`}
              onClick={() => openPanel("experience")}
              {...hoverHandlers("Research and work experience")}
            >
              <span className="nsos-file-icon nsos-fi-log">☰</span>
              <span className="nsos-file-name">experience.log</span>
            </button>
            <button
              type="button"
              className={`nsos-file-item nsos-d0 ${activePanel === "contact" ? "active" : ""}`}
              onClick={() => openPanel("contact")}
              {...hoverHandlers("Get in touch")}
            >
              <span className="nsos-file-icon nsos-fi-sh">◧</span>
              <span className="nsos-file-name">contact.sh</span>
            </button>

            <div className={`nsos-folder nsos-d1 ${isOpen("fp:config") ? "open" : ""}`}>
              <div
                className="nsos-folder-header"
                onClick={() => toggleFolder("fp:config")}
                role="button"
                tabIndex={0}
                {...hoverHandlers("Tech stack and skills")}
              >
                <span className="nsos-folder-chevron">▶</span>
                <span className="nsos-folder-icon">📁</span>
                <span className="nsos-folder-name" style={{ opacity: 0.6 }}>
                  .config
                </span>
              </div>
              <div className="nsos-folder-children">
                <div
                  className="nsos-file-item nsos-d1"
                  style={{ opacity: 0.4, cursor: "default" }}
                >
                  <span className="nsos-file-icon" style={{ color: "var(--nsos-text-muted)" }}>
                    ◇
                  </span>
                  <span className="nsos-file-name">.env.local</span>
                </div>
                <div
                  className="nsos-file-item nsos-d1"
                  style={{ opacity: 0.4, cursor: "default" }}
                >
                  <span className="nsos-file-icon" style={{ color: "var(--nsos-text-muted)" }}>
                    ◇
                  </span>
                  <span className="nsos-file-name">tsconfig.json</span>
                </div>
              </div>
            </div>

            <div className={`nsos-folder nsos-d1 ${isOpen("fp:links") ? "open" : ""}`}>
              <div
                className="nsos-folder-header"
                onClick={() => toggleFolder("fp:links")}
                role="button"
                tabIndex={0}
                {...hoverHandlers("GitHub, LinkedIn, Email")}
              >
                <span className="nsos-folder-chevron">▶</span>
                <span className="nsos-folder-icon">📁</span>
                <span className="nsos-folder-name">links</span>
              </div>
              <div className="nsos-folder-children">
                <button
                  type="button"
                  className="nsos-file-item nsos-d1"
                  onClick={() => openExternal("https://github.com/NSang22")}
                  {...hoverHandlers("Open GitHub")}
                >
                  <span className="nsos-file-icon nsos-fi-link">↗</span>
                  <span className="nsos-file-name">github</span>
                </button>
                <button
                  type="button"
                  className="nsos-file-item nsos-d1"
                  onClick={() =>
                    openExternal("https://www.linkedin.com/in/nikhilsangamkar/")
                  }
                  {...hoverHandlers("Open LinkedIn")}
                >
                  <span className="nsos-file-icon nsos-fi-link">↗</span>
                  <span className="nsos-file-name">linkedin</span>
                </button>
                <button
                  type="button"
                  className="nsos-file-item nsos-d1"
                  onClick={() => openExternal("mailto:nsangamkar1222@gmail.com")}
                  {...hoverHandlers("Send email")}
                >
                  <span className="nsos-file-icon nsos-fi-link">↗</span>
                  <span className="nsos-file-name">email</span>
                </button>
              </div>
            </div>

            <div
              className="nsos-file-item nsos-d0"
              style={{ opacity: 0.3, cursor: "default", marginTop: 4 }}
              {...hoverHandlers("IDE usage guide and quick commands")}
            >
              <span className="nsos-file-icon" style={{ color: "var(--nsos-text-muted)" }}>
                ○
              </span>
              <span className="nsos-file-name">README.md</span>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {tooltip && (
          <motion.div
            className="nsos-tree-tooltip"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            style={{ top: tooltip.y }}
          >
            {tooltip.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
