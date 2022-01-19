import {
  ENTRYPAGE_VOTE_COMMENT_FAILURE,
  ENTRYPAGE_VOTE_COMMENT_REQUEST,
  ENTRYPAGE_VOTE_COMMENT_SUCCESS,
} from "../actionTypes";

export const commentVoteRequest = (data) => ({
  type: ENTRYPAGE_VOTE_COMMENT_REQUEST,
  payload: data,
});

export const commentVoteSuccess = (data) => ({
  type: ENTRYPAGE_VOTE_COMMENT_SUCCESS,
  payload: data,
});

export const commentVoteFailure = (data) => ({
  type: ENTRYPAGE_VOTE_COMMENT_FAILURE,
  payload: data,
});
