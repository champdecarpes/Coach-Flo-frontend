import { useRef } from 'react';
import { Copy } from 'lucide-react';
import styled from 'styled-components';
// import { useLocation } from 'react-router'; // иконка копирования

const subLinks = {
  'clients': {
    'list': ['All Clients', 'Connected', 'Offline', 'Need Programming', 'Archived'],
  },
  'library': {
    'list': ['Exercises', 'Workouts', 'Sections', 'Programs', 'Tasks', 'Metric Groups'],
  },
  'settings': {
    'account': {
      'list': ['Accounts', 'Connected', 'Offline'],
    },
    'integration': {
      'list': ['Integrations'],
    },
    'team': {
      'list': ['Team'],
    },
  },
};

interface ListLeftNavPanelProps {
  title: string;
}


export default function ListLeftNavPanel({ title }: ListLeftNavPanelProps) {
  // const location = useLocation();
  // const pathParts = location.pathname.split('/').filter(Boolean);
  // const section = pathParts[0] as keyof typeof sublinks | undefined;
  // const subLinkNode = section ? sublinks[section] : undefined;


  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopy = () => {
    if (inputRef.current) {
      inputRef.current.select();
      // document.execCommand("copy"); // старый способ
      navigator.clipboard.writeText(inputRef.current.value); // новый способ
    }
  };


  return (
    <ListLeftNavContainer>

      {/* Title */}
      <TitleBlock>

        <h3>{title}</h3>
        <MainTitle>{title}</MainTitle>
      </TitleBlock>


      <ListBlockContainer>

        {/* List elements */}
        <div className="grid grid-rows-7 gap-1">
          {subLinks.clients?.list?.map((subLink, i) => (
            <ListLinks
              key={i}
            >
              {subLink}
            </ListLinks>
          ))}
        </div>


        {/* Link block*/}
        <div className="flex flex-col h-20 items-center">
          <div className="h-1/3 m-1.5 font-mono">
            YOUR INVITE LINK
          </div>
          <div className="h-2/3">
            <div
              onClick={handleCopy}
              className="flex items-center rounded px-2 py-1 cursor-pointer bg-gray-200"
            >
              <input
                ref={inputRef}
                type="text"
                value="Скопированный текст"
                readOnly
                className="flex-1 bg-transparent outline-none cursor-pointer"
              />
              <Copy size={18} className="ml-2 text-gray-600"/>
            </div>
          </div>
        </div>
      </ListBlockContainer>
    </ListLeftNavContainer>
  );
}

const ListLeftNavContainer = styled.div`
  width: 18vw;
  display: flex;
  flex-direction: column;
  border-right: 4px #C9C9C9 solid;
  background: #F7F7F7;

`;

const TitleBlock = styled.div`
  height: 15%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: .5em 1em;
`;

const MainTitle = styled.h1`
  font-size: 2em;
  font-weight: bolder;
`;


const ListBlockContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: .75em;
`;

const ListLinks = styled.button`

  height: 1.75em;
  width: 100%;
  border-radius: .5em;
  background: black;
  color: white;
  text-align: start;
  padding: 0 .7em;

  &:hover {
    background: grey;
  }
`;
