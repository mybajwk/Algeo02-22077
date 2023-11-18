"use client";

import FileUpload from "@/components/file-upload";
import ModalUpload from "@/components/modal-upload";
import ResultContainer, { ImagesData } from "@/components/result-container";
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
import { v4 } from "uuid";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw, Trash2 } from "lucide-react";
import React, { Key, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { saveAs } from "file-saver";
// import { useStore } from "@/hooks/use-store";
// import { useToken } from "@/hooks/use-token";

const SearchPage = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [urlImg, setUrlImg] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [imagesData, setImagesData] = useState<ImagesData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [searchType, setSearchType] = useState<Key>("color");
  const [tokenVisumatch, setTokenVisumatch] = useState("");
  const [rerender, setRerender] = useState(1);
  const [timeUpload, setTimeUpload] = useState<number>(0);
  const [timeSearch, setTimeSearch] = useState<number>(0);
  const [loadingPDF, setLoadingPDF] = useState(false);
  // const tokens = useStore(useToken, (state) => state);

  const handleOnDelete = () => {
    setPhoto(null);
    setUrlImg("");
  };

  const handleRerender = () => {
    setRerender((prev) => prev + 1);
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
    const timeStart = performance.now();
    setCurrentPage(1);
    try {
      if (photo) {
        let token = window.localStorage.getItem("token-visumatch");
        if (!token) {
          token = `${v4()}`.replaceAll("-", "");
          window.localStorage.setItem("token-visumatch", token);
        }

        setTokenVisumatch(token);

        const base64File = await convertFileToBase64(photo);

        //fetch API
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/image/${searchType}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: token,
              captcha: "dhaehanadeaoe",
              image: base64File,
            }),
          }
        );

        const resBody = await response.json();

        if (!response.ok) {
          throw new Error(resBody.message);
        }

        if (!resBody.success) {
          throw new Error(resBody.message);
        }

        setTotalPage(resBody.page);

        if (resBody.data) {
          setImagesData([...resBody.data]);
        } else {
          setImagesData([]);
        }

        toast.success("photo uploaded succesfull");
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }

    const timeEnd = performance.now();
    const time = (timeEnd - timeStart) / 1000;
    setTimeSearch(time);
  };

  const handlePaginatiOnChange = async (page: number) => {
    try {
      setCurrentPage(page);
      let token = window.localStorage.getItem("token-visumatch");
      if (!token) {
        token = `${v4()}`.replaceAll("-", "");
        window.localStorage.setItem("token-visumatch", token);
      }
      setTokenVisumatch(token);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/image/page/${page}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
          }),
        }
      );

      const resBody = await response.json();

      if (!response.ok) {
        throw new Error(resBody.message);
      }

      if (!resBody.success) {
        throw new Error(resBody.message);
      }

      if (resBody.data) {
        setImagesData([...resBody.data]);
      } else {
        setImagesData([]);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const handleDownloadPDF = async () => {
    setLoadingPDF(true);
    try {
      let token = window.localStorage.getItem("token-visumatch");
      if (!token) {
        token = `${v4()}`.replaceAll("-", "");
        window.localStorage.setItem("token-visumatch", token);
      }
      setTokenVisumatch(token);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/image/pdf`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
          }),
        }
      );

      const resBody = await response.json();

      console.log(resBody);
      if (!response.ok) {
        throw new Error(resBody.message);
      }

      if (!resBody.success) {
        throw new Error(resBody.message);
      }

      // setTimeout(() => saveAs(`${process.env.NEXT_PUBLIC_API_URL}/media/${token}/file.pdf`), 2000)

      const pdfUrl = `${process.env.NEXT_PUBLIC_API_URL}/media/${token}/file.pdf`;
      const link = document.createElement("a");
      link.target = "_blank"
      link.href = pdfUrl;
      link.download = "result.pdf"; // specify the filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        toast.error(error.message);
      }
    }
    setLoadingPDF(false);
  };

  return (
    <>
      <ModalUpload open={open} onOpenChange={setOpen} setTime={setTimeUpload} />
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
                    onSelectionChange={setSearchType}
                    selectedKey={searchType}
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
                <div className="flex flex-row gap-3 justify-end items-center">
                  <p className="text-base md:text-md">
                    Uploaded Time {timeUpload.toFixed(2)}s
                  </p>
                  <p className="text-base md:text-md">
                    Search Time {timeSearch.toFixed(2)}s
                  </p>
                  <Button isIconOnly variant="light" onPress={handleRerender}>
                    <RotateCcw className="h-4 w-4 text-white" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="relative min-h-[650px] w-full flex flex-col gap-3 justify-end items-center">
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    className="min-h-full w-full flex justify-center items-center overflow-hidden"
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 100 }}
                    transition={{
                      ease: "easeInOut",
                      delay: 0.0,
                      duration: 0.3,
                    }}
                  >
                    {imagesData.length !== 0 ? (
                      <ResultContainer
                        key={rerender}
                        urls={imagesData}
                        token={tokenVisumatch}
                      />
                    ) : (
                      <div className="absolute -top-20 w-full h-full flex text-white font-spline text-lg justify-center items-center text-center">
                        <p>No photo found</p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </>

              <div className="w-full flex justify-center items-center">
                <Pagination
                  page={currentPage}
                  isDisabled={imagesData ? imagesData.length === 0 : true}
                  size="md"
                  onChange={handlePaginatiOnChange}
                  showControls
                  total={totalPage}
                  classNames={{
                    cursor:
                      "bg-gradient-to-br from-indigo-800 via-blue-800 via-30% to-blue-600 to-80%",
                    base: "md:flex hidden",
                  }}
                />
                <Pagination
                  page={currentPage}
                  isDisabled={imagesData ? imagesData.length === 0 : true}
                  size="sm"
                  onChange={handlePaginatiOnChange}
                  showControls
                  total={totalPage}
                  classNames={{
                    cursor:
                      "bg-gradient-to-br from-indigo-800 via-blue-800 via-30% to-blue-600 to-80%",
                    base: "flex md:hidden",
                  }}
                />
              </div>
            </div>
          </div>
          <Divider />
          {imagesData.length !== 0 ? (
            <div className="w-full flex justify-center items-center mb-10">
              <Button
                size="md"
                isLoading={loadingPDF}
                variant="solid"
                className="bg-gradient-to-br from-indigo-800 via-blue-800 via-30% to-blue-600 to-80%"
                radius="full"
                onPress={handleDownloadPDF}
              >
                Download PDF
              </Button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </AnimatePresence>
    </>
  );
};

export default SearchPage;
