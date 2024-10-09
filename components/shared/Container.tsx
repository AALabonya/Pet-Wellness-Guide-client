import React, { ReactNode } from "react";

const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`container  mx-auto max-w-7xl lg:px-6 pt-4`}
    >
      {children}
    </div>
  );
};

export default Container;
