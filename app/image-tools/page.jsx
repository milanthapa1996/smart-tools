import React from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const solutions = [
  {
    name: "Jpg2Png",
    description: "Convert image from jpg to png format",
    href: "/image-tools/jpg2png",
    icon: PhotoIcon,
  },
  {
    name: "Jpg2Webp",
    description: "Convert image from jpg to webp format.",
    href: "/image-tools/jpg2webp",
    icon: PhotoIcon,
  },
  {
    name: "Security",
    description: "Your customers' data will be safe and secure.",
    href: "#",
    icon: PhotoIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools that you're already using.",
    href: "#",
    icon: PhotoIcon,
  },
];

const page = () => {
  return (
    <div className="max-w-7xl mx-auto grid gap-y-6 px-4 py-6 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-4 lg:px-8 lg:py-12 xl:py-16">
      {solutions.map((item) => (
        <Link
          href={item.href}
          key={item.name}
          className="-m-3 p-3 flex flex-col justify-between rounded-lg bg-white hover:bg-sky-50"
        >
          <div className="flex md:h-full lg:flex-col">
            <div className="flex-shrink-0">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12">
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </span>
            </div>
            <div className="ml-4 md:flex-1 md:flex md:flex-col md:justify-between lg:ml-0 lg:mt-4">
              <div>
                <p className="text-base font-medium text-gray-900">
                  {item.name}
                </p>
                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
              </div>
              <p className="mt-2 text-sm font-medium text-indigo-600 lg:mt-4">
                Try it <span aria-hidden="true">&rarr;</span>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default page;
