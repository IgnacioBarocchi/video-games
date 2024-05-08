import useGameStore from "../store/store";
import tick from "../assets/audio/tick.mp3";
import {
  CarNotifications,
  CountDown,
  EndCredits,
  EndGameScreen,
  InGameScreen,
  LoadingScreen,
  MainMenu,
  TitleScreen,
} from "ui";
import { memo, useMemo, useState } from "react";
import { DOLLAR_RATE, LAST_SECONDS, TIME_LIMIT } from "../constants";
import lobbyMusic from "../assets/audio/lobby/lobby-music.mp3";

const StopWatch = memo(({ onEnd }) => {
  return (
    <CountDown
      timeLimit={TIME_LIMIT}
      lastSecondsLimit={LAST_SECONDS}
      onEnd={onEnd}
      tickAudio={tick}
    />
  );
});

const CarNotificationImp = memo(({ carNotification }) => {
  return <CarNotifications notification={carNotification} />;
});

export const UILayer = () => {
  const [renderInGameUI, setRenderInGameUI] = useState(false);
  const [showCredits, setShowCredits] = useState(false);

  const {
    loading,
    setGameStarted,
    gameOver,
    setGameOver,
    carNotification,
    money,
    title,
  } = useGameStore((state) => ({
    setGameStarted: state.setGameStarted,
    gameOver: state.gameOver,
    setGameOver: state.setGameOver,
    carNotification: state.carNotification,
    money: state.money,
    loading: state.loading,
    title: state.title,
  }));

  const MemoizedC = useMemo(
    () => (
      <EndGameScreen
        gameOverPayload={gameOver}
        ARS={money}
        USD={Number((money / DOLLAR_RATE).toFixed(2))}
      />
    ),
    [gameOver, money]
  );

  const MemoizedA = useMemo(
    () => (
      <StopWatch
        onEnd={() => {
          if (gameOver) {
            return;
          }

          setGameOver({ reason: "TIME OUT" });
        }}
      />
    ),
    [gameOver]
  );

  const MemoizedB = useMemo(
    () => <CarNotificationImp carNotification={carNotification} />,
    [carNotification]
  );

  if (renderInGameUI) {
    if (loading) {
      return <LoadingScreen />;
    }

    return (
      <InGameScreen
        displayClock={!gameOver}
        ClockSlot={MemoizedA}
        displayNotification={carNotification}
        NotificationSlot={MemoizedB}
        displayEndGameSlot={gameOver}
        EndGameSlot={MemoizedC}
        title={title}
      />
    );
  }

  return (
    <>
      <MainMenu
        onStartClick={() => {
          setTimeout(() => {
            setGameStarted();
            setRenderInGameUI(true);
          }, 500);
        }}
        onAboutClick={() => {
          setShowCredits(true);
        }}
        onQuitClick={() => {}}
        lobbyMusic={lobbyMusic}
      />
      {showCredits && (
        <EndCredits
          credits={[
            { title: "Programado por", items: ["Ignacio Barocchi"] },
            { title: "Modelado 3D por", items: ["Ignacio Barocchi"] },
            { title: "Sonido por", items: ["Varios artistas xd"] },
            {
              title: "Música por",
              items: ["Music_Unlimited - (For Elevator Jazz Music)"],
            },
          ]}
        />
      )}
    </>
  );
};
