import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_v1 } from "../api/API_v1";
import { getCommentLikesSuccess } from "../actions/actionCreators/likesCommentAC";
import { ENTRYPAGE_COMMENT_LIKES_REQUEST } from "../actions/actionTypes";

function* сommentLikesWorker(action) {
  try {
    let response = yield call(API_v1.getCommentLikes, action.payload);
    yield put(
      getCommentLikesSuccess({
        id: action.payload,
        items: response.data.result,
      })
    );
  } catch (error) {
    yield console.log(error);
  }
}

export default function* сommentLikesWatcher() {
  yield takeLatest(ENTRYPAGE_COMMENT_LIKES_REQUEST, сommentLikesWorker);
}
