"use client";

import { Input } from "@nextui-org/input";
import { Tab, Tabs } from "@nextui-org/react";
import { Dispatch, FC, Key, SetStateAction } from "react";

interface ScrappingProps {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  setType: Dispatch<SetStateAction<string>>;
  error: string;
}

const Scrapping: FC<ScrappingProps> = ({ input, setInput, error, setType }) => {
  const onSelectionChange = (key: Key) => {
    setType(key.toString());
  };
  return (
    <div className="flex flex-col w-full">
      <Tabs
        aria-label="Options"
        onSelectionChange={onSelectionChange}
        classNames={{ panel: "w-full", tabContent: "w-full" }}
      >
        <Tab key="url" title="URL">
          <div className="flex flex-col gap-2 w-full">
            <Input
              value={input}
              onValueChange={setInput}
              isRequired
              type="text"
              label="Masukan URL lengkap web yang mau di scrapping:"
              className="w-full"
              radius="md"
              labelPlacement="inside"
              errorMessage={error && error}
              color={error ? "danger" : "default"}
            />
            <p className="font-spline text-sm pl-2">{'Contoh url: "https://example.com"'}</p>
          </div>
        </Tab>
        <Tab key="text" title="Text">
          <div className="flex w-full">
            <Input
              value={input}
              onValueChange={setInput}
              isRequired
              type="text"
              label="Masukan kata kunci gambar yang mau dicari: "
              className="w-full"
              radius="md"
              labelPlacement="inside"
              errorMessage={error && error}
              color={error ? "danger" : "default"}
            />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Scrapping;
