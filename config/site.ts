import { LucideIcon, Newspaper,BookCheck,SquareUser,UserPen, CircleArrowRight, LogIn } from "lucide-react";

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
      label: "News-feed",
      href: "/",
      icon: Newspaper, // Home icon from Lucide
    },
    {
      label: "Profile",
      href: "/profile",
      icon: UserPen, // Info icon for About
    },
    {
      label: "About",
      href: "/about",
      icon: BookCheck, // Info icon for About
    },
    {
      label: "Contact Us",
      href: "/contact",
      icon: SquareUser, // Mail icon for Contact
    },
  ],
  navMenuItems: [
    {
      label: "News-feed",
      href: "/",
      icon: Newspaper,
    },
    {
      label: "About",
      href: "/about",
      icon: BookCheck,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: UserPen, // Info icon for About
    },
    {
      label: "Contact Us",
      href: "/contact",
      icon: SquareUser,
    },
    {
      label: "Registration",
      href: "/register",
      icon: CircleArrowRight,
    },
    {
      label: "Login",
      href: "/login",
      icon: LogIn,
    },
  ],

};

// Export the type of siteConfig for use elsewhere
export type SiteConfig = typeof siteConfig;
