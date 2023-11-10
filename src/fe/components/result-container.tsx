import { Image, Skeleton } from "@nextui-org/react";
import React, { FC } from "react";
import ImageCard from "./image-card";

interface ResultContainerProps {
  urls?: string[];
}

const ResultContainer: FC<ResultContainerProps> = ({ urls }) => {
  const urls1 = urls?.slice(0, 4);
  const urls2 = urls?.slice(4, 9);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row gap-3">
        {urls1?.map((url) => <ImageCard key={url}/>)}
      </div>

      <div className="flex flex-row gap-3">
        {urls2?.map((url) => <ImageCard key={url}/>)}
      </div>
    </div>
  );
};

export default ResultContainer;
