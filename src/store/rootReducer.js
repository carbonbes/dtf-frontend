import { combineReducers } from "redux";
import { globalFetchReducer } from "../reducers/globalFetchReducer";
import { authReducer } from "../reducers/authReducer";
import { notificationsReducer } from "../reducers/notifycationsReducer";
import { entryCommentsReducer } from "../reducers/entryCommentsReducer";
import { getEntryReducer } from "../reducers/getEntryReducer";
import { getFeedReducer } from "../reducers/getFeedReducer";
import { getUserReducer } from "../reducers/getUser&SubsReducer";
import { getUserEntriesReducer } from "../reducers/getUserEntriesReducer";
import { liveChannelReducer } from "../reducers/liveChannelReducer";

export const rootReducer = combineReducers({
  fetchStatus: globalFetchReducer,
  auth: authReducer,
  notifications: notificationsReducer,
  viewedProfile: getUserReducer,
  viewedProfileEntries: getUserEntriesReducer,
  feed: getFeedReducer,
  viewedEntry: getEntryReducer,
  viewedEntryComments: entryCommentsReducer,
  liveChannel: liveChannelReducer,
});
