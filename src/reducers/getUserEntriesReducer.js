import {
  GETUSER_ENTRIES_FAILURE,
  GETUSER_ENTRIES_REQUEST,
  GETUSER_ENTRIES_SUCCESS,
  GETUSER_ENTRIES_CLEAR,
  LIKE_PROFILE_ENTRY_SUCCESS,
  API_CHANNEL_CONTENT_VOTED,
} from "../actions/actionTypes";

const initialState = {
  isFetching: false,
  entries: [],
  lastId: 0,
};

export const getUserEntriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETUSER_ENTRIES_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case GETUSER_ENTRIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        entries: [
          ...state.entries,
          ...action.payload.items.map((item) => item.data),
        ],
        lastId: action.payload.lastId,
      };

    case GETUSER_ENTRIES_FAILURE:
      return {
        ...state,
        isFetching: false,
        entries: [],
      };

    case GETUSER_ENTRIES_CLEAR:
      return {
        ...state,
        entries: [],
      };

    case LIKE_PROFILE_ENTRY_SUCCESS:
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
