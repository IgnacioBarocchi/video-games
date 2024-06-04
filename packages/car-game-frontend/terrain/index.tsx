import { Bank } from "./parts/bank/Bank";
import { Barriers } from "./parts/barriers/barriers";
import { Checkpoint } from "./parts/checkpoint/checkpoint";
import { HighWay } from "./parts/highway";
import { Signs } from "./parts/signs/signs";
import { Trees } from "./parts/trees/trees";

const Entities = () => {
  return (
    <>
      <Bank />
      <Checkpoint />
    </>
  );
};

const Doodads = () => {
  return (
    <>
      <Trees />
      <Signs />
      <Barriers />
    </>
  );
};

export const Terrain = () => {
  return (
    <group>
      <HighWay />
      <Entities />
      <Doodads />
    </group>
  );
};
