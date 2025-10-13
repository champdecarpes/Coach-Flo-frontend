import styled from 'styled-components';

import {ClipboardList, Bell, Menu} from 'lucide-react';
import {Tab, Tabs, Dropdown} from 'react-bootstrap';

interface ClientFullHeaderProps {
  title: string;
}

export default function ClientFullHeader({title}: ClientFullHeaderProps) {

  // Нужно получать данные в какой вкладке мы сейчас, чтобы отображать количество данных

  return (
    <MainHeaderStyled>

      {/* Левый блок */}
      <div className="flex flex-row justify-center h-full">
        <ClientHeader name={title}/>
      </div>

      {/* Правый блок */}
      <div className="grid grid-cols-2 gap-8 mr-6 w-auto text-gray-600">

        <Dropdown as="div">
          <Dropdown.Toggle
            as="div"
            className="p-0 border-0 bg-transparent select-none"
            bsPrefix="dropdown-icons">
            <ClipboardList size={20}/>
          </Dropdown.Toggle>

          <IconMenu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </IconMenu>
        </Dropdown>

        <Dropdown as="div">
          <Dropdown.Toggle
            as="div"
            className="p-0 border-0 bg-transparent select-none"
            bsPrefix="dropdown-icons">
            <Bell size={20}/>
          </Dropdown.Toggle>

          <IconMenu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </IconMenu>
        </Dropdown>

      </div>
    </MainHeaderStyled>
  );
}


interface ClientHeaderProps {
  name: string;
}

function ClientHeader({name}: ClientHeaderProps) {

  // Выделять какой именно сейчас блок должен быть помечен как выделенный useState
  return (
    <div className="flex flex-row w-full">
      <div className="m-auto">
        <Menu size={20}/>
      </div>

      <div className="flex flex-col justify-around mx-7">
        <div className="font-bold text-2xl mt-2">
          {name}
        </div>

        <NavTabs defaultActiveKey="overview" variant="underline"
                 className="grid-cols-5 gap-3 h-10">
          <Tab title="Overview" eventKey="overview"/>
          <Tab title="Training" eventKey="training"/>
          <Tab title="Tasks" eventKey="task"/>
          <Tab title="Metrics" eventKey="metrics"/>
          <Tab title="Settings" eventKey="settings"/>
        </NavTabs>

      </div>
    </div>
  );
}


const MainHeaderStyled = styled.div`
  height: 9vh;
  padding: 0 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px black solid;
`;

const NavTabs = styled(Tabs)`
  display: grid;
  font-size: .9em;
  border: 0;

  .nav-link {
    color: rgb(156, 163, 175);
    border: none;
    font-weight: 600;

    &:hover {
      color: #5f6673;
    }
  }

  .nav-link.active {
    color: #184EFF;
    font-weight: 600;
    border-bottom: 2px solid #184EFF;
  }
`;


const IconMenu = styled(Dropdown.Menu)`
  background: #1e293b;
  border-radius: 12px;
  padding: 0.5rem;
  margin-top: 1em;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  .dropdown-item {
    color: white;

    &:hover {
      background: #334155;
    }
  }
`;
