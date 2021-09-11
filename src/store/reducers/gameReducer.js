import { v4 as uuid } from 'uuid';
import { boatTypes, initialCpuBoats } from '../../constants';
import {
  USER_SUCCESSFUL_REGISTRATION,
  SET_BOAT,
  CHANGE_GAME_STATUS,
} from '../../types/index';

const initialState = {
  status: 'init',
  game: 'game',
  userName: '',
  boats: [
    {
      id: uuid(),
      type: boatTypes.CARRIER,
      length: 4,
      positioned: false,
    },
    {
      id: uuid(),
      type: boatTypes.CRUISER,
      length: 3,
      positioned: false,
    },
    {
      id: uuid(),
      type: boatTypes.CRUISER,
      length: 3,
      positioned: false,
    },
    {
      id: uuid(),
      type: boatTypes.CRUISER,
      length: 3,
      positioned: false,
    },
    {
      id: uuid(),
      type: boatTypes.SUBMARINE,
      length: 2,
      positioned: false,
    },
  ],
  cpuBoats: initialCpuBoats,
};
const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SUCCESSFUL_REGISTRATION:
      return {
        ...state,
        userName: action.payload,
      };

    case SET_BOAT:
      return {
        ...state,
        boats: action.payload,
      };

    case CHANGE_GAME_STATUS:
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};

export default gameReducer;
