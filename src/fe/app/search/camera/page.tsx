"use client";

import ModalUpload from "@/components/modal-upload";
import ResultContainer, { ImagesData } from "@/components/result-container";
import Transition from "@/components/transition";
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
import { Camera, CameraOff, RotateCcw, SwitchCamera } from "lucide-react";
import React, { Key, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Webcam from "react-webcam";

const SearchCameraPage = () => {
  const [open, setOpen] = useState(false);
  const [imagesData, setImagesData] = useState<ImagesData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [searchType, setSearchType] = useState<Key>("color");
  const [tokenVisumatch, setTokenVisumatch] = useState("");
  const [capturedImage, setCapturedImage] = useState<string>();
  const [captureEffect, setCaptureEffect] = useState(false);
  const [rerender, setRerender] = useState(1);
  const [timeUpload, setTimeUpload] = useState<number>(0);
  const [timeSearch, setTimeSearch] = useState<number>(0);

  const handleRerender = () => {
    setRerender((prev) => prev + 1);
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const search = async (urlImg: string) => {
    const timeStart = performance.now();

    setCurrentPage(1);

    try {
      let token = window.sessionStorage.getItem("token-visumatch");
      if (!token) {
        token = `${v4()}`.replaceAll("-", "");
        window.sessionStorage.setItem("token-visumatch", token);
      }

      setTokenVisumatch(token);

      const base64File = urlImg.split(",")[1];
      //fetch API
      const response = await fetch(
        `http://localhost:7780/image/${searchType}`,
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
      let token = window.sessionStorage.getItem("token-visumatch");
      if (!token) {
        token = `${v4()}${v4()}`.replaceAll("-", "");
        window.sessionStorage.setItem("token-visumatch", token);
      }
      setTokenVisumatch(token);

      const response = await fetch(`http://localhost:7780/image/page/${page}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      });

      const resBody = await response.json();

      if (!response.ok) {
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

  const webcamRef = useRef<any>(null);
  // const [deviceId, setDeviceId] = useState<any>({});
  // const [devices, setDevices] = useState<InputDeviceInfo[]>([]);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const toggleCamera = () => {
    setIsCameraOn((prevIsCameraOn) => !prevIsCameraOn);
  };

  const capture = async () => {
    if (webcamRef.current && isCameraOn) {
      const imageSrc = webcamRef.current.getScreenshot();

      setCapturedImage(imageSrc);
      setCaptureEffect(true);
      // console.log(imageSrc);
      await search(imageSrc);
    }
  };

  useEffect(() => {
    if (captureEffect) {
      setTimeout(() => setCaptureEffect(false), 200);
    }
  }, [captureEffect]);

  // const handleDevices = useCallback(
  //   (mediaDevices: any) =>
  //     setDevices(
  //       mediaDevices.filter(({ kind }: { kind: any }) => kind === "videoinput")
  //     ),
  //   [setDevices]
  // );

  // useEffect(() => {
  //   navigator.mediaDevices.enumerateDevices().then(handleDevices);
  // }, [handleDevices]);

  useEffect(() => {
    const intervalId = setInterval(capture, 10000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCameraOn]);

  const [facingMode, setFacingMode] = useState("user");

  const switchCamera = () => {
    setFacingMode((prevFacingMode) =>
      prevFacingMode === "user" ? "environment" : "user"
    );
  };

  // const onAction = (k: Key) => {
  //   setDeviceId(k);
  //   console.log(k);
  // };

  // const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

  // const selectedValue = React.useMemo(
  //   () => Array.from(selectedKeys)[0],
  //   [selectedKeys]
  // );

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
              {isCameraOn ? (
                <>
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{ facingMode }}
                  />
                  <div
                    className={cn(
                      "absolute w-full h-full bg-white",
                      captureEffect ? "flex" : "hidden"
                    )}
                  />
                  <div className="med2:hidden absolute top-4 right-7 w-[100px] h-[80px]">
                    {capturedImage ? (
                      <Image
                        src={capturedImage}
                        alt="photo"
                        radius="md"
                        className="w-full h-full object-fill"
                        removeWrapper
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Skeleton className="absolute w-full h-full z-[400]" />
                  <div className=" absolute flex justify-center gap-3 items-start font-sans my-auto mx-auto z-[500]">
                    <CameraOff className="w-5 h-5" />
                    <p className="text-white">{"Camera doesn't start"}</p>
                  </div>
                </>
              )}
              <div className="absolute w-full flex justify-between items-center flex-row med2:hidden bottom-2 z-[500] px-5">
                <Button variant="light" isIconOnly onPress={toggleCamera}>
                  {!isCameraOn ? (
                    <CameraOff className="w-6 h-6" />
                  ) : (
                    <Camera className="h-6 w-6" />
                  )}
                </Button>
                <Button variant="light" isIconOnly onPress={switchCamera}>
                  <SwitchCamera className="h-6 w-6" />
                </Button>
              </div>
            </div>
            <div className="med2:hidden flex">
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
            </div>
            <div className="med2:flex hidden flex-[1] flex-col justify-between w-full min-h-full gap-2 ">
              <div className="w-full h-full flex justify-center items-center">
                <div className="relative flex justify-center items-center w-[350px] h-[200px] rounded-md">
                  {capturedImage ? (
                    <Image
                      src={capturedImage}
                      alt="photo"
                      radius="md"
                      className="w-full h-full object-fill"
                      removeWrapper
                    />
                  ) : (
                    <>
                      <Skeleton className="absolute w-full h-full rounded-md" />
                      <div className="absolute flex justify-center items-center bg-transparent font-sans w-full h-full">
                        <p className="text-white">No image</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="w-full h-full flex flex-col justify-end items-center gap-2">
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

                  <Button
                    color="primary"
                    size="md"
                    className="lg:flex flex md2:hidden w-full sm:flex-1 bg-gradient-to-br from-indigo-800 via-blue-800 via-30% to-blue-600 to-80%"
                    onPress={handleOpenModal}
                  >
                    Upload dataset
                  </Button>
                </div>
                <div className="flex flex-col sm:flex-row w-full gap-2 items-center">
                  {/* <Dropdown>
                    <DropdownTrigger>
                      <Button
                        color="primary"
                        variant="bordered"
                        size="md"
                        className="w-full flex-1 relative"
                      >
                        Camera Source
                        <ChevronDown className="h-4 w-4 absolute right-2 top-3" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      variant="flat"
                      disallowEmptySelection
                      selectionMode="single"
                      defaultSelectedKeys={
                        devices[0] ? [devices[0].deviceId] : "all"
                      }
                      selectedKeys={selectedKeys}
                      onSelectionChange={setSelectedKeys}
                      onAction={onAction}
                    >
                      {devices.map((device) => (
                        <DropdownItem key={device.deviceId}>
                          {device.label}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown> */}
                  <Button
                    isDisabled={!isCameraOn}
                    color="primary"
                    size="md"
                    className="lg:flex flex md2:hidden w-full sm:flex-1 bg-gradient-to-br from-indigo-800 via-blue-800 via-30% to-blue-600 to-80%"
                    onPress={switchCamera}
                    endContent={<SwitchCamera className="w-4 h-4" />}
                  >
                    Switch Camera
                  </Button>
                </div>
                <Button
                  onPress={toggleCamera}
                  variant="flat"
                  className="flex md2:hidden lg:flex w-full transform duration-[0.5s] md ease-in-out hover:scale-[1.03] hover:text-white hover:after:translate-x-0 hover:after:translate-y-0  after:absolute after:origin-left after:transform after:ease-out after:translate-x-[-110%] after:translate-y-0 after:duration-[0.5s] after:left-0 after:z-[-1] after:content-[''] after:w-full after:h-full after:bg-gradient-to-br after:from-indigo-800 after:via-blue-800 after:via-30% after:to-blue-600 after:to-80%"
                  size="md"
                  color="primary"
                >
                  {isCameraOn ? "Turn Of Camera" : "Start Camera"}
                </Button>
                <Button
                  onPress={toggleCamera}
                  variant="flat"
                  className="lg:hidden hidden md2:flex w-full transform duration-[0.5s] md ease-in-out hover:scale-[1.03] hover:text-white hover:after:translate-x-0 hover:after:translate-y-0  after:absolute after:origin-left after:transform after:ease-out after:translate-x-[-110%] after:translate-y-0 after:duration-[0.5s] after:left-0 after:z-[-1] after:content-[''] after:w-full after:h-full after:bg-gradient-to-br after:from-indigo-800 after:via-blue-800 after:via-30% after:to-blue-600 after:to-80%"
                  size="sm"
                  color="primary"
                >
                  {isCameraOn ? "Turn Of Camera" : "Start Camera"}
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
            <div className="min-h-[650px] w-full flex flex-col gap-3 justify-end items-center">
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    className="h-full w-full flex justify-center items-center overflow-hidden"
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
        </div>
      </AnimatePresence>
    </>
  );
};

export default SearchCameraPage;
