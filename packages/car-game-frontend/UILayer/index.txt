import React, { useCallback } from "react";
import useCarGameStore from "../store/store";
import tick from "../assets/audio/tick.mp3";
import {
  CarNotifications,
  CountDown,
  EndGameScreen,
  InGameScreen,
  LoadingScreen,
} from "ui";
import { memo } from "react";
import { DOLLAR_RATE, LAST_SECONDS, TIME_LIMIT } from "game-constants";

// const StopWatchImplementation = () => {
//   const gameOver = useCarGameStore((state) => state.gameOver);
//   const setGameOver = useCarGameStore(
//     useCallback((state) => state.setGameOver, [])
//   );

//   return (
//     <CountDown
//       timeLimit={TIME_LIMIT}
//       lastSecondsLimit={LAST_SECONDS}
//       onEnd={() => {
//         if (gameOver) {
//           return;
//         }
//         setGameOver(
//           // @ts-ignore
//           { reason: "TIME OUT" }
//         );
//       }}
//       tickAudio={tick}
//     />
//   );
// };

// const CarNotificationImplementation = () => {
//   const carNotification = useCarGameStore((state) => state.carNotification);
//   console.log("HEEEEEEE!!!!!!!");

//   return <CarNotifications notification={carNotification} />;
// };

// const EndGameScreenImplementation = () => {
//   const { gameOver, money } = useCarGameStore((state) => ({
//     gameOver: state.gameOver,
//     money: state.money,
//   }));

//   return (
//     <EndGameScreen
//       // @ts-ignore
//       gameOverPayload={gameOver}
//       ARS={money}
//       USD={Number((money / DOLLAR_RATE).toFixed(2))}
//     />
//   );
// };

export const UILayer = () => {
  const { loading, gameOver, title, carNotification } = useCarGameStore(
    (state) => ({
      gameOver: state.gameOver,
      loading: state.loading,
      title: state.title,
      carNotification: state.carNotification,
    })
  );

  const StopWatchImplementation = () => {
    const gameOver = useCarGameStore((state) => state.gameOver);
    const setGameOver = useCarGameStore(
      useCallback((state) => state.setGameOver, [])
    );

    return (
      <CountDown
        timeLimit={TIME_LIMIT}
        lastSecondsLimit={LAST_SECONDS}
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

  const CarNotificationImplementation = () => {
    const carNotification = useCarGameStore((state) => state.carNotification);
    console.log("HEEEEEEE!!!!!!!");

    return <CarNotifications notification={carNotification} />;
  };

  const EndGameScreenImplementation = () => {
    const { gameOver, money } = useCarGameStore((state) => ({
      gameOver: state.gameOver,
      money: state.money,
    }));

    return (
      <EndGameScreen
        // @ts-ignore
        gameOverPayload={gameOver}
        ARS={money}
        USD={Number((money / DOLLAR_RATE).toFixed(2))}
      />
    );
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <InGameScreen
      displayClock={!gameOver}
      ClockSlot={StopWatchImplementation}
      displayNotification={carNotification}
      NotificationSlot={CarNotificationImplementation}
      displayEndGameSlot={gameOver}
      EndGameSlot={EndGameScreenImplementation}
      title={title}
    />
  );
};

/*
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
*/

// MainMenu,
// EndCredits,
// TitleScreen,
// const [showCredits, setShowCredits] = useState(false);
