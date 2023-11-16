"use client";

import ParticlesContainer from "@/components/particles-container";
import Transition from "@/components/transition";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const DescPage = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div key="desc" className="absolute h-full">
        <Transition />
      </motion.div>
      <div className="flex flex-col min-w-screen justify-center items-center mt-3">
        <h1 className="font-sora text-[70px] md:text-[80px] font-bold tracking-tight w-full bg-clip-text text-center text-transparent bg-gradient-to-tr  from-[#b3c8ff] via-[#467cff] to-[#0048ff] ">
          Description
        </h1>
        <div className="w-full font-spline text-base text-white">
          <p>djiajde ea eakifeljsmceicjiejfiajdaidjjdejdeidjejei dijdalasdei</p>
        </div>
      </div>
      <div className="absolute top-0 left-0 bottom-0 right-0 w-full">
        <ParticlesContainer />
      </div>
    </AnimatePresence>
  );
};

export default DescPage;
