// import { ADD_USER, REMOVE_USER } from '../constants/action-types';

export function addUser(payload) {
  return {
    type: "LOGIN_USER",
    payload,
  };
}

export function removeUser() {
  return {
    type: "LOGOUT_USER",
  };
}
