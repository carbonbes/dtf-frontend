import {
  ENTRYPAGE_COMMENTS_CLEAR,
  ENTRYPAGE_COMMENTS_FAILURE,
  ENTRYPAGE_COMMENTS_REQUEST,
  ENTRYPAGE_COMMENTS_SUCCESS,
} from "../actionTypes";

export const getEntryCommentsRequest = (id) => ({
  type: ENTRYPAGE_COMMENTS_REQUEST,
  payload: id,
});

export const getEntryCommentsSuccess = (data) => ({
  type: ENTRYPAGE_COMMENTS_SUCCESS,
  payload: data,
});

export const getEntryCommentsFailure = (data) => ({
  type: ENTRYPAGE_COMMENTS_FAILURE,
  payload: data,
});

export const getEntryCommentsClear = () => ({
  type: ENTRYPAGE_COMMENTS_CLEAR,
});
