import { ZombieNPC } from "../npcs/zombie-npc/zombie-npc";

export interface ZombieHordeProps {
  numberOfZombies: number;
  startZOffset: number;
  Zend: number;
  collisionCallback?: Function;
}

export const ZombieHorde = ({
  numberOfZombies,
  startZOffset = -800,
  Zend = -2000,
  collisionCallback,
}) => {
  const distributionFactor = Zend / numberOfZombies;
  if (Zend < startZOffset) {
    throw new Error("Zend must be greater than or equal to startZOffset.");
  }

  return (
    <>
      {[...Array(numberOfZombies)].map((_, i) => {
        const xPos = Math.random() * 21 - 10;
        const zPos = -Math.min(i * distributionFactor, Zend) - startZOffset;

        return (
          <ZombieNPC
            key={i}
            position={[xPos, 1, zPos]}
            collisionCallback={collisionCallback}
          />
        );
      })}
    </>
  );
};
