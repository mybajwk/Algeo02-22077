"use client";

import DevCard from "@/components/dev-card";
import ParticlesContainer from "@/components/particles-container";
import Transition from "@/components/transition";
import Spline from "@splinetool/react-spline";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const AboutPage = () => {
  const developers = [
    {
      name: "Mesach Harmasendro",
      NIM: "13522117",
      github: "https://github.com/Otzzu",
      instagram: "https://www.instagram.com/mesach31804/",
      photo: "/mesach-foto.jpg",
      linkedin: "https://www.linkedin.com/in/mesach-harmasendro-66ba70218/",
    },
    {
      name: "Naufal Adnan",
      NIM: "13522116",
      github: "https://github.com/nanthedom",
      instagram: "https://www.instagram.com/naufaladnannn/",
      photo: "",
      linkedin: "",
    },
    {
      name: "Enrique Yanuar",
      NIM: "13522077",
      github: "https://github.com/mybajwk",
      instagram: "https://www.instagram.com/enriqueyanuar/",
      photo: "",
      linkedin: "",
    },
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div key="about" className="absolute h-full">
        <Transition />
      </motion.div>
      <div className="relative w-full flex flex-col mt-5 justify-center items-center ">
        <div className="w-full text-center">
          <h1 className="w-full font-sora text-[70px] md:text-[80px] font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-tr  from-[#b3c8ff] via-[#467cff] to-[#0048ff]">
              About
            </span>{" "}
            Us
          </h1>
        </div>
        <div className="w-full text-center">
          <p className="font-spline text-base md:text-lg">
            Website ini adalah website yang kami buat untuk memenuhi tugas besar
            2 mata kuliah Aljabar Linear dan Geometri. Kami membuat website ini
            dengan menggunakan Next.js dan react untuk frontendnya dan
            menggunakan bahasa golang dengan framework gin gonic untuk
            backendnya.{" "}
          </p>
        </div>

        <h3 className="mt-16 font-sora text-6xl font-bold text-center">
          Our{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-tr  from-[#b3c8ff] via-[#467cff] to-[#0048ff]">
            Developers
          </span>
        </h3>
        <div className="flex flex-col med2:hidden xl:flex xl:flex-row gap-6 xl:gap-3 justify-end items-center xl:justify-center xl:items-end min-h-[1000px] xl:min-h-[400px] z-[700]">
          {developers.map((dev) => (
            <DevCard developer={dev} key={dev.NIM} />
          ))}
        </div>
        <div className="hidden med2:flex med2:flex-col gap-6 justify-end items-center  med2:min-h-[700px] xl:min-h-[400px] z-[700] xl:hidden">
          <div className="flex flex-row gap-3 w-full justify-center items-end">
            <DevCard developer={developers[0]} key={developers[0].NIM} />
            <DevCard developer={developers[1]} key={developers[1].NIM} />
          </div>
          <div className="flex flex-row w-full justify-center items-end">
            <DevCard developer={developers[2]} key={developers[2].NIM} />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 h-fit left-[100px] med2:left-[200px] xl:left-[410px] 2xl:left-[500px] z-10 lg:bottom-12">
        <Spline
          className="scale-[1.2] lg:scale-[1.5] 2xl:scale-[1.8]"
          scene="https://prod.spline.design/f-lmYdOL10cmSrsE/scene.splinecode"
        />
      </div>
      <div className="absolute top-0 left-0 bottom-0 right-0 w-full">
        <ParticlesContainer />
      </div>
    </AnimatePresence>
  );
};

export default AboutPage;
