import { axiosInstance } from "@/lib/AxiosInstance";
import React from "react";

const page = async () => {
  // const { data: userData } = await axiosInstance.get("/users/me");
  
  return (
    <div
      className="h-screen flex items-center justify-center"
      style={{
        backgroundImage: 'url("https://img.freepik.com/premium-photo/arafed-man-lab-coat-looking-computer-screen-with-cat-generative-ai_1035439-2044.jpg?w=826")',
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
      }}
    >
      <h1 className="text-5xl font-black text-white lg:-mt-[350px] -mt-[150px] ">
        Welcome 
        <div className="text-3xl font-black text-white mt-5">To Dashboard</div>
      </h1>
      
    </div>
  );
};

export default page;
