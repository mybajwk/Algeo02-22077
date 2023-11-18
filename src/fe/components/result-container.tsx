import React, { FC } from "react";
import ImageCard from "./image-card";

export interface ImagesData {
  name: string,
  similarity: number
}
interface ResultContainerProps {
  urls?: ImagesData[];
  token: string
}

const ResultContainer: FC<ResultContainerProps> = ({ urls, token }) => {
  console.log(urls)
  return (
    <div className="min-h-[530px] grid grid-cols-2 md:grid-cols-4 gap-3">
      {urls?.map((data) => <ImageCard key={`${data.name}-${data.similarity}`} url={data.name} similarity={data.similarity} token={token}/>)}
    </div>
  );
};

export default ResultContainer;
