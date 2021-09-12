import { v4 as uuid } from 'uuid';

export default {
  GAME_STATUS: {
    INIT: 'init',
    PLAYING: 'playing',
  },
};
export const boatTypes = {
  SUBMARINE: 'submarine',
  CARRIER: 'carrier',
  CRUISER: 'cruiser',
};

export const directionsConst = {
  UP: 'up',
  DOWN: 'down',
  RIGHT: 'right',
  LEFT: 'left',
};

export const boatsOrientations = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
};

export const initialCpuBoats = [
  {
    id: 1,
    type: boatTypes.CARRIER,
    length: 4,
    destroyed: false,
    numberOfImpacts: 0,
  },
  {
    id: 2,
    type: boatTypes.CRUISER,
    length: 3,
    destroyed: false,
    numberOfImpacts: 0,
  },
  {
    id: 3,
    type: boatTypes.CRUISER,
    length: 3,
    destroyed: false,
    numberOfImpacts: 0,
  },
  {
    id: 4,
    type: boatTypes.CRUISER,
    length: 3,
    destroyed: false,
    numberOfImpacts: 0,
  },
  {
    id: 5,
    type: boatTypes.SUBMARINE,
    length: 2,
    destroyed: false,
    numberOfImpacts: 0,
  },
];

export const colors = {
  GRAY: '#58555A',
  YELLOW: '#FBF37C',
  RED: '#BB2020',
  GREEN: '#3EB595',
  LIGHTBLUE: '#9ACFDD',
  VIOLET: '#506AD4',
  ORANGE: '#F28C0F',
};
