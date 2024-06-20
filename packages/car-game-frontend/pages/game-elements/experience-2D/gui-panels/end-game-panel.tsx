import { DOLLAR_RATE } from "game-constants";
import { useState, CSSProperties, useMemo, useEffect } from "react";
import { FloatingNotification } from "ui";
import { Winning } from "ui/end-game-screen/screens/winning";
import useCarGameStore from "../../../../store/store";
import { Text } from "ui/elements/Text";

const CountUpPanel = () => {
  const balanceDetails = useCarGameStore((state) => state.balanceDetails);

  return (
    <FloatingNotification dismiss={false} position="center" width="100%">
      <div
        style={{
          width: "fit-content",
          margin: "0 auto",
        }}
      >
        <Winning balanceDetails={balanceDetails} />
      </div>
    </FloatingNotification>
  );
};

export const EndGamePanel = () => {
  const gameOver = useCarGameStore((state) => state.gameOver);
  const [displayMoneyCountUp, setDisplayMoneyCountUp] = useState(false);
  const containerStyle: CSSProperties = useMemo(
    () => ({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }),
    []
  );

  useEffect(() => {
    if (!gameOver) {
      return;
    }

    let timeoutId;

    if (gameOver.reason === "WON") {
      timeoutId = setTimeout(() => setDisplayMoneyCountUp(true), 1500);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [gameOver]);

  if (!displayMoneyCountUp && gameOver) {
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
          {/* {gameOver.reason === "TIME OUT" && (
              <div
                style={{
                  pointerEvents: "auto",
                }}
              >
                <Button
                  onClick={() => {
                    changeGameState("MAIN MENU");
                  }}
                >
                  Empezar de nuevo
                </Button>
              </div>
            )} */}
        </div>
      </FloatingNotification>
    );
  }

  if (displayMoneyCountUp) {
    return <CountUpPanel />;
  }

  return null;
};

export default EndGamePanel;
