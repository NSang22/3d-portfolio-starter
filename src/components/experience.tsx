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
        "Developing and optimizing data pipelines for the Florida Resource Map using LangChain and Retrieval-Augmented Generation to automate data collection and validation from 500+ nonprofits.",
        "Implementing web scraping and writing scripts to extract and clean nonprofit organization data, improving resource accuracy and accessibility.",
        "Engineering a validation system to verify LLM-generated information by cross-referencing sources, reducing misinformation and enhancing data reliability."
      ]
    },
    {
      title: "Scrum Master and Team Lead, Project ALIGN",
      company: "Virtual Learning Lab, University of Florida",
      location: "Gainesville, FL",
      period: "Jan. 2025 – Present",
      description: [
        "Leading the development of curriculum alignment evaluations for AI-generated stories using Agile methodologies to coordinate team workflows and ensure progress.",
        "Implementing machine learning and statistical techniques (clustering, XGBoost regression and classification, principal component analysis) to assess text alignment with the UF Literacy Institute Foundations curriculum.",
        "Presented work at the UF Spring Symposium."
      ]
    },
    {
      title: "Research Intern",
      company: "Florida International University",
      location: "Miami, FL",
      period: "May 2023 – Present",
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
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          <span className="text-[#111827]">experience</span>
        </h2>
      </ScrollReveal>

      <div className="max-w-4xl mx-auto space-y-8">
        {experiences.map((exp, index) => (
          <ScrollReveal key={index} delay={0.2 * index}>
            <div className="bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-[#111827]/20 transition-all">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-[#111827] mb-1">
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