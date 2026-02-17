"use client";

import React from "react";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="text-white text-center py-8 border-t border-gray-800"
    >
      <p>
        © {new Date().getFullYear()}{" "}
        <span className="font-medium">Nikhil Sangamkar</span>. All rights reserved.
      </p>
    </motion.footer>
  );
};

export default Footer;