"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
// import Scene from "./scene";

const useTypewriter = (text: string, speed = 100, delay = 800) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);
  return displayed;
};

const Hero: React.FC = () => {
  const typedLine = useTypewriter("hi, i'm Nikhil", 100, 1000);

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
          {typedLine}<span className="animate-pulse">|</span>
        </h1>

        {/* Replace your role or title here */}
        <h2 className="text-2xl md:text-3xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          fullstack + ai engineer
        </h2>

        {/* Replace this text with your short bio or tagline */}
        <p className="text-white max-w-lg mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          CS @ University of Florida. 
        </p>
        {/* <p>
          Currently, I'm a product manager at Florida Community Innovation, leading backend development for the Florida Resource Map, a platform connecting Floridians to local resources. 
          I'm passionate about leveraging technology to solve real-world problems and create impactful solutions in healthcare, education, policy, and much more.

        </p> */}
        <p>
          I build AI systems. Most interested in the places where AI meets biotech, healthcare, and policy, where one good system can reach millions. 
        </p>
        <p>
          Currently a product manager at Florida Community Innovation, leading backend development for the Florida Resource Map, a platform connecting Floridians to local resources.
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

        {/* Social Icons */}
        <div className="flex justify-center space-x-5 pt-4">
          <a
            href="https://www.linkedin.com/in/nikhilsangamkar/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#04D9FF] transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a
            href="https://github.com/NSang22"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#04D9FF] transition-colors duration-300"
            aria-label="GitHub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
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