// import { create } from 'zustand';
// import { subscribeWithSelector } from 'zustand/middleware';

// export const useGameStore = create<GameState>(
//   // @ts-ignore
//   subscribeWithSelector((set) => ({
//     debugApp: false,
//     setDebugApp: (debugApp: boolean): void => set({ debugApp }),
//     renderShadows: false,
//     setRenderShadows: (renderShadows: boolean): void => set({ renderShadows }),
//     loadedEntities: {
//       terrain: false,
//       doodads: false,
//       enemies: false,
//       player: false,
//     },
//     setEntityLoaded: (entity: keyof LoadedEntities, loaded: boolean): void =>
//       set((state) => ({
//         loadedEntities: {
//           ...state.loadedEntities,
//           [entity]: loaded,
//         },
//       })),
//     initialEnemiesCount: 10,
//     enemiesCount: 0,
//     setEnemiesCount: (count: number): void => set({ enemiesCount: count }),
//   })),
// );

// type LoadedEntities = {
//   terrain: boolean;
//   doodads: boolean;
//   enemies: boolean;
//   player: boolean;
// };

// export type GameState = {
//   debugApp: boolean;
//   setDebugApp: (debugApp: boolean) => void;
//   renderShadows: boolean;
//   setRenderShadows: (renderShadows: boolean) => void;
//   loadedEntities: LoadedEntities;
//   setEntityLoaded: (entity: keyof LoadedEntities, loaded: boolean) => void;
//   initialEnemiesCount: 10;
//   enemiesCount: number;
//   setEnemiesCount: (count: number) => void;
// };
