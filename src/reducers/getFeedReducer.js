import {
  API_CHANNEL_CONTENT_VOTED,
  API_CHANNEL_NEW_ENTRY_PUBLISHED,
  FEED_READ,
  GETFEED_CLEAR,
  GETFEED_FAILURE,
  GETFEED_REQUEST,
  GETFEED_SUCCESS,
  LIKE_FEED_ENTRY_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  isFetching: false,
  entries: [],
  newEntries: 0,
  lastId: 0,
  lastSortingValue: 0,
  currentPage: 1,
};

export const getFeedReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETFEED_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case GETFEED_SUCCESS:
      return {
        ...state,
        isFetching: false,
        entries: [
          ...state.entries,
          ...action.payload.items
            .filter((item) => item.type === "entry")
            .map((item) => item.data),
        ],
        lastId: action.payload.lastId,
        lastSortingValue: action.payload.lastSortingValue,
        currentPage: ++state.currentPage,
      };

    case GETFEED_FAILURE:
      return {
        ...state,
        isFetching: false,
        entries: [],
      };

    case GETFEED_CLEAR:
      return {
        ...state,
        entries: [],
      };

    case LIKE_FEED_ENTRY_SUCCESS:
      return {
        ...state,
        entries: [
          ...state.entries.map((entry) =>
            entry.id === action.payload.id
              ? {
                  ...entry,
                  likes: {
                    ...entry.likes,
                    isLiked: action.payload.sign,
                  },
                }
              : entry
          ),
        ],
      };

    case API_CHANNEL_NEW_ENTRY_PUBLISHED:
      return {
        ...state,
        newEntries: ++state.newEntries,
      };

    case FEED_READ:
      return {
        ...state,
        newEntries: 0,
      };

    case API_CHANNEL_CONTENT_VOTED:
      return {
        ...state,
        entries: [
          ...state.entries.map((entry) =>
            entry.id === action.payload.id
              ? {
                  ...entry,
                  likes: {
                    ...entry.likes,
                    counter:
                      action.payload.count < 0
                        ? action.payload.count * -1
                        : action.payload.count,
                    summ: action.payload.count,
                  },
                }
              : entry
          ),
        ],
      };

    default:
      return state;
  }
};
