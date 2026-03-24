"use client";

import { motion } from "framer-motion";

const capabilities = [
  "LLM systems and retrieval design",
  "Backend architecture for public-facing products",
  "Applied ML for healthcare and biotech",
  "Product-minded technical leadership",
];

export default function HeroAnimations() {
  return (
    <div className="space-y-10">
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="text-xs font-semibold uppercase tracking-[0.38em] text-[#8892a4]"
      >
        Software engineer · Applied AI · Backend systems
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
        className="space-y-6"
      >
        <h1 className="font-[family:var(--font-display)] text-5xl leading-[0.88] sm:text-6xl md:text-7xl lg:text-[5rem]">
          Nikhil
          <br />
          Sangamkar
        </h1>
        <p className="max-w-xl text-lg leading-8 text-[#8892a4]">
          I build the layer between ML research and working products —
          retrieval systems, backend infrastructure, and AI pipelines that hold up
          under real constraints.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.18, ease: "easeOut" }}
        className="flex flex-wrap items-center gap-4"
      >
        <a
          href="#selected-work"
          className="bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#050810] transition-colors duration-300 hover:bg-[#06b6d4]"
        >
          View Work
        </a>
        <a
          href="#contact"
          className="border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition-colors duration-300 hover:border-[#06b6d4] hover:text-[#06b6d4]"
        >
          Get in Touch
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.3, ease: "easeOut" }}
        className="grid grid-cols-1 gap-x-6 gap-y-3 border-t border-white/5 pt-6 sm:grid-cols-2"
      >
        {capabilities.map((cap) => (
          <p key={cap} className="text-sm text-[#8892a4]">
            — {cap}
          </p>
        ))}
      </motion.div>
    </div>
  );
}
