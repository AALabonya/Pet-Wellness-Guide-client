// "use client";
// import { useComment } from "@/hooks/comment.hook";
// import { CustomJwtPayload } from "@/services/AuthService";
// import { Avatar } from "@nextui-org/avatar";
// import { Input } from "@nextui-org/input";
// import React, { useState } from "react";

// const Comment = ({
//   userData,
//   postId,
// }: {
//   userData: CustomJwtPayload | null;
//   postId: string | undefined;
// }) => {
//   const { mutate: handleComment, isSuccess } = useComment();
//   const [comment, setComment] = useState("");

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       handleComment({ comment, postId, userId: userData?.id });

//       if (isSuccess) {
//         setComment("");
//       }
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setComment(e.target.value);
//   };

//   return (
//     <div className="flex items-center justify-between my-3 gap-3">
//       <Avatar src={userData?.profilePicture} />
//       <Input
//         value={comment}
//         onChange={handleChange}
//         onKeyDown={handleKeyDown}
//         type="text"
//         placeholder="Add a comment"
//       />
//     </div>
//   );
// };

// export default Comment;
"use client";

import { useComment } from "@/hooks/comment.hook";
import { CustomJwtPayload } from "@/services/AuthService";
import { Avatar } from "@nextui-org/avatar";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import { MessageCircle } from "lucide-react";

const Comment = ({
  userData,
  postId,
}: {
  userData: CustomJwtPayload | null;
  postId: string | undefined;
}) => {
  const { mutate: handleComment, isSuccess } = useComment();
  const [comment, setComment] = useState("");

  const submitComment = () => {
    if (comment.trim()) {
      handleComment({ comment, postId, userId: userData?.id });

      if (isSuccess) {
        setComment("");
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submitComment();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  return (
    <div className="flex items-center justify-between my-3 gap-3">
      <Avatar src={userData?.profilePicture} />
      <div className="flex-grow flex items-center gap-2">
        <Input
          value={comment}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Add a comment"
          className="flex-grow"
        />
        <Button
          isIconOnly
          color="primary"
          aria-label="Post comment"
          onClick={submitComment}
        >
          <MessageCircle className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Comment;