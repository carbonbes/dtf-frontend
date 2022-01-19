import {
  GETENTRY_CLEAR,
  GETENTRY_FAILURE,
  GETENTRY_REQUEST,
  GETENTRY_SUCCESS,
} from "../actionTypes";

export const getEntryRequest = (id) => ({
  type: GETENTRY_REQUEST,
  payload: id,
});

export const getEntrySuccess = (data) => ({
  type: GETENTRY_SUCCESS,
  payload: data,
});

export const getEntryFailure = (data) => ({
  type: GETENTRY_FAILURE,
  payload: data,
});

export const getEntryClear = () => ({
  type: GETENTRY_CLEAR,
});
