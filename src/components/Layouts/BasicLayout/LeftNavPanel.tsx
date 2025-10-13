import MainIcon from '@/assets/icon.png';
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';
import { Users, BookMarked, Network } from 'lucide-react';


// Самая левая основная навигационная панель
export default function LeftNavPanel() {
  return (
    <NavPanelContainer>

      {/* Вверхний блок с основными навигационными подстраницами */}
      <NavContainer>
        <div className="flex align-center justify-between">
          <Icon src={MainIcon} alt=""/>
        </div>
        <LeftElement>
          <Nav.Link href="/clients">
            <Users size={25}/>
          </Nav.Link>
        </LeftElement>
        <LeftElement>
          <Nav.Link href="/library">
            <BookMarked size={25} />
          </Nav.Link>
        </LeftElement>
      </NavContainer>

      {/* Нижний блок с настройками и командой */}
      <NavContainer>
        <LeftElement>
          <Nav.Link href="/team">
            <Network size={25}/>
          </Nav.Link>
        </LeftElement>

        <LeftElement className="bg-red-500" $active>
          <Nav.Link href="/account">
            <UserNaming>
              NP
            </UserNaming>
          </Nav.Link>
        </LeftElement>
      </NavContainer>
    </NavPanelContainer>
  );
}


const Icon = styled.img`
  margin: .25em .25em 1em;
  width: 3vw;
  height: 3vw;
`;

const NavPanelContainer = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  width: 4vw;
  padding: 1em;
  border-right: 3px #D9D9D9 solid;
`;


interface LeftElementProps {
  $active?: boolean;
}

const LeftElement = styled.nav<LeftElementProps>`
  margin: .5em;
  width: 2.5vw;
  height: 2.5vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20%;

  background: ${({ $active }) => ($active ? 'steelblue' : 'white')};

  transition: .25s;

  &:hover {
    background: #4f9bdc;
    color: white;
  }

`;

const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const UserNaming = styled.div`
  width: 2.5em;
  height: 2.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: .8em;
  color: white;
  font-weight: bold;
`;
