import { axiosInstance } from "@/lib/AxiosInstance";
import React from "react";

const page = async () => {
  const { data: userData } = await axiosInstance.get("/users/me");
  
  return (
    <div
      className="h-screen flex items-center justify-center"
      style={{
        backgroundImage: 'url("https://img.freepik.com/free-photo/still-life-pet-food-arrangement_23-2148982354.jpg?t=st=1728392222~exp=1728395822~hmac=16c6c005231c0563d8765e74c8ebdf964dda00da5f20db7011e782a364cdedf4&w=900")',
        backgroundSize: 'cover', // Make sure the background image covers the entire div
        backgroundPosition: 'center', // Center the background image
      }}
    >
      <h1 className="text-5xl font-black text-white -mt-[550px]">
        Welcome 
        <div className="text-3xl font-black text-white mt-5">{userData?.data?.name}</div>
      </h1>
      
    </div>
  );
};

export default page;
