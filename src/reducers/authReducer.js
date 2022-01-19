import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  USERME_FAILURE,
  USERME_REQUEST,
  USERME_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  isFetching: false,
  isAuth: null,
  isLogin: null,
  profileData: [],
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERME_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case USERME_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuth: true,
        profileData: action.payload,
      };

    case USERME_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuth: null,
      };

    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuth: true,
        isLogin: true,
        profileData: action.payload,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuth: null,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuth: false,
        isLogin: false,
        profileData: [],
      };

    default:
      return state;
  }
};
