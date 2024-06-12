import { CarPlayerContext } from "characters";
import { useState, useContext, useRef, useEffect } from "react";
import { FloatingNotification } from "ui";
import useCarGameStore from "../store/store";
import { block } from "million/react";
import { Text } from "ui/elements/Text";

export const KMPanel = block(() => {
  const [speed, setSpeed] = useState(0);
  const loading = useCarGameStore((state) => state.loading);
  const actor = useContext(CarPlayerContext);

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
});

// import { CarPlayerContext } from "characters";
// import { useState, useContext, useRef, useEffect } from "react";
// import { FloatingNotification } from "ui";
// import useCarGameStore from "../store/store";

// export const KMPanel = () => {
//   const [speed, setSpeed] = useState(0);
//   const loading = useCarGameStore((state) => state.loading);
//   const actor = useContext(CarPlayerContext);

//   // Refs for animation frame and previous time
//   const requestRef = useRef();
//   const previousTimeRef = useRef();

//   const animate = (time) => {
//     if (previousTimeRef.current != undefined) {
//       const deltaTime = time - previousTimeRef.current;

//       // Assuming snapshot.context.rigidBody.linvel().z gives the current speed
//       const currentSpeed =
//         Math.abs(actor?.getSnapshot()?.context?.rigidBody?.linvel()?.z).toFixed(
//           0
//         ) || 0;

//       // Update the speed state
//       setSpeed(currentSpeed);
//     }
//     previousTimeRef.current = time;
//     requestRef.current = requestAnimationFrame(animate);
//   };

//   useEffect(() => {
//     if (!loading && actor) {
//       requestRef.current = requestAnimationFrame(animate);
//       return () => cancelAnimationFrame(requestRef.current);
//     }
//   }, [loading, actor]);

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
// };
