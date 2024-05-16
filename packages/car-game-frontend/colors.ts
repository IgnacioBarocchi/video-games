import {
  Color,
  ColorRepresentation,
  MeshBasicMaterial,
  MeshStandardMaterial,
} from 'three';

export const colors0x = {
  Black: 0x282a36,
  Current: 0x44475a,
  Comment: 0x6272a4,
  Red: 0xff5555,
  Orange: 0xffb86c,
  Yellow: 0xf1fa8c,
  Green: 0x50fa7b,
  Cyan: 0x8be9fd,
  Purple: 0xbd93f9,
  Pink: 0xff79c6,
  White: 0xf8f8f2,
};

export const colors = {
  RealBlack: '#000000',
  Black: '#282a36',
  Current: '#44475a',
  Comment: '#6272a4',
  Red: '#ff5555',
  Orange: '#ffb86c',
  Yellow: '#f1fa8c',
  Green: '#50fa7b',
  Cyan: '#8be9fd',
  Purple: '#bd93f9',
  Pink: '#ff79c6',
  White: '#f8f8f2',
  Transparent: '#00000000',
};

const getColor = (c: ColorRepresentation) => new Color(c).convertSRGBToLinear();
const stdMat = (color: number | string) =>
  new MeshStandardMaterial({ color: getColor(color) });
const {
  Black,
  Comment,
  Current,
  White,
  Cyan,
  Green,
  Orange,
  Pink,
  Purple,
  Red,
  Yellow,
} = colors0x;

export const materials = {
  black: stdMat(Black),
  comment: stdMat(Comment),
  current: stdMat(Current),
  white: stdMat(White),
  cyan: stdMat(Cyan),
  green: stdMat(Green),
  orange: stdMat(Orange),
  pink: stdMat(Pink),
  purple: stdMat(Purple),
  red: stdMat(Red),
  yellow: stdMat(Yellow),
  skin: stdMat('lightpink'),
  wire: new MeshBasicMaterial({
    wireframe: true,
    color: getColor(colors0x.Black),
  }),
  transparent: new MeshBasicMaterial({
    transparent: true,
    opacity: 0,
    depthWrite: false,
  }),
  cloud: new MeshStandardMaterial({
    color: getColor(colors0x.White),
    transparent: true,
    opacity: 0.74,
  }),
  window: new MeshStandardMaterial({
    color: getColor(colors0x.Cyan),
    transparent: true,
    opacity: 0.74,
  }),
};
