import { LucideIcon, Home, Info, Mail } from "lucide-react";

// Define the type for each navigation item
type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon; // Type for Lucide icons
};

// Define the type for siteConfig
export const siteConfig: {
  name: string;
  description: string;
  navItems: NavItem[];
  navMenuItems: NavItem[];
} = {
  name: "Pet Care Tips and Stories",
  description:
    "Expert advice and heartwarming stories to help you care for your pets and strengthen the bond you share",
  navItems: [
    {
      label: "Home",
      href: "/",
      icon: Home, // Home icon from Lucide
    },
    {
      label: "About",
      href: "/about",
      icon: Info, // Info icon for About
    },
    {
      label: "Contact Us",
      href: "/contact",
      icon: Mail, // Mail icon for Contact
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
      icon: Home,
    },
    {
      label: "About",
      href: "/about",
      icon: Info,
    },
    {
      label: "Contact Us",
      href: "/contact",
      icon: Mail,
    },
    {
      label: "Registration",
      href: "/register",
      icon: Info,
    },
    {
      label: "Login",
      href: "/login",
      icon: Mail,
    },
  ],

};

// Export the type of siteConfig for use elsewhere
export type SiteConfig = typeof siteConfig;
