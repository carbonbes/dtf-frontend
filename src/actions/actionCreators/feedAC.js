import {
  FEED_READ,
  GETFEED_CLEAR,
  GETFEED_FAILURE,
  GETFEED_REQUEST,
  GETFEED_SUCCESS,
} from "../actionTypes";

export const getFeedRequest = (data) => {
  return {
    type: GETFEED_REQUEST,
    payload: data,
  };
};

export const getFeedSuccess = (data) => {
  return {
    type: GETFEED_SUCCESS,
    payload: data,
  };
};

export const getFeedFailure = () => {
  return {
    type: GETFEED_FAILURE,
  };
};

export const getFeedClear = () => {
  return {
    type: GETFEED_CLEAR,
  };
};

export const FeedRead = () => {
  return {
    type: FEED_READ,
  };
};
