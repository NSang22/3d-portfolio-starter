/** Static copy for nsOS panels — tune without touching layout. */

/** Block “NSOS” — same style as prior NKOS art, with K → S */
export const NSOS_HOME_ASCII = ` ███╗   ██╗ ███████╗ ██████╗ ███████╗
 ████╗  ██║██╔════╝██╔═══██╗██╔════╝
 ██╔██╗ ██║███████╗██║   ██║███████╗
 ██║╚██╗██║╚════██║██║   ██║╚════██║
 ██║ ╚████║███████║╚██████╔╝███████║
 ╚═╝  ╚═══╝╚══════╝ ╚═════╝ ╚══════╝`;

export const nsosStats = [
  // { value: "3", label: "Hackathon wins" },
  // { value: "3x", label: "Worlds qualifier" },
  // { value: "600+", label: "Robotics hours" },
] as const;

export const nsosExperience = [
  {
    role: "Backend Team Lead",
    org: "Florida Community Innovation · FCI",
    date: "2024 — Present",
    current: true,
    desc: "Own backend direction for the Florida Resource Map. Built RAG pipelines and scalable APIs, leading a six-person engineering team. LangChain, vector search, production infrastructure.",
  },
  {
    role: "Computational Team Lead",
    org: "UF iGEM · University of Florida",
    date: "2026 - PRESENT",
    current: true,
    desc: "Leading computational work for UF's iGEM team. Protein structure prediction, biological sequence analysis, and ML-assisted design.",
  },
  {
    role: "Undergraduate Researcher",
    org: "UF Li Lab · University of Florida",
    date: "2025 — Present",
    current: true,
    desc: "Biomedical ML research. Biosignal processing, signal fusion pipelines, and applied machine learning for clinical inference tasks.",
  },
  {
    role: "Backend Developer",
    org: "Stealth Startup · Music Tech",
    date: "Summer 2025",
    current: false,
    desc: "Built backend infrastructure for a cross-platform music collaboration app. Real-time messaging, rate-limited content APIs, and ML recommendation endpoints. Served 400+ beta users.",
  },
  {
    role: "Scrum Master & Team Lead",
    org: "Project ALIGN · University of Florida",
    date: "2025",
    current: false,
    desc: "Led engineering effort for literacy-alignment scoring of AI-generated stories. Designed clustering pipeline, XGBoost classifier, and evaluation framework at scale.",
  },
  {
    role: "Research Intern",
    org: "FIU BioRG · Florida International University",
    date: "2023 — 2024",
    current: false,
    desc: "Bioinformatics-focused AI research. Domain-tuned language models and biological sequence analysis.",
  },
] as const;

export const nsosAboutWhoami = `CS + Math @ UF. Most of my work lives at the edge of biomedical ML, product management, and systems engineering.`;

export const nsosSkills = [
  "TypeScript",
  "Python",
  "React / Next.js",
  "Node.js",
  "PostgreSQL",
  "RAG / vector search",
  "XGBoost",
  "PyTorch",
  "Docker",
  "Git",
] as const;

export const nsosBeyond = `Hackathon builder across biotech, ML, and systems tracks. Robotics competition background with long hours on competition floors and in the pit.`;

export const nsosLinks = {
  email: "nsangamkar1222@gmail.com",
  github: "https://github.com/NSang22",
  linkedin: "https://www.linkedin.com/in/nikhilsangamkar/",
};
