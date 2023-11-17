import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { AiFillGithub, AiFillInstagram, AiFillInteraction, AiFillLinkedin } from "react-icons/ai";

interface DevCardProps {
  developer: {
    name: string,
    NIM: string,
    github: string,
    instagram: string,
    photo: string,
    linkedin: string
  }
}

const DevCard: FC<DevCardProps> = ({ developer }) => {
  return (
      <div className="card bg-[#8052FF]/20 hover:bg-[#8052FF]/50 backdrop-blur-sm">
        <div className="image">
          <Image src="/camera.png" alt="foto" width={260} height={260}/>
        </div>
        <div className="content flex flex-col items-center p-3">
          <h3 className="font-sora text-xl font-extrabold bg-gradient-to-br from-indigo-400 via-blue-300 via-30% to-blue-100 to-80% bg-clip-text text-transparent">{developer.name}</h3>
          <p className="font-spline text-white text-sm">
            {developer.NIM}
          </p>
          <div className="flex flex-row gap-2 mt-3 w-full justify-center items-center">
          <Link href={developer.github} className="text-white hover:text-slate-400" rel="noopener noreferrer" target="_blank">
            <AiFillGithub size={25} />
          </Link>
          <Link href={developer.instagram} className="text-white hover:text-slate-400" rel="noopener noreferrer" target="_blank">
            <AiFillInstagram size={25} />
          </Link>
          <Link href={developer.linkedin} className="text-white hover:text-slate-400" rel="noopener noreferrer" target="_blank">
            <AiFillLinkedin size={25} />
          </Link>
          </div>
        </div>
    </div>
  );
};

export default DevCard;
