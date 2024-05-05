import useGameStore from "../store/store";
import tick from "../assets/audio/tick.mp3";
import {
  CarNotifications,
  CountDown,
  EndCredits,
  EndGameScreen,
  LoadingScreen,
  MainMenu,
  TitleScreen,
} from "ui";
import { memo, useState } from "react";
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

  if (renderInGameUI) {
    if (loading) {
      return <LoadingScreen />;
    }

    return (
      <>
        {title && <TitleScreen text={title} />}
        {gameOver && !title && (
          <EndGameScreen
            gameOverPayload={gameOver}
            ARS={money}
            USD={Math.floor(money / DOLLAR_RATE)}
          />
        )}
        {!gameOver && (
          <StopWatch onEnd={() => setGameOver({ reason: "TIME OUT" })} />
        )}
        <CarNotificationImp carNotification={carNotification} />
      </>
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
