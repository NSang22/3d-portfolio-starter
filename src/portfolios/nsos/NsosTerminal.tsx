"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { projectFileName, projectFolderKey } from "@/portfolios/nsos/explorer";

type TerminalEntry =
  | { kind: "command"; prompt: string; text: string }
  | { kind: "output"; lines: string[] }
  | { kind: "error"; lines: string[] };

type FolderNode = {
  type: "folder";
  name: string;
  children: FsNode[];
};

type FileNode = {
  type: "file";
  name: string;
  content: string[];
  panelId?: string;
};

type LinkNode = {
  type: "link";
  name: string;
  href: string;
};

type FsNode = FolderNode | FileNode | LinkNode;

type ResolvedNode = {
  node: FsNode;
  path: string;
};

type Props = {
  projects: Project[];
  activePanel: string;
  openPanel: (panelId: string) => void;
  openExternal: (url: string) => void;
  embedded?: boolean;
};

const ROOT_NAME = "nikhil-portfolio";
const TERMINAL_COMMANDS = [
  "help",
  "pwd",
  "ls",
  "cd",
  "cat",
  "open",
  "tree",
  "clear",
  "mkdir",
  "touch",
] as const;

function buildFileSystem(projects: Project[]): FolderNode {
  const biotechProjects = projects
    .filter((project) => projectFolderKey(project) === "biotech")
    .map<FileNode>((project) => ({
      type: "file",
      name: projectFileName(project),
      panelId: `project:${project.id}`,
      content: [
        `${project.title} (${project.number})`,
        "",
        project.summary,
        project.detail,
        "",
        "metrics:",
        ...project.metrics.map((metric) => `- ${metric.value}: ${metric.label}`),
      ],
    }));

  const systemsProjects = projects
    .filter((project) => projectFolderKey(project) === "systems")
    .map<FileNode>((project) => ({
      type: "file",
      name: projectFileName(project),
      panelId: `project:${project.id}`,
      content: [
        `${project.title} (${project.number})`,
        "",
        project.summary,
        project.detail,
        "",
        "metrics:",
        ...project.metrics.map((metric) => `- ${metric.value}: ${metric.label}`),
      ],
    }));

  return {
    type: "folder",
    name: ROOT_NAME,
    children: [
      {
        type: "file",
        name: "home.tsx",
        panelId: "home",
        content: [
          "Landing page for the nsOS portfolio.",
          "Animated hero, live mission terminal, and headline stats.",
        ],
      },
      {
        type: "file",
        name: "mission.txt",
        content: [
          "building the engineering layer between AI and the real world",
          "shipping retrieval, backends, and signal pipelines that hold up",
          "currently exploring biomedical inference, civic systems, and applied ML",
        ],
      },
      {
        type: "folder",
        name: "projects",
        children: [
          {
            type: "folder",
            name: "biotech",
            children: biotechProjects,
          },
          {
            type: "folder",
            name: "systems",
            children: systemsProjects,
          },
          {
            type: "file",
            name: "index.tsx",
            panelId: "projects",
            content: [
              "Portfolio project index.",
              `${projects.length} projects grouped into biotech and systems.`,
            ],
          },
        ],
      },
      {
        type: "file",
        name: "about.md",
        panelId: "about",
        content: [
          "Software engineer at the University of Florida.",
          "Focus areas: biomedical signal fusion, civic data systems, applied ML.",
        ],
      },
      {
        type: "file",
        name: "experience.log",
        panelId: "experience",
        content: [
          "Florida Community Innovation Foundation - AI and Backend Development Intern",
          "Project ALIGN - Scrum Master and Team Lead",
          "Florida International University - Research Intern",
        ],
      },
      {
        type: "file",
        name: "contact.sh",
        panelId: "contact",
        content: [
          "email: nsangamkar1222@gmail.com",
          "github: https://github.com/NSang22",
          "linkedin: https://www.linkedin.com/in/nikhilsangamkar/",
        ],
      },
      {
        type: "folder",
        name: ".config",
        children: [
          {
            type: "file",
            name: ".env.local",
            content: ["redacted", "Runtime secrets stay off the public shell."],
          },
          {
            type: "file",
            name: "tsconfig.json",
            content: [
              "{",
              '  "compilerOptions": { "strict": true }',
              "}",
            ],
          },
        ],
      },
      {
        type: "folder",
        name: "links",
        children: [
          { type: "link", name: "github", href: "https://github.com/NSang22" },
          {
            type: "link",
            name: "linkedin",
            href: "https://www.linkedin.com/in/nikhilsangamkar/",
          },
          {
            type: "link",
            name: "email",
            href: "mailto:nsangamkar1222@gmail.com",
          },
        ],
      },
      {
        type: "file",
        name: "README.md",
        content: [
          "nsOS virtual filesystem.",
          "Use help, ls, cd, pwd, cat, open, tree, clear.",
        ],
      },
    ],
  };
}

function splitPath(path: string): string[] {
  return path.split("/").filter(Boolean);
}

function joinPath(parts: string[]): string {
  return `/${parts.join("/")}`;
}

function resolveSegments(cwd: string, input: string): string[] {
  const raw = input.trim();
  const base = raw.startsWith("/") ? [] : splitPath(cwd);
  const incoming = splitPath(raw);
  const next = [...base];

  incoming.forEach((segment) => {
    if (segment === "." || segment === "") return;
    if (segment === "..") {
      if (next.length > 1) next.pop();
      return;
    }
    next.push(segment);
  });

  if (next.length === 0) return [ROOT_NAME];
  if (next[0] !== ROOT_NAME) return [ROOT_NAME, ...next];
  return next;
}

function resolveNode(root: FolderNode, cwd: string, input?: string): ResolvedNode | null {
  const targetPath = input && input.trim() ? joinPath(resolveSegments(cwd, input)) : cwd;
  const segments = splitPath(targetPath);
  if (segments[0] !== root.name) return null;

  let current: FsNode = root;
  for (const segment of segments.slice(1)) {
    if (current.type !== "folder") return null;
    const childNode: FsNode | undefined = current.children.find(
      (child) => child.name === segment,
    );
    if (!childNode) return null;
    current = childNode;
  }

  return { node: current, path: joinPath(segments) };
}

function formatNodeName(node: FsNode): string {
  if (node.type === "folder") return `${node.name}/`;
  if (node.type === "link") return `${node.name}@`;
  return node.name;
}

function printTree(node: FsNode, depth = 0): string[] {
  const indent = "  ".repeat(depth);
  const lines = [`${indent}${formatNodeName(node)}`];
  if (node.type !== "folder") return lines;
  node.children.forEach((child) => {
    lines.push(...printTree(child, depth + 1));
  });
  return lines;
}

function tokenize(input: string): string[] {
  return input.trim().split(/\s+/).filter(Boolean);
}

function promptForPath(path: string): string {
  return `nikhil@nsos:${path.replace(`/${ROOT_NAME}`, "~")}$`;
}

function splitPathInput(value: string): { directory: string; partial: string } {
  const slashIndex = value.lastIndexOf("/");
  if (slashIndex === -1) {
    return { directory: "", partial: value };
  }
  return {
    directory: value.slice(0, slashIndex + 1),
    partial: value.slice(slashIndex + 1),
  };
}

function getPathSuggestions(root: FolderNode, cwd: string, value: string): string[] {
  const { directory, partial } = splitPathInput(value);
  const resolved = resolveNode(root, cwd, directory || ".");
  if (!resolved || resolved.node.type !== "folder") {
    return [];
  }

  return resolved.node.children
    .filter((child) => child.name.startsWith(partial))
    .map((child) => `${directory}${child.name}${child.type === "folder" ? "/" : ""}`);
}

export default function NsosTerminal({
  projects,
  activePanel,
  openPanel,
  openExternal,
  embedded = false,
}: Props) {
  const root = useMemo(() => buildFileSystem(projects), [projects]);
  const [cwd, setCwd] = useState(`/${ROOT_NAME}`);
  const [input, setInput] = useState("");
  const [entries, setEntries] = useState<TerminalEntry[]>([
    {
      kind: "output",
      lines: [
        "nsOS terminal ready. Type `help` to explore the portfolio like a filesystem.",
      ],
    },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [position, setPosition] = useState({ x: 22, y: 22 });
  const [size, setSize] = useState({ width: 620, height: 300 });
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragStateRef = useRef<
    | { kind: "move"; startX: number; startY: number; originX: number; originY: number }
    | {
        kind: "resize";
        startX: number;
        startY: number;
        originWidth: number;
        originHeight: number;
      }
    | null
  >(null);

  useEffect(() => {
    if (!collapsed) {
      bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
    }
  }, [collapsed, entries]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const drag = dragStateRef.current;
      if (!drag) return;

      if (drag.kind === "move") {
        setPosition({
          x: Math.max(8, drag.originX + event.clientX - drag.startX),
          y: Math.max(8, drag.originY + event.clientY - drag.startY),
        });
      }

      if (drag.kind === "resize") {
        setSize({
          width: Math.max(360, drag.originWidth + event.clientX - drag.startX),
          height: Math.max(190, drag.originHeight + event.clientY - drag.startY),
        });
      }
    };

    const stopDragging = () => {
      dragStateRef.current = null;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopDragging);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", stopDragging);
    };
  }, []);

  const currentPrompt = promptForPath(cwd);

  const appendEntries = (nextEntries: TerminalEntry[]) => {
    setEntries((prev) => [...prev, ...nextEntries]);
  };

  const runCommand = (commandText: string) => {
    const trimmed = commandText.trim();
    const nextEntries: TerminalEntry[] = [
      { kind: "command", prompt: currentPrompt, text: commandText },
    ];

    if (!trimmed) {
      appendEntries(nextEntries);
      return;
    }

    const [command, ...args] = tokenize(trimmed);

    if (command === "help") {
      nextEntries.push({
        kind: "output",
        lines: [
          "Available commands:",
          "help, pwd, ls [path], cd <path>, cat <file>, open <target>, tree [path], mkdir <dir>, touch <file>, clear",
          "Tips:",
          "- cd projects/biotech",
          "- open neurophenotype.py",
          "- open github",
          "- cat mission.txt",
        ],
      });
      appendEntries(nextEntries);
      return;
    }

    if (command === "clear") {
      setEntries([]);
      return;
    }

    if (command === "pwd") {
      nextEntries.push({ kind: "output", lines: [cwd] });
      appendEntries(nextEntries);
      return;
    }

    if (command === "ls") {
      const resolved = resolveNode(root, cwd, args[0]);
      if (!resolved) {
        nextEntries.push({
          kind: "error",
          lines: [`ls: cannot access '${args[0]}': No such file or directory`],
        });
      } else if (resolved.node.type === "folder") {
        nextEntries.push({
          kind: "output",
          lines: resolved.node.children.map((child) => formatNodeName(child)),
        });
      } else {
        nextEntries.push({ kind: "output", lines: [formatNodeName(resolved.node)] });
      }
      appendEntries(nextEntries);
      return;
    }

    if (command === "tree") {
      const resolved = resolveNode(root, cwd, args[0]);
      if (!resolved) {
        nextEntries.push({
          kind: "error",
          lines: [`tree: '${args[0]}': No such file or directory`],
        });
      } else {
        nextEntries.push({ kind: "output", lines: printTree(resolved.node) });
      }
      appendEntries(nextEntries);
      return;
    }

    if (command === "cd") {
      const target = args[0] ?? `/${ROOT_NAME}`;
      const resolved = resolveNode(root, cwd, target);
      if (!resolved || resolved.node.type !== "folder") {
        nextEntries.push({
          kind: "error",
          lines: [`cd: ${target}: No such directory`],
        });
        appendEntries(nextEntries);
        return;
      }
      setCwd(resolved.path);
      appendEntries(nextEntries);
      return;
    }

    if (command === "cat") {
      const target = args[0];
      const resolved = resolveNode(root, cwd, target);
      if (!target || !resolved || resolved.node.type !== "file") {
        nextEntries.push({
          kind: "error",
          lines: [`cat: ${target ?? ""}: No such file`],
        });
      } else {
        nextEntries.push({ kind: "output", lines: resolved.node.content });
      }
      appendEntries(nextEntries);
      return;
    }

    if (command === "open") {
      const target = args[0];
      const resolved = resolveNode(root, cwd, target);
      if (!target || !resolved) {
        nextEntries.push({
          kind: "error",
          lines: [`open: ${target ?? ""}: No such target`],
        });
        appendEntries(nextEntries);
        return;
      }

      if (resolved.node.type === "folder") {
        setCwd(resolved.path);
        nextEntries.push({ kind: "output", lines: [`Entered ${resolved.path}`] });
      } else if (resolved.node.type === "link") {
        openExternal(resolved.node.href);
        nextEntries.push({
          kind: "output",
          lines: [`Opening ${resolved.node.name}...`],
        });
      } else if (resolved.node.panelId) {
        openPanel(resolved.node.panelId);
        nextEntries.push({
          kind: "output",
          lines: [`Opened ${resolved.node.name}`],
        });
      } else {
        nextEntries.push({ kind: "output", lines: resolved.node.content });
      }

      appendEntries(nextEntries);
      return;
    }

    if (command === "mkdir") {
      const name = args[0] ?? "new-idea";
      nextEntries.push({
        kind: "output",
        lines: [
          `mkdir: created virtual directory '${name}'`,
          "sandbox note: this shell is read-only, but the ambition is appreciated.",
        ],
      });
      appendEntries(nextEntries);
      return;
    }

    if (command === "touch") {
      const name = args[0] ?? "experiment.md";
      nextEntries.push({
        kind: "output",
        lines: [
          `touch: updated '${name}' at ${new Date().toLocaleTimeString()}`,
          "no-op easter egg: nothing was written, but the file has strong potential energy.",
        ],
      });
      appendEntries(nextEntries);
      return;
    }

    nextEntries.push({
      kind: "error",
      lines: [`${command}: command not found`, "Try `help`."],
    });
    appendEntries(nextEntries);
  };

  const attemptCompletion = () => {
    const trimmedLeft = input.trimStart();
    const endsWithSpace = /\s$/.test(input);
    const tokens = tokenize(trimmedLeft);

    if (tokens.length === 0) {
      return;
    }

    if (tokens.length === 1 && !endsWithSpace) {
      const matches = TERMINAL_COMMANDS.filter((command) =>
        command.startsWith(tokens[0]),
      );
      if (matches.length === 1) {
        setInput(`${matches[0]} `);
        return;
      }
      if (matches.length > 1) {
        appendEntries([{ kind: "output", lines: matches }]);
      }
      return;
    }

    const command = tokens[0];
    const pathCommands = new Set(["cd", "ls", "cat", "open", "tree", "touch", "mkdir"]);
    if (!pathCommands.has(command)) {
      return;
    }

    const pathValue = endsWithSpace ? "" : tokens[tokens.length - 1] ?? "";
    const suggestions = getPathSuggestions(root, cwd, pathValue);
    if (suggestions.length === 1) {
      const completed = suggestions[0] ?? pathValue;
      const prefix = endsWithSpace ? input : input.slice(0, input.length - pathValue.length);
      setInput(`${prefix}${completed}${completed.endsWith("/") ? "" : " "}`);
      return;
    }
    if (suggestions.length > 1) {
      appendEntries([{ kind: "output", lines: suggestions }]);
    }
  };

  return (
    <div
      className={`nsos-terminal-dock ${embedded ? "embedded" : ""} ${collapsed ? "collapsed" : ""}`}
      style={
        embedded || collapsed
          ? undefined
          : {
              left: position.x,
              top: position.y,
              width: size.width,
              height: size.height,
            }
      }
    >
      <div
        className="nsos-terminal-topbar"
        onPointerDown={(event) => {
          if (embedded) return;
          if (window.innerWidth <= 768) return;
          dragStateRef.current = {
            kind: "move",
            startX: event.clientX,
            startY: event.clientY,
            originX: position.x,
            originY: position.y,
          };
        }}
      >
        <div className="nsos-terminal-titlegroup">
          <span className="nsos-terminal-title">terminal</span>
          <span className="nsos-terminal-hint">
            real commands: `ls`, `cd`, `open`, `cat`
          </span>
        </div>
        <div className="nsos-terminal-actions">
          <span className="nsos-terminal-active">
            active:{" "}
            {activePanel.startsWith("project:")
              ? activePanel.replace("project:", "")
              : activePanel}
          </span>
          {!embedded && (
            <button
              type="button"
              className="nsos-terminal-toggle"
              onPointerDown={(event) => event.stopPropagation()}
              onClick={() => {
                setCollapsed((prev) => !prev);
                window.setTimeout(() => inputRef.current?.focus(), 0);
              }}
            >
              {collapsed ? "expand" : "collapse"}
            </button>
          )}
        </div>
      </div>

      {!collapsed && (
        <>
          <div ref={bodyRef} className="nsos-terminal-body">
            {entries.map((entry, index) => (
              <div
                key={`${entry.kind}-${index}`}
                className={`nsos-terminal-entry ${entry.kind}`}
              >
                {entry.kind === "command" ? (
                  <div className="nsos-terminal-commandline">
                    <span className="nsos-terminal-prompt">{entry.prompt}</span>
                    <span>{entry.text}</span>
                  </div>
                ) : (
                  entry.lines.map((line, lineIndex) => (
                    <div
                      key={`${index}-${lineIndex}`}
                      className={`nsos-terminal-line ${
                        index === 0 &&
                        lineIndex === 0 &&
                        line.includes("nsOS terminal ready.")
                          ? "nsos-terminal-line-intro"
                          : ""
                      }`}
                    >
                      {line}
                    </div>
                  ))
                )}
              </div>
            ))}
          </div>

          <form
            className="nsos-terminal-inputrow"
            onSubmit={(event) => {
              event.preventDefault();
              const value = input;
              if (value.trim()) {
                setHistory((prev) => [...prev, value]);
              }
              setHistoryIndex(null);
              setInput("");
              runCommand(value);
            }}
          >
            <span className="nsos-terminal-prompt">{currentPrompt}</span>
            <input
              ref={inputRef}
              className="nsos-terminal-input"
              value={input}
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              aria-label="nsOS terminal input"
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "ArrowUp") {
                  event.preventDefault();
                  if (history.length === 0) return;
                  const nextIndex =
                    historyIndex === null
                      ? history.length - 1
                      : Math.max(0, historyIndex - 1);
                  setHistoryIndex(nextIndex);
                  setInput(history[nextIndex] ?? "");
                }

                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  if (history.length === 0 || historyIndex === null) return;
                  const nextIndex = historyIndex + 1;
                  if (nextIndex >= history.length) {
                    setHistoryIndex(null);
                    setInput("");
                    return;
                  }
                  setHistoryIndex(nextIndex);
                  setInput(history[nextIndex] ?? "");
                }

                if (event.key === "Tab") {
                  event.preventDefault();
                  attemptCompletion();
                }
              }}
            />
          </form>
          {!embedded && (
            <button
              type="button"
              className="nsos-terminal-resize"
              aria-label="Resize terminal"
              onPointerDown={(event) => {
                event.stopPropagation();
                if (window.innerWidth <= 768) return;
                dragStateRef.current = {
                  kind: "resize",
                  startX: event.clientX,
                  startY: event.clientY,
                  originWidth: size.width,
                  originHeight: size.height,
                };
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
