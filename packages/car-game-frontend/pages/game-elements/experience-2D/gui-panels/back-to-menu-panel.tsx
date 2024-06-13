import useGameContext from "game-constants/hooks/use-game-context";
import { useCallback } from "react";
import { FloatingNotification, Button } from "ui";
import useCarGameStore from "../../../../store/store";

export const BackToMenuPanel = () => {
  const { changeGameState } = useGameContext();
  const gameOver = useCarGameStore((state) => state.gameOver);
  const resetState = useCarGameStore(
    useCallback((state) => state.resetState, [])
  );

  if (gameOver) {
    return (
      <FloatingNotification
        dismiss={false}
        position="bottom-center"
        width="75%"
      >
        <div
          style={{
            pointerEvents: "all",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            onClick={() => {
              resetState();
              changeGameState("MAIN MENU");
            }}
          >
            Volver al menú
          </Button>
          <Button onClick={() => window.close()}>Salir</Button>
        </div>
      </FloatingNotification>
    );
  }

  return null;
};

export default BackToMenuPanel;
