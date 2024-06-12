import { useContext, useEffect } from "react";
import { Context } from "../providers/player-context-provider";
import {
  REACTING_TO_SKILL_1_EVENT,
  REACTING_TO_SKILL_2_EVENT,
  USING_SKILL_1_STATE,
  USING_SKILL_2_STATE,
} from "../machines/createBaseFSMInput";
import { useSelector } from "@xstate/react";
import { CuboidCollider } from "@react-three/rapier";

const usingMaulSkillSelector = (state) => {
  return state.value === USING_SKILL_2_STATE;
};

const usingRifleSelector = (state) => {
  return state.value === USING_SKILL_1_STATE;
};

export const Attachments = ({ nodes }) => {
  const playerActor = useContext(Context);
  const maulIsHanded = useSelector(playerActor, usingMaulSkillSelector);
  const isShooting = useSelector(playerActor, usingRifleSelector);

  const updateMaulPosition = (isHanded: boolean) => {
    const {
      HANDED_MAUL_MESH,
      HANDED_MAUL_MESH_1,
      HANDED_MAUL_MESH_2,
      PACKED_MAUL_MESH,
      PACKED_MAUL_MESH_1,
      PACKED_MAUL_MESH_2,
      PACKED_MAUL_MESH_3,
      RIFLE,
    } = nodes;

    HANDED_MAUL_MESH.visible = isHanded;
    HANDED_MAUL_MESH_1.visible = isHanded;
    HANDED_MAUL_MESH_2.visible = isHanded;
    PACKED_MAUL_MESH.visible = !isHanded;
    PACKED_MAUL_MESH_1.visible = !isHanded;
    PACKED_MAUL_MESH_2.visible = !isHanded;
    PACKED_MAUL_MESH_3.visible = !isHanded;
    RIFLE.visible = !isHanded;
  };

  const updateBulletTrail = (isShooting: boolean) => {
    const { BULLET_TRAIL_MESH, BULLET_TRAIL_MESH_1 } = nodes;
    BULLET_TRAIL_MESH.visible = isShooting;
    BULLET_TRAIL_MESH_1.visible = isShooting;
  };

  useEffect(() => {
    let timeoutID = 0;

    updateMaulPosition(maulIsHanded);
    updateBulletTrail(false);

    if (isShooting) {
      updateBulletTrail(isShooting);
      timeoutID = setTimeout(() => {
        updateBulletTrail(false);
      }, 100);
    }

    return () => clearTimeout(timeoutID);
  }, [maulIsHanded, isShooting]);

  if (isShooting) {
    return (
      <CuboidCollider
        position={[0, 0.5, 5]}
        args={[0.1, 1, 5]}
        sensor
        onIntersectionEnter={(payload) => {
          if (payload.other.rigidBodyObject.name === "NPC") {
            const actor = payload.other.rigidBodyObject.userData;
            actor.send({ type: REACTING_TO_SKILL_1_EVENT });
          }
        }}
      />
    );
  }

  if (maulIsHanded) {
    return (
      <CuboidCollider
        position={[0, 0.5, 1]}
        args={[0.5, 1, 0.5]}
        sensor
        onIntersectionEnter={(payload) => {
          if (payload.other.rigidBodyObject.name === "NPC") {
            const actor = payload.other.rigidBodyObject.userData;
            actor.send({ type: REACTING_TO_SKILL_2_EVENT });
          }
        }}
      />
    );
  }

  return null;
};
