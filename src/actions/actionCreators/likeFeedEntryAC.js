import {
  LIKE_FEED_ENTRY_FAILURE,
  LIKE_FEED_ENTRY_REQUEST,
  LIKE_FEED_ENTRY_SUCCESS,
} from "../actionTypes";

export const likeFeedEntryRequest = (data) => {
  return {
    type: LIKE_FEED_ENTRY_REQUEST,
    payload: data,
  };
};

export const likeFeedEntrySuccess = (data) => {
  return {
    type: LIKE_FEED_ENTRY_SUCCESS,
    payload: data,
  };
};

export const likeFeedEntryFailure = () => {
  return {
    type: LIKE_FEED_ENTRY_FAILURE,
  };
};
