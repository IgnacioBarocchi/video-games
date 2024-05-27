import { create } from "zustand";
import wind from "../assets/audio/wind.mp3";
import {
  NOTIFICATION_DURATION,
  STARTING_ARS,
  TITLE_DURATION,
} from "game-constants";

export type CarNotification = {
  type: "HIT ZOMBIE" | "HIT BARRIER";
  cost: number;
};

export type GameOverReason = { reason: "TIME OUT" | "WON" };

export type CarGameState = {
  loading: boolean;
  setLoading: (value: boolean) => void;
  gameStarted: boolean;
  setGameStarted: () => void;
  gameOver: { reason: GameOverReason } | null;
  setGameOver: (value: { reason: GameOverReason }) => void;
  haveZombies: boolean;
  setHaveZombies: (value: boolean) => void;
  crashCount: number;
  registerCrashCount: () => void;
  carNotification: CarNotification | null;
  setCarNotification: (value: CarNotification) => void;
  title: string | null;
  setTitle: (value: string) => void;
  money: number;
  subMoney: (amount: number) => void;
};

const useCarGameStore = create<CarGameState>((set) => ({
  loading: true,
  setLoading: (value: boolean) => set({ loading: value }),
  gameStarted: true,
  setGameStarted: () => {
    const ambience = new Audio(wind);
    ambience.volume = 0.3;
    ambience.loop = true;
    ambience.play();
    set({ gameStarted: true });
  },
  gameOver: null,
  setGameOver: (value: GameOverReason) => set({ gameOver: value }),
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

export default useCarGameStore;
