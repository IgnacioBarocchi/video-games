import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Panel, panelPadding } from "../elements/Panel";
import { Title } from "../elements/Text";
import { Button } from "../elements/Button";
import { Box } from "../elements/Box";
import useGameContext from "game-constants/hooks/use-game-context";

export const MainMenu = ({
  onStartClick,
  onQuitClick,
  onAboutClick,
  lobbyMusic,
}) => {
  const { changeGameState } = useGameContext();
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
    setTimeout(() => changeGameState("SHOOTER GAME"), 1500);
  };

  return (
    <Panel clickable fadeIn={shouldFade}>
      <Panel
        top={panelPadding}
        left="50%"
        cssText="transform: translateX(-50%)"
        width="fit-content"
        padBox={false}
      >
        <Title>LA LUZ DEL TÚNEL</Title>
      </Panel>
      <Panel top="80%" clickable>
        <Box
          visible={true}
          direction="horizontal"
          fullWidth
          justification="space-evenly"
          clickable={true}
        >
          <Button
            detailed={true}
            onClick={onQuitClick}
            onClick={() => window.close()}
          >
            Salir
          </Button>
          <Button detailed={true} onClick={handleStart}>
            Empezar
          </Button>
          <Button detailed={true} onClick={onAboutClick}>
            Créditos
          </Button>
        </Box>
      </Panel>
    </Panel>
  );
};

// </Background>
// <Background shouldFade={shouldFade}>
/*
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
// display: flex;
// width: 100%;
// justify-content: space-evenly;
// -webkit-text-stroke: 2px black;
const Buttons = styled(Box)`
  pointer-events: all;
`;
*/
