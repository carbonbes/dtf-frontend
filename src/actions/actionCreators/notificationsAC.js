import {
  NOTIFICATIONS_COUNT_CLEAR,
  NOTIFICATIONS_COUNT_FAILURE,
  NOTIFICATIONS_COUNT_REQUEST,
  NOTIFICATIONS_COUNT_SUCCESS,
  NOTIFICATIONS_FAILURE,
  NOTIFICATIONS_REQUEST,
  NOTIFICATIONS_SUCCESS,
} from "../actionTypes";

export const notificationsRequest = () => ({
  type: NOTIFICATIONS_REQUEST,
});

export const notificationsSuccess = (data) => ({
  type: NOTIFICATIONS_SUCCESS,
  payload: data,
});

export const notificationsFailure = () => ({
  type: NOTIFICATIONS_FAILURE,
});

export const notificationsCountRequest = () => ({
  type: NOTIFICATIONS_COUNT_REQUEST,
});

export const notificationsCountSuccess = (data) => ({
  type: NOTIFICATIONS_COUNT_SUCCESS,
  payload: data,
});

export const notificationsCountFailure = () => ({
  type: NOTIFICATIONS_COUNT_FAILURE,
});

export const notificationsCountClear = () => ({
  type: NOTIFICATIONS_COUNT_CLEAR,
});
