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
      className={`container flex justify-center mx-auto max-w-7xl px-6`}
    >
      {children}
    </div>
  );
};

export default Container;
