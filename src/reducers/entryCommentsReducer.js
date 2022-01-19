import {
  ENTRYPAGE_ADD_COMMENT_CLEAR,
  ENTRYPAGE_ADD_COMMENT_FAILURE,
  ENTRYPAGE_ADD_COMMENT_REQUEST,
  ENTRYPAGE_ADD_COMMENT_SUCCESS,
  ENTRYPAGE_CHANNEL_COMMENT_CREATED,
  ENTRYPAGE_CHANNEL_COMMENT_EDITED,
  ENTRYPAGE_CHANNEL_COMMENT_VOTED,
  ENTRYPAGE_COMMENTS_CLEAR,
  ENTRYPAGE_COMMENTS_FAILURE,
  ENTRYPAGE_COMMENTS_SUCCESS,
  ENTRYPAGE_COMMENT_LIKES_SUCCESS,
  ENTRYPAGE_VOTE_COMMENT_FAILURE,
  ENTRYPAGE_VOTE_COMMENT_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  comments: [],
  commentsLikesItems: [],
  replyIsSended: null,
  replyIsSending: null,
};

export const entryCommentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ENTRYPAGE_COMMENTS_SUCCESS:
      let comments = action.payload.map((comment) => {
        comment.replies = [];
        return comment;
      });

      return {
        ...state,
        comments: [...comments],
      };

    case ENTRYPAGE_COMMENTS_FAILURE:
      return {
        ...state,
        comments: [],
      };

    case ENTRYPAGE_CHANNEL_COMMENT_CREATED:
      let newComment = action.payload.comment;
      newComment.likes.counter = 0;
      newComment.replies = [];
      newComment.media = null;
      newComment.media = [...newComment.attaches];

      return {
        ...state,
        comments: [...state.comments, newComment],
      };

    case ENTRYPAGE_CHANNEL_COMMENT_EDITED:
      return {
        ...state,
        comments: [
          ...state.comments.map((comment) =>
            comment.id === action.payload.comment.id
              ? {
                  ...comment,
                  isEdited: action.payload.comment.isEdited,
                  text: action.payload.comment.text,
                  media: [...action.payload.comment.attaches],
                }
              : comment
          ),
        ],
      };

    case ENTRYPAGE_CHANNEL_COMMENT_VOTED:
      return {
        ...state,
        comments: [
          ...state.comments.map((comment) =>
            comment.id === action.payload.id
              ? {
                  ...comment,
                  likes: {
                    ...comment.likes,
                    counter:
                      action.payload.count < 0
                        ? action.payload.count * -1
                        : action.payload.count,
                    summ: action.payload.count,
                  },
                }
              : comment
          ),
        ],
      };

    case ENTRYPAGE_COMMENT_LIKES_SUCCESS:
      return {
        ...state,
        commentsLikesItems: {
          ...state.commentsLikesItems,
          [action.payload.id]: {
            ...action.payload.items,
          },
        },
      };

    case ENTRYPAGE_COMMENTS_CLEAR:
      return {
        ...state,
        comments: [],
        commentsLikesItems: [],
      };

    case ENTRYPAGE_VOTE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [
          ...state.comments.map((comment) =>
            comment.id === action.payload.id
              ? {
                  ...comment,
                  likes: {
                    ...comment.likes,
                    isLiked: action.payload.sign,
                  },
                }
              : comment
          ),
        ],
      };

    case ENTRYPAGE_VOTE_COMMENT_FAILURE:
      return {
        ...state,
        comments: [
          ...state.comments.map((comment) =>
            comment.id === action.payload.id
              ? {
                  ...comment,
                  likes: {
                    ...comment.likes,
                    isLiked: 0,
                  },
                }
              : comment
          ),
        ],
      };

    case ENTRYPAGE_ADD_COMMENT_REQUEST:
      return {
        ...state,
        replyIsSending: true,
      };

    case ENTRYPAGE_ADD_COMMENT_SUCCESS:
      return {
        ...state,
        replyIsSended: true,
        replyIsSending: false,
      };

    case ENTRYPAGE_ADD_COMMENT_FAILURE:
      return {
        ...state,
        replyIsSended: false,
        replyIsSending: false,
      };

    case ENTRYPAGE_ADD_COMMENT_CLEAR:
      return {
        ...state,
        replyIsSended: null,
        replyIsSending: null,
      };

    default:
      return state;
  }
};
