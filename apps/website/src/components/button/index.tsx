import { Colors } from "game-constants";
import { styled } from "styled-components";
import { Label, Paragraph } from "../responsive-text-content";
import { useEffect, useState } from "react";

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

const SmallButtonLabel = styled(Paragraph)<{ skin: "light" | "dark" }>`
  color: ${({ skin }) => Colors[skin === "dark" ? "white" : "richBlack"]};
`;

export const Button = ({
  label,
  skin,
  onClick,
}: {
  label: string;
  skin: "light" | "dark";
  onClick: Function;
}) => {
  // const [isMobile, setIsMobile] = useState(false);
  // const checkIfMobile = () => {
  //   const mobile = window.innerWidth <= 768;
  //   setIsMobile(mobile);
  // };

  // useEffect(() => {
  //   checkIfMobile();
  //   window.addEventListener("resize", checkIfMobile);
  //   return () => {
  //     window.removeEventListener("resize", checkIfMobile);
  //   };
  // }, []);

  return (
    <Wrapper skin={skin} onClick={onClick}>
      <ButtonLabel skin={skin}>{label}</ButtonLabel>
      {/* {isMobile ? (
        <SmallButtonLabel skin={skin}>{label}</SmallButtonLabel>
      ) : (
        <ButtonLabel skin={skin}>{label}</ButtonLabel>
      )} */}
    </Wrapper>
  );
};
