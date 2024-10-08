"use client";

import { NavbarItem } from "@nextui-org/navbar";
import React from "react";

import Link from "next/link";
import { Button } from "@nextui-org/button";
import { useUser } from "@/context/user.provider";
import ProfileDropdown from "./ui/profileDropdown";

const AuthDynamic = () => {
  const { user } = useUser();
  return (
    <>
      {user?.email ? (
        <NavbarItem>
          <ProfileDropdown />
        </NavbarItem>
      ) : (
        <>
          <NavbarItem className="hidden md:flex">
            <Button
              as={Link}
              className="text-sm font-normal border-none text-white  hover:bg-[#bc4124]"
              href={"/login"}
              
            >
              Login
            </Button>
          </NavbarItem>
          <NavbarItem className=" lg:hidden md:flex">
            <Button
              as={Link}
              className="text-sm font-normal text-white border-accent hover:bg-[#bc4124]"
              href={"/register"}
             
            >
              Sign Up
            </Button>
          </NavbarItem>
        </>
      )}
    </>
  );
};

export default AuthDynamic;
