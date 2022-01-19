import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_SUCCESS,
} from "../actionTypes";

export const loginRequest = (data) => {
  return {
    type: LOGIN_REQUEST,
    payload: data,
  };
};

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};

export const loginFailure = (data) => {
  return {
    type: LOGIN_FAILURE,
    payload: data,
  };
};

export const logoutRequest = () => ({
  type: LOGOUT,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});
