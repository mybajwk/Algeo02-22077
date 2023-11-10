"use client";

import { Button } from "@nextui-org/react";
import React, { ChangeEvent, Dispatch, FC, SetStateAction, useRef, useState } from "react";

interface FileUploadProps {
  photo: File | null,
  setPhoto: Dispatch<SetStateAction<File | null>>
}

const FileUpload: FC<FileUploadProps> = ({ photo, setPhoto }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setError("");
    if (e.target.files) {
      const photoUploaded = e.target.files[0];
      if (photoUploaded) {
        if (photoUploaded.size > 5000000) {
          setError("Photo size must be less than 5MB!!");
          return;
        } else if (!allowedFileTypes.includes(photoUploaded.type)) {
          setError("Photo type must be png, jpg, or jpeg!!");
          return;
        } else {
          setPhoto(photoUploaded); // Update the state with the uploaded photo
        }
      }
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
    setError("");
    const photoUploaded = e.dataTransfer.files && e.dataTransfer.files[0];

    if (photoUploaded && photoUploaded.size > 5000000) {
      setError("Photo size must be less than 5MB!!");
      return;
    }

    if (photoUploaded && !allowedFileTypes.includes(photoUploaded.type)) {
      setError("Photo type must be png, jpg, or jpeg!!");
      return;
    }

    if (photoUploaded) {
      setPhoto(photoUploaded);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className="flex flex-col items-center justify-center w-full h-64 rounded-lg"
    >
      <div className="w-full h-full flex flex-col items-center justify-center border-white rounded-md border-dashed border-[2px]">
        <svg
          className="w-10 h-10 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 16"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
          />
        </svg>
        {error ? (
          <p className="text-base text-red-500 font-mono">{error}</p>
        ) : (
          <></>
        )}
        <p className="text-base text-white font-mono">
          png, jpg, or jpeg <span className="font-semibold">(MAX 5MB)</span>
        </p>
        <p className="text-base text-white font-mono">
          Drag your files here or
        </p>

        <Button
          radius="md"
          size="md"
          className="mt-4 text-blue-600"
          variant="faded"
          onClick={handleClick}
        >
          Upload
        </Button>
        <input
          ref={inputRef}
          id="dropzone"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default FileUpload;
