import create from "zustand";
import wind from "../assets/audio/wind.mp3";
import {
  NOTIFICATION_DURATION,
  STARTING_ARS,
  TITLE_DURATION,
} from "../constants";

export type CarNotification = {
  type: "HIT ZOMBIE" | "HIT BARRIER";
  cost: number;
};

const useGameStore = create((set) => ({
  loading: true,
  setLoading: (value: boolean) => set({ loading: value }),
  gameStarted: false,
  setGameStarted: () => {
    const ambience = new Audio(wind);
    ambience.volume = 0.3;
    ambience.loop = true;
    ambience.play();
    set({ gameStarted: true });
  },
  gameOver: null,
  setGameOver: (value: { reason: "TIME OUT" | "CAR BREAK" | "WON" }) =>
    set({ gameOver: value }),
  haveZombies: true,
  setHaveZombies: (value: boolean) => set({ haveZombies: value }),
  crashCount: 0,
  registerCrashCount: () =>
    set((state) => ({ crashCount: state.crashCount + 1 })),
  carNotification: null,
  setCarNotification: (value: CarNotification) => {
    set({ carNotification: value });

    setTimeout(() => {
      set(() => ({ carNotification: null }));
    }, NOTIFICATION_DURATION);
  },
  title: null,
  setTitle: (value: string) => {
    set({ title: value });
    setTimeout(() => {
      set(() => ({ title: null }));
    }, TITLE_DURATION);
  },
  money: STARTING_ARS,
  subMoney: (amount: number) =>
    set((state) => ({ money: state.money - amount })),
}));

export default useGameStore;
