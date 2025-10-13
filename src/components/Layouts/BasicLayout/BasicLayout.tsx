import React from "react";

import LeftNavPanel from "@/components/Layouts/BasicLayout/LeftNavPanel";

// Interface for component props to type the children prop
interface BasicLayoutProps {
  children?: React.ReactNode;
}
export default function BasicLayout({ children }: BasicLayoutProps) {
  return (
    <div>
      <LeftNavPanel />
      {children}
    </div>
  );
}
