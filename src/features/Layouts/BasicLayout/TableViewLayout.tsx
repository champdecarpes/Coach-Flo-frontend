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
    <div className="max-h-screen flex flex-row">
      <div className="flex flex-row">
        <MainLeftNavPanel/>
        <ListLeftNavPanel title="Clients"/>
      </div>

      <div className="flex flex-col w-full">
        <MainHeader clientView={true} title="SUBLINK"/>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
