import {
  LIVE_CHANNEL_COMMENT_EDITED,
  LIVE_CHANNEL_COMMENT_REMOVED,
  LIVE_CHANNEL_NEW_COMMENT,
} from "../actions/actionTypes";

const initialState = {
  liveItems: [],
};

export const liveChannelReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIVE_CHANNEL_NEW_COMMENT:
      return {
        ...state,
        liveItems: [action.payload, ...state.liveItems],
      };

    case LIVE_CHANNEL_COMMENT_EDITED:
      return {
        ...state,
        liveItems: [
          ...state.liveItems.map((comment) =>
            comment.comment_id === action.payload.comment_id
              ? { ...comment, text: action.payload.text }
              : comment
          ),
        ],
      };

    case LIVE_CHANNEL_COMMENT_REMOVED:
      return {
        ...state,
        liveItems: [
          ...state.liveItems.map((comment) =>
            comment.comment_id === action.payload.comment_id
              ? { ...comment, text: "Комментарий удалён" }
              : comment
          ),
        ],
      };

    default:
      return state;
  }
};
