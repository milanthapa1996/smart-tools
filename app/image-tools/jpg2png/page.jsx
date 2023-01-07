"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";

const page = () => {
  const [imageData, setImageData] = useState(null);
  const [convertedImageData, setConvertedImageData] = useState(null);
  const fileInput = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageData(reader.result);
    };
  };

  const handleConvert = () => {
    const image = new Image();
    image.src = imageData;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      const newImageData = canvas.toDataURL(`download/png`);
      setConvertedImageData(newImageData);
    };
  };

  return (
    <>
      <h1 className="text-2xl text-opacity-50 text-gray-700 text-center mt-6">
        Jpg To Png Converter
      </h1>
      <p className="text-center text-gray-500 text-opacity-50 mt-2">
        Convert JPG to PNG online and for free. You can also convert any format
        of image using our
        <Link href={"/image-tools"} className="text-blue-500">
          {""} Image-tools
        </Link>
        .
      </p>

      <div className="mt-4 flex flex-col lg:flex-row justify-around items-center">
        <div className="w-full lg:w-[50%] ">
          <div
            className={`fixed bottom-10 right-10 ${
              imageData ? "animate-none" : "animate-bounce"
            }  hover:animate-none delay-300 duration-700`}
          >
            <div className="flex items-center justify-center w-full">
              <label
                for="dropzone-file"
                className="flex flex-col items-center justify-center w-full p-2 border-2  border-dotted rounded-full border-indigo-500 cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center">
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Upload</span>
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  ref={fileInput}
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
          {imageData && (
            <>
              <div className="w-full lg:w-2/3 my-4 flex justify-center items-center">
                <img
                  className="w-full rounded-lg shadow-lg"
                  src={imageData}
                  alt="Original image"
                />
              </div>

              <div className="px-4 py-2 bg-sky-600 w-full lg:w-2/3 first-letter:text-center mt-2">
                <p className="text-xl text-white font-bold">Original Image</p>
              </div>

              <button
                className={`${
                  convertedImageData
                    ? "hidden"
                    : "py-2 px-4 rounded-lg bg-blue-500 text-white mb-4 fixed bottom-10 right-32"
                }`}
                onClick={handleConvert}
              >
                Convert to PNG
              </button>
            </>
          )}
        </div>
        <div className="w-full lg:w-[50%] flex items-center">
          {convertedImageData && (
            <div className="w-full lg:w-2/3 my-4">
              <a
                className="block w-full rounded-lg shadow-lg bg-white"
                href={convertedImageData}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="w-full rounded-lg shadow-lg"
                  src={convertedImageData}
                  alt="Converted image"
                />
                <div className="px-4 py-2 bg-green-500 text-center mt-2">
                  <p className="text-xl text-white font-bold">Download</p>
                </div>
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
