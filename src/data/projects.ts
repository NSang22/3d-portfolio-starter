import type { Domain } from "./domainColors";

export interface Project {
  id: string;
  number: string;
  title: string;
  domains: Domain[];
  summary: string;
  detail: string;
  metrics: { value: string; label: string }[];
  /** Shown in nsOS project detail when set */
  award?: string;
  /** Tech tags; falls back to metrics values in UI when omitted */
  stack?: string[];
}

export const projects: Project[] = [
  {
    id: "neurophenotype",
    number: "001",
    title: "NeuroPhenotype",
    domains: ["biomedical", "ml"],
    summary:
      "Multimodal rare disease diagnostic copilot fusing EEG, HRV, rPPG, speech, and motion into a 55-feature biomarker vector.",
    detail: "Custom EEG hardware + dual-arch XGBoost + Claude API intake.",
    metrics: [
      { value: "55", label: "features fused" },
      { value: "5", label: "signal modalities" },
      { value: "XGBoost", label: "architecture" },
    ],
  },
  {
    id: "rna-seq",
    number: "002",
    title: "Dengue/Zika RNA-seq Analysis",
    domains: ["bioinformatics", "data"],
    summary:
      "Differential gene expression analysis of immune response across Dengue and Zika infection using bulk RNA-seq.",
    detail:
      "End-to-end RNA-seq pipeline studying immune gene expression divergence between Dengue and Zika virus infection. Identified 48 differentially expressed genes, ran GSEA pathway enrichment, and built classifiers to distinguish infection type from transcriptomic signatures.",
    metrics: [
      { value: "48", label: "differentially expressed genes identified" },
      { value: "0.97", label: "infection-type classifier performance" },
      { value: "GSEA", label: "pathway enrichment analysis" },
      { value: "bulk RNA-seq", label: "sequencing modality" },
    ],
    stack: ["R", "DESeq2", "GSEA", "RNA-seq", "bioinformatics", "ggplot2"],
  },
  {
    id: "buddy",
    number: "003",
    title: "Buddy: Lock In",
    domains: ["ml", "data"],
    summary:
      "Multiplayer co-working with dual-layer AI focus tracking. Won 1st Place UF SASE Hackathon.",
    detail:
      "MediaPipe + Gemini for attention detection, Solana escrow for accountability stakes.",
    metrics: [
      { value: "MediaPipe + Gemini", label: "focus stack" },
      { value: "Solana escrow", label: "mechanism" },
      { value: "1st Place", label: "UF SASE" },
    ],
  },
  {
    id: "patchlab",
    number: "004",
    title: "PatchLab",
    domains: ["ml", "data"],
    summary:
      "Multimodal game playtesting platform. Won Most Innovative Use of Sphinx at Hacklytics 2026.",
    detail: "Video + biometrics + emotion analysis fused into Snowflake timeline.",
    metrics: [
      { value: "Video + biometrics", label: "input modalities" },
      { value: "Snowflake", label: "timeline storage" },
      { value: "Hacklytics 2026", label: "winner" },
    ],
  },
  {
    id: "bmo-care",
    number: "004",
    title: "BMO Care",
    domains: ["biomedical", "ml"],
    summary:
      "AI pediatric hospital companion with real-time pain and emotion detection.",
    detail:
      "OpenCV + Apple Watch sensor fusion on Raspberry Pi. Continuous bedside monitoring.",
    metrics: [
      { value: "OpenCV + Apple Watch", label: "sensor stack" },
      { value: "Raspberry Pi", label: "deployment" },
      { value: "Continuous", label: "bedside monitoring" },
    ],
  },
  {
    id: "datasmart",
    number: "006",
    title: "DataSmart",
    domains: ["data", "civic"],
    summary:
      "Natural-language data marketplace. Won Best Use of Snowflake API at SwampHacks 2026.",
    detail: "SQL + Snowflake backend, Solana micropayments, 300+ participants.",
    metrics: [
      { value: "SQL + Snowflake", label: "data layer" },
      { value: "Solana", label: "micropayments" },
      { value: "300+", label: "participants" },
    ],
  },
  {
    id: "florida-resource-map",
    number: "007",
    title: "Florida Resource Map",
    domains: ["civic", "data"],
    summary:
      "RAG-powered civic-tech platform surfacing verified social services across Florida.",
    detail: "LangChain pipelines, 500+ nonprofits validated, active deployment.",
    metrics: [
      { value: "500+", label: "nonprofits indexed" },
      { value: "LangChain", label: "RAG pipelines" },
      { value: "Active", label: "deployment" },
    ],
  },
];
