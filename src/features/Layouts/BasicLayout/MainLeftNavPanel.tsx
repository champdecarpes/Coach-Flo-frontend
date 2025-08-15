import { Container, Nav } from 'react-bootstrap';
import MainIcon from 'assets/icon.png';

interface NavContainerPros {
  children: React.ReactNode;
}

export default function MainLeftNavPanel() {
  return (
    <div className="flex flex-col justify-between h-full w-1/6 bg-gray-200">
      <Nav variant="pills" defaultActiveKey="/clients" className="flex flex-col justify-around h-auto">
        <Nav.Item className="w-full">
          <img src={MainIcon} alt=""/>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/clients">
            Clients
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/library">
            Library
          </Nav.Link>
        </Nav.Item>
      </Nav>


      <NavContainer>
        <Nav.Item>
          <Nav.Link href="/team">
              Team
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/account">
              Account
          </Nav.Link>
        </Nav.Item>
      </NavContainer>

    </div>
  );
}


export function NavContainer({ children }: NavContainerPros) {
  return (
    <Container className="flex flex-col justify-around h-auto">
      {children}
    </Container>
  );
}
