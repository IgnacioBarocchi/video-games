import { styled } from "styled-components";
import { FlexButton } from "ui";
import { TuxScene } from "../tux-scene";
import { FC } from "react";
import { BoxScene } from "../box-scene";

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
  return <Link to="" text="Linux" Scene={() => <TuxScene />} />;
};

export const LinkToMac = () => {
  return <Link to="" text="Linux" Scene={() => <TuxScene />} />;
};

export const LinkToLore = () => {
  return <Link to="" text="Historia" Scene={() => <TuxScene />} />;
};

export const LinkToArchive = () => {
  return <Link to="" text="Archivo" Scene={() => <BoxScene />} />;
};

export const LinkToDonations = () => {
  return <Link to="" text="Donaciones" Scene={() => <TuxScene />} />;
};
