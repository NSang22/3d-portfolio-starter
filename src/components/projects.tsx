"use client";

import React from "react";
import ScrollReveal from "./scrollReveal";

// Replace with your actual project data
const projects = [
  {
    id: 1,
    title: "Florida Resource Map",
    description:
      "A civic-tech platform that aggregates and surfaces verified social services across Florida, helping communities access housing, food, healthcare, and legal aid.",
    technologies: ["LangChain", "Python", "Web Scraping", "RAG"],
    demoLink: "https://www.floridaresourcemap.org/",
  },
  {
    id: 4,
    title: "Project ALIGN",
    description:
      "Curriculum alignment evaluations for AI-generated stories using machine learning and statistical techniques to assess alignment with the UF Literacy Institute Foundations curriculum.",
    technologies: ["XGBoost", "PCA", "Python", "Machine Learning"],
  },
  {
    id: 5,
    title: "DataSmart",
    description:
      "A data-driven decision support tool that transforms raw public datasets into actionable insights through cleaning, aggregation, and analysis pipelines. The project emphasizes data quality, interpretability, and practical analytics over black-box modeling.",
    technologies: ["Python", "Pandas", "SQL", "Data Analysis"],
  },
  {
    id: 7,
    title: "AORA",
    description:
      "An AI-powered productivity assistant that unifies calendars, email, tasks, and meetings into a single conversational interface. Features a modular backend architecture enabling natural-language actions like scheduling, reminders, and follow-ups across multiple services.",
    technologies: ["Python", "NLP", "REST APIs", "LLMs"],
  },
  {
    id: 3,
    title: "The Genome Project",
    description:
      "A disease prediction and diagnosis tool leveraging the Human Phenotype Ontology (HPO) database, mapping patient-reported symptoms to standardized medical terms and disease annotations.",
    technologies: ["Flask", "React", "Phrank", "HPO Database"],
    demoLink: "#",
    githubLink: "#",
  },
  {
    id: 6,
    title: "Skylink",
    description:
      "A C++ flight-route planner that computes optimal itineraries using graph algorithms (A* and Dijkstra) over large-scale airline and delay datasets. The system ranks routes by total travel time and delay risk using real-world aviation data.",
    technologies: ["C++", "A*", "Dijkstra", "Graph Algorithms"],
  },
  {
    id: 2,
    title: "Firewatch",
    description:
      "A wildfire tracking platform designed for firefighters, authorities, and communities across the United States using the XWeather API to dynamically fetch fire reports.",
    technologies: ["MongoDB", "React", "Node.js", "Express.js", "Auth0"],
    demoLink: "https://devpost.com/software/firewatch-1gwft9",
    githubLink: "https://github.com/Seedname/SwamphacksX",
  },
  {
    id: 8,
    title: "Bioinformatics Project – Zika/Dengue Prior Exposure",
    description:
      "A computational biology study analyzing how prior dengue exposure influences immune response to Zika infection. Involves data analysis and modeling to identify patterns in cross-reactive immunity using biological and clinical datasets.",
    technologies: ["R", "Python", "Bioinformatics", "Statistical Modeling"],
  },
];

const Projects: React.FC = () => {
  return (
    <section
      id="projects"
      className="min-h-screen text-white px-8 md:px-16 py-24"
    >
      <ScrollReveal>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          <span className="text-[#111827]">projects</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mx-auto">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-[#18181b] rounded-lg overflow-hidden shadow-lg p-6 flex flex-col justify-between min-h-[320px]"
            >
              <div>
                <h3 className="text-base md:text-lg font-semibold mb-1">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base line-clamp-6 mb-2">
                  {project.description}
                </p>
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
              <div className="flex gap-3">
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#111827] hover:underline text-sm"
                  >
                    Live Demo
                  </a>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#111827] hover:underline text-sm"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Projects;
