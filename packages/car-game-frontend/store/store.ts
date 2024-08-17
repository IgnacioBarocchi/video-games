import { create } from "zustand";
import windSFX from "../assets/audio/in-game-sfx/environment/wind.mp3";
import alertSFX from "../assets/audio/in-game-sfx/car/bingbong-alert.mp3";
import {
  NOTIFICATION_DURATION,
  STARTING_ARS,
  TITLE_DURATION,
} from "game-constants";
import { throttleFunction } from "game-lib";

export type CarNotification = {
  type: "HIT ZOMBIE" | "HIT BARRIER" | "SPEED FEE";
  cost: number;
  count: number;
};

export type GameOverReason = { reason: "TIME OUT" | "WON" };

export type CarGameState = {
  loading: boolean;
  setLoading: (value: boolean) => void;
  gameOver: { reason: GameOverReason } | null;
  setGameOver: (value: { reason: GameOverReason }) => void;
  haveZombies: boolean;
  setHaveZombies: (value: boolean) => void;
  carNotification: CarNotification | null;
  setCarNotification: (value: CarNotification) => void;
  title: string | null;
  setTitle: (value: string) => void;
  money: number;
  balanceDetails: {
    "HIT ZOMBIE": { quantity: number; cost: number };
    "HIT BARRIER": { quantity: number; cost: number };
    "SPEED FEE": { quantity: number; cost: number };
    total: number;
  };
  subMoney: (value: CarNotification) => void;
  resetState: () => void;
};

const audioPlayer = {
  playAmbienceSFX() {
    const ambience = new Audio(windSFX);
    ambience.volume = 0.3;
    ambience.loop = true;
    ambience.play();
  },
  playAlertSFX() {
    const alert = new Audio(alertSFX);
    alert.loop = false;
    alert.play();
  },
};

const initialState: Pick<
  CarGameState,
  | "loading"
  | "gameOver"
  | "haveZombies"
  | "carNotification"
  | "title"
  | "money"
  | "balanceDetails"
> = {
  loading: true,
  gameOver: null,
  haveZombies: true,
  carNotification: null,
  title: null,
  money: STARTING_ARS,
  balanceDetails: {
    "HIT ZOMBIE": {
      quantity: 0,
      cost: 0,
    },
    "HIT BARRIER": {
      quantity: 0,
      cost: 0,
    },
    "SPEED FEE": {
      quantity: 0,
      cost: 0,
    },
    total: STARTING_ARS,
  },
};

const throttledNotification = throttleFunction((set, value, waiting) => {
  // console.log("call n");

  set({ carNotification: value });
  let timeout = 0;
  timeout = setTimeout(() => {
    set(() => ({ carNotification: null }));
    // waiting = false;
  }, NOTIFICATION_DURATION);
});

const throttledTitle = throttleFunction((set, value) => {
  audioPlayer.playAlertSFX();
  set({ title: value });

  setTimeout(() => {
    set(() => ({ title: null }));
  }, TITLE_DURATION);
});

const useCarGameStore = create<CarGameState>((set) => ({
  ...initialState,
  setLoading: (value: boolean) => {
    set({ loading: value });
    if (!value) {
      audioPlayer.playAmbienceSFX();
    }
  },
  setGameOver: (value: { reason: GameOverReason }) => set({ gameOver: value }),
  setHaveZombies: (value: boolean) => set({ haveZombies: value }),
  setCarNotification: (value: CarNotification) => {
    set((state: CarGameState) => {
      if (!state?.carNotification) {
        return { carNotification: value };
      }

      const sameArgument = state?.carNotification?.type === value.type;

      if (sameArgument) {
        state.carNotification.count = (state.carNotification.count ?? 1) + 1;
      } else {
        state.carNotification.count = 1;
      }

      return {
        carNotification: { ...value, count: state.carNotification.count },
      };
    });
    setTimeout(() => {
      set(() => ({ carNotification: { type: null, cost: null, count: 1 } }));
    }, NOTIFICATION_DURATION);
  },
  setTitle: (value: string) => {
    throttledTitle(set, value);
    // const sendTitle = throttleFunction(() => {
    //   console.log("CALL!s");

    //   audioPlayer.playAlertSFX();
    //   set({ title: value });

    //   setTimeout(() => {
    //     set(() => ({ title: null }));
    //   }, TITLE_DURATION);
    // }, TITLE_DURATION);

    // sendTitle();
  },
  subMoney: (value: CarNotification) =>
    set((state) => {
      const { type, cost } = value;
      const newQuantity = state.balanceDetails[type].quantity + 1;
      const newCost = state.balanceDetails[type].cost + cost;
      const newTotal = state.balanceDetails.total - cost;

      return {
        money: state.money - cost,
        balanceDetails: {
          ...state.balanceDetails,
          [type]: { quantity: newQuantity, cost: newCost },
          total: newTotal,
        },
      };
    }),
  resetState: () => set(initialState),
}));

export default useCarGameStore;
