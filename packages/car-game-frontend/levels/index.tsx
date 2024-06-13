import { Terrain } from "../terrain";
import { CarPlayer } from "../player-implementation";
import { ZombieHorde } from "../zombie-horde/zombie-horde";

const Scenario = () => {
  return (
    <>
      <Terrain />
      <ZombieHorde position={[0, 0, -1000]} />
      <ZombieHorde position={[0, 0, -500]} />
      <ZombieHorde position={[0, 0, 0]} />
    </>
  );
};

export const LVL1 = () => {
  return (
    <>
      <Scenario />
      <CarPlayer />
    </>
  );
};
