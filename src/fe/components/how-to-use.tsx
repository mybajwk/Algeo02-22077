'use client'

import { Button } from "@nextui-org/react";
import { MoveUpRight } from "lucide-react";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

const HowToUse = () => {
  const [hover, setHover] = useState(false);

  const onHover = () => [
    setHover(true)
  ]
  const outHover = () => {
    setHover(false)
  }
  
  return (
    <>
      <div id="how" className="relative min-h-[1300px] sm:min-h-[900px] lg:min-h-[645px] w-full">
        {/* <div className="absolute h-fit  w-fit left-12 top-16 z-[20]">
          <Image src={Camera} width={200} height={200} alt="camera"/>
        </div> */}
        <div className="absolute top-0 bottom-0 -left-52 -right-52 bg-gradient-to-br from-[#000B18] to-[#4C2C96] z-[10] pt-[50px]">
          <div className="w-full text-center">
            <h2 className="font-sora text-[50px] md:text-[60px] font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-tr  from-[#b3c8ff] via-[#467cff] to-[#0048ff]">
                How
              </span>{" "}
              To Use
            </h2>
          </div>
          <div className="w-full flex justify-center items-center">

          <div className="relative mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-fit">
              <div data-hover={hover} className="absolute -top-3 -bottom-3 -left-3 -right-3 bg-transparent backdrop-blur-sm z-[5] hidden data-[hover=true]:flex"/>
              <div onMouseOver={onHover} onMouseLeave={outHover} className="flex flex-row gap-3 p-3 sm:justify-between items-center bg-[#8052FF]/20 hover:z-10 -rotate-[4deg] hover:rotate-0 backdrop-blur-md hover:bg-[#8052FF]/40 min-w-[250px] sm:min-w-[280px] md:min-w-[300px] h-[150px] rounded-lg hover:scale-[1.02] shadow-lg transition-all ease-in-out transform duration-250">
                <h3 className="font-sora text-[52px] md:text-6xl bg-gradient-to-bl from-[#004CF5] via-[#8052FF] via-90% to-[#A230ED] bg-clip-text text-transparent font-extrabold">
                  1
                </h3>
                <p className="font-spline text-[13px] sm:text-sm md:text-base">
                  Masuk kedalam halaman search.
                </p>
              </div>
              <div onMouseOver={onHover} onMouseLeave={outHover} className="flex flex-row gap-3 p-3 justify-between items-center bg-[#8052FF]/20 hover:z-10 -rotate-[4deg] hover:rotate-0 backdrop-blur-md hover:bg-[#8052FF]/40 w-[280px] md:w-[300px] h-[150px] rounded-lg hover:scale-[1.02] shadow-lg transition-all ease-in-out transform duration-250">
                <h3 className="font-sora text-[52px] md:text-6xl bg-gradient-to-bl from-[#004CF5] via-[#8052FF] via-90% to-[#A230ED] bg-clip-text text-transparent font-extrabold">
                  2
                </h3>
                <p className="font-spline text-[13px] sm:text-sm md:text-base">
                  Upload dataset foto sebagai dasar pencarian.
                </p>
              </div>
              <div onMouseOver={onHover} onMouseLeave={outHover} className="flex flex-row gap-3 p-3 justify-between items-center bg-[#8052FF]/20 hover:z-10 -rotate-[4deg] hover:rotate-0 backdrop-blur-md hover:bg-[#8052FF]/40 w-[280px] md:w-[300px] h-[150px] rounded-lg hover:scale-[1.02] shadow-lg transition-all ease-in-out transform duration-250">
                <h3 className="font-sora text-[52px] md:text-6xl bg-gradient-to-bl from-[#004CF5] via-[#8052FF] via-90% to-[#A230ED] bg-clip-text text-transparent font-extrabold">
                  3
                </h3>
                <p className="font-spline text-[13px] sm:text-sm md:text-base">
                  Upload sebuah foto yang mau dicari kemiripannya dengan foto
                  yang ada di dataset.
                </p>
            </div>
              <div onMouseOver={onHover} onMouseLeave={outHover} className="flex flex-row gap-3 p-3 justify-between items-center bg-[#8052FF]/20 hover:z-10 -rotate-[4deg] hover:rotate-0 backdrop-blur-md hover:bg-[#8052FF]/40 w-[280px] md:w-[300px] h-[150px] rounded-lg hover:scale-[1.02] shadow-lg transition-all ease-in-out transform duration-250">
                <h3 className="font-sora text-[52px] md:text-6xl bg-gradient-to-bl from-[#004CF5] via-[#8052FF] via-90% to-[#A230ED] bg-clip-text text-transparent font-extrabold">
                  4
                </h3>
                <p className="font-spline text-[13px] sm:text-sm md:text-base">
                  Pilih metode pencarian apakah menggunakan tekstur atau warna.
                </p>
              </div>
              <div onMouseOver={onHover} onMouseLeave={outHover} className="flex flex-row gap-3 p-3 justify-between items-center bg-[#8052FF]/20 hover:z-10 -rotate-[4deg] hover:rotate-0 backdrop-blur-md hover:bg-[#8052FF]/40 w-[280px] md:w-[300px] h-[150px] rounded-lg hover:scale-[1.02] shadow-lg transition-all ease-in-out transform duration-250">
                <h3 className="font-sora text-[52px] md:text-6xl bg-gradient-to-bl from-[#004CF5] via-[#8052FF] via-90% to-[#A230ED] bg-clip-text text-transparent font-extrabold">
                  5
                </h3>
                <p className="font-spline text-[13px] sm:text-sm md:text-base">
                  Tekan tombol search dan tunggu proses pencarian.
                </p>
              </div>
              <div onMouseOver={onHover} onMouseLeave={outHover} className="flex flex-row gap-3 p-3 justify-between items-center bg-[#8052FF]/20 hover:z-10 -rotate-[4deg] hover:rotate-0 backdrop-blur-md hover:bg-[#8052FF]/40 w-[280px] md:w-[300px] h-[150px] rounded-lg hover:scale-[1.02] shadow-lg transition-all ease-in-out transform duration-250">
                <h3 className="font-sora text-[52px] md:text-6xl bg-gradient-to-bl from-[#004CF5] via-[#8052FF] via-90% to-[#A230ED] bg-clip-text text-transparent font-extrabold">
                  6
                </h3>
                <p className="font-spline text-[13px] sm:text-sm md:text-base">
                  Setelah proses pencarian selesai akan ditampilkan foto-foto
                  yang mempunyai kemiripan lebih dari 60%.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex mt-9 justify-center items-center gap-3 sm:flex-row flex-col">
            <Button
              className="relative w-[200px] group bg-gradient-to-br from-indigo-800 via-blue-800 via-30% to-blue-600 to-80% rounded-full hover:scale-[1.05] transition-all ease-in-out transform duration-250"
              size="lg"
              variant="solid"
              color="primary"
            >
              <Link
                className="w-full h-full flex justify-center items-center"
                href="/search"
                >
                Get Started
              </Link>
              <MoveUpRight className="absolute right-3 top-[14px] h-5 w-4 hidden group-hover:flex" />
            </Button>
            <Button
              className="relative w-[200px] group rounded-full hover:scale-[1.05] transition-all ease-in-out transform duration-250"
              size="lg"
              variant="bordered"
              color="primary"
            >
              <Link
                className="w-full h-full flex justify-center items-center"
                href="/desc"
                >
                Learn More
              </Link>
              <MoveUpRight className="absolute right-3 top-[14px] h-5 w-4 hidden group-hover:flex" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowToUse;
