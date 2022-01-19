import {
  ENTRYPAGE_COMMENT_LIKES_FAILURE,
  ENTRYPAGE_COMMENT_LIKES_REQUEST,
  ENTRYPAGE_COMMENT_LIKES_SUCCESS,
} from "../actionTypes";

export const getCommentLikesRequest = (id) => ({
  type: ENTRYPAGE_COMMENT_LIKES_REQUEST,
  payload: id,
});

export const getCommentLikesSuccess = (data) => ({
  type: ENTRYPAGE_COMMENT_LIKES_SUCCESS,
  payload: data,
});

export const getCommentLikesFailure = (data) => ({
  type: ENTRYPAGE_COMMENT_LIKES_FAILURE,
  payload: data,
});
