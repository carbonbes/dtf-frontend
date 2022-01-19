import { call, put, fork, take, takeLatest } from "@redux-saga/core/effects";
import { eventChannel } from "redux-saga";
import io from "socket.io-client";
import {
  apiChannelConnected,
  apiChannelContentVoted,
  apiChannelDisconnected,
  apiChannelNewEntry,
} from "../actions/actionCreators/apiChannelAC";
import {
  API_CHANNEL_CONNECT,
  API_CHANNEL_DISCONNECT,
} from "../actions/actionTypes";
import { isInMySubscriptions } from "../utils/isInMySubscriptions";

const createWebsocketConnection = () => {
  let socket = io("https://ws-sio.dtf.ru", {
    transports: ["websocket"],
  });

  return socket;
};

const createSocketChannel = (socket) => {
  return eventChannel((emit) => {
    const openedConnectionEventHandler = () => {
      emit("websocket_opened");
      socket.emit("subscribe", { channel: "api" });
    };
    const closedConnectionEvent = () => {
      emit("websocket_closed");
    };
    const eventHandler = (data) => {
      emit(data.data);
    };

    socket.on("connect", openedConnectionEventHandler);
    socket.on("disconnect", closedConnectionEvent);
    socket.on("event", eventHandler);

    return () => {};
  });
};

function* apiChannelWorker() {
  const socket = yield call(createWebsocketConnection);
  const socketChannel = yield call(createSocketChannel, socket);

  yield fork(function* () {
    yield take(API_CHANNEL_DISCONNECT);
    yield socket.disconnect();
    yield put(apiChannelDisconnected());
  });

  while (true) {
    try {
      const data = yield take(socketChannel);
      if (data === "websocket_opened") {
        yield put(apiChannelConnected());
      }
      if (data === "websocket_closed") {
        yield put(apiChannelDisconnected());
      }
      if (data.type === "content voted") {
        yield put(apiChannelContentVoted(data));
      }
      if (
        data.type === "new_entry_published" &&
        isInMySubscriptions(data.subsite_id)
      ) {
        yield put(apiChannelNewEntry(data));
      }
    } catch (error) {
      yield console.log(error);
    }
  }
}

export default function* apiChannelWatcher() {
  yield takeLatest(API_CHANNEL_CONNECT, apiChannelWorker);
}
