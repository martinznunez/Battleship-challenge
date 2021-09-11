/* eslint-disable no-plusplus */
import { v4 as uuid } from 'uuid';
import { boatsOrientations } from '../constants';

export const generateUserCells = () => {
  const cells = [];
  let index = -1;
  for (let i = 0; i <= 9; i++) {
    for (let j = 0; j <= 9; j++) {
      const id = uuid();
      index += 1;
      cells.push({
        positionX: j,
        positionY: i,
        id,
        typeOfBoat: null,
        boatId: null,
        damaged: false,
        destroyed: false,
        touched: false,
        index,
      });
    }
  }

  return cells;
};

export const returnAllCellsAsUntouched = (cells) => {
  return cells.map((cell) => {
    const copiedCell = { ...cell };
    copiedCell.touched = false;
    return copiedCell;
  });
};

export const mapAndSetTouchedCells = ({
  selectedBoat,
  boatOrientation,
  userCells,
  hoveredCell,
}) => {
  const boatLength = selectedBoat.length;

  const referencePosition =
    boatOrientation === boatsOrientations.HORIZONTAL
      ? 'positionX'
      : 'positionY';

  const oppositePosition =
    referencePosition === 'positionX' ? 'positionY' : 'positionX';

  if (hoveredCell[referencePosition] - 1 + boatLength > 9) {
    return returnAllCellsAsUntouched(userCells);
  }

  const finalCells = userCells.map((cell) => {
    const copiedCell = { ...cell };
    if (
      copiedCell[referencePosition] >= hoveredCell[referencePosition] &&
      copiedCell[referencePosition] <
        hoveredCell[referencePosition] + boatLength &&
      copiedCell[oppositePosition] === hoveredCell[oppositePosition] &&
      !copiedCell.typeOfBoat
    ) {
      copiedCell.touched = true;
    } else {
      copiedCell.touched = false;
    }
    return copiedCell;
  });

  return finalCells;
};

export const checkBoatFill = ({ index, boatLength, orientation, cells }) => {
  const step = orientation === boatsOrientations.HORIZONTAL ? 1 : 10;

  for (let i = 0; i < boatLength; i++) {
    if (cells[index + i * step].typeOfBoat) {
      return false;
    }
  }

  return true;
};
