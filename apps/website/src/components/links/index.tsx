import { styled } from "styled-components";
import { FlexButton } from "ui";
import { TuxScene } from "../tux-scene";
import { FC } from "react";
import { BoxScene } from "../box-scene";
import { CoinsScene } from "../coins-scene";
import { BookScene } from "../book-scene";
import { WindowsScene } from "../windows-scene";
import { MacOScene } from "../mac-scene";

export interface LinkProps {
  to: string;
  text: string;
  Scene: FC;
}

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  width: fit-content;
`;
// & * {
//   cursor: none;
// }

const Link: FC<LinkProps> = ({ to, text, Scene }) => {
  return (
    <LinkContainer>
      <Scene />
      <ButtonWrapper>
        <FlexButton as="a" href={to} detailed={true}>
          {text}
        </FlexButton>
      </ButtonWrapper>
    </LinkContainer>
  );
};

export const LinkToLinux = () => {
  return <Link to="" text="Linux" Scene={() => <TuxScene />} />;
};

export const LinkToWindows = () => {
  return <Link to="" text="Windows" Scene={() => <WindowsScene />} />;
};

export const LinkToMac = () => {
  return <Link to="" text="MacOS" Scene={() => <MacOScene />} />;
};

export const LinkToLore = () => {
  return <Link to="" text="Historia" Scene={() => <BookScene />} />;
};

export const LinkToArchive = () => {
  return <Link to="" text="Archivo" Scene={() => <BoxScene />} />;
};

export const LinkToDonations = () => {
  return <Link to="" text="Donaciones" Scene={() => <CoinsScene />} />;
};
