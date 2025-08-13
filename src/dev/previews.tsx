import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import MainLeftNavSideBar from "../features/Layouts/BasicLayout/MainLeftNavSideBar.tsx";
import Home from "../pages/Home.tsx";
import BasicLayout from "../features/Layouts/BasicLayout/BasicLayout.tsx";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree/>}>
      <ComponentPreview path="/MainLeftNavSideBar">
        <MainLeftNavSideBar/>
      </ComponentPreview>
      <ComponentPreview path="/Home">
        <Home/>
      </ComponentPreview>
      <ComponentPreview path="/BasicLayout">
        <BasicLayout>
          <></>
        </BasicLayout>
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
