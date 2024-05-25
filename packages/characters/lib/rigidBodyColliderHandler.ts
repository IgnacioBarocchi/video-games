import { CollisionEnterHandler } from '@react-three/rapier';
import { Object3D } from 'three';
import { Skills } from '../dev/animationToFSMMaps';
import { Team } from '../data/types';

interface OtherRigidBody extends Object3D {
  name: string;
}

const isHitBox = (name: string) => {
  return name && name.includes('Use skill') && name.includes('|');
};

export const rigidBodyColliderHandler = (params: {
  teamMembers: Team[];
  send: (action: string) => void;
}) => {
  const onCollisionEnter = (({ other: { rigidBodyObject } }) => {
    const { name: hitBoxName } = rigidBodyObject as OtherRigidBody;
    if (!isHitBox(hitBoxName)) {
      return;
    }

    const [skill, sender] = hitBoxName.split('|') as [Skills, Team];

    if (params.teamMembers.includes(sender)) {
      return;
    }

    const state = {
      'Use skill 1': 'react_to_skill_1',
      'Use skill 2': 'react_to_skill_2',
      'Use skill 3': 'react_to_skill_3',
      'Use skill 4': 'react_to_skill_4',
    }[skill];

    if (!state) {
      return;
    }

    params.send(state);
  }) as CollisionEnterHandler;

  return { onCollisionEnter };
};
