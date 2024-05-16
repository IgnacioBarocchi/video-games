export const ROAD_LENGTH = 2000;
export const BROWN = "#453b2e";
export const DARK_GREEN = "#515651";
export const GREY = "#7e7b79";
export const PALE_ORANGE = "#d5b59f";
export const LIGHT_GREEN = "#bcbca9";
export const CAMERA_FAR = 50;
export const ENTITY = {
  PLAYER: "PLAYER",
  CAR: "CAR",
  BURNT_CAR: "BURNT_CAR",
  ZOMBIE: "ZOMBIE",
  CONCRETE_BARRIER: "CONCRETE_BARRIER",
};
export const TIME_LIMIT = 80;
export const LAST_SECONDS = 5;
export const DOLLAR_RATE = 609283.0142;
export const STARTING_ARS = DOLLAR_RATE * 100;
export const ZOMBIE_IMPACT_COST = 1200;
export const BARRIER_IMPACT_COST = 2500;
export const CAR_IMPACT_COST = 1600;
export const TITLE_DURATION = 1000;
export const NOTIFICATION_DURATION = 500;
export const CANVAS_CONFIG = {
  mode: "concurrent",
  flat: true,
  dpr: [0.2, 1],
  performance: { min: 0.2 },
  frameloop: "always",
  shadows: false,
  gl: {
    logarithmicDepthBuffer: true,
    precision: "lowp",
    powerPreference: "high-performance",
  },
};