import { generateUserCells } from '../../utils/cells';
import { HOVER_CELL } from '../../types/index';

const initialState = {
  userCells: generateUserCells(),
};

const cellsReducer = (state = initialState, action) => {
  switch (action.type) {
    case HOVER_CELL:
      return { ...state, userCells: action.payload };
    default:
      return state;
  }
};

export default cellsReducer;
