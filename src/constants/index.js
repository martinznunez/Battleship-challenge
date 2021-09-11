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
    id: uuid(),
    type: boatTypes.CARRIER,
    length: 4,
  },
  {
    id: uuid(),
    type: boatTypes.CRUISER,
    length: 3,
  },
  {
    id: uuid(),
    type: boatTypes.CRUISER,
    length: 3,
  },
  {
    id: uuid(),
    type: boatTypes.CRUISER,
    length: 3,
  },
  {
    id: uuid(),
    type: boatTypes.SUBMARINE,
    length: 2,
  },
];
