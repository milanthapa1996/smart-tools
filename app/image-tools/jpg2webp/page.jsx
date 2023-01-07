"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";

const page = () => {
  const [imageData, setImageData] = useState(null);
  const [convertedImageData, setConvertedImageData] = useState(null);

  const fileInput = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageData(reader.result);
    };
    setConvertedImageData(null);
  };

  const handleConvert = () => {
    setLoading(true);
    const image = new Image();
    image.src = imageData;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      const newImageData = canvas.toDataURL(`image/webp`);
      setConvertedImageData(newImageData);
      setLoading(false);
    };
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.download = "image.webp";
    link.href = convertedImageData;
    link.click();
  };

  return (
    <>
      <h1 className="text-2xl text-opacity-50 text-gray-700 text-center mt-6">
        Jpg To Webp Converter
      </h1>
      <p className="text-center text-gray-500 text-opacity-50 mt-2">
        Convert JPG to Webp online and for free. You can also convert any format
        of image using our
        <Link href={"/image-tools"} className="text-blue-500">
          {""} Image-tools
        </Link>
      </p>

      <h1
        className={`${
          imageData ? "hidden" : "block"
        } mt-24 flex flex-col lg:flex-row justify-around items-center text-opacity-50 text-gray-800 text-xl lg:text-4xl text-justify`}
      >
        Please upload image to proceed{" "}
      </h1>

      <h2
        className={`${
          imageData ? "hidden" : "block"
        } mt-6 flex flex-col lg:flex-row justify-around items-center text-opacity-50 text-gray-700 text-sm italic`}
      >
        Click the bouncing icon to upload image.
      </h2>

      <div className="mt-4 flex flex-col lg:flex-row justify-around items-center">
        <div className="w-full lg:w-[50%] ">
          <div
            className={`fixed bottom-10 right-10 ${
              imageData ? "animate-none" : "animate-bounce"
            }  hover:animate-none delay-300 duration-700`}
          >
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
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
                  accept="image/jpeg"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
          {imageData && (
            <div className="flex flex-col justify-center items-center bg-yellow-50 py-4">
              <div className="w-[70%] lg:w-2/3 my-4 flex justify-center items-center">
                <img
                  className="w-full rounded-lg shadow-lg"
                  src={imageData}
                  alt="Original image"
                />
              </div>

              <div className="px-4 py-2 bg-sky-600 w-[70%] lg:w-2/3 first-letter:text-center mb-6 lg:mb-0">
                <p className="text-xl text-white font-bold">Original Image</p>
              </div>

              <button
                className={`${
                  convertedImageData
                    ? "hidden"
                    : "py-2 px-4 rounded-lg bg-blue-500 text-white fixed bottom-10 right-32 flex space-x-2"
                } ${loading ? "disabled:opacity-50" : "opacity-100"}`}
                onClick={handleConvert}
              >
                <svg
                  className={`w-6 h-6 ${loading ? "animate-spin" : "hidden"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  ></path>
                </svg>
                <span className={`${loading ? "hidden" : "block"}`}>
                  Convert to WEBP
                </span>
              </button>
            </div>
          )}
        </div>
        {convertedImageData && (
          <div className="w-[70%] lg:w-[50%] flex items-center justify-center bg-green-50 py-4">
            <div className="w-full lg:w-2/3 my-4">
              <div className="block w-full rounded-lg shadow-lg bg-white">
                <img
                  className="w-full rounded-lg shadow-lg"
                  src={convertedImageData}
                  alt="Converted image"
                />
              </div>
              <div
                className="px-4 py-2 bg-green-500 text-center mt-4 cursor-pointer"
                onClick={handleDownload}
              >
                <p className="text-xl text-white font-bold">Download</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default page;
