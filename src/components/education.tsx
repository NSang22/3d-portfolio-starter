"use client";

import React from "react";
import { GraduationCap, Award } from "lucide-react";
import ScrollReveal from "./scrollReveal";

const EducationSection: React.FC = () => {
  return (
    <section id="education" className="min-h-screen text-white px-8 md:px-16 py-24">
      <ScrollReveal>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            <span className="text-[#111827]">education</span>
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="max-w-3xl mx-auto bg-gray-900 rounded-xl border border-gray-800 hover:border-[#111827]/50 transition-all shadow-lg hover:shadow-[#111827]/20">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <GraduationCap className="text-[#111827] mr-3" size={24} />
              <div>
                <h3 className="text-xl font-bold text-white">University of Florida</h3>
                <p className="text-gray-300">Bachelors of Science in Computer Science</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-gray-200 font-medium">Expected May 2027</p>
                <p className="text-gray-200">GPA: 3.72</p>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold flex items-center mb-2 text-white">
                <Award className="text-[#111827] mr-1" size={18} />
                Honors & Achievements
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-sm rounded-md border border-[#111827]/30 bg-[#111827]/10 text-white">
                  Honors Program
                </span>
                <span className="px-3 py-1 text-sm rounded-md border border-[#111827]/30 bg-[#111827]/10 text-white">
                  University Research Scholars Program
                </span>
                <span className="px-3 py-1 text-sm rounded-md border border-[#111827]/30 bg-[#111827]/10 text-white">
                  Presidential Scholar
                </span>
                <span className="px-3 py-1 text-sm rounded-md border border-[#111827]/30 bg-[#111827]/10 text-white">
                  Benacquisto Scholar
                </span>
                <span className="px-3 py-1 text-sm rounded-md border border-[#111827]/30 bg-[#111827]/10 text-white">
                  National Merit Scholar
                </span>
                <span className="px-3 py-1 text-sm rounded-md border border-[#111827]/30 bg-[#111827]/10 text-white">
                  Deans List
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-white">Relevant Coursework</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                <div className="px-3 py-2 bg-gray-800 rounded-md border border-gray-700 text-sm">
                  Data Structures & Algorithms
                </div>
                <div className="px-3 py-2 bg-gray-800 rounded-md border border-gray-700 text-sm">
                  Programming in C++ and Python
                </div>
                <div className="px-3 py-2 bg-gray-800 rounded-md border border-gray-700 text-sm">
                  Linear Algebra
                </div>
                <div className="px-3 py-2 bg-gray-800 rounded-md border border-gray-700 text-sm">
                  Bioinformatics
                </div>
                <div className="px-3 py-2 bg-gray-800 rounded-md border border-gray-700 text-sm">
                  Computer Organization
                </div>
                <div className="px-3 py-2 bg-gray-800 rounded-md border border-gray-700 text-sm">
                  Computer Networks
                </div>
                <div className="px-3 py-2 bg-gray-800 rounded-md border border-gray-700 text-sm">
                  Discrete Structures
                </div>
                <div className="px-3 py-2 bg-gray-800 rounded-md border border-gray-700 text-sm">
                  Operating Systems
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default EducationSection;