import { v4 as uuid } from 'uuid';
import { boatsOrientations, initialCpuBoats, colors } from '../constants';

const generateGrid = () => {
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
        typeOfDamage: null,
        touched: false,
        water: false,
        index,
      });
    }
  }

  return cells;
};

export const generateUserCells = () => {
  return generateGrid();
};

const paintCells = (cellsToPaint, allCells) => {
  const cellsCopy = [...allCells];
  cellsToPaint.forEach((cellToPaint) => {
    const copiedCell = cellToPaint;

    const indexReference = copiedCell.index;
    delete copiedCell.index;

    cellsCopy[indexReference] = copiedCell;
  });

  return cellsCopy;
};

const validateAndSetBoat = ({
  cells,
  boat,
  randomIndex: cellIndex,
  randomOrientation: orientation,
}) => {
  let cellsWithBoat = [...cells];

  const cell = cellsWithBoat[cellIndex];
  const boatLength = boat.length;

  let paintedBoat = false;

  const positionToEvaluate =
    orientation === boatsOrientations.HORIZONTAL
      ? cell.positionX
      : cell.positionY;

  const numberToIncrement =
    orientation === boatsOrientations.HORIZONTAL ? 0 : 10;

  const forStart =
    orientation === boatsOrientations.HORIZONTAL
      ? positionToEvaluate - 1
      : positionToEvaluate;

  if (forStart + boatLength <= 9 && !cell.typeOfBoat) {
    const cellsToPaint = [];
    for (let i = 0; i < boatLength; i++) {
      const pointer =
        orientation === boatsOrientations.HORIZONTAL
          ? cellIndex + i
          : cellIndex + numberToIncrement * i;

      if (!cells[pointer].typeOfBoat) {
        const cellToPush = { ...cells[pointer] };
        cellToPush.typeOfBoat = boat.type;
        cellToPush.boatId = boat.id;

        cellsToPaint.push({
          index: pointer,
          ...cellToPush,
        });
      }
    }

    if (cellsToPaint.length === boatLength) {
      cellsWithBoat = paintCells(cellsToPaint, cellsWithBoat, orientation);
      paintedBoat = true;
    }
  }

  return { paintedBoat, cellsWithBoat };
};

const setRandomBoats = (cells) => {
  let updatedCells = [...cells];

  const availableBoats = initialCpuBoats;

  const possibleOrientations = [
    boatsOrientations.HORIZONTAL,
    boatsOrientations.VERTICAL,
  ];

  while (availableBoats.length) {
    const randomIndex = Math.floor(Math.random() * (99 - 0 + 1) + 0);

    const randomOrientationIndex = Math.floor(Math.random() * (1 - 0 + 1) + 0);
    const randomOrientation = possibleOrientations[randomOrientationIndex];

    const boat = availableBoats[availableBoats.length - 1];

    const { paintedBoat, cellsWithBoat } = validateAndSetBoat({
      cells: updatedCells,
      boat,
      randomIndex,
      randomOrientation,
    });

    if (paintedBoat) {
      updatedCells = cellsWithBoat;
      availableBoats.pop();
    }
  }

  return updatedCells;
};

export const generateCpuCells = () => {
  const cells = generateGrid();
  const cellsWithBoats = setRandomBoats(cells);

  return cellsWithBoats;
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
    if (cells[index + i * step]?.typeOfBoat) {
      return false;
    }
  }

  return true;
};

export const getBgColor = (cell, hideBoats = false) => {
  const { touched, water, typeOfBoat, typeOfDamage } = cell;

  // TODO improve logic, move all these conditions to a unique status for the cell

  let baseCondition = hideBoats ? null : typeOfBoat;

  if (touched) {
    baseCondition = 'touched';
  }

  if (water) {
    baseCondition = 'water';
  }

  if (typeOfDamage) {
    baseCondition = typeOfDamage;
  }

  const availableColors = {
    cruiser: colors.ORANGE,
    carrier: colors.VIOLET,
    submarine: colors.GREEN,
    touched: colors.GRAY,
    water: colors.LIGHTBLUE,
    damaged: colors.YELLOW,
    destroyed: colors.RED,
  };

  return availableColors[baseCondition];
};

export const getRandomAvailableCell = (cells) => {
  const freeCells = cells.filter((c) => !c.water && !c.typeOfDamage);

  const randomNumber = Math.floor(
    Math.random() * (freeCells.length - 0 + 1) + 0
  );

  return freeCells[randomNumber];
};
