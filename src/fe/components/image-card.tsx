import { Button, Image } from "@nextui-org/react";
import { Download } from "lucide-react";
import { saveAs } from "file-saver";
import React, { FC } from "react";

interface ImageCardProps {
  url?: string;
  fileName?: string;
}

const ImageCard: FC<ImageCardProps> = ({ url, fileName }) => {
  const handleDownload = () => {
    saveAs(
      url ||
        "data:image/jpeg;base64,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",
      fileName || 'tes'
    );
  };
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
          onPress={handleDownload}
        >
          <Download className="w-4 h-4 group-hover/b:text-white" />
        </Button>
      </div>

      <Image
        width={300}
        height={200}
        alt="NextUI hero Image with delay"
        src={
          "https://app.requestly.io/delay/5000/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
        }
      />
    </div>
  );
};

export default ImageCard;
