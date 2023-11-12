import { Image, Skeleton } from "@nextui-org/react";
import React, { FC } from "react";
import ImageCard from "./image-card";

interface ResultContainerProps {
  urls?: string[];
}

const ResultContainer: FC<ResultContainerProps> = ({ urls }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {urls?.map((url) => <ImageCard key={url} />)}
    </div>
  );
};

export default ResultContainer;
