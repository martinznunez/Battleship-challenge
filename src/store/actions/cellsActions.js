import { SET_CELLS } from '../../types/index';

export function hoverCell(cells) {
  return {
    type: SET_CELLS,
    payload: cells,
  };
}

export function setBoatSelection(cells, selectedBoat) {
  const copiedCell = cells.map((c) => {
    const cell = { ...c };
    if (cell.touched) {
      cell.touched = false;
      cell.typeOfBoat = selectedBoat.type;
      cell.boatId = selectedBoat.id;
    }

    return cell;
  });

  return {
    type: SET_CELLS,
    payload: copiedCell,
  };
}
