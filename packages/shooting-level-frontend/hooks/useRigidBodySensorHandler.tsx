import { useCallback } from 'react';
import { IntersectionExitHandler } from '@react-three/rapier';
import { sensedRigidBodyIsThePlayer } from './sensedRigidBodyIsThePlayer';
import { Team } from '../data/types';

export const useEnemyNPCRigidBodySensorHandler = (params: {
  team: Team;
  send: (
    action: string | { type: string; reachable?: boolean; targeted?: boolean },
  ) => void;
}) => {
  const onIntersectionEnter = useCallback(
    ((payload) => {
      if (
        !sensedRigidBodyIsThePlayer({
          ownTeam: params.team,
          payload,
        })
      ) {
        return;
      }

      if (Math.random() > 0.5) {
        params.send('engage');
      }
    }) as IntersectionExitHandler,
    [params.team],
  );

  const onIntersectionExit = useCallback(
    ((payload) => {
      if (
        !sensedRigidBodyIsThePlayer({
          ownTeam: params.team,
          payload,
        })
      ) {
        return;
      }
    }) as IntersectionExitHandler,
    [params.team],
  );

  return { onIntersectionEnter, onIntersectionExit };
};
