import { call, put, takeLatest } from "redux-saga/effects";
import { likeProfileEntrySuccess } from "../actions/actionCreators/likeProfileEntryAC";
import { LIKE_PROFILE_ENTRY_REQUEST } from "../actions/actionTypes";
import { API_v1 } from "../api/API_v1";

function* ratingProfileEntryWorker(action) {
  try {
    yield put(likeProfileEntrySuccess(action.payload));
    yield call(API_v1.postLike, action.payload);
  } catch (error) {
    yield console.log(error);
  }
}

export default function* ratingProfileEntryWatcher() {
  yield takeLatest(LIKE_PROFILE_ENTRY_REQUEST, ratingProfileEntryWorker);
}
