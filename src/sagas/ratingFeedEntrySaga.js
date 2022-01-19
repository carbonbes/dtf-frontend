import { call, put, takeLatest } from "redux-saga/effects";
import { likeFeedEntrySuccess } from "../actions/actionCreators/likeFeedEntryAC";
import { LIKE_FEED_ENTRY_REQUEST } from "../actions/actionTypes";
import { API_v1 } from "../api/API_v1";

function* ratingFeedEntryWorker(action) {
  try {
    yield put(likeFeedEntrySuccess(action.payload));
    yield call(API_v1.postLike, action.payload);
  } catch (error) {
    yield console.log(error);
  }
}

export default function* ratingFeedEntryWatcher() {
  yield takeLatest(LIKE_FEED_ENTRY_REQUEST, ratingFeedEntryWorker);
}
