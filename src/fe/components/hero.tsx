import { Button } from "@nextui-org/react";
import Spline from "@splinetool/react-spline";
import { MoveUpRight } from "lucide-react";
import ParticlesContainer from "./particles-container";
import Link from "next/link";

const Hero = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // first prevent the default behavior
    e.preventDefault();
    // get the href and remove everything before the hash (#)
    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/, "");
    // get the element by id and use scrollIntoView
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({
      behavior: "smooth",
    });
  };
  
  return (
    <>
      <div className="relative flex min-h-[650px] w-full flex-row pr-0 items-center gap-3 justify-between z-[700]">
        <div className="flex w-[45%] flex-col font-spline z-[900]">
          <div className=" px-3 py-2 backdrop-blur-sm w-fit animate-bounce text-center rounded-lg bg-[#7b2cbf]/15 border-[#7b2cbf] border">
            <h3 className="font-spline text-xl text-white">
              Selamat datang di
            </h3>
          </div>
          <h1 className="text-[100px] font-sora font-bold leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-tr  from-[#b3c8ff] via-[#467cff] to-[#0048ff]">
            VisuMatch
          </h1>
          <p className="text-lg font-spline font-[500]">
            Temukan Foto Serupa dengan Teknologi Terkini. Pencarian Gambar Cepat
            dan Akurat dengan Visumatch
          </p>
          <div className="flex flex-row items-center gap-3 mt-8">
            <Button
              className="relative w-[200px] group bg-gradient-to-br from-indigo-800 via-blue-800 via-30% to-blue-600 to-80% rounded-full hover:scale-[1.05] transition-all ease-in-out transform duration-250"
              size="lg"
              variant="solid"
              color="primary"
            >
              <Link className="w-full h-full flex justify-center items-center" href="/search">Get Started</Link>
              <MoveUpRight className="absolute right-3 top-[14px] h-5 w-4 hidden group-hover:flex" />
            </Button>
            <Button
              className="w-[120px] rounded-full hover:scale-[1.05] transition-all ease-in-out transform duration-250"
              variant="faded"
              color="primary"
              size="lg"
            >
              <Link className="w-full h-full flex items-center justify-center" href="#how" onClick={handleScroll}>

              How To Use
              </Link >
            </Button>
          </div>
        </div>
        <div className="absolute md:-right-[400px] lg:-right-[300px] big:-right-52 -top-[160px] z-[800]">
          <Spline
            className="scale-[0.3] md:scale-[0.5] lg:scale-[0.7] big:scale-[1]"
            scene="https://prod.spline.design/CAOWnznzlPv7-Kq0/scene.splinecode"
          />
        </div>
      </div>
      <div className="absolute top-0 left-0 bottom-0 right-0 w-full">
        <ParticlesContainer />
      </div>
    </>
  );
};

export default Hero;
