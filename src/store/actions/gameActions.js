import {
  USER_SUCCESSFUL_REGISTRATION,
  CHANGE_GAME_STATUS,
  SET_BOATS,
  SET_CPU_BOATS,
  CHANGE_TURN,
  SET_WINNER,
} from '../../types/index';
import { turnUser, gameStatus } from '../../constants';

export function userRegistration(user) {
  return {
    type: USER_SUCCESSFUL_REGISTRATION,
    payload: user,
  };
}

export function changeGameStatus(status) {
  return {
    type: CHANGE_GAME_STATUS,
    payload: status,
  };
}

function setBoat(boatsState) {
  return {
    type: SET_BOATS,
    payload: boatsState,
  };
}

export function successfullyPosition(selectedBoat, boatsGroup) {
  return (dispatch) => {
    const boatsPositioned = boatsGroup.map((b) => {
      const boat = { ...b };
      if (selectedBoat.id === b.id) {
        boat.positioned = true;
      }

      return boat;
    });

    dispatch(setBoat(boatsPositioned));

    if (boatsPositioned.every((boat) => boat.positioned)) {
      dispatch(changeGameStatus(gameStatus.PLAYING));
    }
  };
}

export function damageBoat(boatId, turn) {
  return (dispatch, getState) => {
    const cpuBoats = getState().game;

    const updatedCpuBoats = cpuBoats.cpuBoats.map((b) => {
      const boat = { ...b };

      if (boat.id === boatId) {
        if (boat.numberOfImpacts === boat.length - 1) {
          boat.destroyed = true;
        } else {
          boat.numberOfImpacts += 1;
        }
      }
      return boat;
    });

    dispatch({
      type: turn === turnUser.USER ? SET_CPU_BOATS : SET_BOATS,
      payload: updatedCpuBoats,
    });
  };
}

export function changeTurn(turn) {
  const newTurn = turn === turnUser.USER ? turnUser.CPU : turnUser.USER;

  return {
    type: CHANGE_TURN,
    payload: newTurn,
  };
}

export function setWinner(winner) {
  return {
    type: SET_WINNER,
    payload: winner,
  };
}
