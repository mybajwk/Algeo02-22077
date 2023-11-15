"use client"

import { Input } from "@nextui-org/input";
import { Dispatch, FC, SetStateAction, useState } from "react";

interface ScrappingProps {
  webUrl: string,
  setWebUrl: Dispatch<SetStateAction<string>>
  error: string
}

const Scrapping: FC<ScrappingProps> = ({ webUrl, setWebUrl, error }) => {
  
  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <label className="text-left w-full"> </label>
      <Input
        value={webUrl}
        onValueChange={setWebUrl}
        isRequired
        type="text"
        label="Masukan URL lengkap web yang mau di scrapping:"
        className="w-full"
        radius="md"
        labelPlacement="outside"
        errorMessage={error && error}
        color={error ? "danger" : "default"}
      />
    </div>
  );
};

export default Scrapping;
