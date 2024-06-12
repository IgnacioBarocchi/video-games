import React, {
  CSSProperties,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { CountDown, FloatingNotification, LoadingScreen } from "ui";
import { Text, Title } from "ui/elements/Text";
import useCarGameStore from "../store/store";
import { DOLLAR_RATE, LAST_SECONDS, TIME_LIMIT } from "game-constants";
import tick from "../assets/audio/tick.mp3";
import useGameContext from "game-constants/hooks/use-game-context";
import { Winning } from "ui/end-game-screen/screens/winning";
import { Button } from "ui/elements/Button";
import { useFrame } from "@react-three/fiber";
import { CarPlayerContext } from "characters";
import { waitFor } from "xstate";
import { useActor, useActorRef, useSelector } from "@xstate/react";

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
  const loading = useCarGameStore((state) => state.loading);

  const gameOver = useCarGameStore((state) => state.gameOver);
  const setGameOver = useCarGameStore(
    useCallback((state) => state.setGameOver, [])
  );

  if (gameOver || loading) {
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
// https://github.com/pmndrs/react-three-offscreen

export const KMPanel = () => {
  const [speed, setSpeed] = useState(0);
  const loading = useCarGameStore((state) => state.loading);
  const actor = useContext(CarPlayerContext);

  // Refs for animation frame and previous time
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const animate = (time) => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;

      // Assuming snapshot.context.rigidBody.linvel().z gives the current speed
      const currentSpeed =
        Math.abs(actor?.getSnapshot()?.context?.rigidBody?.linvel()?.z).toFixed(
          0
        ) || 0;

      // Update the speed state
      setSpeed(currentSpeed);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (!loading && actor) {
      requestRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(requestRef.current);
    }
  }, [loading, actor]);

  if (!actor || loading) {
    return null;
  }

  return (
    <FloatingNotification dismiss={false} position="bottom-right" width="75%">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Text>{speed} Km/h</Text>
      </div>
    </FloatingNotification>
  );
};

// const selectIsActive = (snapshot) => snapshot.matches("active");
// console.log(actor.ref);
// // const actorRef = useActorRef(actor.logic);
// const rigidBody = useSelector(actor.ref, selectSpeed);
// const isActive = useSelector(actor.ref, selectIsActive);
// https://codesandbox.io/p/sandbox/view-tracking-bp6tmc?file=%2Fsrc%2FApp.js%3A3%2C10-3%2C14
// export const KMPanel = () => {
//   const [speed, setSpeed] = useState(0);
//   const loading = useCarGameStore((state) => state.loading);

//   const actor = useContext(CarPlayerContext);

//   useEffect(() => {

//     use snapshot.context.rigidBody?.linvel()?.z || 0 to get the current speed
//     and set itusing setSpeed every frame
//   }, []);

//   if (!actor || loading) {
//     return null;
//   }

//   return (
//     <FloatingNotification dismiss={false} position="bottom-right" width="75%">
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "flex-end",
//         }}
//       >
//         <Text>{speed} Km/h</Text>
//       </div>
//     </FloatingNotification>
//   );
//   // if (isActive) {
//   // }
//   // return null;

//   // useEffect(() => {
//   //   console.log(rigidBody);
//   // }, [rigidBody]);

//   // return (
//   //   <FloatingNotification dismiss={false} position="bottom-right" width="75%">
//   //     <div
//   //       style={{
//   //         display: "flex",
//   //         justifyContent: "flex-end",
//   //       }}
//   //     >
//   //       <Text>{0} Km/h</Text>
//   //     </div>
//   //   </FloatingNotification>
//   // );
//   // const actor = useContext(CarPlayerContext);

//   // useEffect(() => {
//   //   const fetchContext = async () => {
//   //     let snapshot;
//   //     try {
//   //       snapshot = await waitFor(
//   //         actor,
//   //         (snapshot) => {
//   //           console.log(snapshot);
//   //           return snapshot.context.mesh && snapshot.context.rigidbody;
//   //         },
//   //         {
//   //           timeout: 20_000, // 10 seconds (10,000 milliseconds)
//   //         }
//   //       );

//   //       if (snapshot?.context?.rigidbody?.linvel()?.z !== undefined) {
//   //         console.log("S", snapshot.context.rigidbody.linvel().z);
//   //       }
//   //     } catch (error) {
//   //       console.error("Failed to fetch context:", error);
//   //     }
//   //   };

//   //   fetchContext();
//   // }, [actor]);

//   // return (
//   //   <FloatingNotification dismiss={false} position="bottom-right" width="75%">
//   //     <div
//   //       style={{
//   //         display: "flex",
//   //         justifyContent: "flex-end",
//   //       }}
//   //     >
//   //       <Text>{0} Km/h</Text>
//   //     </div>
//   //   </FloatingNotification>
//   // );
// };
// const subscription = actor.subscribe({
//   next(snapshot) {
//     console.log(snapshot);
//   },
//   error(err) {
//     // ...
//   },
//   complete() {
//     // ...
//   },
// });

// const [speed, setSpeed] = useState(0);

// useEffect(() => {
//   setTimeout(() => {
//     console.log(actor.getSnapshot().context);
//   }, 10_000);
//   // console.log(actor?.snapshot);

//   // console.log(actor.getSnapshot());
//   // let prevContext;

//   // const sub = actor.subscribe((s) => {
//   //   alert("A");
//   //   console.log(s.context, prevContext);
//   //   prevContext = s.context;
//   // });

//   // return sub.unsubscribe;
// }, [actor]);

// useEffect(() => {
//   const fetchContext = async () => {
//     try {
//       // Polling until rigidBody and mesh are available
//       const interval = setInterval(() => {
//         console.log(actor);
//         console.log(actor.getSnapshot());
//         // if (state.context.rigidbody && state.context.mesh) {
//         //   clearInterval(interval);
//         //   const linvelZ = state.context.rigidbody.linvel()?.z || 0;
//         //   setSpeed(linvelZ);
//         // }
//       }, 1000); // Poll every second

//       // Timeout after 10 seconds
//       setTimeout(() => {
//         clearInterval(interval);
//       }, 10000);
//     } catch (error) {
//       console.error("Failed to fetch context:", error);
//     }
//   };

//   fetchContext();
// }, []);
