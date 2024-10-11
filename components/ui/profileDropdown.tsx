// "use client";

// import React from "react";
// import {
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownItem,
// } from "@nextui-org/dropdown";
// import { Avatar } from "@nextui-org/avatar";
// import Link from "next/link";

// import { usePathname, useRouter } from "next/navigation";
// import { logout } from "@/services/AuthService";
// import { useUser } from "@/context/user.provider";
// import { protectedRoutes } from "@/constant/constant";

// export default function ProfileDropdown() {
//   const pathname = usePathname();
//   const router = useRouter();
//   const { setLoading, user } = useUser();
//   const handleLogout = () => {
//     logout();
//     setLoading(true);

//     if (protectedRoutes.some((route) => pathname.match(route))) {
//       router.push("/");
//     }
//   };

//   return (
//     <Dropdown>
//       <DropdownTrigger>
//         <Avatar className="cursor-pointer" src={user?.profilePicture} />
//       </DropdownTrigger>
//       <DropdownMenu aria-label="Static Actions">
//         <DropdownItem key="new">
//           <Link href="/profile">Profile</Link>
//         </DropdownItem>
//         <DropdownItem key="new">
//           {user?.role === "admin" ? (
//             <Link href="/admin">Dashboard</Link>
//           ) : (
//             <Link href="/client">Dashboard</Link>
//           )}
//         </DropdownItem>
//         <DropdownItem
//           onClick={handleLogout}
//           key="delete"
//           className="text-primaryNav"
//         >
//           Logout
//         </DropdownItem>
//       </DropdownMenu>
//     </Dropdown>
//   );
// }
"use client";

import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/services/AuthService";
import { useUser } from "@/context/user.provider";
import { protectedRoutes } from "@/constant/constant";

export default function ProfileDropdown() {
  const pathname = usePathname();
  const router = useRouter();
  const { setLoading, user } = useUser();

  const handleLogout = () => {
    logout();
    setLoading(true);
    router.push("/");
  };

  // Explicit handling for navigation to profile and dashboard routes
  const handleNavigateToProfile = () => {
    router.push("/profile");
  };

  const handleNavigateToDashboard = () => {
    if (user?.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/client");
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className="cursor-pointer" src={user?.profilePicture} />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions">
        <DropdownItem key="profile" onClick={handleNavigateToProfile}>
          Profile
        </DropdownItem>
        <DropdownItem key="dashboard" onClick={handleNavigateToDashboard}>
          Dashboard
        </DropdownItem>
        <DropdownItem
          key="logout"
          onClick={handleLogout}
          className="text-primaryNav"
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
