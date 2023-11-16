"use client";

import {
  ChangeEvent,
  Dispatch,
  Fragment,
  MouseEventHandler,
  SetStateAction,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import * as z from "zod";
import { FileImage, FileUp, RotateCw, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button, Divider, cn } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import { ScrollArea } from "./ui/scroll-area";
import { getAllFileEntries, getFile } from "@/lib/libs";

interface FileUploadFilesProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  setState?: Dispatch<SetStateAction<Image[]>>;
  typeFile: "files" | "folder" | "zip";
}
interface FileItemsProps {
  images: Image[];
  handleDelete: (image: Image) => void;
  handleRetry: (image: Image) => void;
}

interface FileItemProps {
  image: Image;
  handleDelete: (image: Image) => void;
  handleRetry: (image: Image) => void;
}

export interface Image {
  file: File;
  error?: string;
}

export const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
export const allowedZipTypes = [".zip", ".rar", ".7z", ".gz"];

const filesValidation = z
  .any()
  .refine((file) => {
    return file.size <= 10000000;
  }, "Max image size is 10MB")
  .refine((file) => {
    return allowedFileTypes.includes(file.type);
  }, "Only image type are supported");

const zipValidation = z
  .any()
  .refine((zip) => {
    return zip.size <= 10000000;
  }, "Max image size is 10MB")
  .refine((zip) => {
    return zip.name.includes(...allowedZipTypes);
  }, "Only zip type are supported");

const FileUploadFiles = forwardRef<HTMLInputElement, FileUploadFilesProps>(
  ({ setState, onChange, typeFile = "zip", type = "file", ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [images, setImages] = useState<Image[]>([]);
    const [indexRetry, setIndexRetry] = useState(-1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if (setState) {
        setState([...images]);
      }
    }, [images, setState]);

    const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
      e.preventDefault();
      if (inputRef.current) {
        inputRef.current.click();
      }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    };

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();

      if (typeFile === "folder") {
        if (e.dataTransfer.items) {
          setLoading(true);

          const files = await getAllFileEntries(e.dataTransfer.items);
          for (let i = 0; i < files.length; i++) {
            const file = await getFile(files[i]);
            const validate = filesValidation.safeParse(file);
            let error = "";

            if (!validate.success) {
              error = validate.error.issues
                .map((err) => err.message)
                .join(", ");
            }

            const image: Image = {
              file: file as File,
              error: error,
            };
            setImages((val) => [...val, image]);
          }
        }
      } else {
        if (e.dataTransfer.files) {
          setLoading(true);

          for (let i = 0; i < e.dataTransfer.files.length; i++) {
            let validate;
            if (typeFile === "files") {
              validate = filesValidation.safeParse(e.dataTransfer.files[i]);
            } else {
              validate = zipValidation.safeParse(e.dataTransfer.files[i]);
            }
            let error = "";

            if (!validate.success) {
              error = validate.error.issues
                .map((err) => err.message)
                .join(", ");
            }

            const image: Image = {
              file: e.dataTransfer.files[i],
              error: error,
            };
            setImages((val) => [...val, image]);
          }
        }
        setLoading(false);
      }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      if (e.target.files) {
        setLoading(true);
        if (indexRetry === -1) {
          for (let i = 0; i < e.target.files.length; i++) {
            let validate;
            if (typeFile === "files" || typeFile === "folder") {
              validate = filesValidation.safeParse(e.target.files[i]);
            } else {
              validate = zipValidation.safeParse(e.target.files[i]);
            }
            let error = "";

            if (!validate.success) {
              error = validate.error.issues
                .map((err) => err.message)
                .join(", ");
            }

            const image: Image = {
              file: e.target.files[i],
              error: error,
            };
            const exist = images.find(
              (val) => val.file.name === image.file.name
            );
            if (!exist) setImages((val) => [...val, image]);
          }
        } else if (indexRetry > -1) {
          let validate;
          if (typeFile === "files" || typeFile === "folder") {
            validate = filesValidation.safeParse(e.target.files[0]);
          } else {
            validate = zipValidation.safeParse(e.target.files[0]);
          }
          let error = "";

          if (!validate.success) {
            error = validate.error.issues.map((err) => err.message).join(", ");
          }

          const image: Image = {
            file: e.target.files[0],
            error: error,
          };
          const exist = images.find((val) => val.file.name === image.file.name);

          if (!exist)
            setImages((val) => {
              const temp = [...val];
              temp[indexRetry] = image;
              return [...temp];
            });
          setIndexRetry(-1);
          if (inputRef.current) inputRef.current.multiple = true;
        }
        setLoading(false);
      }
    };

    const handleDelete = (image: Image) => {
      setImages((val) => {
        return [...val].filter((img) => image.file.name !== img.file.name);
      });
    };

    const handleRetry = (image: Image) => {
      if (inputRef.current) {
        inputRef.current.multiple = false;
        inputRef.current.click();
        const index = images.findIndex(
          (val) => val.file.name === image.file.name
        );
        setIndexRetry(index);
      }
    };
    const otherAtt = { directory: "", webkitdirectory: "" };

    useEffect(() => {
    }, [loading]);

    return (
      <section className="flex h-fit min-w-full flex-col items-center justify-between gap-6 sm:flex-row sm:items-start">
        <div
          className="border-white border-[2px] border-dashed flex h-[170px] min-w-[190px] max-w-[400px] flex-col items-center justify-center gap-4 rounded-[14px] bg-clip-padding p-6 sm:h-[278px] sm:flex-[0.8] "
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <FileUp size={60} />
          <p className="hidden text-center font-anderson text-sm text-white sm:flex">
            Drag{" "}
            {typeFile === "zip"
              ? "zip"
              : typeFile === "folder"
              ? "folder"
              : "files"}{" "}
            kamu di sini atau
          </p>
          <p className="flex text-center font-anderson text-xs text-white sm:hidden">
            Upload{" "}
            {typeFile === "zip"
              ? "zip"
              : typeFile === "folder"
              ? "folder"
              : "files"}{" "}
            kamu
          </p>
          <Button
            className="py-[5px] text-[11px] sm:py-[6px] sm:text-base"
            onClick={handleClick}
            variant="faded"
            color="primary"
            size="md"
          >
            Choose{" "}
            {typeFile === "zip"
              ? "zip"
              : typeFile === "folder"
              ? "folder"
              : "files"}
          </Button>

          {typeFile === "zip" ? (
            <input
              className="hidden"
              onChange={handleChange}
              ref={inputRef}
              type={type}
              {...props}
              accept=".zip,.rar,.7z,.gz"
            />
          ) : (
            <></>
          )}

          {typeFile === "folder" ? (
            <input
              {...otherAtt}
              className="hidden"
              onChange={handleChange}
              ref={inputRef}
              type={type}
              {...props}
              accept=".jpg,.jpeg,.png"
            />
          ) : (
            <></>
          )}

          {typeFile === "files" ? (
            <input
              multiple
              className="hidden"
              onChange={handleChange}
              ref={inputRef}
              type={type}
              {...props}
              accept=".jpg,.jpeg,.png"
            />
          ) : (
            <></>
          )}
        </div>
        <div className="flex h-[120px] sm:h-[278px] w-full flex-col justify-start sm:flex-[1.1]">
          <h2 className="w-full font-anderson text-base text-white:text-2xl">
            Uploaded {typeFile === "zip" ? "zip" : "files"}
          </h2>
          <Divider className="my-2 h-[1px] bg-white" />
          <div
            className={cn(
              "w-full h-full justify-center items-center text-white",
              loading ? "flex" : "hidden"
            )}
          ></div>
          <FileItems
            images={images}
            handleDelete={handleDelete}
            handleRetry={handleRetry}
          />
        </div>
      </section>
    );
  }
);

FileUploadFiles.displayName = "FileUploadFiles";

const FileItems: React.FC<FileItemsProps> = ({
  images,
  handleDelete,
  handleRetry,
}) => {
  return (
    <ScrollArea>
      {images.map((image) => {
        return (
          <Fragment key={image.file.name}>
            <FileItem
              image={image}
              handleDelete={handleDelete}
              handleRetry={handleRetry}
            />
            <Divider className="my-2 h-[1px] bg-white" />
          </Fragment>
        );
      })}
    </ScrollArea>
  );
};

const FileItem: React.FC<FileItemProps> = ({
  image,
  handleDelete,
  handleRetry,
}) => {
  return (
    <div className="flex w-full flex-row items-center justify-between gap-6 p-2">
      <div className="flex flex-row items-center justify-start gap-[18px]">
        <FileImage />
        <div className="flex flex-col">
          <p className="font-anderson text-sm leading-4 text-gray-400 sm:text-[15px]">
            {image.file.name}
          </p>
          <p
            className={cn(
              "hyphens-auto font-montserrat text-[11px] leading-[14px] sm:text-xs",
              image.error ? "text-ted-red" : "text-[#1CCA00]"
            )}
          >
            {image.error ? `${image.error}` : "Completed"}
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-end gap-2">
        {image.error ? (
          <Button
            isIconOnly
            className="p-0"
            variant="light"
            onClick={(e) => {
              e.preventDefault();
              handleRetry(image);
            }}
            size="sm"
          >
            <RotateCw className="h-[15px] w-[15px] text-ted-red sm:h-[16px] sm:w-[16px]" />
          </Button>
        ) : (
          <></>
        )}
        <div
          className={twMerge(
            "flex items-center justify-center rounded-md border  px-2 py-1",
            image.error ? "border-ted-red" : "border-[#CDD3D8]"
          )}
        >
          <p
            className={twMerge(
              "font-anderson text-[11px] font-bold leading-3",
              image.error ? "text-ted-red" : "text-gray-400"
            )}
          >
            {image.error ? "ERROR" : `${Math.round(image.file.size / 1000)}KB`}
          </p>
        </div>
        <Button
          variant="light"
          color="danger"
          onClick={() => handleDelete(image)}
          isIconOnly
        >
          <Trash2 className="h-[15px] w-[15px] sm:h-[16px] sm:w-[16px]" />
        </Button>
      </div>
    </div>
  );
};

export default FileUploadFiles;
