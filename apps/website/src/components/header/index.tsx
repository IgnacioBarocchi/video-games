import { styled } from "styled-components";
import { HEADER_HEIGHT } from "../../constants";
// import { Button } from "ui";
import { Colors } from "game-constants";
import { Heading2, Heading3, Label } from "../responsive-text-content";
import { Button } from "../button";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { devices } from "../responsive-text-content";

const Container = styled.header`
  height: ${HEADER_HEIGHT}px;
  width: calc(100vw - 70px);
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 25px;
  background: ${Colors.richBlack};
  border-bottom: 1px solid ${Colors.darkGrey};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 10;
  background: rgba(40, 61, 59, 0.25);
  box-shadow: 0 8px 32px 0 rgba(80, 72, 93, 0.37);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const ContributeLink = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  @media only screen and ${devices.sm} {
    display: none;
  }
`;

const ContributeLabel = styled(Label)`
  @media only screen and ${devices.md} {
    display: none;
  }
`;

export const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const checkIfMobile = () => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
  };

  useEffect(() => {
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return (
    <Container>
      {isMobile ? (
        <Heading3>LA LUZ DEL TÚNEL</Heading3>
      ) : (
        <Heading2>LA LUZ DEL TÚNEL</Heading2>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
        <ContributeLink href="https://github.com/IgnacioBarocchi/video-games">
          <FaGithub size={35} />
          <ContributeLabel>Contribuir</ContributeLabel>
        </ContributeLink>
        <Button
          skin="light"
          label="Descargar"
          onClick={() => {
            document
              .querySelector("#downloads")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </div>
    </Container>
  );
};
