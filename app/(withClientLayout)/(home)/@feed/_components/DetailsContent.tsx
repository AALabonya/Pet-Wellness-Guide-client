"use client";
import React from "react";

const DetailsContent = ({
  content,
  details,
}: {
  content: string | undefined;
  details: boolean | undefined;
}) => {
  // Determine the displayed content based on details prop
  const displayContent = details ? content : content || "";

  return (
    <div className="text-[14px] md:text-lg">
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: displayContent || "" }} // Ensure displayContent is a string
      />
    </div>
  );
};

export default DetailsContent
