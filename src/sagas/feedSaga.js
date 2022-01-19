import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_v2 } from "../api/API_v2";
import {
  getFeedFailure,
  getFeedSuccess,
} from "../actions/actionCreators/feedAC";
import {
  globalFetchFailure,
  globalFetchSuccess,
} from "../actions/actionCreators/globalFetchAC";
import { GETFEED_REQUEST } from "../actions/actionTypes";

function* feedWorker(action) {
  let { allSite, subsiteIds, sorting, lastId, lastSortingValue } =
    action.payload;

  try {
    let response = yield call(
      API_v2.getTimeline,
      allSite,
      subsiteIds,
      sorting,
      lastId,
      lastSortingValue
    );
    yield put(getFeedSuccess(response.data.result));
    yield put(globalFetchSuccess());
  } catch (error) {
    yield put(getFeedFailure());
    yield put(globalFetchFailure());
    yield console.log(error);
  }
}

export default function* feedWatcher() {
  yield takeLatest(GETFEED_REQUEST, feedWorker);
}
