import { call, put, takeLatest } from "redux-saga/effects";
import { logoutSuccess } from "../actions/actionCreators/authAC";
import { loginFailure, loginSuccess } from "../actions/actionCreators/authAC";
import {
  userMeFailure,
  userMeSuccess,
} from "../actions/actionCreators/userMeAC";
import { LOGIN_REQUEST, LOGOUT, USERME_REQUEST } from "../actions/actionTypes";
import { API_v1 } from "../api/API_v1";
import { API_v2 } from "../api/API_v2";

function* getUserMeWorker() {
  try {
    let response = yield call(API_v2.getSubsiteMe);
    yield put(userMeSuccess(response.data.result));
  } catch (error) {
    yield console.log(error);
    yield put(userMeFailure());
  }
}

function* loginWorker(action) {
  try {
    let response = yield call(API_v1.postAuthLogin, action.payload);
    let ids = yield call(
      API_v2.getSubsiteSubscriptions,
      response.data.result.id
    );

    yield put(loginSuccess(response.data.result));

    if (action.payload.rememberMe) {
      yield localStorage.setItem("token", response.headers["x-device-token"]);
      yield localStorage.setItem("m_hash", response.data.result["m_hash"]);
      yield localStorage.setItem(
        "user_hash",
        response.data.result["user_hash"]
      );
      yield localStorage.setItem("default_sort_feed", "hotness");
      yield localStorage.setItem("default_type_feed", "my_feed");
      yield localStorage.setItem(
        "my_subscription_ids",
        JSON.stringify(ids.data.result.items.map((item) => item.id))
      );
      yield localStorage.setItem("comments-sorting-value", "popular");
      let theme = yield localStorage.getItem("theme");
      if (theme) {
        return;
      } else {
        yield localStorage.setItem("theme", "light");
      }
    }

    if (!action.payload.rememberMe) {
      yield sessionStorage.setItem("token", response.headers["x-device-token"]);
      yield sessionStorage.setItem("m_hash", response.data.result["m_hash"]);
      yield sessionStorage.setItem(
        "user_hash",
        response.data.result["user_hash"]
      );
      yield sessionStorage.setItem("default_sort_feed", "hotness");
      yield sessionStorage.setItem("default_type_feed", "my_feed");
      yield sessionStorage.setItem(
        "my_subscription_ids",
        JSON.stringify(ids.data.result.items.map((item) => item.id))
      );
      yield sessionStorage.setItem("comments-sorting-value", "popular");
      let theme = yield localStorage.getItem("theme");
      if (theme) {
        return;
      } else {
        yield sessionStorage.setItem("theme", "light");
      }
    }
  } catch (error) {
    yield console.log(error);
    yield put(loginFailure());
  }
}

function* logoutWorker() {
  yield put(logoutSuccess());
  yield localStorage.clear();
  yield sessionStorage.clear();
}

export default function* authWatcher() {
  yield takeLatest(USERME_REQUEST, getUserMeWorker);
  yield takeLatest(LOGIN_REQUEST, loginWorker);
  yield takeLatest(LOGOUT, logoutWorker);
}
