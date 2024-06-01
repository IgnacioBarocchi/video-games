import "./App.css";

import { CustomCursor, FlexButton, FlexContainer, FlexRow } from "ui";
import { TuxScene } from "./components/tux-scene";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
// import { FOOTER_HEIGHT, HEADER_HEIGHT } from "./constnats";
// import {
//   LinkToArchive,
//   LinkToDonations,
//   LinkToLinux,
//   LinkToLore,
//   LinkToMac,
//   LinkToWindows,
// } from "./components/links";
import { Main } from "./components/main";
import { Text } from "ui/elements/Text";
import { CustomCard } from "./components/custom-card";
import { Section } from "./components/parallax-section";
import Parallax from "react-parallax-scroll";
import { MacOScene } from "./components/mac-scene";
import { WindowsScene } from "./components/windows-scene";
import { BookScene } from "./components/book-scene";
import { BoxScene } from "./components/box-scene";
import { CoinsScene } from "./components/coins-scene";

const App = () => {
  return (
    <Main>
      <CustomCursor />
      <Header>
        <Text hideStroke={true}>La Luz del Túnel</Text>
      </Header>
      <Parallax>
        <FlexContainer
        // justifyContent="space-evenly"
        // height={`calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px)`}
        >
          <Section preset="3">
            <Text>HEHHEHE</Text>
          </Section>
          <Section preset="1" afterHeader={true}>
            <CustomCard
              releaseMetaData={{ date: "01/06/2024", releaseID: "0.0.5" }}
              topText="descarga"
              title="Para Linux"
              Scene={() => <TuxScene />}
            />
            <CustomCard
              releaseMetaData={{ date: "01/06/2024", releaseID: "0.0.3" }}
              topText="descarga"
              title="Para Windows"
              Scene={() => <WindowsScene />}
            />
            <CustomCard
              releaseMetaData={{ date: "01/06/2024", releaseID: "0.0.3" }}
              topText="descarga"
              title="Para MacOS"
              Scene={() => <MacOScene />}
            />
          </Section>

          <Section preset="2" beforeFooter={true}>
            <CustomCard title="Historia" Scene={() => <BookScene />} />
            <CustomCard title="Archivo" Scene={() => <BoxScene />} />
            <CustomCard title="Donaciones" Scene={() => <CoinsScene />} />
          </Section>
        </FlexContainer>
      </Parallax>
      <Footer>
        <Text hideStroke={true}>Creado por Ignacio Barocchi</Text>
      </Footer>
    </Main>
  );
};

export default App;

{
  /* <LinkToWindows /> */
}
{
  /* <LinkToMac /> */
}
{
  /* </FlexRow> */
}
{
  /* <FlexRow>
            <LinkToLore />
            <LinkToArchive />
            <LinkToDonations />
          </FlexRow> */
}
{
  /* <FlexRow> */
}
{
  /* <LinkToLinux /> */
}
