"use client";

import ParticlesContainer from "@/components/particles-container";
import Transition from "@/components/transition";
import { motion, AnimatePresence } from "framer-motion";
import Spline from "@splinetool/react-spline";

export default function Home() {
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div key="home" className="h-full">
          <Transition />
        </motion.div>

        <div className="relative flex min-h-[650px] w-full flex-row pr-0 items-center gap-3 justify-between z-[700]">
          <div className="flex w-[45%] flex-col font-spline z-[900]">
            <h3 className="text-[25px]">Selamat datang di</h3>
            <h1 className="text-[100px] font-sora font-bold leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-tr  from-[#b3c8ff] via-[#467cff] to-[#0048ff]">
              VisuMatch
            </h1>
            <p className="text-lg font-spline font-[600]">
              Temukan Foto Serupa dengan Teknologi Terkini. Pencarian Gambar
              Cepat dan Akurat dengan Visumatch
            </p>
          </div>
          <div className="absolute md:-right-[400px] lg:-right-[300px] big:-right-52 -top-[160px] z-[800]">
            <Spline className="scale-[0.3] md:scale-[0.5] lg:scale-[0.7] big:scale-[1]" scene="https://prod.spline.design/at4cKGubIV49QRSk/scene.splinecode" />
          </div> 
        </div>

        <div className="absolute top-[30px] left-0 bottom-0 right-0 w-full">
          <ParticlesContainer />
        </div>
      </AnimatePresence>
    </>
  );
}
