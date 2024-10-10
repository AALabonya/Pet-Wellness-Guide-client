import PostCard from "@/components/card/PostCard";
import Container from "@/components/shared/Container";
import EditProfileModal from "@/components/shared/modal/EditProfileModal";
import { axiosInstance } from "@/lib/AxiosInstance";
import { currentUser } from "@/services/AuthService";
import { getUserData } from "@/services/User";
import { TPost } from "@/types/post.interface";
import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Locate, LucideBadgeCheck,LucideMail, Phone,  User2, UserCheck2 } from "lucide-react";
import Image from "next/image";
import React from "react";

const ProfilePage = async () => {
  const { data: followersCount } = await axiosInstance.get("/followers/count");
  const { data } = await axiosInstance.get(`/followers/metoo`);
  const { data: followersData } = await axiosInstance.get(`/followers/me`);
  const { data: myPosts } = await axiosInstance.get(`/posts/me`);
  const userInfo = await getUserData();
  const userData = await currentUser();


  return (
    <Container>
      <div className="border border-gray-500">
        <Image
          width={1220}
          height={550}
          loading="lazy"
          alt="this is profile banner image"
          src={
            "https://plus.unsplash.com/premium_photo-1695267061085-0f7cfca592bd?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          placeholder="blur"
          className="w-full h-96 object-cover "
          blurDataURL={
            "https://plus.unsplash.com/premium_photo-1695267061085-0f7cfca592bd?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
      </div>
      
      <div className="my-5">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2">
            <Avatar
              className="w-44 h-44"
              src={userInfo?.data?.profilePicture}
            />
            <div>
              <h1 className="font-bold text-2xl">{userInfo?.data?.name} {userInfo?.data?.premiumMember && (
    <LucideBadgeCheck className="inline text-blue-500 ml-2" size={20} />
  )} </h1>
              <p> <LucideMail className="inline" size={18} /> {userInfo?.data?.email}</p>
              <div className="flex flex-wrap items-center md:justify-start text-gray-600 py-1.5">
              <span className="">
              {followersCount?.data?.followerCount} Followers
              </span>
              <span className="mx-2">•</span>
              <span>{followersCount?.data?.followingCount} following</span>
            </div>
             
            </div>
          </div>

          <div>
            <EditProfileModal userData={userInfo?.data} />
          </div>
        </div>
        <Divider />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          <div className="col-span-2 my-5">
            <Card>
              <CardHeader>About</CardHeader>
              <CardBody className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <Phone />
                  <span>{userInfo?.data?.phone}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <Locate />
                  <span>{userInfo?.data?.address}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <UserCheck2/>
                  <span>{userInfo?.data?.gender}</span>
                </div>
                <div className="flex gap-2 items-center">
                <User2 />
                  <span>{userInfo?.data?.role}</span>
                </div>
              </CardBody>
            </Card>

            <Card className="my-5">
              <CardHeader>Followed Users</CardHeader>
              <CardBody className="flex flex-col gap-2">
                {data?.data.length < 1 ? (
                  <h3>No followed users yet!</h3>
                ) : (
                  data?.data?.map(
                    ({
                      userId,
                      _id,
                    }: {
                      userId: { profilePicture: string; name: string };
                      _id: string;
                    }) => {
                      return (
                        <div key={_id} className="flex gap-2 items-center">
                          <Avatar src={userId.profilePicture} />
                          <span>{userId?.name}</span>
                        </div>
                      );
                    }
                  )
                )}
              </CardBody>
            </Card>

            <Card className="my-5">
              <CardHeader> Followers Users</CardHeader>
              <CardBody className="flex flex-col gap-2">
                {followersData?.data.length < 1 ? (
                  <h3>No followers yet!</h3>
                ) : (
                  followersData?.data?.map(
                    ({
                      followerId,
                      _id,
                    }: {
                      followerId: { profilePicture: string; name: string };
                      _id: string;
                    }) => {
                      return (
                        <div key={_id} className="flex gap-2 items-center">
                          <Avatar src={followerId.profilePicture} />
                          <span>{followerId?.name}</span>
                        </div>
                      );
                    }
                  )
                )}
              </CardBody>
            </Card>
          </div>

          <div className="col-span-3 my-5 flex flex-col gap-5">
            {myPosts?.data.length < 1 ? (
              <h3>No post created</h3>
            ) : (
              myPosts?.data?.map(async (post: TPost) => {
                return (
                  <PostCard key={post._id} data={post} userData={userData} />
                );
              })
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProfilePage;
