import {
  NOTIFICATIONS_COUNT_CLEAR,
  NOTIFICATIONS_COUNT_SUCCESS,
  NOTIFICATIONS_REQUEST,
  NOTIFICATIONS_SUCCESS,
  PERSONAL_CHANNEL_LIKE_EVENT,
  PERSONAL_CHANNEL_MENTION_EVENT,
  PERSONAL_CHANNEL_NEW_COMMENT_EVENT,
  PERSONAL_CHANNEL_NEW_ENTRY_EVENT,
  PERSONAL_CHANNEL_READ_NOTIFY,
  PERSONAL_CHANNEL_REPLY_EVENT,
} from "../actions/actionTypes";

const initialState = {
  isFetching: null,
  notifications: [],
  countUnread: 0,
  newNotify: 0,
};

export const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATIONS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        notifications: action.payload,
      };

    case NOTIFICATIONS_COUNT_SUCCESS:
      return {
        ...state,
        countUnread: action.payload,
      };

    case NOTIFICATIONS_COUNT_CLEAR:
      return {
        ...state,
        countUnread: 0,
      };

    case PERSONAL_CHANNEL_LIKE_EVENT:
      return {
        ...state,
        countUnread: ++state.countUnread,
        newNotify: ++state.newNotify,
      };

    case PERSONAL_CHANNEL_NEW_COMMENT_EVENT:
      return {
        ...state,
        countUnread: ++state.countUnread,
        newNotify: ++state.newNotify,
      };

    case PERSONAL_CHANNEL_REPLY_EVENT:
      return {
        ...state,
        countUnread: ++state.countUnread,
        newNotify: ++state.newNotify,
      };

    case PERSONAL_CHANNEL_MENTION_EVENT:
      return {
        ...state,
        countUnread: ++state.countUnread,
        newNotify: ++state.newNotify,
      };

    case PERSONAL_CHANNEL_NEW_ENTRY_EVENT:
      return {
        ...state,
        countUnread: ++state.countUnread,
        newNotify: ++state.newNotify,
      };

    case PERSONAL_CHANNEL_READ_NOTIFY:
      return {
        ...state,
        countUnread: 0,
      };

    default:
      return state;
  }
};
