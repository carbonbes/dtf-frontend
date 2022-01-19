import {
  PERSONAL_CHANNEL_CONNECTED,
  PERSONAL_CHANNEL_CONNECTING_FAILURE,
  PERSONAL_CHANNEL_CONNECTING_REQUEST,
  PERSONAL_CHANNEL_DISCONNECTED,
  PERSONAL_CHANNEL_DISCONNECTING_REQUEST,
  PERSONAL_CHANNEL_LIKE_EVENT,
  PERSONAL_CHANNEL_MENTION_EVENT,
  PERSONAL_CHANNEL_NEW_COMMENT_EVENT,
  PERSONAL_CHANNEL_NEW_ENTRY_EVENT,
  PERSONAL_CHANNEL_REPLY_EVENT,
} from "../actionTypes";

export const personalChannelConnectingRequest = (data) => ({
  type: PERSONAL_CHANNEL_CONNECTING_REQUEST,
  payload: data,
});

export const personalChannelConnected = () => ({
  type: PERSONAL_CHANNEL_CONNECTED,
});

export const personalChannelConnectingFailure = () => ({
  type: PERSONAL_CHANNEL_CONNECTING_FAILURE,
});

export const personalChannelDisonnectingRequest = () => ({
  type: PERSONAL_CHANNEL_DISCONNECTING_REQUEST,
});

export const personalChannelDisonnected = () => ({
  type: PERSONAL_CHANNEL_DISCONNECTED,
});

export const personalChannelLikeEvent = (data) => ({
  type: PERSONAL_CHANNEL_LIKE_EVENT,
  payload: data,
});

export const personalChannelNewCommentEvent = (data) => ({
  type: PERSONAL_CHANNEL_NEW_COMMENT_EVENT,
  payload: data,
});

export const personalChannelReplyEvent = (data) => ({
  type: PERSONAL_CHANNEL_REPLY_EVENT,
  payload: data,
});

export const personalChannelMentionEvent = (data) => ({
  type: PERSONAL_CHANNEL_MENTION_EVENT,
  payload: data,
});

export const personalChannelNewEntryEvent = (data) => ({
  type: PERSONAL_CHANNEL_NEW_ENTRY_EVENT,
  payload: data,
});
