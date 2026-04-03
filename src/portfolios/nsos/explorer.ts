import type { Project } from "@/data/projects";

export type PanelId =
  | "home"
  | "projects"
  | "about"
  | "experience"
  | "contact"
  | `project:${string}`;

export const TAB_DOT: Record<string, string> = {
  home: "var(--nsos-accent)",
  projects: "var(--nsos-info)",
  about: "var(--nsos-purple)",
  experience: "var(--nsos-warn)",
  contact: "var(--nsos-pink)",
};

export function tabDotForPanel(panelId: string): string {
  if (panelId.startsWith("project:")) {
    const id = panelId.slice("project:".length);
    if (id.includes("neuro") || id.includes("bmo") || id.includes("rna"))
      return "var(--nsos-pink)";
    if (id.includes("buddy") || id.includes("patch") || id.includes("florida"))
      return "var(--nsos-info)";
    return "var(--nsos-accent)";
  }
  return TAB_DOT[panelId] ?? "var(--nsos-text-muted)";
}

export function projectFileName(p: Project): string {
  const base = p.id.replace(/-/g, "_");
  const ext =
    p.domains.includes("biomedical") || p.domains.includes("bioinformatics")
      ? ".py"
      : ".ts";
  return `${base}${ext}`;
}

export function projectFolderKey(p: Project): "biotech" | "systems" {
  if (
    p.domains.includes("biomedical") ||
    p.domains.includes("bioinformatics")
  ) {
    return "biotech";
  }
  return "systems";
}

export function tabTitle(panelId: string, projects: Project[]): string {
  if (panelId === "home") return "home.tsx";
  if (panelId === "projects") return "index.tsx";
  if (panelId === "about") return "about.md";
  if (panelId === "experience") return "experience.log";
  if (panelId === "contact") return "contact.sh";
  if (panelId.startsWith("project:")) {
    const id = panelId.slice("project:".length);
    const p = projects.find((x) => x.id === id);
    return p ? projectFileName(p) : `${id}.ts`;
  }
  return "unknown";
}

export function breadcrumbSegments(
  panelId: string,
  projects: Project[],
): string[] {
  const root = "nikhil-portfolio";
  if (panelId === "home") return [root, "home.tsx"];
  if (panelId === "projects") return [root, "projects", "index.tsx"];
  if (panelId === "about") return [root, "about.md"];
  if (panelId === "experience") return [root, "experience.log"];
  if (panelId === "contact") return [root, "contact.sh"];
  if (panelId.startsWith("project:")) {
    const id = panelId.slice("project:".length);
    const p = projects.find((x) => x.id === id);
    if (!p) return [root, "projects", `${id}.ts`];
    const folder = projectFolderKey(p) === "biotech" ? "biotech" : "systems";
    return [root, "projects", folder, projectFileName(p)];
  }
  return [root];
}
