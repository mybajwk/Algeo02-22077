"use client";

import Transition from "@/components/transition";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const AboutPage = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div key="about" className="absolute h-full">
        <Transition />
      </motion.div>
      <div className="w-full flex flex-row justify-center items-center">
        <h1 className="font-sora text-[80px] font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-tr  from-[#b3c8ff] via-[#467cff] to-[#0048ff]">
            About
          </span>{" "}
          Us
        </h1>
      </div>
    </AnimatePresence>
  );
};

export default AboutPage;
