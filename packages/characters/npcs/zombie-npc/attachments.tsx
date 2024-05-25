import { PositionalAudio } from "@react-three/drei";
import zombieDeathSound1 from "../../assets/audio/zombie/zombie-death-variant-1.m4a";
import zombieDeathSound2 from "../../assets/audio/zombie/zombie-death-variant-2.m4a";
import zombieDeathSound3 from "../../assets/audio/zombie/zombie-death-variant-3.m4a";
import hitByCar from "../../assets/audio/zombie/hit-by-car.mp3";

import { useSelector } from "@xstate/react";
import { DEATH_STATE } from "../../machines/createBaseFSMInput";

const getZombieHitAudio = () =>
  [zombieDeathSound1, zombieDeathSound2, zombieDeathSound3][
    Math.floor(Math.random() * 3)
  ];

const stateSelector = (state) => state.value === DEATH_STATE;

export const Attachments = ({ NPCActor }) => {
  const isDead = useSelector(NPCActor, stateSelector);
  if (isDead) {
    alert("A");
  }
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
