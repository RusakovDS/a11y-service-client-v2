import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const ContentLayout = ({ children }: Props) => {
  return <div className="flex-grow bg-indigo-200 text-center">{children}</div>;
};

export default ContentLayout;
