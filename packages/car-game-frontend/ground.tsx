import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { Shop } from "./entities/shop";
import { GroundModel } from "./GroundModel";

export const HighWay = () => {
  return (
    <RigidBody type="fixed" name="Ground">
      <CuboidCollider args={[0.2, 2, 10000]} position={[22.5, 1, -10000]} />
      <CuboidCollider args={[0.2, 2, 10000]} position={[-22.5, 1, -10000]} />
      <CuboidCollider
        name="Background Side Left"
        args={[1, 10, 10000]}
        position={[-24.5, 1, -10000]}
        rotation={[0, 0, Math.PI / 3]}
      />
      <CuboidCollider
        name="Background Side Right"
        args={[1, 10, 10000]}
        position={[24.5, 1, -10000]}
        rotation={[0, 0, -Math.PI / 3]}
      />
      <RigidBody type="fixed" name="left-over-highway" friction={/*15*/ 1}>
        <CuboidCollider args={[4, 0, 10000]} position={[-19, 0, -10000]} />
      </RigidBody>
      <RigidBody type="fixed" name="left-road" friction={/*5*/ 1}>
        <CuboidCollider args={[6.5, 0, 10000]} position={[-8.5, 0, -10000]} />
      </RigidBody>
      <RigidBody type="fixed" name="middle-road" friction={/*15*/ 1}>
        <CuboidCollider args={[2, 0, 10000]} position={[0, 0, -10000]} />
      </RigidBody>
      <RigidBody type="fixed" name="right-road" friction={/*5*/ 1}>
        <CuboidCollider args={[6.5, 0, 10000]} position={[8.5, 0, -10000]} />
      </RigidBody>
      <RigidBody type="fixed" name="right-over-highway" friction={/*15*/ 1}>
        <CuboidCollider args={[4, 0, 10000]} position={[19, 0, -10000]} />
      </RigidBody>
      <GroundModel />
    </RigidBody>
  );
};
export function Ground({ setWonTheGame }) {
  return (
    <group>
      <HighWay />
      <Shop setWonTheGame={setWonTheGame} />
    </group>
  );
}
