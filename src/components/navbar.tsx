"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
  return (
    <motion.nav
      // Animation: Slides down from top when page loads
      initial={{ y: -50, opacity: 0 }} // y: -50 = starts 50px above, opacity: 0 = invisible
      animate={{ y: 0, opacity: 1 }}   // y: 0 = normal position, opacity: 1 = fully visible
      transition={{ duration: 0.8 }}   // duration: 0.8 = animation takes 0.8 seconds
      className="fixed top-0 left-0 w-full z-50 bg-cyan-950/70 backdrop-blur-lg text-white border-b border-gray-800"
      // z-50 = high z-index to stay on top
      // bg-black/70 = black background with 70% opacity
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Replace your name or logo here */}
        <Link href="/" className="text-2xl font-bold text-[#111827]">
          Nikhil Sangamkar
        </Link>

        <div className="flex space-x-8 text-gray-300 font-medium">
          <Link href="#hero" className="hover:text-[#111827] transition-all">
            home
          </Link>
          <Link href="#experience" className="hover:text-[#111827] transition-all">
            experience
          </Link>
          <Link href="#projects" className="hover:text-[#111827] transition-all">
            projects
          </Link>
          <Link href="#skills" className="hover:text-[#111827] transition-all">
            skills
          </Link>
          <Link href="#education" className="hover:text-[#111827] transition-all">
            education
          </Link>
          <Link href="#contact" className="hover:text-[#111827] transition-all">
            contact
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;