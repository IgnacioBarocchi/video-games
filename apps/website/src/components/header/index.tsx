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
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const scrollbar = 10;

export const Header = () => {
  return (
    <Container>
      <Text hideStroke={true}>La Luz del Túnel</Text>
      <div
        style={{
          paddingRight: `calc(25px + ${scrollbar}px`,
          position: "fixed",
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
