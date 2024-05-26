import { PositionalAudio } from "@react-three/drei";
import zombieDeathSound1 from "../../assets/audio/zombie/zombie-death-variant-1.m4a";
import zombieDeathSound2 from "../../assets/audio/zombie/zombie-death-variant-2.m4a";
import zombieDeathSound3 from "../../assets/audio/zombie/zombie-death-variant-3.m4a";
import hitByCar from "../../assets/audio/zombie/hit-by-car.mp3";

import { useSelector } from "@xstate/react";
import { DEATH_STATE } from "../../machines/machine-constants";

const getZombieHitAudio = () =>
  [zombieDeathSound1, zombieDeathSound2, zombieDeathSound3][
    Math.floor(Math.random() * 3)
  ];

const stateSelector = (state) => {
  const a = state.value === DEATH_STATE;
  // if (a) alert(a);
  return a;
};

export const Attachments = ({ isDead }) => {
  //   const isDead = useSelector(NPCActor, stateSelector);
  //   if (isDead) {
  // return  }
  if (isDead) {
    return (
      <>
        <PositionalAudio
          distance={10}
          url={getZombieHitAudio()}
          autoplay={true}
          loop={false}
        />
        <PositionalAudio
          distance={20}
          url={hitByCar}
          autoplay={true}
          loop={false}
        />
      </>
    );
  }

  return null;
};
