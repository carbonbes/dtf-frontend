import { call, put, takeLatest } from "redux-saga/effects";
import { API_v2 } from "../api/API_v2";
import {
  getUserFailure,
  getUserSuccess,
} from "../actions/actionCreators/profileAC";
import { GETUSER_REQUEST } from "../actions/actionTypes";
import {
  globalFetchFailure,
  globalFetchSuccess,
} from "../actions/actionCreators/globalFetchAC";

function* profileWorker(action) {
  try {
    let response = yield call(API_v2.getUser, action.payload);
    yield put(getUserSuccess(response.data.result));
    yield put(globalFetchSuccess());
  } catch (error) {
    yield put(getUserFailure(error.response.data));
    yield put(globalFetchFailure());
  }
}

export default function* profileWatcher() {
  yield takeLatest(GETUSER_REQUEST, profileWorker);
}
