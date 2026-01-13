"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "./scrollReveal";

// Replace with your actual project data
const projects = [
  {
    id: 1,
    title: "The Genome Project",
    description:
      "A disease prediction tool leveraging the Human Phenotype Ontology (HPO) database, mapping patient-reported symptoms to standardized medical terms and disease annotations.",
    image: "/images/thumbnaildora.png",
    technologies: ["Flask", "React", "Phrank", "HPO Database"],
    demoLink: "#",
    githubLink: "#",
  },
  {
    id: 2,
    title: "Firewatch",
    description:
      "A wildfire tracking platform designed for firefighters, authorities, and communities across the United States using the XWeather API to dynamically fetch fire reports.",
    image: "/images/thumbnaildora.png",
    technologies: ["MongoDB", "React", "Node.js", "Express.js", "Auth0"],
    demoLink: "#",
    githubLink: "#",
  },
  {
    id: 3,
    title: "Florida Resource Map",
    description:
      "Data pipelines for the Florida Resource Map using LangChain and Retrieval-Augmented Generation to automate data collection and validation from nonprofits.",
    image: "/images/thumbnaildora.png",
    technologies: ["LangChain", "Python", "Web Scraping", "RAG"],
    demoLink: "floridaresourcemap.org",
    githubLink: "#",
  },
  {
    id: 4,
    title: "Project ALIGN",
    description:
      "Curriculum alignment evaluations for AI-generated stories using machine learning and statistical techniques to assess alignment with the UF Literacy Institute Foundations curriculum.",
    image: "/images/thumbnaildora.png",
    technologies: ["XGBoost", "PCA", "Python", "Machine Learning"],
    demoLink: "#",
    githubLink: "#",
  },
];

const Projects: React.FC = () => {
  return (
    <section 
      id="projects" 
      className="min-h-screen text-white px-8 md:px-16 py-24"
    >
      <ScrollReveal>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="text-[#04D9FF]">projects</span>
        </h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {projects.map((project) => (
          <ScrollReveal 
            key={project.id} 
            delay={0.2 * project.id} // Stagger animation: project 1 = 0.2s, project 2 = 0.4s
          >
            <motion.div
              whileHover={{ scale: 1.03 }} // scale: 1.03 = grows to 103% size on hover
              // Try: 1.05 for more dramatic, 1.01 for subtle
              transition={{ duration: 0.3 }} // 0.3s hover animation
              className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-[#04D9FF]/20 transition-all"
            >
              <Image
                src={project.image}
                alt={project.title}
                width={800}
                height={450}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 space-y-3">
                <h3 className="text-2xl font-semibold">{project.title}</h3>
                <p className="text-gray-400">{project.description}</p>
                <a
                  href={"https://github.com/NSang22/3d-portfolio-starter/commits/main/"}
                  target="_blank"
                  className="inline-block mt-4 text-[#04D9FF] hover:underline"
                >
                  view project →
                </a>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default Projects;
