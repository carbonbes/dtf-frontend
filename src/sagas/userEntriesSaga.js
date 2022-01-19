import { call, put, takeLatest } from "redux-saga/effects";
import { API_v2 } from "../api/API_v2";
import {
  getUserEntriesSuccess,
  getUserEntriesFailure,
} from "../actions/actionCreators/userEntriesAC";
import { GETUSER_ENTRIES_REQUEST } from "../actions/actionTypes";

function* userEntriesWorker(action) {
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
    yield put(getUserEntriesSuccess(response.data.result));
  } catch (error) {
    yield put(getUserEntriesFailure());
    yield console.log(error);
  }
}

export default function* userEntriesWatcher() {
  yield takeLatest(GETUSER_ENTRIES_REQUEST, userEntriesWorker);
}
