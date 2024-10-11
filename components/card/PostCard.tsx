// import React from "react";
// import { Card, CardHeader, CardBody } from "@nextui-org/card";
// import { Avatar } from "@nextui-org/avatar";
// import { TComment, TPost, TUser } from "@/types/post.interface";
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

// const PostCard: React.FC<PostCardProps> = ({
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
//     <Card className="w-full">
//       <CardHeader className="lg:justify-between justify-left md:flex-row">
//         <div className="flex gap-5">
//           <Avatar
//             isBordered
//             radius="full"
//             size="md"
//             src={userId?.profilePicture}
//           />
//           <div className="flex flex-col gap-1 items-start lg:justify-center">
//             <h4 className="text-small font-semibold leading-none text-default-600">
//               {userId?.name}
//             </h4>
//             <h5 className="text-small tracking-tight text-default-500">
//               {userId?.email}
//             </h5>
//           </div>
//         </div>
//         <Followers userId={userId?._id} userData={userData} />
//       </CardHeader>
//       <CardBody className="px-3 py-0 text-small text-default-500">
//         <Link
//           href={
//             !isPremium
//               ? `/${_id}`
//               : isPremium && premium
//                 ? `/${_id}`
//                 : isPremium && !premium
//                   ? "/login"
//                   : "#"
//           }
//         >
// <div className="flex flex-col-reverse md:flex-row justify-left  lg:justify-between lg:items-center">
// <h2 className="text-black dark:text-white mb-3 text-[14px]  md:text-lg">{title}</h2>
//   {isPremium && (
//     <div className="flex gap-2 items-center">
//       <BadgeCheck className="text-[#bc4124]" />
//       <span>Premium</span>
//     </div>
//   )}

// </div>

//           <span className="py-2 flex gap-2 flex-col">
//             <ContentPost details={details} content={content} />
//            </span>
//            <Code className="mt-1">Category: {category}</Code>
//           {thumbnail && Array.isArray(thumbnail) && thumbnail.length > 0 && (
//    <ImageGallery thumbnail={thumbnail} />
//  )}

        
//         </Link>

//         <div>
//           <div>
//             <div className="flex gap-3 mb-3">
//               <div className="flex gap-1">
//                 <p className="font-semibold text-default-500 text-small">
//                   {likes}
//                 </p>
//                 <p className=" text-default-500 text-small">Votes</p>
//               </div>
//             </div>
//           </div>
//           {userData?.email && (
//             <>
//               <div className="my-4 bg-gray-300 dark:bg-gray-700 h-[1px]"></div>
//               <ButtonGroup postId={_id} userId={userData?.id} />
//             </>
//           )}
//           <div className="my-4 bg-gray-300 dark:bg-gray-700 h-[1px]"></div>

//           <div>
//             {comments?.map((comment: TComment) => (
//               <div key={comment._id} className="flex items-center my-3 gap-1">
//                 <Avatar src={comment?.userId?.profilePicture} />
//                 <div className="flex justify-between gap-2 py-1 bg-gray-100 px-5 rounded-2xl dark:bg-gray-900">
//                   <div>
//                     <h1 className="text-black dark:text-white">
//                       {comment?.userId?.name}
//                     </h1>
//                     <p>{comment.comment}</p>
//                   </div>
//                   <EditComment comment={comment} />
//                 </div>
//               </div>
//             ))}
//           </div>
//           {createComment}
//         </div>
//       </CardBody>
//     </Card>
//   );
// };

// export default PostCard;
import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { TComment, TPost, TUser } from "@/types/post.interface";
import ContentPost from "@/app/(withClientLayout)/(home)/@feed/_components/ContentPost";
import Followers from "../shared/Followers";
import ButtonGroup from "./ButtonGroup";
import Comment from "./Comment";
import { CustomJwtPayload } from "@/services/AuthService";
import Link from "next/link";
import EditComment from "./EditComment";
import { BadgeCheck, DoorClosed, LocateFixedIcon } from "lucide-react";
import { Code } from "@nextui-org/code";
import ImageGallery from "@/app/(withClientLayout)/(home)/@feed/_components/ImageGallery";

interface PostCardProps {
  data: TPost;
  userData: CustomJwtPayload | null;
  details?: boolean;
  premium?: boolean | undefined;
}

const PostCard: React.FC<PostCardProps> = ({
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
  } = data;
// console.log(userData,"userrr");

  // Render comment input if user is authenticated
  const createComment = userData?.email ? (
    <Comment postId={_id} userData={userData} />
  ) : null;

  return (
    <div className="relative">
      {/* Overlay for non-premium users on premium posts */}
      {!premium && isPremium ? (
        <div className="absolute inset-0 bg-black rounded-xl bg-opacity-50 flex items-center justify-center z-10">
          <div className="text-center text-white space-y-2">
            <p className="text-xl">This post is for Premium members only.</p>
            
            <div className="flex justify-center text-center">
            <DoorClosed className="text-center"/>
            </div>
            <button className="px-4 py-2 bg-[#bc4124] text-white rounded-lg hover:bg-[#bc4124]">

              Become a Premium Member
            </button>
          </div>
        </div>
      ) : null}

      {/* Card with conditional blur effect */}
      <Card
        className={`p-3 md:p-4 ${!premium && isPremium ? "blur-sm" : ""}`}
        radius="sm"
      >
        <CardHeader className="lg:justify-between justify-left md:flex-row">
          <div className="flex gap-5">
            <Avatar
              isBordered
              radius="full"
              size="md"
              src={userId?.profilePicture}
            />
            <div className="flex flex-col gap-1 items-start lg:justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                {userId?.name}
              </h4>
              <h5 className="text-small tracking-tight text-default-500">
                {userId?.email}
              </h5>
            </div>
          </div>
          <Followers userId={userId?._id} userData={userData} />
        </CardHeader>
        <CardBody className="px-3 py-0 text-small text-default-500">
          <Link
            href={
              !isPremium
                ? `/${_id}`
                : isPremium && premium
                  ? `/${_id}`
                  : isPremium && !premium
                    ? "/login"
                    : "#"
            }
          >
            <div className="flex flex-col-reverse md:flex-row justify-left lg:justify-between lg:items-center">
              <h2 className="text-black dark:text-white  text-[14px] md:text-lg">{title}</h2>
              {isPremium && (
                <div className="flex gap-2 items-center">
                  <BadgeCheck className="text-[#bc4124]" />
                  <span>Premium</span>
                </div>
              )}
            </div>

            <span className="py-2 flex gap-2 flex-col">
              <ContentPost details={details} content={content} />
            </span>
            <Code className="mt-1 text-default-500">Category: {category}</Code>
            {thumbnail && Array.isArray(thumbnail) && thumbnail.length > 0 && (
              <ImageGallery thumbnail={thumbnail} />
            )}
          </Link>

          <div>
            <div>
              <div className="flex justify-between mb-3 mt-2">
                
                <div className="flex gap-1">  <p className="font-semibold text-default-500 text-small">
                    {likes}
                  </p>
                  <p className="text-default-500 text-small">upvote</p></div>
                 
            
            <div className="ml-4 text-default-500">
              0 downvotes
            </div>
            <div className="ml-4 text-default-500">
              0 comments
            </div>
         
                </div>

             
            </div>
            {userData?.email && (
              <>
                <div className="my-4 bg-gray-300 dark:bg-gray-700 h-[1px]"></div>
                <ButtonGroup postId={_id} userId={userData?.id} />
              </>
            )}
            <div className="my-4 bg-gray-300 dark:bg-gray-700 h-[1px]"></div>

            <div>
              {comments?.map((comment: TComment) => (
                <div key={comment._id} className="flex items-center my-3 gap-1">
                  <Avatar src={comment?.userId?.profilePicture} />
                  <div className="w-full gap-2 py-1 bg-gray-100 px-5 rounded-2xl dark:bg-gray-900">
                    <div>
                      <h1 className="text-black dark:text-white">
                        {comment?.userId?.name}
                      </h1>
                      <p>{comment.comment}</p>
                    </div>
                    <EditComment comment={comment} />
                  </div>
                </div>
              ))}
            </div>
            {createComment}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default PostCard;
