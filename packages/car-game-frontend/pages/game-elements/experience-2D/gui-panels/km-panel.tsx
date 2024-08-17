import { CarPlayerContext } from "characters";
import { useState, useContext, useRef, useEffect } from "react";
import { Speedometer } from "ui";
import useCarGameStore from "../../../../store/store";
import { block } from "million/react";

export const KMPanel = block(() => {
  const [speed, setSpeed] = useState(0);
  const loading = useCarGameStore((state) => state.loading);
  const actor = useContext(CarPlayerContext);
  const gameOver = useCarGameStore((state) => state.gameOver);

  // Refs for animation frame and previous time
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const animate = (time) => {
    if (previousTimeRef.current != undefined) {
      const currentSpeed =
        Math.abs(actor?.getSnapshot()?.context?.rigidBody?.linvel()?.z).toFixed(
          0
        ) || 0;

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
    <Speedometer speed={speed} visible={!gameOver?.reason} />
    // <FloatingNotification dismiss={false} position="bottom-right" width="75%">
    //   <div
    //     style={{
    //       display: "flex",
    //       justifyContent: "flex-end",
    //     }}
    //   >
    //     <Text>{speed} Km/h</Text>
    //   </div>
    // </FloatingNotification>
  );
});

export default KMPanel;
