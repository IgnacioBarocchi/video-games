import { styled } from "styled-components";
import { Colors, HEADER_HEIGHT } from "../../constants";
import { Text } from "ui/elements/Text";
import { Button } from "ui";

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
  z-index: 5;
  top: 10px;
  left: 25px;

  background: rgba(40, 61, 59, 0.25);
  box-shadow: 0 8px 32px 0 rgba(80, 72, 93, 0.37);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  @media (max-width: 768px) {
    display: none;
  }
`;
const scrollbar = 10;

export const Header = () => {
  return (
    <Container>
      <Text hideStroke={true}>La Luz del Túnel</Text>
      <div
        style={{
          paddingRight: `calc(25px + ${scrollbar}px`,
          right: 0,
          zIndex: 50,
        }}
      >
        <Button
          style={{
            fontSize: "25px",
            height: "50px",
            borderRadius: "6px",
            background: "#F1FFFA",
            color: Colors.richBlack,
            cursor: "none",
          }}
          onClick={() => {
            document
              .querySelector("#downloads")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Descargar
        </Button>
      </div>
    </Container>
  );
};
