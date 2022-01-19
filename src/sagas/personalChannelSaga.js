import { call, put, fork, take, takeLatest } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import io from "socket.io-client";
import {
  PERSONAL_CHANNEL_CONNECTING_REQUEST,
  PERSONAL_CHANNEL_DISCONNECTING_REQUEST,
} from "../actions/actionTypes";
import {
  personalChannelDisonnectingRequest,
  personalChannelLikeEvent,
  personalChannelMentionEvent,
  personalChannelNewCommentEvent,
  personalChannelNewEntryEvent,
  personalChannelReplyEvent,
} from "../actions/actionCreators/personalChannelAC";

const createWebsocketConnection = () => {
  let socket = io("https://ws-sio.dtf.ru", {
    transports: ["websocket"],
  });

  return socket;
};

const createSocketChannel = (socket, userHash) => {
  return eventChannel((emit) => {
    const openedConnectionEventHandler = () => {
      socket.emit("subscribe", { channel: `mobile:${userHash}` });
    };
    const closedConnectionEventHandler = () => {
      emit("websocket_closed");
    };
    const eventHandler = (data) => {
      emit(data.data);
    };

    socket.on("connect", openedConnectionEventHandler);
    socket.on("disconnect", closedConnectionEventHandler);
    socket.on("event", eventHandler);

    return () => {};
  });
};

function* personalChannelWorker(action) {
  const socket = yield call(createWebsocketConnection);
  const socketChannel = yield call(createSocketChannel, socket, action.payload);

  yield fork(function* () {
    yield take(PERSONAL_CHANNEL_DISCONNECTING_REQUEST);
    yield socket.disconnect();
    yield put(personalChannelDisonnectingRequest());
  });

  while (true) {
    try {
      const data = yield take(socketChannel);

      if (data.type === 4) {
        yield put(personalChannelLikeEvent(data));
      }
      if (data.type === 8) {
        yield put(personalChannelNewCommentEvent(data));
      }
      if (data.type === 16) {
        yield put(personalChannelReplyEvent(data));
      }
      if (data.type === 32) {
        yield put(personalChannelMentionEvent(data));
      }
      if (data.type === 64) {
        yield put(personalChannelNewEntryEvent(data));
      }
    } catch (error) {
      yield console.log(error);
    }
  }
}

export default function* personalChannelWatcher() {
  yield takeLatest(PERSONAL_CHANNEL_CONNECTING_REQUEST, personalChannelWorker);
}
