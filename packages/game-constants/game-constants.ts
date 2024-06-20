export const ROAD_LENGTH = 5000; // 5000; //5000; //2000;
export const BROWN = "#453b2e";
export const DARK_GREEN = "#515651";
export const GREY = "#7e7b79";
export const PALE_ORANGE = "#d5b59f";
export const LIGHT_GREEN = "#bcbca9";
export const CAMERA_FAR = 100;
export const ENTITY = {
  PLAYER: "PLAYER",
  CAR: "CAR",
  BURNT_CAR: "BURNT_CAR",
  ZOMBIE: "ZOMBIE",
  CONCRETE_BARRIER: "CONCRETE_BARRIER",
  ASPHALT: "ASPHALT",
  GRAVEL: "GRAVEL",
  GRASS: "GRASS",
};
export const TIME_LIMIT = 120; // 80;
export const LAST_SECONDS = 10;
export const DOLLAR_RATE = 609283.0142;
export const STARTING_ARS = DOLLAR_RATE * 100;
export const ZOMBIE_IMPACT_COST = 1200;
export const SPEED_FEE_COST = 8000000;
export const BARRIER_IMPACT_COST = 2500;
export const CAR_IMPACT_COST = 1600;
export const TITLE_DURATION = 10000;
export const NOTIFICATION_DURATION = 1500;
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
export const HIGHWAY_X_POSITIONS = {
  FIRST_TRACK_X: -8.5,
  SECOND_TRACK_X: -6,
  THIRD_TRACK_X: -3,
  MIDDLE_TRACK_X: 0,
  FORTH_TRACK_X: 3,
  FIFTH_TRACK_X: 6,
  SIXTH_TRACK_X: 8.5,
};
export const Colors = {
  richBlack: "#02111B",
  battleShipGrey: "#33202A",
  darkGrey: "#283D3B",
  mintCream: "#EFECCA", //"#F1FFFA",
  white: "#F1FFFA",
  l: "#778F9E",
  d: "#052337",
};
