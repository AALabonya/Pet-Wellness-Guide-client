// import React from "react";
// import { Card, CardHeader, CardBody } from "@nextui-org/card";
// import { Avatar } from "@nextui-org/avatar";
// import { TComment, TPost, TUser } from "@/types/post.interface";
// import Image from "next/image";
// import ContentPost from "@/app/(withClientLayout)/(home)/@feed/_components/ContentPost";
// import Followers from "../shared/Followers";
// import ButtonGroup from "./ButtonGroup";
// import Comment from "./Comment";
// import { CustomJwtPayload } from "@/services/AuthService";
// import Link from "next/link";
// import EditComment from "./EditComment";
// import { BadgeCheck } from "lucide-react";
// import { Code } from "@nextui-org/code";
// import ImageGallery from "@/app/(withClientLayout)/(home)/@feed/_components/ImageGallery";

// interface PostCardProps {
//   data: TPost;
//   userData: CustomJwtPayload | null;
//   details?: boolean;
//   premium?: boolean | undefined;
// }

// const PostDetails: React.FC<PostCardProps> = ({
//   data,
//   userData,
//   details,
//   premium,
// }) => {
//   const {
//     title,
//     _id,
//     category,
//     content,
//     isPremium,
//     likes,
//     thumbnail,
//     userId,
//     comments,
//   } = data;

//   const createComment = userData?.email ? (
//     <Comment postId={_id} userData={userData} />
//   ) : null;

//   return (
//     <div className="container mx-auto my-10 px-4 lg:px-0">
//       <Card className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
//         {/* Post Header */}
//         <CardHeader className="p-5 flex justify-between items-center border-b">
//           <div className="flex items-center gap-4">
//             <Avatar
//               isBordered
//               radius="full"
//               size="lg"
//               src={userId?.profilePicture}
//             />
//             <div>
//               <h4 className="text-lg font-semibold text-gray-800">{userId?.name}</h4>
//               <p className="text-sm text-gray-500">{userId?.email}</p>
//             </div>
//           </div>
//           <Followers userId={userId?._id} userData={userData} />
//         </CardHeader>

//         {/* Post Body */}
//         <CardBody className="p-5 space-y-5">
//           {/* Title and Premium Tag */}
//           <div className="flex justify-between items-center">
//             <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
//             {isPremium && (
//               <div className="flex items-center gap-1 text-yellow-500">
//                 <BadgeCheck className="w-5 h-5" />
//                 <span className="font-medium">Premium</span>
//               </div>
//             )}
//           </div>

//           {/* Content and Thumbnail Gallery */}
//           <div className="space-y-5">
//             <ContentPost details={details} content={content} />
//             {thumbnail && Array.isArray(thumbnail) && thumbnail.length > 0 && (
//               <ImageGallery thumbnail={thumbnail} />
//             )}
//           </div>

//           {/* Category and Like Section */}
//           <div className="flex justify-between items-center mt-5">
//             <Code className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg">
//               Category: {category}
//             </Code>
//             <div className="flex items-center gap-2 text-gray-600">
//               <span className="font-semibold">{likes}</span>
//               <span>Votes</span>
//             </div>
//           </div>

//           {/* Button Group */}
//           {userData?.email && (
//             <>
//               <div className="border-t mt-5 pt-5">
//                 <ButtonGroup postId={_id} userId={userData?.id} />
//               </div>
//             </>
//           )}

//           {/* Comments Section */}
//           <div className="border-t mt-5 pt-5 space-y-4">
//             <h3 className="text-lg font-medium text-gray-800">Comments</h3>
//             {comments?.map((comment: TComment) => (
//               <div key={comment._id} className="flex items-start gap-4">
//                 <Avatar src={comment?.userId?.profilePicture} />
//                 <div className="flex-1 p-4 bg-gray-100 rounded-lg dark:bg-gray-900">
//                   <div className="flex justify-between items-center">
//                     <h4 className="font-medium text-gray-900 dark:text-white">{comment?.userId?.name}</h4>
//                     <EditComment comment={comment} />
//                   </div>
//                   <p className="text-sm text-gray-600 mt-2">{comment.comment}</p>
//                 </div>
//               </div>
//             ))}
//             {createComment}
//           </div>
//         </CardBody>
//       </Card>
//     </div>
//   );
// };

// export default PostDetails;
"use client"

import React from "react"
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card"
import { Avatar } from "@nextui-org/avatar"
import { Badge } from "@nextui-org/badge"
import { Button } from "@nextui-org/button"
import { TComment, TPost } from "@/types/post.interface"
import Image from "next/image"
import ContentPost from "@/app/(withClientLayout)/(home)/@feed/_components/ContentPost"
import Followers from "../shared/Followers"
import ButtonGroup from "./ButtonGroup"
import Comment from "./Comment"
import { CustomJwtPayload } from "@/services/AuthService"
import EditComment from "./EditComment"
import { BadgeCheck, MessageCircle, ThumbsUp } from "lucide-react"
import { ScrollShadow } from "@nextui-org/scroll-shadow"
import ImageGallery from "@/app/(withClientLayout)/(home)/@feed/_components/ImageGallery"
import DetailsContent from "@/app/(withClientLayout)/(home)/@feed/_components/DetailsContent"

interface PostCardProps {
  data: TPost
  userData: CustomJwtPayload | null
  details?: boolean
  premium?: boolean | undefined
}

const PostDetails: React.FC<PostCardProps> = ({
  data,
  userData,
  details,
  premium,
}) => {
  const {
    title,
    _id,
    category,
    content,
    isPremium,
    likes,
    thumbnail,
    userId,
    comments,
  } = data

  const createComment = userData?.email ? (
    <Comment postId={_id} userData={userData} />
  ) : null

  return (
    <div className="container mx-auto my-10 px-4 lg:px-0">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Avatar src={userId?.profilePicture} name={userId?.name} size="lg" />
            <div>
              <h4 className="text-lg font-semibold">{userId?.name}</h4>
              <p className="text-sm text-default-500">{userId?.email}</p>
            </div>
          </div>
          <Followers userId={userId?._id} userData={userData} />
        </CardHeader>

        <CardBody className="space-y-5">
          <div className="flex justify-between items-center">
            <h2 className="text-default-500 font-bold">{title}</h2>
            {isPremium && (
              <Badge className="!text-[#bc4124] !flex !items-center">
                <BadgeCheck className="w-4 h-4 mr-1 text-[#bc4124]" />
              <h1 className="text-[#bc4124]"> Premium</h1> 
              </Badge>
            )}
          </div>

          <div className="space-y-5">
            <DetailsContent details={details} content={content} />
            {thumbnail && Array.isArray(thumbnail) && thumbnail.length > 0 && (
              <ImageGallery thumbnail={thumbnail} />
            )}
          </div>

          <div className="flex justify-between items-center mt-5">
           
              {category}
          
            <div className="flex items-center gap-2 text-default-500">
              <ThumbsUp className="w-5 h-5" />
              <span className="font-semibold">{likes}</span>
              <span>Votes</span>
            </div>
          </div>

          {userData?.email && (
            <div className="border-t mt-5 pt-5">
              <ButtonGroup postId={_id} userId={userData?.id} />
            </div>
          )}
        </CardBody>

        <CardFooter className="flex-col items-start">
          <div className="w-full space-y-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-default-500" />
              <h3 className="text-lg font-medium">Comments</h3>
            </div>
            <ScrollShadow className=" w-full">
              {comments?.map((comment: TComment) => (
                <div key={comment._id} className="flex items-start gap-4 mb-4">
                  <Avatar src={comment?.userId?.profilePicture} name={comment?.userId?.name} size="sm" />
                  <div className="flex-1 p-4 bg-default-100 rounded-lg">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{comment?.userId?.name}</h4>
                      <EditComment comment={comment} />
                    </div>
                    <p className="text-sm text-default-700 mt-2">{comment.comment}</p>
                  </div>
                </div>
              ))}
            </ScrollShadow>
            {createComment}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default PostDetails