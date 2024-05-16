import { memo } from "react";
import useGameStore from "./store/store";
import { ZombieDriver } from "./entities/zombie/driver";
import { Text } from "@react-three/drei";

export const Zombies = memo<{
  isOldVersion?: boolean;
  numberOfZombies: number;
  startZOffset: number;
  Zend: number;
}>(({ isOldVersion, numberOfZombies, startZOffset = -800, Zend = -2000 }) => {
  const haveZombies = useGameStore((state) => state.haveZombies);
  const distributionFactor = Zend / numberOfZombies;
  // Check if Zend is less than startZOffset
  if (Zend < startZOffset) {
    throw new Error("Zend must be greater than or equal to startZOffset.");
  }

  if (!haveZombies) return null;

  if (isOldVersion) {
    return (
      <>
        {[...Array(numberOfZombies)].map((_, i) => {
          const xPos = Math.random() * 21 - 10;
          const zPos = -Math.min(i * distributionFactor, Zend) - startZOffset;

          return <ZombieDriver key={i} position={[xPos, 1, zPos]} />;
        })}
      </>
    );
  }
});

// import { memo } from "react";
// import useGameStore from "./store/store";
// import { ZombieDriver } from "./entities/zombie/driver";

// export const Zombies = memo<{
//   isOldVersion?: boolean;
//   numberOfZombies: number;
//   startZOffset: number;
//   Zend: number;
// }>(({ isOldVersion, numberOfZombies, startZOffset = -800, Zend = -2000 }) => {
//   const haveZombies = useGameStore((state) => state.haveZombies);
//   if (Zend > startZOffset) {
//     throw new Error("Zend must be greater than or equal to startZOffset.");
//   }
//   if (!haveZombies) return null;

//   if (isOldVersion) {
//     return (
//       <group position={[0, 0, startZOffset]}>
//         {[...Array(numberOfZombies)].map((_, i) => {
//           const xPos = Math.random() * 21 - 10;
//           // const zPos = i * -50 - 2;

//           const zPos = Math.max(0, Math.min(startZOffset + i * -50 - 2, Zend));

//           return <ZombieDriver key={i} position={[xPos, 1, -zPos]} />;
//         })}
//       </group>
//     );
//   }
// });

// return (
//   <>
//     <EntitiesRegion
//       name="Zombie Horde"
//       depth={400}
//       ZOffset={400}
//       numberOfEntities={[numberOfZombies / 2, numberOfZombies / 2]}
//       Entity={ZombieDriver}
//       spaceBetween={{ x: [10, 21], y: 1 }}
//     />
//   </>
// );
// (i * -Math.floor(Math.random() * (50 - 25) + 25) - 2) / 2,
