import { useState, useEffect, useCallback } from "react";
import { EndGameView } from "ui";
import useCarGameStore from "../../../../store/store";
import useGameContext from "../../../../node_modules/game-constants/hooks/use-game-context";

export const EndGamePanel = () => {
  const { changeGameState } = useGameContext();
  const gameOver = useCarGameStore((state) => state.gameOver);
  const balanceDetails = useCarGameStore((state) => state.balanceDetails);
  const resetState = useCarGameStore(
    useCallback((state) => state.resetState, [])
  );

  const onBackToMenu = useCallback(() => {
    resetState();
    changeGameState("MAIN MENU");
  }, []);

  const [displaySummaryReportView, setDisplaySummaryReportView] =
    useState(false);

  useEffect(() => {
    if (!gameOver) {
      return;
    }

    let timeoutId;

    if (gameOver.reason === "WON") {
      timeoutId = setTimeout(() => setDisplaySummaryReportView(true), 1500);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [gameOver]);

  return (
    <EndGameView
      displayWinningView={
        !displaySummaryReportView && gameOver?.reason === "WON"
      }
      displayTimeoutView={
        !displaySummaryReportView && gameOver?.reason === "TIME OUT"
      }
      displaySummaryReportView={displaySummaryReportView}
      balanceDetails={balanceDetails}
      onBackToMenu={onBackToMenu}
      displayMenu={gameOver?.reason}
    />
  );
};

export default EndGamePanel;
