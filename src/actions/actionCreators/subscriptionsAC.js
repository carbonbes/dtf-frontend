import {
  SUBSCRIBE_FAILURE,
  SUBSCRIBE_REQUEST,
  SUBSCRIBE_SUCCESS,
} from "../actionTypes";

export const subscribeRequest = (data) => {
  return {
    type: SUBSCRIBE_REQUEST,
    payload: data,
  };
};

export const subscribeSuccess = () => {
  return {
    type: SUBSCRIBE_SUCCESS,
  };
};

export const subscribeFailure = () => {
  return {
    type: SUBSCRIBE_FAILURE,
  };
};
