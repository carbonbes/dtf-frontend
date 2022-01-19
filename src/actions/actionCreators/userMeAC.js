import { USERME_FAILURE, USERME_REQUEST, USERME_SUCCESS } from "../actionTypes";

export const userMeRequest = () => {
  return {
    type: USERME_REQUEST,
  };
};

export const userMeSuccess = (data) => {
  return {
    type: USERME_SUCCESS,
    payload: data,
  };
};

export const userMeFailure = (data) => {
  return {
    type: USERME_FAILURE,
    payload: data,
  };
};