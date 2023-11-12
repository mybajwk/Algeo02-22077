"use client";

import { Button, image } from "@nextui-org/react";
import { FC, Key, useEffect, useState } from "react";
import FileUploadFiles, { allowedFileTypes } from "./file-upload-files";
import { useTabs } from "@/hooks/use-tabs";
import { Framer } from "@/components/framer";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Image as ImageData } from "@/components/file-upload-files";
import { convertFileToBase64, zipFilesBase64, zipFilesUrl } from "@/lib/libs";
import toast from "react-hot-toast";

interface ModalUploadProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ModalUpload: FC<ModalUploadProps> = ({ onOpenChange, open }) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(false);

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
    ],
    initialTabId: "Matches",
  });
  const framer = useTabs(hookProps);

  const handleClick = async () => {
    try {
      setLoading(true);
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
      console.log(zipBase64);

      //fetch API

      onOpenChange(false);
      setLoading(false);

      toast.success("dataset uploaded succesfull");
    } catch (error) {
      if (error instanceof Error)
      toast.error(error.message);
    }
  };

  useEffect(() => {}, images);
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
              ) : (
                <FileUploadFiles
                  key="files"
                  typeFile="files"
                  setState={setImages}
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
              isDisabled={images.length === 0}
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
