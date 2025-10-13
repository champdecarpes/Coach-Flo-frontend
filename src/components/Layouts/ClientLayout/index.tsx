import LeftNavPanel from '@/components/Layouts/BasicLayout/LeftNavPanel';
import ClientListPanel from '@/components/Layouts/ClientLayout/ClientListPanel';
import ClientFullHeader from '@/components/Layouts/ClientLayout/ClientFullHeader';
import {Outlet} from "react-router-dom";
import {useState} from "react";

export default function ClientLayout() {

  const [title, setTitle] = useState<string>('');

  return (
    <div className="max-h-screen flex flex-row">
      <div className="flex flex-row">
        <LeftNavPanel/>
        <ClientListPanel title={title} setTitle={setTitle}/>
      </div>

      <div className="flex flex-col w-full">
        <ClientFullHeader title={title}/>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
