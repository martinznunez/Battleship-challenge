import { HOVER_CELL } from '../../types/index';

export function hoverCell(cells) {
  return {
    type: HOVER_CELL,
    payload: cells,
  };
}
