"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
// import Scene from "./scene";

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center text-white px-8 md:px-16 pt-20 overflow-hidden"
    >
      {/* ===================== LEFT SIDE: TEXT ===================== */}
      <motion.div
        // Animation: Fades in and scales up from center
        initial={{ opacity: 0, scale: 0.9 }}  // scale: 0.9 = starts at 90% size
        animate={{ opacity: 1, scale: 1 }}    // scale: 1 = normal size (100%)
        transition={{ duration: 1 }}      // duration: 1 = takes 1 second
        className="space-y-6 text-center max-w-2xl"
      >
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex justify-center mb-8"
        >
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[#111827] shadow-lg">
            <Image
              src="/images/nik_headshot-modified.png"
              alt="Nikhil Sangamkar"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Replace your name here */}
        <h1 className="text-5xl md:text-7xl font-bold leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          hi, i&apos;m <span className="text-[#111827]">Nikhil</span>
        </h1>

        {/* Replace your role or title here */}
        <h2 className="text-2xl md:text-3xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          fullstack + ai engineer
        </h2>

        {/* Replace this text with your short bio or tagline */}
        <p className="text-white max-w-lg mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          a Computer Science student at the University of Florida with a focus on AI, machine learning, and full-stack development. Aspiring to eventually work in industry research.
        </p>

        {/* Customize your buttons and links here */}
        <div className="flex justify-center space-x-6 pt-6">
          <a
            href="#projects"
            className="px-6 py-3 bg-[#111827] text-white font-semibold rounded-lg hover:bg-gray-800 transition-all"
          >
            view my work
          </a>
          <a
            href="#contact"
            className="px-6 py-3 bg-[#111827] text-white font-semibold rounded-lg hover:bg-gray-800 transition-all"
          >
            contact me
          </a>
        </div>
      </motion.div>

      {/* ===================== RIGHT SIDE: 3D MODEL ===================== */}
      {/* <motion.div
        // Animation: Fades in and scales up
        initial={{ opacity: 0, scale: 0.9 }}   // scale: 0.9 = starts at 90% size
        animate={{ opacity: 1, scale: 1 }}     // scale: 1 = normal size (100%)
        transition={{ delay: 0.4, duration: 1 }} // delay: 0.4 = waits 0.4s before starting
        className="flex-1 flex justify-center items-center"
      >
        <Scene />
      </motion.div> */}
    </section>
  );
};

export default Hero;