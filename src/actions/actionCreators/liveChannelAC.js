import {
  LIVE_CHANNEL_COMMENT_EDITED,
  LIVE_CHANNEL_COMMENT_REMOVED,
  LIVE_CHANNEL_CONNECT,
  LIVE_CHANNEL_CONNECTED,
  LIVE_CHANNEL_DISCONNECT,
  LIVE_CHANNEL_DISCONNECTED,
  LIVE_CHANNEL_FAILURE,
  LIVE_CHANNEL_NEW_COMMENT,
} from "../actionTypes";

export const liveChannelConnect = () => ({
  type: LIVE_CHANNEL_CONNECT,
});

export const liveChannelConnected = (data) => ({
  type: LIVE_CHANNEL_CONNECTED,
  payload: data,
});

export const liveChannelDisconnect = () => ({
  type: LIVE_CHANNEL_DISCONNECT,
});

export const liveChannelDisconnected = () => ({
  type: LIVE_CHANNEL_DISCONNECTED,
});

export const liveChannelFailure = () => ({
  type: LIVE_CHANNEL_FAILURE,
});

export const liveChannelNewComment = (data) => ({
  type: LIVE_CHANNEL_NEW_COMMENT,
  payload: data,
});

export const liveChannelCommentEdited = (data) => ({
  type: LIVE_CHANNEL_COMMENT_EDITED,
  payload: data,
});

export const liveChannelCommentRemoved = (data) => ({
  type: LIVE_CHANNEL_COMMENT_REMOVED,
  payload: data,
});
