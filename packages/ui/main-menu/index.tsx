import { useEffect, useState } from "react";
import { css, keyframes, styled } from "styled-components";
import { Panel } from "../elements/Panel";
import { Title } from "../elements/Text";
import { Button } from "../elements/Button";

const fadeToBlack = keyframes`
  from {
    background: transparent;
    color: white;
  }
  to {
    background: black;
    color: black;
  }
`;

const animationRule = css(
  ["", " 2s linear;"] as any as TemplateStringsArray,
  fadeToBlack
);

const Background = styled.main<{ shouldFade: boolean }>`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 6em;
  animation: ${({ shouldFade }) => (shouldFade ? animationRule : "none")};
`;

// align-items: flex-end;
const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  pointer-events: all;
  -webkit-text-stroke: 2px black;
`;

export const MainMenu = ({
  onStartClick,
  onQuitClick,
  onAboutClick,
  lobbyMusic,
}) => {
  const [shouldFade, setShouldFade] = useState(false);
  useEffect(() => {
    const audio = new Audio(lobbyMusic);
    audio.play();
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [lobbyMusic]);

  const handleStart = () => {
    setShouldFade(true);
    setTimeout(() => onStartClick(), 1500);
  };

  return (
    <Panel>
      <Background shouldFade={shouldFade}>
        <Title>LA LUZ DEL TÚNEL</Title>
        {!shouldFade && (
          <Buttons>
            <Button detailed={true} onClick={onQuitClick}>
              Salir
            </Button>
            <Button detailed={true} onClick={handleStart}>
              Empezar
            </Button>
            <Button detailed={true} onClick={onAboutClick}>
              Créditos
            </Button>
          </Buttons>
        )}
      </Background>
    </Panel>
  );
};
