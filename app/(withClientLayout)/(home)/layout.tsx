
// layout.tsx (Server Component)
import Container from "@/components/shared/Container";
import React, { ReactNode } from "react";
import Sidebar from "./_components/Sidebar";
import SearchFilter from "./@feed/_components/SearchFilter";
import { getPremiumPosts } from "@/services/FetchPosts";
import { currentUser } from "@/services/AuthService";

import RightSidebar from "./_components/RightSidebar";
import { getUserData, getUsers } from "@/services/User";

const layout = async ({ feed }: { children: ReactNode; feed: ReactNode }) => {
  const { data: users } = await getUsers({ limit: 5 });
  const userData = await currentUser();
  const { data: premiumPosts } = await getPremiumPosts();
  const loggedUser = await getUserData();

  // Extract premium status from loggedUser
  const premium = loggedUser?.data?.premiumMember;

  return (
    <Container>  
      <div className="grid grid-cols-1 md:grid-cols-8 gap-5 my-1">
        
        {/* Left Sidebar - visible on md and larger screens */}
        <div className="hidden md:block col-span-2 ">
         <div className="sticky top-20 scroll-my-1"> {/* Sticky wrapper for Sidebar */}
         <RightSidebar 
            users={users}
            userData={userData}
            premium={premium}
            premiumPosts={premiumPosts.result} 
          />
         </div>
        </div>
        
        {/* Main content */}
        <main className="col-span-1 md:col-span-4">
          <SearchFilter />
          {feed}
        </main>
        
        {/* Right Sidebar - visible on md and larger screens */}
        <div className="hidden md:block col-span-2">
          <SidebarWrapper
            users={users}
            userData={userData}
            premiumPosts={premiumPosts.result}
            premium={premium} // Pass premium status here as well if needed
          />
        </div>
        
      </div>
    </Container>
  );
};

const SidebarWrapper = ({ users, userData, premiumPosts, premium }: any) => {
  return (
    <div className="sticky top-20 scroll-my-1">
      <Sidebar
        users={users}
        userData={userData}
        premium={premium}
        premiumPosts={premiumPosts}
      />
    </div>
  );
};

export default layout;
