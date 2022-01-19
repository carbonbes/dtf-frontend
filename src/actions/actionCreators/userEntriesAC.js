import {
  GETUSER_ENTRIES_CLEAR,
  GETUSER_ENTRIES_FAILURE,
  GETUSER_ENTRIES_REQUEST,
  GETUSER_ENTRIES_SUCCESS,
} from "../actionTypes";

export const getUserEntriesRequest = (data) => {
  return {
    type: GETUSER_ENTRIES_REQUEST,
    payload: data,
  };
};

export const getUserEntriesSuccess = (data) => {
  return {
    type: GETUSER_ENTRIES_SUCCESS,
    payload: data,
  };
};

export const getUserEntriesFailure = () => {
  return {
    type: GETUSER_ENTRIES_FAILURE,
  };
};

export const getUserEntriesClear = () => {
  return {
    type: GETUSER_ENTRIES_CLEAR,
  };
};
