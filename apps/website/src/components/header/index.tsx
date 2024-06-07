import { styled } from "styled-components";
import { HEADER_HEIGHT } from "../../constants";
import { Button } from "ui";
import { Colors } from "game-constants";

const HeaderText = styled.div`
  font-family: Technor;
  font-size: 50px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Container = styled.header`
  height: ${HEADER_HEIGHT}px;
  background: ${Colors.richBlack};
  border-bottom: 1px solid ${Colors.darkGrey};
  padding-left: 1rem;
  display: flex;
  /*scroll */
  width: calc(100% - 50px - 10px);
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 10;
  top: 10px;
  left: 25px;
  background: rgba(40, 61, 59, 0.25);
  box-shadow: 0 8px 32px 0 rgba(80, 72, 93, 0.37);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  @media (max-width: 768px) {
    width: 300px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const DownloadButton = styled(Button)`
  font-size: 25px;
  height: 50px;
  border-radius: 6px;
  background: ${Colors.white};
  color: ${Colors.richBlack};
  @media (max-width: 768px) {
    height: 30px;
    font-size: 15px;
  }
`;

const scrollbar = 10;

export const Header = () => {
  return (
    <Container>
      <HeaderText>LA LUZ DEL TÚNEL</HeaderText>
      <div
        style={{
          paddingRight: `calc(25px + ${scrollbar}px`,
          right: 0,
          zIndex: 50,
        }}
      >
        <DownloadButton
          onClick={() => {
            document
              .querySelector("#downloads")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Descargar
        </DownloadButton>
      </div>
    </Container>
  );
};
