import {
  API_CHANNEL_CONNECT,
  API_CHANNEL_CONNECTED,
  API_CHANNEL_CONTENT_VOTED,
  API_CHANNEL_DISCONNECT,
  API_CHANNEL_DISCONNECTED,
  API_CHANNEL_FAILURE,
  API_CHANNEL_NEW_ENTRY_PUBLISHED,
} from "../actionTypes";

export const apiChannelConnect = () => ({
  type: API_CHANNEL_CONNECT,
});

export const apiChannelConnected = () => ({
  type: API_CHANNEL_CONNECTED,
});

export const apiChannelDisconnect = () => ({
  type: API_CHANNEL_DISCONNECT,
});

export const apiChannelDisconnected = () => ({
  type: API_CHANNEL_DISCONNECTED,
});

export const apiChannelFailure = () => ({
  type: API_CHANNEL_FAILURE,
});

export const apiChannelNewEntry = (data) => ({
  type: API_CHANNEL_NEW_ENTRY_PUBLISHED,
  payload: data,
});

export const apiChannelContentVoted = (data) => ({
  type: API_CHANNEL_CONTENT_VOTED,
  payload: data,
});
