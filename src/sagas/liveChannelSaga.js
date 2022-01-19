import { call, put, fork, take, takeLatest } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import io from "socket.io-client";
import {
  liveChannelCommentEdited,
  liveChannelCommentRemoved,
  liveChannelDisconnected,
  liveChannelNewComment,
} from "../actions/actionCreators/liveChannelAC";
import {
  LIVE_CHANNEL_CONNECT,
  LIVE_CHANNEL_DISCONNECT,
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
      socket.emit("subscribe", { channel: "live" });
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

function* liveChannelWorker() {
  const socket = yield call(createWebsocketConnection);
  const socketChannel = yield call(createSocketChannel, socket);

  yield fork(function* () {
    yield take(LIVE_CHANNEL_DISCONNECT);
    yield socket.disconnect();
    yield put(liveChannelDisconnected());
  });

  while (true) {
    try {
      const data = yield take(socketChannel);

      if (data.type === "comment_add" && isInMySubscriptions(data.subsite_id)) {
        yield put(liveChannelNewComment(data));
      }
      if (data.type === "comment_edited") {
        yield put(liveChannelCommentEdited(data));
      }
      if (data.type === "comment_removed") {
        yield put(liveChannelCommentRemoved(data));
      }
    } catch (error) {
      yield console.log(error);
    }
  }
}

export default function* liveChannelWatcher() {
  yield takeLatest(LIVE_CHANNEL_CONNECT, liveChannelWorker);
}
