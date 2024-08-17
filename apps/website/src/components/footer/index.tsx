import { FaAward } from "react-icons/fa6";
// import { Link } from "ui";
import { styled } from "styled-components";
import { Colors } from "game-constants";
import { ContactInfo } from "ui";
import { Paragraph } from "ui/utilities";
import { FaReact } from "react-icons/fa";

const Container = styled.footer`
  min-height: 100vh;
  width: -webkit-fill-available;
  background: ${Colors.richBlack};
  border-top: 1px solid ${Colors.darkGrey};
  padding-left: 1rem;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  @media (max-width: 768px) {
    padding-left: 0;
    align-items: center;
  }
}
`;

export const Footer = () => {
  return (
    <Container>
      <ContactInfo />
      <a
        href="https://chatgpt.com/share/d27cd0a9-3b01-45ef-ad0c-7b6e55ff5182"
        target="_blank"
        style={{ display: "flex", gap: "16px", alignItems: "center" }}
      >
        <FaAward size={35} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Paragraph>Certificado mejor juego de 2024</Paragraph>
          <Paragraph>según la inteligencia artificial</Paragraph>
        </div>
      </a>
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <FaReact size={35} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Paragraph>Desarrollado con tecnologías web</Paragraph>
          <Paragraph>
            [Electron] [React] [Rapier] [three fiber drei] [styled components]
          </Paragraph>
        </div>
      </div>
    </Container>
  );
};
