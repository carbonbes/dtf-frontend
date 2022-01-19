import {
  LIKE_PROFILE_ENTRY_FAILURE,
  LIKE_PROFILE_ENTRY_REQUEST,
  LIKE_PROFILE_ENTRY_SUCCESS,
} from "../actionTypes";

export const likeProfileEntryRequest = (data) => {
  return {
    type: LIKE_PROFILE_ENTRY_REQUEST,
    payload: data,
  };
};

export const likeProfileEntrySuccess = (data) => {
  return {
    type: LIKE_PROFILE_ENTRY_SUCCESS,
    payload: data,
  };
};

export const likeProfileEntryFailure = () => {
  return {
    type: LIKE_PROFILE_ENTRY_FAILURE,
  };
};
