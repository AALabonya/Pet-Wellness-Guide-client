"use client";
import React from 'react';
import loader from "@/public/loader.json";
import { Player } from '@lottiefiles/react-lottie-player';

const loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Player
        autoplay
        loop
        src={loader}
        className='w-[130px]'
      />
    </div>
  );
};

export default loading;
