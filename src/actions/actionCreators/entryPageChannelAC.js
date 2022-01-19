import {
  ENTRYPAGE_CHANNEL_COMMENT_CREATED,
  ENTRYPAGE_CHANNEL_COMMENT_EDITED,
  ENTRYPAGE_CHANNEL_COMMENT_VOTED,
  ENTRYPAGE_CHANNEL_CONNECT,
  ENTRYPAGE_CHANNEL_CONNECTED,
  ENTRYPAGE_CHANNEL_DISCONNECT,
  ENTRYPAGE_CHANNEL_DISCONNECTED,
  ENTRYPAGE_CHANNEL_FAILURE,
} from "../actionTypes";

export const entryPageChannelConnect = (id) => ({
  type: ENTRYPAGE_CHANNEL_CONNECT,
  payload: id,
});

export const entryPageChannelConnected = () => ({
  type: ENTRYPAGE_CHANNEL_CONNECTED,
});

export const entryPageChannelDisconnect = () => ({
  type: ENTRYPAGE_CHANNEL_DISCONNECT,
});

export const entryPageChannelDisconnected = () => ({
  type: ENTRYPAGE_CHANNEL_DISCONNECTED,
});

export const entryPageChannelFailure = () => ({
  type: ENTRYPAGE_CHANNEL_FAILURE,
});

export const entryPageChannelCommentCreated = (data) => ({
  type: ENTRYPAGE_CHANNEL_COMMENT_CREATED,
  payload: data,
});

export const entryPageChannelCommentEdited = (data) => ({
  type: ENTRYPAGE_CHANNEL_COMMENT_EDITED,
  payload: data,
});

export const entryPageChannelCommentVoted = (data) => ({
  type: ENTRYPAGE_CHANNEL_COMMENT_VOTED,
  payload: data,
});
