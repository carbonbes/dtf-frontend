import {
  GLOBALFETCH_FAILURE,
  GLOBALFETCH_REQUEST,
  GLOBALFETCH_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  isFetching: false,
};

export const globalFetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALFETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case GLOBALFETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };

    case GLOBALFETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
      };

    default:
      return state;
  }
};
