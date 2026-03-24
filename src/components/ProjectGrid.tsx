"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { DOMAIN_COLORS } from "@/data/domainColors";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <motion.article
          key={project.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="border border-white/5 bg-[#0d1117] p-6 transition-colors duration-300 hover:border-[#06b6d4]"
        >
          <p className="text-[10px] text-[#8892a4]">{project.number}</p>
          <h3 className="mt-2 font-[family:var(--font-display)] text-2xl">
            {project.title}
          </h3>

          <div className="mt-3 flex flex-wrap gap-2">
            {project.domains.map((domain) => (
              <span
                key={domain}
                className="border px-2 py-0.5 text-[9px] uppercase tracking-[0.1em]"
                style={{
                  borderColor: DOMAIN_COLORS[domain],
                  color: DOMAIN_COLORS[domain],
                }}
              >
                {domain}
              </span>
            ))}
          </div>

          <p className="mt-4 text-lg leading-8">{project.summary}</p>
          <p className="mt-2 text-sm leading-7 text-[#8892a4]">{project.detail}</p>

          <div className="mt-5 flex flex-wrap gap-8 border-t border-white/5 pt-5">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <p className="text-xl font-bold">{m.value}</p>
                <p className="text-[9px] uppercase tracking-[0.1em] text-[#8892a4]">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </motion.article>
      ))}
    </div>
  );
}
