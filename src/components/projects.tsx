"use client";

import React from "react";
import ScrollReveal from "./scrollReveal";

const projects = [
  {
    id: 1,
    title: "NeuroPhenotype",
    description: [
      "Multimodal rare disease diagnostic copilot fusing EEG, HRV, rPPG, speech, and motion into a 55-feature biomarker vector.",
      "Built custom battery-powered EEG signal chain + dual-architecture pipeline with XGBoost classifier and Claude API clinical intake.",
    ],
    technologies: ["Python", "Flask", "XGBoost", "Claude API", "MNE", "Arduino"],
  },
  {
    id: 2,
    title: "Buddy: Lock In",
    description: [
      "Multiplayer co-working platform with dual-layer AI focus tracking — MediaPipe client-side and Gemini Vision screen analysis.",
      "Real-time 3D study rooms with pet companions, Solana betting escrow, and ElevenLabs voice AI. Won 1st Place at UF SASE Hackathon.",
    ],
    technologies: ["React", "Node.js", "Socket.io", "Gemini", "Solana", "MongoDB"],
  },
  {
    id: 3,
    title: "PatchLab",
    description: [
      "Multimodal game playtesting platform fusing gameplay video, facial emotion inference, and Apple Watch biometrics into a unified timeline.",
      "Won Most Innovative Use of Sphinx at Hacklytics 2026.",
    ],
    technologies: ["Python", "React", "FastAPI", "Snowflake", "OpenCV", "MediaPipe"],
  },
  {
    id: 4,
    title: "BMO Care",
    description: [
      "AI pediatric hospital companion detecting pain and emotional distress in real time using computer vision and wearable sensor fusion.",
      "Integrated OpenCV facial analysis, Apple Watch biometrics, and voice AI on Raspberry Pi hardware for continuous bedside monitoring.",
    ],
    technologies: ["Python", "React", "OpenCV", "NLP", "Raspberry Pi"],
  },
  {
    id: 5,
    title: "DataSmart",
    description: [
      "Natural-language data marketplace with validated SQL generation, Snowflake query execution, and on-chain Solana micropayments.",
      "Won Best Use of Snowflake API at SwampHacks 2026 (300+ participants).",
    ],
    technologies: ["Python", "SQL", "Snowflake", "Solana", "FastAPI"],
  },
  {
    id: 6,
    title: "Florida Resource Map",
    description: [
      "RAG-powered civic-tech platform surfacing verified social services across Florida.",
      "Built LangChain scraping and validation pipelines for 500+ nonprofits.",
    ],
    technologies: ["LangChain", "Python", "RAG", "Web Scraping"],
  },
  {
    id: 7,
    title: "Project ALIGN",
    description: [
      "Evaluated AI-generated literacy stories against UF curriculum using ML and statistical modeling.",
      "Built XGBoost + PCA alignment scoring system across 1000+ stories, finding 74% alignment.",
    ],
    technologies: ["Python", "XGBoost", "PCA", "Scikit-learn"],
  },
  {
    id: 8,
    title: "Zika/Dengue Immune Analysis",
    description: [
      "Analyzed how prior dengue exposure alters immune gene expression in Zika-infected children.",
      "RNA-seq pipeline with DESeq2, GSEA pathway enrichment, spectral clustering, and classifiers.",
    ],
    technologies: ["R", "Python", "DESeq2", "GSEA", "Statistical Modeling"],
  },
];

const Projects: React.FC = () => {
  return (
    <section
      id="projects"
      className="min-h-screen text-white px-4 md:px-16 py-24"
    >
      <ScrollReveal>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          <span className="text-white">projects</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mx-auto">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-[#18181b] rounded-lg overflow-hidden shadow-lg p-4 md:p-6 flex flex-col justify-between min-h-[280px] md:min-h-[320px]"
            >
              <div>
                <h3 className="text-base md:text-lg font-semibold mb-1">
                  {project.title}
                </h3>
                <div className="flex flex-col gap-1 mb-2">
                  {project.description.map((line, i) => (
                    <p key={i} className="text-gray-400 text-sm md:text-base">
                      {line}
                    </p>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-[#111827] text-white px-2 py-0.5 rounded text-xs font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Projects;