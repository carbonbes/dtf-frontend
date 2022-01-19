import { call, put, takeLatest } from "redux-saga/effects";
import { voteEntrySuccess } from "../actions/actionCreators/entryPageVote";
import {
  getEntryFailure,
  getEntrySuccess,
} from "../actions/actionCreators/entryAC";
import {
  globalFetchFailure,
  globalFetchSuccess,
} from "../actions/actionCreators/globalFetchAC";
import {
  ENTRYPAGE_VOTE_REQUEST,
  GETENTRY_REQUEST,
} from "../actions/actionTypes";
import { API_v1 } from "../api/API_v1";
import { API_v2 } from "../api/API_v2";

function* getEntryWorker(action) {
  try {
    let response = yield call(API_v2.getEntry, action.payload);
    yield put(getEntrySuccess(response.data.result));
    yield put(globalFetchSuccess());
  } catch (error) {
    yield put(getEntryFailure(error.response.data));
    yield put(globalFetchFailure());
  }
}

function* voteEntryWorker(action) {
  try {
    yield put(voteEntrySuccess(action.payload));
    yield call(API_v1.postLike, action.payload);
  } catch (error) {
    yield console.log(error);
  }
}

export default function* getEntryWatcher() {
  yield takeLatest(GETENTRY_REQUEST, getEntryWorker);
  yield takeLatest(ENTRYPAGE_VOTE_REQUEST, voteEntryWorker);
}
