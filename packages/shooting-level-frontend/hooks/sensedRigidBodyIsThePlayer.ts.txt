import { CollisionPayload } from '@react-three/rapier';
import { PlayerID } from '../constants/entities';

type Params = {
  ownTeam: Team;
  payload: CollisionPayload;
};

export const sensedRigidBodyIsThePlayer = (params: Params) => {
  const {
    ownTeam,
    payload: {
      other: { rigidBodyObject, rigidBody },
    },
  } = params;

  const externalBodyName = rigidBodyObject?.name!;
  const externalBodyTeam = rigidBody?.userData?.team as Team;
  return externalBodyName === PlayerID && ownTeam !== externalBodyTeam;
};
