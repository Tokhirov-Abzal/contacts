import React from "react";

interface IMainWrapperProps {
  children: React.ReactElement | React.ReactElement[];
  className?: string;
}

export const MainWrapper = ({
  children,
  className,
}: IMainWrapperProps): React.ReactElement => {
  return <div className={`max-w-7xl m-auto ${className}`}>{children}</div>;
};
