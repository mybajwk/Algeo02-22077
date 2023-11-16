"use client";

import { Button } from "@nextui-org/react";
import { FC, useEffect, useState } from "react";
import FileUploadFiles from "./file-upload-files";
import { useTabs } from "@/hooks/use-tabs";
import { Framer } from "@/components/framer";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Image as ImageData } from "@/components/file-upload-files";
import { convertFileToBase64, zipFilesBase64 } from "@/lib/libs";
import toast from "react-hot-toast";
import { v4 } from "uuid";
import Scrapping from "@/components/scrapping-component";

interface ModalUploadProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ModalUpload: FC<ModalUploadProps> = ({ onOpenChange, open }) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [type, setType] = useState<string>("url");
  const [errorWS, setErrorWS] = useState<string>("");

  const [hookProps] = useState({
    tabs: [
      {
        label: "Zip",
        children: <></>,
        id: "zip",
      },
      {
        label: "Folder",
        children: <></>,
        id: "folder",
      },
      {
        label: "Files",
        children: <></>,
        id: "activity",
      },
      {
        label: "Image Scrapping",
        children: <></>,
        id: "scrapping",
      },
    ],
    initialTabId: "Matches",
  });
  const framer = useTabs(hookProps);

  useEffect(() => {
    if (input) setErrorWS("")
  }, [input])

  const handleClick = async () => {
    try {
      setLoading(true);
      let token = window.sessionStorage.getItem("token-visumatch");
      if (!token) {
        token = `${v4()}`.replaceAll("-", "");
        window.sessionStorage.setItem("token-visumatch", token);
      }

      if (framer.selectedTab.label !== "Image Scrapping") {
        let zipBase64;
        if (images.length > 0) {
          if (framer.selectedTab.label !== "Zip") {
            const files = images
              .filter((img) => !img.error)
              .map((img) => img.file);
            zipBase64 = await zipFilesBase64(files);
          } else {
            zipBase64 = await convertFileToBase64(images[0].file);
          }
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/image/upload-all`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
            captcha: "dhaehanadeaoe",
            image: zipBase64,
          }),
        });

        const resBody = await response.json();

        if (!response.ok) {
          throw new Error(resBody.message);
        }

        toast.success("dataset uploaded succesfull");
        onOpenChange(false);
        setLoading(false);
        setErrorWS("")
        setInput("")
        setImages([])
      } else {
        if (!input) {
          setErrorWS("Input harus diisi tidak boleh kosong");
          setLoading(false)
          return;
        }

        if (type === "url") {
          const urlRegex: RegExp =
            /^(https?:\/\/www\.|https?:\/\/|http:\/\/www\.|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})+(\.[a-zA-Z0-9]{2,})?$/i;

          if (!urlRegex.test(input)) {
            setErrorWS("URL web tidak valid");
            setLoading(false)
            return;
          }
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/image/scrap-url`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: token,
                captcha: "dhaehanadeaoe",
                text: input,
              }),
            }
          );

          const resBody = await response.json();

          if (!response.ok) {
            throw new Error(resBody.message);
          }
        } else if (type === "text") {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/image/scrap-text`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: token,
                captcha: "dhaehanadeaoe",
                text: input,
              }),
            }
          );

          const resBody = await response.json();

          if (!response.ok) {
            throw new Error(resBody.message);
          }
        }

        toast.success("data for scrapping submited");
        onOpenChange(false);
        setLoading(false);
        setErrorWS("")
        setInput("")
        setImages([])
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.log(error.message);
        setLoading(false);
        setErrorWS("")
        setInput("")
        setImages([])
      }
    } 
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-full sm:min-w-[630px] med2:min-w-[800px] sm:h-fit h-[90%]">
          <div className="w-full flex flex-col">
            <div className="border-b-[1px] border-white w-full items-start flex">
              <Framer.Tabs {...framer.tabProps} />
            </div>

            <div className="pt-10">
              {framer.selectedTab.label === "Zip" ? (
                <FileUploadFiles typeFile="zip" key="zip" />
              ) : framer.selectedTab.label === "Folder" ? (
                <FileUploadFiles
                  key="folder"
                  typeFile="folder"
                  setState={setImages}
                />
              ) : framer.selectedTab.label === "Files" ? (
                <FileUploadFiles
                  key="files"
                  typeFile="files"
                  setState={setImages}
                />
              ) : (
                <Scrapping
                  input={input}
                  setInput={setInput}
                  error={errorWS}
                  setType={setType}
                />
              )}
            </div>
          </div>
          <DialogFooter className="flex flex-row">
            <Button
              color="danger"
              variant="flat"
              onPress={() => onOpenChange(false)}
              isDisabled={loading}
            >
              Close
            </Button>
            <Button
              isDisabled={images.length === 0 && !input}
              isLoading={loading}
              color="primary"
              onPress={handleClick}
              className="bg-gradient-to-br from-indigo-800 via-blue-800 via-30% to-blue-600 to-80%"
            >
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModalUpload;
