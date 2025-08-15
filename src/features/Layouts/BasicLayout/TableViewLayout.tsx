import MainLeftNavPanel from './MainLeftNavPanel.tsx';
import type { ReactNode } from 'react';
import ListLeftNavPanel from './ListLeftNavPanel.tsx';
import MainHeader from './MainHeader.tsx';

// Interface for component props to type the children prop
interface MainLeftNavSideBarProps {
  children: ReactNode;
}

export default function TableViewLayout({ children }: MainLeftNavSideBarProps) {
  return (
    <div className="w-full min-h-screen flex flex-1 flex-row">
      <div className="w-1/4">
        <MainLeftNavPanel/>
        <ListLeftNavPanel/>
      </div>

      <div className="flex flex-1 flex-col h-full">
        <MainHeader/>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
