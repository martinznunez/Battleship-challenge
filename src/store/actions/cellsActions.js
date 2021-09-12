import { SET_CELLS, SET_CPU_CELLS, RESTART_CELLS } from '../../types/index';
import { damageBoat } from './gameActions';
import { turnUser } from '../../constants';

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

export function attack(cell, cells, turn = turnUser.USER) {
  return (dispatch, getState) => {
    const boatFromState = getState().game.cpuBoats.find(
      (boat) => boat.id === cell.boatId
    );

    const boatWillBeDestroy =
      boatFromState?.numberOfImpacts === boatFromState?.length - 1;

    const updatedCells = cells.map((c) => {
      const currentCell = { ...c };

      const isCurrentCell = currentCell.id === cell.id;
      if (isCurrentCell) {
        if (!currentCell.boatId) {
          currentCell.water = true;
        } else {
          currentCell.typeOfDamage = boatWillBeDestroy
            ? 'destroyed'
            : 'damaged';
          dispatch(damageBoat(currentCell.boatId, turn));
        }
      } else if (
        boatWillBeDestroy &&
        currentCell.boatId === boatFromState?.id
      ) {
        currentCell.typeOfDamage = 'destroyed';
      }
      return currentCell;
    });

    dispatch({
      type: turn === turnUser.USER ? SET_CPU_CELLS : SET_CELLS,
      payload: updatedCells,
    });
  };
}

export function restartCells() {
  return {
    type: RESTART_CELLS,
  };
}
