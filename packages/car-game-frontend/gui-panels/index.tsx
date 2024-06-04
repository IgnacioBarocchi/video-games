import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CountDown, FloatingNotification, LoadingScreen } from "ui";
import { Text, Title } from "ui/elements/Text";
import useCarGameStore from "../store/store";
import { DOLLAR_RATE, LAST_SECONDS, TIME_LIMIT } from "game-constants";
import tick from "../assets/audio/tick.mp3";
import useGameContext from "game-constants/hooks/use-game-context";
import { Winning } from "ui/end-game-screen/screens/winning";
import { Button } from "ui/elements/Button";

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
export const ClockPanel = () => {
  const gameOver = useCarGameStore((state) => state.gameOver);
  const setGameOver = useCarGameStore(
    useCallback((state) => state.setGameOver, [])
  );

  if (gameOver) {
    return null;
  }

  return (
    <CountDown
      onEnd={() => {
        setGameOver(
          // @ts-ignore
          { reason: "TIME OUT" }
        );
      }}
      tickAudio={tick}
    />
  );
};

export const MoneyLossPanel = () => {
  const { carNotification } = useCarGameStore();

  return (
    <FloatingNotification dismiss={false} position="bottom-left">
      <Text> {carNotification?.cost && `- ${carNotification.cost} ARS`} </Text>
    </FloatingNotification>
  );
};

export const LoadingPanel = () => {
  const loading = useCarGameStore((state) => state.loading);

  if (loading) {
    return <LoadingScreen />;
  }

  return null;
};

const CountUpPanel = () => {
  const money = useCarGameStore((state) => state.money);

  return (
    <FloatingNotification dismiss={false} position="center" width="100%">
      <div
        style={{
          width: "fit-content",
          margin: "0 auto",
        }}
      >
        <Winning ARS={money} USD={Number((money / DOLLAR_RATE).toFixed(2))} />
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

export const Filter2DOverlay = ({ children }) => {
  const gameOver = useCarGameStore((state) => state.gameOver);
  const containerStyle: CSSProperties = useMemo(
    () => ({
      pointerEvents: "none",
      filter:
        gameOver?.reason === "TIME OUT"
          ? "hue-rotate(240deg) saturate(3.3) grayscale(95%)"
          : "none",
      height: "100vh",
    }),
    [gameOver]
  );

  return <div style={containerStyle}>{children}</div>;
};

export const TitlePanel = () => {
  const title = useCarGameStore((state) => state.title);

  if (title) {
    return (
      <FloatingNotification dismiss={false} position="top-center" width="75%">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Title>{title}</Title>
        </div>
      </FloatingNotification>
    );
  }

  return null;
};
// if (gameOver.reason === "TIME OUT") {
//   timeoutId = setTimeout(() => changeGameState("MAIN MENU"), 3000);
// }
