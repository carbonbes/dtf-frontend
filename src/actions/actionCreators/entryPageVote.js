import {
  ENTRYPAGE_VOTE_FAILURE,
  ENTRYPAGE_VOTE_REQUEST,
  ENTRYPAGE_VOTE_SUCCESS,
} from "../actionTypes";

export const voteEntryRequest = (data) => ({
  type: ENTRYPAGE_VOTE_REQUEST,
  payload: data,
});

export const voteEntrySuccess = (data) => ({
  type: ENTRYPAGE_VOTE_SUCCESS,
  payload: data,
});

export const voteEntryFailure = (data) => ({
  type: ENTRYPAGE_VOTE_FAILURE,
  payload: data,
});
