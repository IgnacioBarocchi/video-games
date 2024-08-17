import tick from "../../../../assets/audio/in-game-sfx/clock-tick/tick.mp3";
import { useCallback } from "react";
import { Clock } from "ui";
import useCarGameStore from "../../../../store/store";
import { block } from "million/react";

export const ClockPanel = block(() => {
  const loading = useCarGameStore((state) => state.loading);

  const gameOver = useCarGameStore((state) => state.gameOver);
  const setGameOver = useCarGameStore(
    useCallback((state) => state.setGameOver, [])
  );

  if (gameOver || loading) {
    return null;
  }

  return (
    <Clock
      onEnd={() => {
        setGameOver(
          // @ts-ignore
          { reason: "TIME OUT" }
        );
      }}
      tickAudio={tick}
    />
  );
});

export default ClockPanel;
