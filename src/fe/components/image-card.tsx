import { Button, Image } from "@nextui-org/react";
import { Download } from "lucide-react";
import React, { FC } from "react";

interface ImageCardProps {
  url?: string,
}

const ImageCard: FC<ImageCardProps> = ({ url }) => {
  return (
    <div className="relative overflow-hidden group flex justify-center items-center">
      <div className="absolute w-full h-full group-hover:bg-black/50 z-[80] transition transform"></div>
      <div className="flex flex-row items-center justify-between absolute h-fit p-2 pl-6 w-[85%] z-[90] backdrop-blur-sm rounded-full bg-white/30 bottom-0 transition transform translate-y-[100%]  duration-[1s] origin-bottom ease-in-out group-hover:ease-in-out group-hover:translate-y-[-15%] left-auto right-auto">
        <div className="flex flex-col">
          <p className="text-black font-bold text-base">100%</p>
        </div>
        <Button
          className="text-tiny hover:bg-green-600 group/b"
          color="success"
          radius="full"
          size="sm"
          isIconOnly={true}
          variant="flat"
        >
          <Download className="w-4 h-4 group-hover/b:text-white" />
        </Button>
      </div>

      <Image
        width={300}
        height={200}
        alt="NextUI hero Image with delay"
        src={"https://app.requestly.io/delay/5000/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"}
      />
    </div>
  );
};

export default ImageCard;
