"use client";

import Hero from "@/components/hero";
import HowToUse from "@/components/how-to-use";
import Transition from "@/components/transition";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div key="home" className="absolute h-full">
          <Transition />
        </motion.div>

        <Hero />
        <HowToUse />
      </AnimatePresence>
    </>
  );
}
