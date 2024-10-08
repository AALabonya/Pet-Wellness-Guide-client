import CreatePostModal from "@/components/shared/modal/CreatePostModal";
import MonetizationModal from "@/components/shared/modal/MonetizationModal";
import { currentUser } from "@/services/AuthService";
import { getUserData } from "@/services/User/indext";
import { Avatar } from "@nextui-org/avatar";
import React from "react";

const CreatePost = async () => {
  const userData = await currentUser();
  const currentUserData = await getUserData();
  return (
   <div className="flex-1">
     <div className="bg-white dark:bg-[#18181B] shadow-medium rounded-md p-3 flex gap-3">
      <Avatar className="cursor-pointer" src={userData?.profilePicture} />
      {userData && (
        <CreatePostModal
          userId={userData?.id}
          premiumMember={currentUserData?.data?.premiumMember}
        />
      )}
    
    </div>
    <div className="flex justify-center">  {!currentUserData?.data?.premiumMember && <MonetizationModal />}</div>
   </div>
  );
};

export default CreatePost;
