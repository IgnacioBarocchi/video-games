import React, { CSSProperties, useCallback, useEffect } from "react";
import { CountDown, FloatingNotification, LoadingScreen } from "ui";
import { Text } from "ui/elements/Text";
import useCarGameStore from "../store/store";
import { LAST_SECONDS, TIME_LIMIT } from "game-constants";
import tick from "../assets/audio/tick.mp3";
import useGameContext from "game-constants/hooks/use-game-context";

export const MoneyLoss = () => {
  const { carNotification } = useCarGameStore();

  return (
    <FloatingNotification dismiss={false} position="bottom-left">
      <Text> {carNotification?.cost && `- ${carNotification.cost} ARS`} </Text>
    </FloatingNotification>
  );
};

export const Clock = () => {
  const gameOver = useCarGameStore((state) => state.gameOver);
  const setGameOver = useCarGameStore(
    useCallback((state) => state.setGameOver, [])
  );

  return (
    <CountDown
      onEnd={() => {
        if (gameOver) {
          return;
        }
        setGameOver(
          // @ts-ignore
          { reason: "TIME OUT" }
        );
      }}
      tickAudio={tick}
    />
  );
};

export const LoadingPanel = () => {
  const loading = useCarGameStore((state) => state.loading);

  if (loading) {
    return <LoadingScreen />;
  }

  return null;
};

const containerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const EndGamePanel = () => {
  const gameOver = useCarGameStore((state) => state.gameOver);
  const { changeGameState } = useGameContext();

  useEffect(() => {
    if (gameOver) {
      setTimeout(() => changeGameState("MAIN MENU"), 3000);
    }
  }, [gameOver]);

  if (gameOver) {
    return (
      <FloatingNotification dismiss={false} position="center" width="50%">
        <div style={containerStyle}>
          <Text>
            {
              {
                "TIME OUT": "Se acabó el tiempo.",
                WON: "Llegaste al banco.",
              }[gameOver.reason]
            }
          </Text>
          <Text>
            {
              {
                "TIME OUT": "Misión fracasada.",
                WON: "Misión completada.",
              }[gameOver.reason]
            }
          </Text>
        </div>
      </FloatingNotification>
    );
  }

  return null;
};
