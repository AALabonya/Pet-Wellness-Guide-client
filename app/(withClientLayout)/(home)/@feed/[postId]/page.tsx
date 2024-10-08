
import PostDetails from "@/components/card/PostDetails";
import envConfig from "@/config/envConfig";
import { axiosInstance } from "@/lib/AxiosInstance";
import { currentUser } from "@/services/AuthService";
import React from "react";

interface TPostId {
  params: {
    postId: string;
  };
}

const page = async ({ params }: TPostId) => {
  const userData = await currentUser();
  const postData = await axiosInstance.get(
    `${envConfig.baseApi}/posts/${params.postId}`
  );

  return (
    <div>
      <PostDetails
        key={params.postId}
        data={postData?.data?.data}
        userData={userData}
        details={true}
      />
    </div>
  );
};

export default page;
