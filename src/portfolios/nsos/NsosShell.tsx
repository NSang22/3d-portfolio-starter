"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import CommandPalette, {
  type CommandPaletteEntry,
} from "@/components/CommandPalette";
import { projects } from "@/data/projects";
import {
  breadcrumbSegments,
  projectFileName,
  projectFolderKey,
  tabDotForPanel,
  tabTitle,
} from "@/portfolios/nsos/explorer";
import NsosFileTree from "@/portfolios/nsos/NsosFileTree";
import { NsosPanelBody } from "@/portfolios/nsos/NsosPanels";

const BOOT_LINES: { t: string; d: number }[] = [
  { t: "[  OK  ] Initializing nsOS kernel...", d: 0 },
  { t: "[  OK  ] Loading research modules...", d: 200 },
  { t: "[  OK  ] Mounting /dev/projects...", d: 350 },
  { t: "[  OK  ] Starting neural_interface daemon...", d: 500 },
  { t: "[  OK  ] Loading biotech.framework...", d: 650 },
  { t: "[  OK  ] Connecting to research_network...", d: 800 },
  { t: "[ INFO ] User: nikhil | Role: researcher", d: 1000 },
  { t: "[  OK  ] Desktop environment ready.", d: 1300 },
  { t: "", d: 1500 },
  { t: "> Welcome back.", d: 1600 },
];

const DEFAULT_OPEN = new Set([
  "fp",
  "fp:projects",
  "fp:projects:biotech",
  "fp:projects:systems",
  "fp:links",
]);

const PANEL_TRANSITION = {
  initial: { opacity: 0, x: 18, y: 10, filter: "blur(10px)" },
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    x: -18,
    y: -6,
    filter: "blur(8px)",
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1],
    },
  },
} as const;

const NSOS_BOOT_SEEN_KEY = "nsos:boot-seen";

/** Max open tabs in the strip; oldest (after home) is evicted when opening a new panel. */
const MAX_TAB_STRIP_TABS = 7;

export default function NsosShell() {
  const hasSeenBoot = () => {
    try {
      return window.localStorage.getItem(NSOS_BOOT_SEEN_KEY) === "1";
    } catch {
      return false;
    }
  };
  const markBootSeen = () => {
    try {
      window.localStorage.setItem(NSOS_BOOT_SEEN_KEY, "1");
    } catch {
      // ignore storage errors (private mode / blocked storage)
    }
  };

  /** Same on server + first client paint — avoids hydration mismatch (never read localStorage here). */
  const [bootHidden, setBootHidden] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [bootProgress, setBootProgress] = useState(0);

  useLayoutEffect(() => {
    if (hasSeenBoot()) {
      setBootHidden(true);
    }
  }, []);

  const [openFolders, setOpenFolders] = useState(() => new Set(DEFAULT_OPEN));
  const [activePanel, setActivePanel] = useState("home");
  const [tabs, setTabs] = useState<string[]>(["home"]);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const clockRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const t = setInterval(() => {
      if (!clockRef.current) return;
      const n = new Date();
      clockRef.current.textContent = [n.getHours(), n.getMinutes(), n.getSeconds()]
        .map((v) => String(v).padStart(2, "0"))
        .join(":");
    }, 1000);
    const n = new Date();
    if (clockRef.current) {
      clockRef.current.textContent = [n.getHours(), n.getMinutes(), n.getSeconds()]
        .map((v) => String(v).padStart(2, "0"))
        .join(":");
    }
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (bootHidden) return;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    BOOT_LINES.forEach((line, i) => {
      const id = setTimeout(() => {
        if (line.t) {
          setBootLines((prev) => [...prev, line.t]);
        }
        setBootProgress(((i + 1) / BOOT_LINES.length) * 100);
      }, line.d);
      timeouts.push(id);
    });
    const done = setTimeout(() => {
      setBootHidden(true);
      markBootSeen();
    }, 2400);
    timeouts.push(done);
    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [bootHidden]);

  const dismissBoot = useCallback(() => {
    setBootHidden(true);
    markBootSeen();
  }, []);

  const toggleFolder = useCallback((key: string) => {
    setOpenFolders((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const collapseAll = useCallback(() => {
    setOpenFolders(new Set(["fp"]));
  }, []);

  const openPanel = useCallback((panelId: string) => {
    setActivePanel(panelId);
    setTabs((prev) => {
      if (prev.includes(panelId)) return prev;
      const next = [...prev, panelId];
      while (next.length > MAX_TAB_STRIP_TABS) {
        const evictIdx = next.findIndex((t) => t !== "home");
        if (evictIdx === -1) break;
        next.splice(evictIdx, 1);
      }
      return next;
    });
  }, []);

  const openProject = useCallback((id: string) => {
    openPanel(`project:${id}`);
  }, [openPanel]);

  const closeTab = useCallback((panelId: string) => {
    if (panelId === "home") return;
    setTabs((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((p) => p !== panelId);
    });
  }, []);

  useEffect(() => {
    if (!tabs.includes(activePanel)) {
      setActivePanel(tabs[tabs.length - 1] ?? "home");
    }
  }, [tabs, activePanel]);

  const switchTab = useCallback((panelId: string) => {
    setActivePanel(panelId);
  }, []);

  const bc = useMemo(
    () => breadcrumbSegments(activePanel, projects),
    [activePanel],
  );

  const statusFile = tabTitle(activePanel, projects);

  const openExternal = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  const commandEntries = useMemo<CommandPaletteEntry[]>(() => {
    const projectDescriptions: Record<string, string> = {
      neurophenotype: "EEG biosignal pipeline, rare disease screening",
      "rna-seq":
        "Dengue/Zika bulk RNA-seq — 48 DEGs, GSEA, classifier AUC 0.97",
      igem: "Computational protein design, UF iGEM",
      patchlab: "Patient data patching and backend tooling",
      "buddy-lock-in": "Focus accountability app and systems workflows",
      datasmart: "Data operations and pipeline observability",
      "fl-resource-map": "Civic services map and retrieval-backed API",
    };
    const projectEntries = projects.map((project) => {
      const folder = projectFolderKey(project);
      const file = projectFileName(project);
      return {
        id: `project:${project.id}`,
        icon: "◇",
        path: `projects/${folder}/${file}`,
        description: projectDescriptions[project.id] ?? project.summary,
        onSelect: () => openPanel(`project:${project.id}`),
      };
    });

    return [
      {
        id: "home",
        icon: "♢",
        path: "home.tsx",
        description: "About me, mission, stats",
        onSelect: () => openPanel("home"),
      },
      ...projectEntries,
      {
        id: "projects",
        icon: "♢",
        path: "projects/systems/index.tsx",
        description: "Systems and backend projects",
        onSelect: () => openPanel("projects"),
      },
      {
        id: "projects-biotech-folder",
        icon: "📁",
        path: "projects/biotech/",
        description: "NeuroPhenotype, iGEM, RNA-seq",
        onSelect: () => openPanel("projects"),
      },
      {
        id: "projects-systems-folder",
        icon: "📁",
        path: "projects/systems/",
        description: "PatchLab, Buddy Lock In, DataSmart, ResearchHub",
        onSelect: () => openPanel("projects"),
      },
      {
        id: "about",
        icon: "✎",
        path: "about.md",
        description: "Background, education, robotics",
        onSelect: () => openPanel("about"),
      },
      {
        id: "experience",
        icon: "☰",
        path: "experience.log",
        description: "Li Lab, FCI, iGEM, Project ALIGN",
        onSelect: () => openPanel("experience"),
      },
      {
        id: "contact",
        icon: "◧",
        path: "contact.sh",
        description: "Get in touch",
        onSelect: () => openPanel("contact"),
      },
      {
        id: "readme",
        icon: "○",
        path: "README.md",
        description: "IDE usage guide and quick commands",
        onSelect: () => openPanel("home"),
      },
      {
        id: "github",
        icon: "↗",
        path: "links/github",
        description: "Open GitHub profile",
        onSelect: () => openExternal("https://github.com/NSang22"),
      },
      {
        id: "linkedin",
        icon: "↗",
        path: "links/linkedin",
        description: "Open LinkedIn profile",
        onSelect: () => openExternal("https://www.linkedin.com/in/nikhilsangamkar/"),
      },
      {
        id: "email",
        icon: "↗",
        path: "links/email",
        description: "Compose email",
        onSelect: () => openExternal("mailto:nsangamkar1222@gmail.com"),
      },
    ];
  }, [openPanel, openExternal]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "p") {
        event.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      {!bootHidden && (
        <div
          className="nsos-boot"
          onClick={dismissBoot}
          onKeyDown={(e) => e.key === "Enter" && dismissBoot()}
          role="button"
          tabIndex={0}
          aria-label="Dismiss boot screen"
        >
          <div className="nsos-boot-logo">
            nsOS
            <span>research operating system v2.7.0</span>
          </div>
          <div className="nsos-boot-log">
            {bootLines.map((line, i) => (
              <div
                key={`boot-${i}-${line.slice(0, 12)}`}
                className="nsos-boot-line"
                style={line.startsWith(">") ? { color: "#00d4aa" } : undefined}
              >
                {line}
              </div>
            ))}
          </div>
          <div className="nsos-boot-progress">
            <div
              className="nsos-boot-progress-bar"
              style={{ width: `${bootProgress}%` }}
            />
          </div>
        </div>
      )}

      <div className="nsos-desktop">
        <div className="nsos-taskbar">
          <span className="nsos-taskbar-logo">nsOS</span>
          <div className="nsos-taskbar-right">
            <span>
              <span className="nsos-status-dot" /> sys:nominal
            </span>
            <span ref={clockRef}>00:00:00</span>
          </div>
        </div>

        <div className="nsos-main">
          <aside className="nsos-sidebar">
            <NsosFileTree
              projects={projects}
              activePanel={activePanel}
              openFolders={openFolders}
              toggleFolder={toggleFolder}
              collapseAll={collapseAll}
              openPanel={openPanel}
              openExternal={openExternal}
            />
            {(process.env.NODE_ENV === "development" ||
              process.env.NEXT_PUBLIC_ENABLE_DESIGN_LAB === "true") && (
              <div className="nsos-lab-link">
                <Link href="/classic">Classic single-page portfolio</Link>
              </div>
            )}
          </aside>

          <div className="nsos-content-area">
            <div className="nsos-breadcrumb">
              {bc.map((seg, i) => (
                <span key={`${seg}-${i}`}>
                  {i > 0 && <span className="nsos-bc-sep">/</span>}
                  {i === bc.length - 1 ? (
                    <span className="nsos-bc-active">{seg}</span>
                  ) : i === 0 ? (
                    <button
                      type="button"
                      className="nsos-bc-clickable"
                      onClick={() => openPanel("home")}
                    >
                      {seg}
                    </button>
                  ) : (
                    <span>{seg}</span>
                  )}
                </span>
              ))}
            </div>

            <div className="nsos-window-tabs">
              <div className="nsos-window-tabs-scroll">
                {tabs.map((tid) => (
                  <div
                    key={tid}
                    className={`nsos-window-tab ${activePanel === tid ? "active" : ""}`}
                  >
                    <button
                      type="button"
                      onClick={() => switchTab(tid)}
                      aria-label={`Open ${tabTitle(tid, projects)} tab`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "inherit",
                        background: "transparent",
                        border: 0,
                        padding: 0,
                        margin: 0,
                        color: "inherit",
                        font: "inherit",
                        cursor: "pointer",
                      }}
                    >
                      <span
                        className="nsos-tab-dot"
                        style={{
                          background: tabDotForPanel(tid),
                        }}
                      />
                      {tabTitle(tid, projects)}
                    </button>
                    {tid !== "home" && (
                      <button
                        type="button"
                        className="nsos-tab-close"
                        aria-label="Close tab"
                        onClick={() => closeTab(tid)}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="nsos-command-trigger"
                onClick={() => setPaletteOpen(true)}
              >
                <span>⌕</span>
                <span className="nsos-command-trigger-label">Ctrl/⌘+P</span>
              </button>
            </div>

            <div className="nsos-panels">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activePanel}
                  className="nsos-panel-frame"
                  variants={PANEL_TRANSITION}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <NsosPanelBody
                    panelId={activePanel}
                    openProject={openProject}
                    activePanel={activePanel}
                    openPanel={openPanel}
                    openExternal={openExternal}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="nsos-status-bar">
          <span className="nsos-ss">
            <span className="nsos-dg" /> connected
          </span>
          <span className="nsos-ss">UTF-8</span>
          <span className="nsos-ss">nsOS v2.7.0</span>
          <span className="nsos-ss" style={{ marginLeft: "auto" }}>
            {statusFile}
          </span>
          <span className="nsos-ss">Ln 1, Col 1</span>
        </div>
      </div>
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        entries={commandEntries}
      />
    </>
  );
}
