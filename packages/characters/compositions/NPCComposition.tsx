// import { ZombieNPC } from "../npcs/zombie-npc/archive/zombie-npc-with-actor";
import { FC } from "react";
import {
  ZombieNPCProps,
  ZombieNPCV2,
} from "../npcs/zombie-npc/zombie-npc-with-fsm";
import { HIGHWAY_X_POSITIONS } from "game-constants";

export interface ZombieHordeProps {
  numberOfZombies: number;
  startZOffset: number;
  Zend: number;
  Component: FC<ZombieNPCProps>;
}

export const NPCComposition = ({
  numberOfZombies,
  startZOffset = -800,
  Zend = -2000,
  Component,
}) => {
  const distributionFactor = Zend / numberOfZombies;
  if (Zend < startZOffset) {
    throw new Error("Zend must be greater than or equal to startZOffset.");
  }

  return (
    <>
      {[...Array(numberOfZombies)].map((_, i) => {
        const xPos =
          Object.values(HIGHWAY_X_POSITIONS)[
            Math.floor(Math.random() * Object.keys(HIGHWAY_X_POSITIONS).length)
          ];

        const zPos = -Math.min(i * distributionFactor, Zend) - startZOffset;

        return <Component key={i} position={[xPos, 1, zPos]} />;
      })}
    </>
  );
};
