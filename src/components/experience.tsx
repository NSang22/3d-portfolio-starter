"use client";

import React from "react";
import ScrollReveal from "./scrollReveal";

const ExperienceSection: React.FC = () => {
  const experiences = [
    {
      title: "AI and Backend Development Intern",
      company: "Florida Community Innovation Foundation",
      location: "Gainesville, FL",
      period: "Oct. 2024 – Present",
      description: [
        "Leading the backend team of 6 developers on the Florida Resource Map, owning technical roadmap, task delegation, and cross-team coordination to deliver scalable backend systems.",
        "Translate product requirements into backend execution, guiding API design, data workflows, and technical decisions.",
        "Previously built LangChain + RAG data pipelines automating data collection and validation for 500+ nonprofits, improving data accuracy and reliability."
      ]
    },
    {
      title: "Scrum Master and Team Lead, Project ALIGN",
      company: "Virtual Learning Lab, University of Florida",
      location: "Gainesville, FL",
      period: "Jan. 2025 – May 2025",
      description: [
        "Led the development of curriculum alignment evaluations for AI-generated stories using Agile methodologies to coordinate team workflows and ensure progress.",
        "Implemented machine learning and statistical techniques (clustering, XGBoost, principal component analysis) to assess text alignment with the UF Literacy Institute Foundations curriculum.",
        "Used Scikit-learn libraries to create regression and classification models for alignment over 1000+ stories, found 74% alignment.",
        "Presented findings at the Spring Symposium."
      ]
    },
    {
      title: "Research Intern",
      company: "Florida International University",
      location: "Miami, FL",
      period: "May 2023 – Aug. 2024",
      description: [
        "Conducting research on AI applications in bioinformatics, exploring LLMs, NLP, and robotics.",
        "Developing a bioinformatics-focused domain-specific LLM in collaboration with graduate researchers, contributing to model fine-tuning and evaluation.",
        "Applying machine learning techniques, including time series analysis and protein modeling, using PyTorch to extract insights from biological data."
      ]
    }
  ];

  return (
    <section
      id="experience"
      className="min-h-screen text-white px-8 md:px-16 py-24"
    >
      <ScrollReveal>
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          experience
        </h2>
      </ScrollReveal>

      <div className="max-w-4xl mx-auto space-y-8">
        {experiences.map((exp, index) => (
          <ScrollReveal key={index} delay={0.2 * index}>
            <div className="bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-[#111827]/20 transition-all">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {exp.title}
                  </h3>
                  <p className="text-lg text-gray-300 mb-1">
                    {exp.company}
                  </p>
                  <p className="text-sm text-gray-400">
                    {exp.location} • {exp.period}
                  </p>
                </div>
              </div>
              <ul className="space-y-2">
                {exp.description.map((desc, descIndex) => (
                  <li key={descIndex} className="flex items-start">
                    <span className="text-[#111827] mr-3 mt-1">•</span>
                    <span className="text-gray-300">{desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;