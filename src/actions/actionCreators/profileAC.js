import {
  GETUSER_CLEARDATA,
  GETUSER_FAILURE,
  GETUSER_REQUEST,
  GETUSER_SUCCESS,
} from "../actionTypes";

export const getUserRequest = (id) => {
  return {
    type: GETUSER_REQUEST,
    payload: id,
  };
};

export const getUserSuccess = (data) => {
  return {
    type: GETUSER_SUCCESS,
    payload: data,
  };
};

export const getUserFailure = (data) => {
  return {
    type: GETUSER_FAILURE,
    payload: data
  };
};

export const clearProfileData = () => {
  return {
    type: GETUSER_CLEARDATA,
  };
};
