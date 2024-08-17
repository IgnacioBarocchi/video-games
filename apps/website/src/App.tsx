import { FlexContainer } from "ui";
import { Header } from "./components/header";
import { Main, Overlay } from "./components/main";
import Parallax from "react-parallax-scroll";
import { Landing } from "./components/views/landing";
import { Downloads } from "./components/views/downloads";
import { Info } from "./components/views/info";
import { ViewTrailer } from "./components/views/vew-trailer";

const App = () => {
  return (
    <>
      <Overlay />
      <Main>
        {/* <CollaborateModal /> */}
        <Header />
        <Parallax>
          <FlexContainer>
            <Landing />
            <ViewTrailer />
            <Downloads />
            <Info />
          </FlexContainer>
        </Parallax>
      </Main>
    </>
  );
};

export default App;
