// "use client";

// import React from "react";

// import {
//   XIcon,
//   MenuIcon,
//   File,
//   Home,
//   Table,
//   User,
//   DollarSign,
// } from "lucide-react";
// import { Link } from "@nextui-org/link";
// import { Card } from "@nextui-org/card";
// import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar";
// import { Button } from "@nextui-org/button";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//   const closeSidebar = () => setIsSidebarOpen(false);

//   const menuItems = [
//     { name: "Dashboard", icon: <Home size={20} />, href: "/admin" },
//     {
//       name: "Content",
//       icon: <Table size={20} />,
//       href: "/admin/content",
//     },
//     { name: "Users", icon: <User size={20} />, href: "/admin/users" },
//     { name: "Payment", icon: <DollarSign size={20} />, href: "/admin/payment" },
//     {
//       name: "Generate PDF",
//       icon: <File size={20} />,
//       href: "/admin/pdf",
//     },
//   ];

//   const SidebarContent = () => (
//     <div className="sticky top-8">
//       <nav>
//         {menuItems.map((item, index) => (
//           <Link
//             key={index}
//             href={item.href}
//             className="flex items-center gap-2 p-4 hover:bg-gray-100 transition-colors"
//             onClick={closeSidebar}
//           >
//             {item.icon}
//             {item.name}
//           </Link>
//         ))}
//       </nav>
//     </div>
//   );

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Card className="hidden lg:flex flex-col w-64 h-full rounded-none ">
//         <SidebarContent />
//       </Card>

//       <div className="flex flex-col flex-grow">
//         <Navbar isBordered className="lg:hidden">
//           <NavbarContent>
//             <Button
//               onPress={toggleSidebar}
//               isIconOnly
//               aria-label="Toggle Menu"
//               variant="light"
//             >
//               {isSidebarOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
//             </Button>
//           </NavbarContent>
//         </Navbar>

//         <Card
//           className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out ${
//             isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//           }`}
//         >
//           <div className="flex justify-end p-4">
//             <Button
//               onPress={closeSidebar}
//               isIconOnly
//               aria-label="Close Menu"
//               variant="light"
//             >
//               <XIcon size={24} />
//             </Button>
//           </div>
//           <SidebarContent />
//         </Card>

//         {isSidebarOpen && (
//           <div
//             className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
//             onClick={closeSidebar}
//           />
//         )}

//         <main className="flex-grow p-6 overflow-auto bg-white dark:bg-slate-950">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }
"use client";

import React from "react";
import {
  XIcon,
  MenuIcon,
  File,
  Home,
  Table,
  User,
  DollarSign,
} from "lucide-react";
import { Link } from "@nextui-org/link";
import { Card } from "@nextui-org/card";
import { Navbar, NavbarContent } from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";

export default function DashboardLayout({ children }: { children: React.ReactNode; }) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev); // Use functional update to ensure the latest state
  const closeSidebar = () => setIsSidebarOpen(false);

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, href: "/admin" },
    { name: "Content", icon: <Table size={20} />, href: "/admin/content" },
    { name: "Users", icon: <User size={20} />, href: "/admin/users" },
    { name: "Payment", icon: <DollarSign size={20} />, href: "/admin/payment" },
    { name: "Generate PDF", icon: <File size={20} />, href: "/admin/pdf" },
  ];

  const SidebarContent = () => (
    <div className="sticky top-8">
      <nav>
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center gap-2 p-4 hover:bg-gray-100 transition-colors"
            onClick={closeSidebar}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <Card className="hidden lg:flex flex-col w-64 h-full rounded-none">
        <SidebarContent />
      </Card>

      <div className="flex flex-col flex-grow">
        {/* Mobile Navbar */}
        <Navbar isBordered className="lg:hidden">
          <NavbarContent>
            <Button
              onClick={toggleSidebar} // Use onClick instead of onPress
              isIconOnly
              aria-label="Toggle Menu"
              variant="light"
            >
              {isSidebarOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </Button>
          </NavbarContent>
        </Navbar>

        {/* Mobile Sidebar */}
        <Card
          className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4">
            <Button
              onClick={closeSidebar}
              isIconOnly
              aria-label="Close Menu"
              variant="light"
            >
              <XIcon size={24} />
            </Button>
          </div>
          <SidebarContent />
        </Card>

        {/* Overlay for Mobile Sidebar */}
        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeSidebar} // Close sidebar when clicking the overlay
          />
        )}

        {/* Main Content Area */}
        <main className="flex-grow p-6 overflow-auto bg-white dark:bg-slate-950">
          {children}
        </main>
      </div>
    </div>
  );
}
