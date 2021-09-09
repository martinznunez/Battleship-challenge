import { v4 as uuid } from 'uuid';
import { boatTypes } from '../../constants';
import { USER_SUCCESSFUL_REGISTRATION } from '../../types/index';

const initialState = {
  status: 'init',
  game: 'game',
  userName: '',
  boats: [
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
  ],
};
const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SUCCESSFUL_REGISTRATION:
      return {
        ...state,
        userName: action.payload,
      };

    default:
      return state;
  }
};

export default gameReducer;
