"use client";

import FileUpload from "@/components/file-upload";
import ModalUpload from "@/components/modal-upload";
import ResultContainer from "@/components/result-container";
import Transition from "@/components/transition";
import { convertFileToBase64 } from "@/lib/libs";
import {
  Button,
  Divider,
  Image,
  Pagination,
  Skeleton,
  Tab,
  Tabs,
  cn,
} from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ImagesData {
  url: string;
  similarity: string;
}

const paginationAnimationVariant = {
  next: {
    translateX: "100%",
    opacity: 0,
  },
  prev: {
    translateX: "-100%",
    opacity: 0,
  },
};

const SearchPage = () => {
  const urls = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const urls2 = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const [photo, setPhoto] = useState<File | null>(null);
  const [urlImg, setUrlImg] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [imagesData, setImagesData] = useState<string[]>(urls);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationStatus, setPaginationStatus] = useState("");
  const handleOnDelete = () => {
    setPhoto(null);
    setUrlImg("");
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (photo) {
      const url = URL.createObjectURL(photo);
      setUrlImg(url);
    }
  }, [photo]);

  const handleOnSubmit = async () => {
    try {
      if (photo) {
        const base64File = await convertFileToBase64(photo);

        //fetch API

        toast.success("photo uploaded succesfull");
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  const handlePaginatiOnChange = async (page: number) => {
    try {
      // const response = await fetch("");

      // const bodyRes = await response.json();

      // if (!response.ok) {
      // } else {
      //   setImagesData([]);
      // }
      if (page > currentPage) {
        setPaginationStatus("next");
      } else if (page < currentPage) {
        setPaginationStatus("prev");
      }
      setCurrentPage(page);
      if (page === 2) setImagesData([...urls2]);
      if (page === 1) setImagesData([...urls]);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <>
      <ModalUpload open={open} onOpenChange={setOpen} />
      <AnimatePresence mode="wait">
        <motion.div key="home" className="absolute h-full">
          <Transition />
        </motion.div>

        <div className="w-full h-full flex flex-col gap-5 pt-5">
          <div className="flex flex-col med2:flex-row h-full  justify-between gap-6 w-full">
            <div
              className={`relative med2:flex-[1.2] w-full h-[300px] xl:h-[450px] flex justify-center items-center rounded-md group overflow-hidden`}
            >
              <Image
                src={urlImg}
                alt="photo"
                radius="md"
                className="w-full h-full object-fill group-hover:scale-[1.05]"
                removeWrapper
              />
              {photo ? (
                <>
                  <div className="flex flex-row items-center justify-between absolute h-fit p-4 pl-8 w-[85%] z-[50] backdrop-blur-sm rounded-full bg-white/30 bottom-0 transition transform translate-y-[100%]  duration-[1s] origin-bottom ease-in-out group-hover:ease-in-out group-hover:translate-y-[-15%]">
                    <div className="flex flex-col">
                      <p className="text-black font-bold text-base">
                        {photo.name}
                      </p>
                      <p className="text-black text-tiny">
                        {Math.round(photo.size / 1000)}KB
                      </p>
                    </div>
                    <Button
                      onPress={handleOnDelete}
                      className="text-tiny hover:bg-[#dd115a] group/b"
                      color="danger"
                      radius="full"
                      size="md"
                      isIconOnly={true}
                      variant="flat"
                    >
                      <Trash2 className="w-4 h-4 group-hover/b:text-white" />
                    </Button>
                  </div>
                  <div className="absolute w-full h-full bg-transparent group-hover:bg-black/70 z-[10] transition transform" />
                </>
              ) : (
                <>
                  <Skeleton className="absolute w-full h-full" />
                  <div className=" absolute flex justify-center items-start font-sans my-auto mx-auto">
                    <p className="text-white">No Photo Uploaded</p>
                  </div>
                </>
              )}
            </div>
            <div className="flex flex-[1] flex-col justify-between w-full h-[300px] xl:h-[450px] gap-2">
              <div className="w-full">
                <label className="text-base font-sans">Upload a image: </label>
                <FileUpload photo={photo} setPhoto={setPhoto} />
              </div>
              <div className="w-full h-fit flex flex-col justify-center items-end gap-2">
                <div className="flex flex-col sm:flex-row w-full gap-2 items-center">
                  <Tabs
                    size="md"
                    aria-label="Options"
                    radius="md"
                    variant="bordered"
                    color="primary"
                    classNames={{
                      tabList: "gap-4 border-indigo-800 bg-[#0300145e] w-full",
                      cursor:
                        "bg-gradient-to-br from-indigo-800 via-blue-800 via-30% to-blue-600 to-80%",
                      base: "lg:flex md2:hidden sm:flex-[1.5] xl:flex-[1.2] w-full",
                    }}
                  >
                    <Tab key="color" title="Color" />
                    <Tab key="texture" title="Texture" />
                  </Tabs>
                  <Tabs
                    size="sm"
                    aria-label="Options"
                    radius="md"
                    variant="bordered"
                    color="primary"
                    classNames={{
                      tabList: "gap-4 border-indigo-800 bg-[#0300145e] w-full",
                      cursor:
                        "bg-gradient-to-br from-indigo-800 via-blue-800 via-30% to-blue-600 to-80%",
                      base: "hidden md2:flex lg:hidden sm:flex-[1.5] xl:flex-[1.2] w-full",
                    }}
                  >
                    <Tab key="color" title="Color" />
                    <Tab key="texture" title="Texture" />
                  </Tabs>

                  <Button
                    color="primary"
                    size="md"
                    className="lg:flex flex md2:hidden w-full sm:flex-1 bg-gradient-to-br from-indigo-800 via-blue-800 via-30% to-blue-600 to-80%"
                    onPress={handleOpenModal}
                  >
                    Upload dataset
                  </Button>
                  <Button
                    color="primary"
                    size="sm"
                    className="hidden md2:flex lg:hidden w-full sm:flex-1 bg-gradient-to-br from-indigo-800 via-blue-800 via-30% to-blue-600 to-80%"
                    onPress={handleOpenModal}
                  >
                    Upload dataset
                  </Button>
                </div>
                <Button
                  onPress={handleOnSubmit}
                  variant={`${photo ? "flat" : "faded"}`}
                  className={cn(
                    "flex md2:hidden lg:flex w-full",
                    photo
                      ? "transform duration-[0.5s] md ease-in-out hover:scale-[1.03] hover:text-white hover:after:translate-x-0 hover:after:translate-y-0  after:absolute after:origin-left after:transform after:ease-out after:translate-x-[-110%] after:translate-y-0 after:duration-[0.5s] after:left-0 after:z-[-1] after:content-[''] after:w-full after:h-full after:bg-gradient-to-br after:from-indigo-800 after:via-blue-800 after:via-30% after:to-blue-600 after:to-80%"
                      : ""
                  )}
                  size="md"
                  color="primary"
                >
                  Submit
                </Button>
                <Button
                  onPress={handleOnSubmit}
                  variant={`${photo ? "flat" : "faded"}`}
                  className={cn(
                    "lg:hidden hidden md2:flex w-full",
                    photo
                      ? "transform duration-[0.5s] md ease-in-out hover:scale-[1.03] hover:text-white hover:after:translate-x-0 hover:after:translate-y-0  after:absolute after:origin-left after:transform after:ease-out after:translate-x-[-110%] after:translate-y-0 after:duration-[0.5s] after:left-0 after:z-[-1] after:content-[''] after:w-full after:h-full after:bg-gradient-to-br after:from-indigo-800 after:via-blue-800 after:via-30% after:to-blue-600 after:to-80%"
                      : ""
                  )}
                  size="sm"
                  color="primary"
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col w-full justify-center items-center gap-3">
            <div className="w-full">
              <div className="flex flex-row justify-between items-center p-1">
                <h2 className="text-lg md:text-xl">Result</h2>
                <p className="text-base md:text-md">Executed Time 13.5s</p>
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                className="h-full w-full flex justify-center items-center overflow-hidden"
                exit={paginationStatus === "next" ? "prev" : "next"}
                initial={paginationStatus === "next" ? "prev" : "next"}
                animate={{ opacity: 100, translateX: "0%" }}
                transition={{ ease: "easeInOut", delay: 0.1, duration: 0.4 }}
                variants={paginationAnimationVariant}
              >
                <ResultContainer urls={imagesData} />
              </motion.div>
            </AnimatePresence>
            <Pagination
              size="md"
              onChange={handlePaginatiOnChange}
              showControls
              total={10}
              initialPage={1}
              classNames={{
                cursor:
                  "bg-gradient-to-br from-indigo-800 via-blue-800 via-30% to-blue-600 to-80%",
                base: "md:flex hidden",
              }}
            />
            <Pagination
              size="sm"
              onChange={handlePaginatiOnChange}
              showControls
              total={10}
              initialPage={1}
              classNames={{
                cursor:
                  "bg-gradient-to-br from-indigo-800 via-blue-800 via-30% to-blue-600 to-80%",
                base: "flex md:hidden",
              }}
            />
          </div>
        </div>
      </AnimatePresence>
    </>
  );
};

export default SearchPage;
