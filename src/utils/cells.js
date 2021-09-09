/* eslint-disable no-plusplus */
import { v4 as uuid } from 'uuid';

// eslint-disable-next-line import/prefer-default-export
export const generateUserCells = () => {
  const cells = [];
  for (let i = 0; i <= 9; i++) {
    for (let j = 0; j <= 9; j++) {
      const id = uuid();
      cells.push({
        positionX: j,
        positionY: i,
        id,
        typeOfBoat: null,
        boatId: null,
        damaged: false,
        destroyed: false,
        touched: false,
      });
    }
  }

  return cells;
};
