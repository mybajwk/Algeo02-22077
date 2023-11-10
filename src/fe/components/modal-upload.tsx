"use client";

import { Button } from "@nextui-org/react";
import { FC, Key, useEffect, useState } from "react";
import FileUploadFiles from "./file-upload-files";
import { useTabs } from "@/hooks/use-tabs";
import { Framer } from "@/components/ui/framer";
import { Dialog, DialogContent, DialogFooter } from "./ui/dialog";

interface ModalUploadProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ModalUpload: FC<ModalUploadProps> = ({ onOpenChange, open }) => {
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

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="z-[200] min-w-[900px]">
          <div className="w-full flex flex-col">
            <div className="border-b-[1px] border-white w-full items-start flex">
              <Framer.Tabs {...framer.tabProps} />
            </div>

            <div className="pt-10">{framer.selectedTab.label === "Zip" ? <FileUploadFiles typeFile="zip" key="zip" /> : framer.selectedTab.label === "Folder" ? <FileUploadFiles  key="folder" typeFile="folder"/> : <FileUploadFiles key="files" typeFile="files"/>}</div>
          </div>
          <DialogFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={() => onOpenChange(false)}
            >
              Close
            </Button>
            <Button
              color="primary"
              onPress={() => onOpenChange(false)}
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
