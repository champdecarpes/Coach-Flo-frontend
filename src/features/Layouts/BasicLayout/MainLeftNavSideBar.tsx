import { Stack } from "react-bootstrap";

// Interface for component props to type the children prop
// interface MainLeftNavSideBarProps {
  // children?: ReactNode;
// }

export default function MainLeftNavSideBar()  {
  return (
    <Stack className="h-100 bg-black">
      <div className="p-2 text-white">Test 1</div>
      <div className="p-2">Test 2</div>
      <div className="p-2 me-auto">Test 3</div>
      {/*{children}*/}
    </Stack>
  );
}
