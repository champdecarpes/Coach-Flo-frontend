import styled from 'styled-components';

import {ClipboardList, Bell, Menu} from 'lucide-react';
import {Dropdown} from 'react-bootstrap';

interface MainHeaderProps {
  title: string
}

export default function TableHeader({title}: MainHeaderProps) {

  // Нужно получать данные в какой вкладке мы сейчас, чтобы отображать количество данных

  return (
    <MainHeaderStyled>

      {/* Левый блок */}
      <div className="flex flex-row justify-center h-full">

        <div className="m-auto">
          <Menu size={20}/>
        </div>
        <TitleHeader>
          {title}
        </TitleHeader>

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

const MainHeaderStyled = styled.div`
  height: 9vh;
  padding: 0 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px black solid;
`;


const TitleHeader = styled.div`
  margin: 0 .75em;
  font-size: 1.5em;
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
