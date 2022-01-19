import { spawn } from "redux-saga/effects";
import authWatcher from "./authSaga";
import userEntriesWatcher from "./userEntriesSaga";
import profileWatcher from "./profileSaga";
import subscriptionsWatcher from "./subscriptionsSaga";
import feedWatcher from "./feedSaga";
import ratingProfileEntryWatcher from "./ratingProfileEntrySaga";
import ratingFeedEntryWatcher from "./ratingFeedEntrySaga";
import apiChannelWatcher from "./apiChannelSaga";
import entryWatcher from "./entrySaga";
import liveChannelWatcher from "./liveChannelSaga";
import entryCommentsWatcher from "./entryCommentsSaga";
import entryPageChannelWatcher from "./entryPageChannelSaga";
import сommentLikesWatcher from "./сommentLikesSaga";
import notificationsWatcher from "./notificationsSaga";
import personalChannelWatcher from "./personalChannelSaga";

export default function* rootSaga() {
  yield spawn(authWatcher);
  yield spawn(profileWatcher);
  yield spawn(subscriptionsWatcher);
  yield spawn(userEntriesWatcher);
  yield spawn(feedWatcher);
  yield spawn(ratingProfileEntryWatcher);
  yield spawn(ratingFeedEntryWatcher);
  yield spawn(apiChannelWatcher);
  yield spawn(entryWatcher);
  yield spawn(liveChannelWatcher);
  yield spawn(entryCommentsWatcher);
  yield spawn(entryPageChannelWatcher);
  yield spawn(сommentLikesWatcher);
  yield spawn(notificationsWatcher);
  yield spawn(personalChannelWatcher);
}
