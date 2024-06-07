import { FlexContainer } from "ui";
import { Header } from "./components/header";
import { Main } from "./components/main";
import Parallax from "react-parallax-scroll";
import { Landing } from "./components/views/landing";
import { Downloads } from "./components/views/downloads";
import { Info } from "./components/views/info";
import { ViewTrailer } from "./components/views/vew-trailer";
import { CollaborateModal } from "./components/modals/collaborate-modal";

const App = () => {
  return (
    <Main>
      <CollaborateModal />
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
  );
};

export default App;
