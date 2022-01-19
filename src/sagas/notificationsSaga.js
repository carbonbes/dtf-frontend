import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_v1 } from "../api/API_v1";
import {
  notificationsCountSuccess,
  notificationsSuccess,
} from "../actions/actionCreators/notificationsAC";
import {
  NOTIFICATIONS_COUNT_REQUEST,
  NOTIFICATIONS_REQUEST,
} from "../actions/actionTypes";

function* notificationsWorker() {
  try {
    let response = yield call(API_v1.getNotifications);
    yield put(notificationsSuccess(response.data.result));
  } catch (error) {
    yield console.log(error);
  }
}

function* notificationsCountWorker() {
  try {
    let response = yield call(API_v1.getNotificationsCount);
    yield put(notificationsCountSuccess(response.data.result.count));
  } catch (error) {
    yield console.log(error);
  }
}

export default function* notificationsWatcher() {
  yield takeLatest(NOTIFICATIONS_REQUEST, notificationsWorker);
  yield takeLatest(NOTIFICATIONS_COUNT_REQUEST, notificationsCountWorker);
}
