import { call, put, takeLatest } from "redux-saga/effects";
import {
  subscribeFailure,
  subscribeSuccess,
} from "../actions/actionCreators/subscriptionsAC";
import { SUBSCRIBE_REQUEST } from "../actions/actionTypes";
import { API_v1 } from "../api/API_v1";

function* subscribeWorker(action) {
  if (action.payload.action === "subscribe") {
    try {
      yield call(API_v1.postUserMeSubscription, action.payload);
      yield put(subscribeSuccess());

      let mySubscriptionsIds = yield JSON.parse(
        localStorage.getItem("my_subscription_ids")
      );
      yield mySubscriptionsIds.push(action.payload.id);
      yield localStorage.setItem(
        "my_subscription_ids",
        JSON.stringify(mySubscriptionsIds)
      );
    } catch (error) {
      yield put(subscribeFailure());
      yield console.log(error);
    }
  } else if (action.payload.action === "unsubscribe") {
    try {
      yield call(API_v1.postUserMeSubscription, action.payload);
      yield put(subscribeSuccess());

      let mySubscriptionsIds = yield JSON.parse(
        localStorage.getItem("my_subscription_ids")
      );
      let index = yield mySubscriptionsIds.indexOf(action.payload.id);
      if (index > -1) {
        yield mySubscriptionsIds.splice(index, 1);
      }
      yield localStorage.setItem(
        "my_subscription_ids",
        JSON.stringify(mySubscriptionsIds)
      );
    } catch (error) {
      yield put(subscribeFailure());
      yield console.log(error);
    }
  }
}

export default function* subscriptionsSagaWatcher() {
  yield takeLatest(SUBSCRIBE_REQUEST, subscribeWorker);
}
