import {
  API_CHANNEL_CONTENT_VOTED,
  ENTRYPAGE_VOTE_SUCCESS,
  GETENTRY_CLEAR,
  GETENTRY_FAILURE,
  GETENTRY_REQUEST,
  GETENTRY_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  isFetching: false,
  entry: [],
  error: [],
};

export const getEntryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETENTRY_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case GETENTRY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        entry: action.payload,
      };

    case GETENTRY_FAILURE:
      return {
        ...state,
        isFetching: false,
        entry: [],
        error: action.payload,
      };

    case API_CHANNEL_CONTENT_VOTED:
      if (state.entry.id === action.payload.id) {
        return {
          ...state,
          entry: {
            ...state.entry,
            likes: {
              ...state.entry.likes,
              counter:
                action.payload.count < 0
                  ? action.payload.count * -1
                  : action.payload.count,
              summ: action.payload.count,
            },
          },
        };
      } else return state;

    case ENTRYPAGE_VOTE_SUCCESS:
      return {
        ...state,
        entry: {
          ...state.entry,
          likes: {
            ...state.entry.likes,
            isLiked: action.payload.sign,
          },
        },
      };

    case GETENTRY_CLEAR:
      return {
        ...state,
        entry: [],
        error: [],
      };

    default:
      return state;
  }
};
