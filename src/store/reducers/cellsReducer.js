import { generateUserCells, generateCpuCells } from '../../utils/cells';
import { SET_CELLS, SET_CPU_CELLS, RESTART_CELLS } from '../../types';

const initialState = {
  userCells: generateUserCells(),
  cpuCells: generateCpuCells(),
};

const cellsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CELLS:
      return { ...state, userCells: action.payload };

    case SET_CPU_CELLS:
      return { ...state, cpuCells: action.payload };
    case RESTART_CELLS:
      return { ...initialState };
    default:
      return state;
  }
};

export default cellsReducer;
