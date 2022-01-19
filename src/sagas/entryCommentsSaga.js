import { call, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import {
  getEntryCommentsFailure,
  getEntryCommentsSuccess,
} from "../actions/actionCreators/entryCommentsAC";
import {
  commentVoteSuccess,
  commentVoteFailure,
} from "../actions/actionCreators/entryPageCommentVoteAC";
import {
  ENTRYPAGE_ADD_COMMENT_REQUEST,
  ENTRYPAGE_COMMENTS_REQUEST,
  ENTRYPAGE_VOTE_COMMENT_REQUEST,
} from "../actions/actionTypes";
import { API_v1 } from "../api/API_v1";
import { API_v2 } from "../api/API_v2";
import { addCommentSuccess } from "../actions/actionCreators/addCommentAC";

function* entryCommentsWorker(action) {
  let { subsiteId, contentId } = action.payload;

  try {
    let response = yield call(API_v2.getComments, subsiteId, contentId);
    yield put(getEntryCommentsSuccess(response.data.result.items));
  } catch (error) {
    yield console.log(error);
    yield put(getEntryCommentsFailure());
  }
}

function* voteCommentWorker(action) {
  try {
    yield put(commentVoteSuccess(action.payload));
    yield call(API_v1.postLike, action.payload);
  } catch (e) {
    yield console.log(e);
    yield put(commentVoteFailure(action.payload));
  }
}

function* addCommentWorker(action) {
  try {
    yield call(API_v1.addComment, action.payload);
    yield put(addCommentSuccess());
  } catch (e) {
    yield console.log(e);
  }
}

export default function* entryCommentsWatcher() {
  yield takeLatest(ENTRYPAGE_COMMENTS_REQUEST, entryCommentsWorker);
  yield takeEvery(ENTRYPAGE_VOTE_COMMENT_REQUEST, voteCommentWorker);
  yield takeLatest(ENTRYPAGE_ADD_COMMENT_REQUEST, addCommentWorker);
}
