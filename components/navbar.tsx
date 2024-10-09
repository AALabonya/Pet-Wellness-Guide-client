"use client";
import React, { useEffect, useState } from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { Player } from '@lottiefiles/react-lottie-player';
import { ThemeSwitch } from "@/components/theme-switch";

import logo from "@/public/logo1.json";
import Image from "next/image";
import AuthDynamic from "./AuthDynamic";
import { siteConfig } from "@/config/site";

interface NavItem {
  label: string;
  href: string;
}

export const Navbar = () => {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [navMenuItems, setNavMenuItems] = useState<NavItem[]>([]);

  useEffect(() => {
    setNavItems(siteConfig.navItems);
    setNavMenuItems(siteConfig.navMenuItems);
  }, []);

  return (
<NextUINavbar className="fixed bg-primaryNav" maxWidth="xl">
{/* <!-- Brand & Toggle --> */}
<NavbarContent>
  <NavbarMenuToggle className="sm:hidden" />
  <NavbarBrand>
    <Link className="flex items-center gap-1" href="/">
    <div className="relative">
      <p className="absolute text-white inset-0 flex items-center mr-8 ml-8 justify-center font-bold text-inherit z-0">
        Pet......Care
      </p>
      <Player
        autoplay
        loop
        src={logo}
        className="w-[130px] z-10"
      />
    </div>
    </Link>
  </NavbarBrand>
</NavbarContent>

{/* <!-- Center Navigation --> */}
<NavbarContent className="hidden sm:flex gap-4" justify="center">
{siteConfig.navItems.map((item) => (
    <NavbarItem key={item.href}>
      <NextLink className="text-white flex items-center gap-1" href={item.href}>
        <item.icon className="w-5 h-5" /> {/* Render the Lucide icon */}
        {item.label} {/* Display the label */}
      </NextLink>
    </NavbarItem>
  ))}
</NavbarContent>

{/* <!-- Right Side --> */}
<NavbarContent justify="end">
  <NavbarItem>
    <ThemeSwitch />
  </NavbarItem>
  <AuthDynamic />
</NavbarContent>

{/* <!-- Mobile Menu --> */}
<NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2 text-white">
          {navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === navMenuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
</NextUINavbar>
  );
};

