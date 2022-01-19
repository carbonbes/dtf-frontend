import {
  GLOBALFETCH_FAILURE,
  GLOBALFETCH_REQUEST,
  GLOBALFETCH_SUCCESS,
} from "../actionTypes";

export const globalFetchRequest = () => ({
  type: GLOBALFETCH_REQUEST,
});

export const globalFetchSuccess = () => ({
  type: GLOBALFETCH_SUCCESS,
});

export const globalFetchFailure = () => ({
  type: GLOBALFETCH_FAILURE,
});
