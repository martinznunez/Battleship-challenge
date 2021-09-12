import { v4 as uuid } from 'uuid';
import { boatTypes, gameStatus } from '../../constants';
import {
  USER_SUCCESSFUL_REGISTRATION,
  SET_BOATS,
  SET_CPU_BOATS,
  CHANGE_GAME_STATUS,
  CHANGE_TURN,
  SET_WINNER,
} from '../../types/index';

const initialState = {
  status: gameStatus.INIT,
  game: 'game',
  userName: '',
  turn: 'user',
  winner: null,
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

    case CHANGE_TURN:
      return {
        ...state,
        turn: action.payload,
      };

    case SET_WINNER:
      return {
        ...state,
        winner: action.payload,
      };

    default:
      return state;
  }
};

export default gameReducer;
