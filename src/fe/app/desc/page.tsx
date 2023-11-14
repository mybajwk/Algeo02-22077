"use client";


import Transition from "@/components/transition";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const DescPage = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div key="desc" className="absolute h-full">
        <Transition />
      </motion.div>
      Desc
    </AnimatePresence>
  );
};

export default DescPage;
