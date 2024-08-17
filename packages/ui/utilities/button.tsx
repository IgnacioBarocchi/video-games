import { Colors } from "game-constants";
import { styled } from "styled-components";
import { Button as AriaButton } from "react-aria-components";
import { Label } from "./label";

// const Wrapper = styled(AriaButton)<{ skin: "light" | "dark" }>`
const Wrapper = styled.button<{ skin: "light" | "dark" }>`
  padding: 0 6px;
  background: ${({ skin }) => Colors[skin === "dark" ? "richBlack" : "white"]};
  border: ${({ skin }) =>
    "1px solid" + Colors[skin === "dark" ? "mintCream" : "richBlack"]};
  border-radius: 6px;
`;

const ButtonLabel = styled(Label)<{ skin: "light" | "dark" }>`
  color: ${({ skin }) => Colors[skin === "dark" ? "white" : "richBlack"]};
`;

export const Button = ({
  label,
  skin,
  font,
  onClick,
}: {
  label: string;
  skin: "light" | "dark";
  font?: string;
  onClick: Function;
}) => {
  return (
    <Wrapper
      skin={skin}
      // @ts-ignore
      onClick={onClick}
    >
      <ButtonLabel skin={skin} font={font ? font : "Supreme"}>
        {label}
      </ButtonLabel>
    </Wrapper>
  );
};
