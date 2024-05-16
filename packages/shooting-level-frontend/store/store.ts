import { create } from "zustand";

const useGameStore = create((set) => ({
  playerPickedBackpack: false,
  setPlayerPickedBackpack: () => set(() => ({ playerPickedBackpack: true })),
}));

export default useGameStore;
