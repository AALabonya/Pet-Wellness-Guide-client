"use client";
import React, { useEffect, useState } from "react";

const ContentPost = ({
  content,
  details,
}: {
  content: string | undefined;
  details: boolean | undefined;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
// console.log(content);

  // Set the maximum length for truncation
  const maxLength = 100;

  // Function to toggle the expanded state
  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  // Determine the truncated or full content based on state
  const getDisplayContent = () => {
    if (details || isExpanded || !content) {
      // Show full content when details is true or isExpanded is true
      return content;
    }

    // Show truncated content if it's not expanded
    return content.length > maxLength
      ? content.substring(0, maxLength) + "..."
      : content;
  };

  return (
    <div className="text-default-500 ">
      <div
        className="prose "
        dangerouslySetInnerHTML={{ __html: getDisplayContent() || "" }}
      />
      {/* Conditionally render "See More"/"See Less" button based on content length */}
      {content && content.length > maxLength && !details && (
        <button
          className="text-blue-500 mt-2"
          onClick={handleToggle}
        >
          {isExpanded ? "See Less" : "See More"}
        </button>
      )}
    </div>
  );
};

export default ContentPost;
