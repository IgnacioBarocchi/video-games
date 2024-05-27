import React, { useCallback } from "react";
import { CountDown, FloatingNotification } from "ui";
import { Text } from "ui/elements/Text";
import useCarGameStore from "../store/store";
import { LAST_SECONDS, TIME_LIMIT } from "game-constants";
import tick from "../assets/audio/tick.mp3";

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
