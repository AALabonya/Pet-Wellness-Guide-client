"use client";
import React, { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  thumbnail: string[]; // Array of image URLs
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ thumbnail }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="">
      {/* Thumbnail Grid */}
      <div
        className={`grid ${
          thumbnail.length === 1
            ? "grid-cols-1"
            : thumbnail.length === 2
            ? "grid-cols-2"
            : thumbnail.length === 3
            ? "grid-cols-2 md:grid-cols-3"
            : "grid-cols-2 md:grid-cols-4"
        } my-2`}
      >
        {thumbnail.slice(0, 3).map((image, idx) => (
          <Image
            key={idx}
            alt={`Image ${idx + 1}`}
            className="h-64 w-full object-cover rounded-lg transition-transform duration-200 hover:scale-105"
            height={150}
            src={image}
            width={150}
          />
        ))}

        {/* If there are more than 3 images, display a special fourth image with a +X count */}
        {thumbnail.length > 3 && (
          <div className="relative">
            <Image
              alt="Image 4"
              className="h-64 w-full object-cover rounded-lg transition-transform duration-200 hover:scale-105"
              height={150}
              src={thumbnail[3]} // Display 4th image
              width={150}
              onClick={openModal}
            />
            <div
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg cursor-pointer"
              onClick={openModal}
            >
              <span className="text-white text-lg font-semibold">
                +{thumbnail.length - 3} {/* Shows how many images remain */}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Modal to display all images */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
          onClick={closeModal}
        >
          <div className="bg-white p-4 rounded-lg max-w-3xl max-h-[90%] overflow-auto">
            <h2 className="text-xl font-bold mb-4 text-center">All Images</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {thumbnail.map((image, idx) => (
                <Image
                  key={idx}
                  alt={`Full Image ${idx + 1}`}
                  className="w-full h-auto object-cover rounded-lg transition-transform duration-200 hover:scale-105"
                  height={200}
                  src={image}
                  width={300}
                />
              ))}
            </div>
            <button
              className="mt-4 px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-500 transition-colors"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
