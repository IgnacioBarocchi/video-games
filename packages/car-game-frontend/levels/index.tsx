import { Terrain } from "../terrain";
import { CarPlayer } from "../player-implementation";
import { ZombieHorde } from "../zombie-horde/infinite-zombie-horde";

const Scenario = () => {
  return (
    <>
      <Terrain />
      <ZombieHorde />
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

export default LVL1;
