import { RigidBody } from "@react-three/rapier";
import { BarrierModel } from "./model";
import { FC, useState } from "react";
import { payloadIsThePlayer } from "../../lib/rigibBodyHelper";
import useGameStore from "../../store/store";
import { PositionalAudio } from "@react-three/drei";
import concreteImpact from "../../assets/audio/in-game-sfx/concrete-barrier/impact.m4a";
import { throttle } from "../../lib/throttle";
import { BARRIER_IMPACT_COST } from "game-constants";

export const Barrier: FC<{ position: [number, number, number] }> = ({
  position,
}) => {
  const { registerCrashCount, setCarNotification, subMoney } = useGameStore(
    (state) => ({
      registerCrashCount: state.registerCrashCount,
      setCarNotification: state.setCarNotification,
      subMoney: state.subMoney,
    })
  );

  const [shouldPlayAudio, setShouldPlayAudio] = useState(false);

  const handleBarrierImpact = throttle((payload) => {
    if (!payloadIsThePlayer(payload)) {
      return;
    }
    registerCrashCount();
    setCarNotification({ type: "HIT BARRIER", cost: BARRIER_IMPACT_COST });
    subMoney(BARRIER_IMPACT_COST);
    setShouldPlayAudio(true);
  }, 1000);

  return (
    <>
      <RigidBody
        colliders={"cuboid"}
        type="fixed"
        position={position}
        onCollisionEnter={handleBarrierImpact}
      >
        <BarrierModel />
      </RigidBody>
      {shouldPlayAudio && (
        <PositionalAudio
          distance={20}
          loop={false}
          url={concreteImpact}
          autoplay
        />
      )}
    </>
  );
};

/*
  const debounce = (func, delay) => {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  };

  debounce(() => {
  if (!payloadIsCar(payload)) {
    return;
  }
  registerCrashCount();
  setShouldPlayAudio(true);
  console.log('hit');
}, 500);
*/
