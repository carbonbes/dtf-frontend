import {
  GETUSER_CLEARDATA,
  GETUSER_FAILURE,
  GETUSER_REQUEST,
  GETUSER_SUCCESS,
  SUBSCRIBE_FAILURE,
  SUBSCRIBE_REQUEST,
  SUBSCRIBE_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  isFetching: null,
  subsUnsubsFetching: false,
  profile: [],
  profileCounters: {
    comments: 0,
    entries: 0,
  },
  error: [],
};

export const getUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETUSER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case GETUSER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        profile: action.payload,
        profileCounters: {
          comments: action.payload.counters.comments,
          entries: action.payload.counters.entries,
        },
      };

    case GETUSER_FAILURE:
      return {
        ...state,
        isFetching: false,
        profile: [],
        error: action.payload,
      };

    case GETUSER_CLEARDATA:
      return {
        ...state,
        profile: [],
        error: [],
      };

    case SUBSCRIBE_REQUEST:
      return {
        ...state,
        subsUnsubsFetching: true,
      };

    case SUBSCRIBE_SUCCESS:
      return {
        ...state,
        subsUnsubsFetching: false,
        profile: {
          ...state.profile,
          isSubscribed: !state.profile.isSubscribed,
        },
      };

    case SUBSCRIBE_FAILURE:
      return {
        ...state,
        subsUnsubsFetching: false,
      };

    default:
      return state;
  }
};
