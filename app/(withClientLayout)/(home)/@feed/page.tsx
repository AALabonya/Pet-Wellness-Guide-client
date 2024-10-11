import React from "react";
import CreatePost from "./_components/CreatePost";
import { getPosts } from "@/services/FetchPosts";
import { currentUser } from "@/services/AuthService";

import PostList from "./_components/PostList";
import { getUserData } from "@/services/User";

const Feed = async ({ searchParams }: { searchParams: any }) => {
  const searchQuery = searchParams.search || "";
  const categoryQuery = searchParams.category || "";
  const userData = await currentUser();
  const CreatePostElement = userData?.email ? await CreatePost() : null;
  const currentUserData = await getUserData();

  const { data } = await getPosts({
    search: searchQuery,
    category: categoryQuery,
    page: 1,
    limit: 10,
  });

  return (
    <div>
      {CreatePostElement}
      <PostList
        initialPosts={data?.result}
        userData={userData}
        currentUserData={currentUserData}
        searchQuery={searchQuery}
        categoryQuery={categoryQuery}
      />
    </div>
  );
};

export default Feed;
