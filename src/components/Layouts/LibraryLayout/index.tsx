import LeftNavPanel from '@/components/Layouts/BasicLayout/LeftNavPanel.tsx';
import LibraryListPanel from './LibraryListPanel.tsx';
import LibraryHeader from './LibraryHeader.tsx';
import {Outlet} from "react-router-dom";


export default function LibraryLayout() {

  return (
    <div className="max-h-screen flex flex-row">
      <div className="flex flex-row">
        <LeftNavPanel/>
        <LibraryListPanel title="Clients"/>
      </div>

      <div className="flex flex-col w-full">
        <LibraryHeader title="SUBLINK"/>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
