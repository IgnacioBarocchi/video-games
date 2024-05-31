import "./App.css";

import { FlexButton, FlexContainer, FlexRow } from "ui";
import { TuxScene } from "./components/tux-scene";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "./constnats";
import {
  LinkToArchive,
  LinkToDonations,
  LinkToLinux,
  LinkToLore,
  LinkToMac,
  LinkToWindows,
} from "./components/links";
import { Main } from "./components/main";
import { Text } from "ui/elements/Text";

const App = () => {
  return (
    <Main>
      <Header>
        <Text hideStroke={true}>La Luz del Túnel</Text>
      </Header>
      <FlexContainer
        justifyContent="space-evenly"
        height={`calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px)`}
      >
        <FlexRow>
          <LinkToLinux />
          <LinkToWindows />
          <LinkToMac />
        </FlexRow>
        <FlexRow>
          <LinkToLore />
          <LinkToArchive />
          <LinkToDonations />
        </FlexRow>
      </FlexContainer>
      <Footer>
        <Text hideStroke={true}>Creado por Ignacio Barocchi</Text>
      </Footer>
    </Main>
  );
};

export default App;
