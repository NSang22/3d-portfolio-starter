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
    role: "AI and Backend Development Intern",
    org: "Florida Community Innovation Foundation",
    date: "2024 — Present",
    current: true,
    desc: "Owns backend direction for the Florida Resource Map: RAG pipelines, scalable APIs, and leading a six-person engineering effort.",
  },
  {
    role: "Scrum Master and Team Lead",
    org: "Project ALIGN, University of Florida",
    date: "2025",
    current: true,
    desc: "Literacy-alignment scoring: clustering, XGBoost, and evaluation design for AI-generated stories at scale.",
  },
  {
    role: "Research Intern",
    org: "Florida International University",
    date: "2023 — 2024",
    current: false,
    desc: "Bioinformatics-focused AI: domain-tuned language models and biological sequence analysis.",
  },
] as const;

export const nsosAboutWhoami = `Software engineer at the University of Florida, building the layer between ML research and shipping products — retrieval systems, backend infrastructure, and AI pipelines that hold up under real constraints.

I care most about biomedical signal fusion, civic data systems, and applied ML where the evaluation has to be honest.`;

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
