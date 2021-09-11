import {
  USER_SUCCESSFUL_REGISTRATION,
  CHANGE_GAME_STATUS,
  SET_BOAT,
} from '../../types/index';
import constants from '../../constants';

export function userRegistration(user) {
  return {
    type: USER_SUCCESSFUL_REGISTRATION,
    payload: user,
  };
}

function changeGameStatus(status) {
  return {
    type: CHANGE_GAME_STATUS,
    payload: status,
  };
}

function setBoat(boatsState) {
  return {
    type: SET_BOAT,
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
      dispatch(changeGameStatus(constants.GAME_STATUS.PLAYING));
    }
  };
}
