import LeftNavPanel from '@/components/Layouts/BasicLayout/LeftNavPanel';
import TableListPanel from './TableListPanel.tsx';
import TableHeader from './TableHeader.tsx';
import React from "react";

interface TableLayoutProps {
  children?: React.ReactNode;
}

export default function TableLayout({children} : TableLayoutProps) {

  return (
    <div className="max-h-screen flex flex-row">
      <div className="flex flex-row">
        <LeftNavPanel/>
        <TableListPanel title="Clients"/>
      </div>

      <div className="flex flex-col w-full">
        <TableHeader title="SUBLINK"/>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
