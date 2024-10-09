"use client";

import React from "react";
import { Button } from "@nextui-org/button";
import { useDownVote, useUpVote } from "@/hooks/vote.hook";
import envConfig from "@/config/envConfig";

// import envConfig from "@/config/envConfig";

const ButtonGroup = ({
  postId,
  userId,
}: {
  postId: string | undefined;
  userId: string | undefined;
}) => {
  const { mutate: addVote } = useUpVote();
  const { mutate: addDownVote } = useDownVote();

  const handleUpVote = () => {
    addVote({ postId, userId, type: "upvote" });
  };

  const handleDownVote = () => {
    addDownVote({ postId, userId, type: "downvote" });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Discover this amazing post!",
          url: `${envConfig.baseClient}/feed/${postId}`,
          text: `Hey! I just came across this post and thought you might enjoy it. Check it out here: ${envConfig.baseClient}/feed/${postId}`, // More personalized and engaging text
        })
        .then(() => {
          console.log("Post shared successfully!");
        })
        .catch((error) => {
          console.error("There was an error sharing the post:", error);
        });
    } else {
      alert("Sorry, your browser doesn't support the Web Share API.");
    }
  };
  

  return (
    <div className="flex my-2">
      <Button
        onClick={handleUpVote}
        startContent={  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path
            d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z"
          ></path>
        </svg>}
        variant="light"
        className="w-1/3"
      >
        Up Vote
      </Button>
      <Button
        onClick={handleDownVote}
        startContent={ <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path
            d="M239.82,157l-12-96A24,24,0,0,0,204,40H32A16,16,0,0,0,16,56v88a16,16,0,0,0,16,16H75.06l37.78,75.58A8,8,0,0,0,120,240a40,40,0,0,0,40-40V184h56a24,24,0,0,0,23.82-27ZM72,144H32V56H72Zm150,21.29a7.88,7.88,0,0,1-6,2.71H152a8,8,0,0,0-8,8v24a24,24,0,0,1-19.29,23.54L88,150.11V56H204a8,8,0,0,1,7.94,7l12,96A7.87,7.87,0,0,1,222,165.29Z"
          ></path>
        </svg>}
        variant="light"
        className="w-1/3"
      >
        Down Vote
      </Button>
      <Button
        onClick={handleShare}
        startContent={  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path
            d="M229.66,109.66l-48,48a8,8,0,0,1-11.32-11.32L204.69,112H165a88,88,0,0,0-85.23,66,8,8,0,0,1-15.5-4A103.94,103.94,0,0,1,165,96h39.71L170.34,61.66a8,8,0,0,1,11.32-11.32l48,48A8,8,0,0,1,229.66,109.66ZM192,208H40V88a8,8,0,0,0-16,0V208a16,16,0,0,0,16,16H192a8,8,0,0,0,0-16Z"
          ></path>
        </svg>}
        variant="light"
        className="w-1/3"
      >
        Share
      </Button>
    </div>
  );
};

export default ButtonGroup;
