import MainLeftNavSideBar from "./MainLeftNavSideBar.tsx";
import type {ReactNode} from "react";
import TableNavSideBar from "./TableNavSideBar.tsx";
import HeadPanel from "./HeadPanel.tsx";

// Interface for component props to type the children prop
interface MainLeftNavSideBarProps {
  children: ReactNode;
}

export default function BasicLayout({children}: MainLeftNavSideBarProps) {
  return (
    <div className="flex">
      <div className="w-auto">
        <MainLeftNavSideBar/>
        <TableNavSideBar/>
      </div>
      <div className="flex-column">
        <HeadPanel />
        {children}
      </div>
    </div>
  );
}
