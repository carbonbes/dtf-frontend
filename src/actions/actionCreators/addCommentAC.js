import {
  ENTRYPAGE_ADD_COMMENT_CLEAR,
  ENTRYPAGE_ADD_COMMENT_FAILURE,
  ENTRYPAGE_ADD_COMMENT_REQUEST,
  ENTRYPAGE_ADD_COMMENT_SUCCESS,
} from "../actionTypes";

export const addCommentRequest = (data) => ({
  type: ENTRYPAGE_ADD_COMMENT_REQUEST,
  payload: data,
});

export const addCommentSuccess = () => ({
  type: ENTRYPAGE_ADD_COMMENT_SUCCESS,
});

export const addCommentFailure = (data) => ({
  type: ENTRYPAGE_ADD_COMMENT_FAILURE,
  payload: data,
});

export const addCommentClear = () => ({
  type: ENTRYPAGE_ADD_COMMENT_CLEAR,
});
