import React, { useCallback, useMemo, useState } from "react";
import useCarGameStore from "../store/store";
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
import { memo } from "react";
import { DOLLAR_RATE, LAST_SECONDS, TIME_LIMIT } from "game-constants";

// Separate components
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

const EndGameDisplay = memo(({ gameOver, money }) => {
  return (
    <EndGameScreen
      gameOverPayload={gameOver}
      ARS={money}
      USD={Number((money / DOLLAR_RATE).toFixed(2))}
    />
  );
});

const Loading = memo(() => <LoadingScreen />);

const InGame = memo(({ gameOver, carNotification, title }) => {
  const MemoizedClock = useMemo(
    () => (
      <StopWatch
        onEnd={() => {
          if (gameOver) return;
          setGameOver({ reason: "TIME OUT" });
        }}
      />
    ),
    [gameOver]
  );

  const MemoizedNotification = useMemo(
    () => <CarNotificationImp carNotification={carNotification} />,
    [carNotification]
  );

  return (
    <InGameScreen
      displayClock={!gameOver}
      ClockSlot={MemoizedClock}
      displayNotification={!!carNotification}
      NotificationSlot={MemoizedNotification}
      displayEndGameSlot={!!gameOver}
      EndGameSlot={<EndGameDisplay gameOver={gameOver} />}
      title={title}
    />
  );
});

export const UILayer = memo(() => {
  console.log("RELOAD ALL UI");
  const [showCredits, setShowCredits] = useState(false);

  const loading = useCarGameStore((state) => state.loading);
  const gameOver = useCarGameStore((state) => state.gameOver);
  const carNotification = useCarGameStore((state) => state.carNotification);
  const money = useCarGameStore((state) => state.money);
  const title = useCarGameStore((state) => state.title);

  const setGameOver = useCarGameStore(
    useCallback((state) => state.setGameOver, [])
  );
  const setGameStarted = useCarGameStore(
    useCallback((state) => state.setGameStarted, [])
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <InGame
      gameOver={gameOver}
      carNotification={carNotification}
      title={title}
    />
  );
});

// import React, { useCallback } from "react";
// import useCarGameStore from "../store/store";
// import tick from "../assets/audio/tick.mp3";
// import {
//   CarNotifications,
//   CountDown,
//   EndCredits,
//   EndGameScreen,
//   InGameScreen,
//   LoadingScreen,
//   MainMenu,
//   TitleScreen,
// } from "ui";
// import { memo, useMemo, useState } from "react";
// import { DOLLAR_RATE, LAST_SECONDS, TIME_LIMIT } from "game-constants";

// const StopWatch = memo<{ onEnd: Function }>(({ onEnd }) => {
//   return (
//     <CountDown
//       timeLimit={TIME_LIMIT}
//       lastSecondsLimit={LAST_SECONDS}
//       onEnd={onEnd}
//       tickAudio={tick}
//     />
//   );
// });

// const CarNotificationImp = memo<{ carNotification: Function }>(
//   ({ carNotification }) => {
//     return <CarNotifications notification={carNotification} />;
//   }
// );

// export const UILayer = memo(() => {
//   console.log("RELOAD ALL UI");
//   const [showCredits, setShowCredits] = useState(false);

//   const {
//     loading,
//     gameOver,

//     carNotification,
//     money,

//     title,
//   } = useCarGameStore((state) => ({
//     setGameStarted: state.setGameStarted,
//     gameOver: state.gameOver,
//     carNotification: state.carNotification,
//     money: state.money,
//     loading: state.loading,
//     title: state.title,
//   }));

//   const setGameOver = useCarGameStore(
//     useCallback((state) => state.setGameOver, [])
//   );

//   const setGameStarted = useCarGameStore(
//     useCallback((state) => state.setGameStarted, [])
//   );

//   const MemoizedC = useMemo(
//     () => (
//       <EndGameScreen
//         gameOverPayload={gameOver}
//         ARS={money}
//         USD={Number((money / DOLLAR_RATE).toFixed(2))}
//       />
//     ),
//     [gameOver, money]
//   );

//   const MemoizedA = useMemo(
//     () => (
//       <StopWatch
//         onEnd={() => {
//           if (gameOver) {
//             return;
//           }

//           setGameOver({ reason: "TIME OUT" });
//         }}
//       />
//     ),
//     [gameOver]
//   );

//   const MemoizedB = useMemo(
//     () => <CarNotificationImp carNotification={carNotification} />,
//     [carNotification]
//   );

//   if (loading) {
//     return <LoadingScreen />;
//   }

//   return (
//     <InGameScreen
//       displayClock={!gameOver}
//       ClockSlot={MemoizedA}
//       displayNotification={carNotification}
//       NotificationSlot={MemoizedB}
//       displayEndGameSlot={gameOver}
//       EndGameSlot={MemoizedC}
//       title={title}
//     />
//   );
// });

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
