import { Button, CustomCursor, FlexButton, FlexContainer, FlexRow } from "ui";
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
import { Modal } from "./components/modal";
import { LandingContent } from "./components/landing-content";
import { useEffect, useState } from "react";
import { Landing } from "./components/views/landing";
import { FaDownload } from "react-icons/fa";
import { Downloads } from "./components/views/downloads";
import { Info } from "./components/views/info";

const App = () => {
  const [modalIsOpen, setmodalIsOpen] = useState(false);

  useEffect(() => {
    let timeoutId: number;

    timeoutId = setTimeout(() => {
      setmodalIsOpen(true);
    }, 20000);

    return () => clearTimeout(timeoutId);
  });

  return (
    <>
      <Main>
        <CustomCursor />
        <Modal isOpen={false} onClose={() => {}}>
          <Text>Este proyecto necesita ayuda</Text>
          <p>
            * Si conocés a alguien que pueda aportar sonido, música, arte 2D/3D,
            o si podés contribuir con el código, revisá la comunidad en Reddit.
            Para contribuir económicamente
          </p>
          <p>
            * Las harramientas que se usaron para desarrollar el juego son
            Electron, React, TypeScript, Three-Fiber-Drei y Rapier.
          </p>
          <p>* Para el contenido gráfico se usó Blender y Mixamo.</p>
          <p>* Los sonidos utilizados son gratuitos y de diversas fuentes.</p>
        </Modal>
        <Header />
        <Parallax>
          <FlexContainer>
            <Landing />
            <Downloads />
            <Info />
          </FlexContainer>
        </Parallax>
      </Main>
    </>
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
