"use client";

import { Button, Image, Skeleton } from "@nextui-org/react";
import { Download } from "lucide-react";
import { saveAs } from "file-saver";
import React, { FC, useState } from "react";

interface ImageCardProps {
  url: string;
  token: string;
  similarity: number;
}

const ImageCard: FC<ImageCardProps> = ({ url, token, similarity }) => {
  const [loading, setLoading] = useState(false);
  const handleDownload = () => {
    saveAs(
      `http://localhost:7780/media/${token}/${url}.png`,
      `similarity${(similarity * 100).toFixed(2)}%`.replace(".", ",") + ".png"
    );
  };

  const handleImageError = () => {
    setLoading(true);
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div className="relative overflow-hidden group h-fit flex justify-center items-center">
      <div className="absolute w-full h-full group-hover:bg-black/50 z-[80] transition transform"></div>
      <div className="flex flex-row items-center justify-between absolute h-fit p-2 pl-6 w-[85%] z-[90] backdrop-blur-sm rounded-full bg-white/30 bottom-0 transition transform translate-y-[100%]  duration-[1s] origin-bottom ease-in-out group-hover:ease-in-out group-hover:translate-y-[-15%] left-auto right-auto">
        <div className="flex flex-col">
          <p className="text-black font-bold text-base">
            {(similarity * 100).toFixed(2)}%
          </p>
        </div>
        <Button
          className="text-tiny hover:bg-green-600 group/b"
          color="success"
          radius="full"
          size="sm"
          isIconOnly={true}
          variant="flat"
          onPress={handleDownload}
        >
          <Download className="w-4 h-4 group-hover/b:text-white" />
        </Button>
      </div>

      <div className="w-[300px] h-[250px] relative rounded-xl overflow-hidden">
        <Image
          className="w-full h-full object-cover"
          removeWrapper
          alt="NextUI hero Image with delay"
          src={`http://localhost:7780/media/${token}/${url}.png`}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
        {loading ? (
          <Skeleton className="absolute top-0 bottom-0 left-0 right-0 w-full h-full z-50" />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ImageCard;
