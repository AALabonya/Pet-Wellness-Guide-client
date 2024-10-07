"use server";

import { axiosInstance } from "@/lib/AxiosInstance";
import { revalidateTag } from "next/cache";

export const deleteUser = async (userId: string) => {
  try {
    const { data } = await axiosInstance.delete(`/users/${userId}`);

    revalidateTag("users");
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Fetch follower count
export const getFollowersCount = async () => {
  try {
    const { data } = await axiosInstance.get("/followers/count");
    return data;
  } catch (error) {
    // console.log("Error fetching followers count:", error);
    throw error;
  }
};

// Fetch users following me
export const getFollowingMe = async () => {
  try {
    const { data } = await axiosInstance.get(`/followers/metoo`);
    return data;
  } catch (error) {
    console.log("Error fetching followers (me too):", error);
    throw error;
  }
};

// Fetch my followers
export const getMyFollowers = async () => {
  try {
    const { data } = await axiosInstance.get(`/followers/me`);
    return data;
  } catch (error) {
    // console.log("Error fetching my followers:", error);
    throw error;
  }
};

// Fetch my posts
export const getMyPosts = async () => {
  try {
    const { data:myPosts } = await axiosInstance.get(`/posts/me`);
    return myPosts;
  } catch (error) {
    // console.log("Error fetching my posts:", error);
    throw error;
  }
};
