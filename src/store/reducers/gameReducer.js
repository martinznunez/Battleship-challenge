import { v4 as uuid } from 'uuid';
import { boatTypes } from '../../constants';
import {
  USER_SUCCESSFUL_REGISTRATION,
  SET_BOATS,
  SET_CPU_BOATS,
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
      destroyed: false,
      numberOfImpacts: 0,
    },
    {
      id: uuid(),
      type: boatTypes.CRUISER,
      length: 3,
      positioned: false,
      destroyed: false,
      numberOfImpacts: 0,
    },
    {
      id: uuid(),
      type: boatTypes.CRUISER,
      length: 3,
      positioned: false,
      destroyed: false,
      numberOfImpacts: 0,
    },
    {
      id: uuid(),
      type: boatTypes.CRUISER,
      length: 3,
      positioned: false,
      destroyed: false,
      numberOfImpacts: 0,
    },
    {
      id: uuid(),
      type: boatTypes.SUBMARINE,
      length: 2,
      positioned: false,
      destroyed: false,
      numberOfImpacts: 0,
    },
  ],
  cpuBoats: [
    {
      id: 1,
      type: boatTypes.CARRIER,
      length: 4,
      positioned: false,
      destroyed: false,
      numberOfImpacts: 0,
    },
    {
      id: 2,
      type: boatTypes.CRUISER,
      length: 3,
      positioned: false,
      destroyed: false,
      numberOfImpacts: 0,
    },
    {
      id: 3,
      type: boatTypes.CRUISER,
      length: 3,
      positioned: false,
      destroyed: false,
      numberOfImpacts: 0,
    },
    {
      id: 4,
      type: boatTypes.CRUISER,
      length: 3,
      positioned: false,
      destroyed: false,
      numberOfImpacts: 0,
    },
    {
      id: 5,
      type: boatTypes.SUBMARINE,
      length: 2,
      positioned: false,
      destroyed: false,
      numberOfImpacts: 0,
    },
  ],
};
const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SUCCESSFUL_REGISTRATION:
      return {
        ...state,
        userName: action.payload,
      };

    case SET_BOATS:
      return {
        ...state,
        boats: action.payload,
      };

    case SET_CPU_BOATS:
      return {
        ...state,
        cpuBoats: action.payload,
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
