import { generateUserCells } from '../../utils/cells';
import { SET_CELLS } from '../../types';

const initialState = {
  userCells: generateUserCells(),
};

const cellsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CELLS:
      return { ...state, userCells: action.payload };
    default:
      return state;
  }
};

export default cellsReducer;
