import { USER_SUCCESSFUL_REGISTRATION } from '../../types/index';

export function userRegistration(user) {
  return {
    type: USER_SUCCESSFUL_REGISTRATION,
    payload: user,
  };
}
