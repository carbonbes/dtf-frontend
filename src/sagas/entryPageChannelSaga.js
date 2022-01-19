import { eventChannel } from "redux-saga";
import { call, put, fork, take, takeLatest } from "@redux-saga/core/effects";
import io from "socket.io-client";
import {
  entryPageChannelCommentCreated,
  entryPageChannelCommentEdited,
  entryPageChannelCommentVoted,
  entryPageChannelConnected,
  entryPageChannelDisconnected,
} from "../actions/actionCreators/entryPageChannelAC";
import {
  ENTRYPAGE_CHANNEL_CONNECT,
  ENTRYPAGE_CHANNEL_DISCONNECT,
} from "../actions/actionTypes";

const createWebsocketConnection = () => {
  let socket = io("https://ws-sio.dtf.ru", {
    transports: ["websocket"],
  });

  return socket;
};

const createSocketChannel = (socket, id) => {
  return eventChannel((emit) => {
    const openedConnectionEventHandler = () => {
      emit("websocket_opened");
      socket.emit("subscribe", { channel: `api:comments-${id}` });
    };
    const closedConnectionEventHandler = () => {
      emit("websocket_disconnected");
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

function* entryPageChannelWorker(action) {
  const socket = yield call(createWebsocketConnection);
  const socketChannel = yield call(createSocketChannel, socket, action.payload);

  yield fork(function* () {
    yield take(ENTRYPAGE_CHANNEL_DISCONNECT);
    yield socket.disconnect();
    yield put(entryPageChannelDisconnected());
  });

  while (true) {
    try {
      const data = yield take(socketChannel);
      if (data === "websocket_opened") {
        yield put(entryPageChannelConnected());
      }
      if (data === "websocket_disconnected") {
        yield put(entryPageChannelDisconnected());
      }
      if (data.type === "comment voted") {
        yield put(entryPageChannelCommentVoted(data));
      }
      if (data.type === "comment_created") {
        let idsReadComments = yield JSON.parse(
          localStorage.getItem(`ids-unread-comments_${action.payload}`)
        );
        yield idsReadComments.push(data.comment.id);
        yield localStorage.setItem(
          `ids-unread-comments_${action.payload}`,
          JSON.stringify(idsReadComments)
        );
        yield put(entryPageChannelCommentCreated(data));
      }
      if (data.type === "comment_edited") {
        yield put(entryPageChannelCommentEdited(data));
      }
    } catch (error) {
      yield console.log(error);
    }
  }
}

export default function* entryPageChannelWatcher() {
  yield takeLatest(ENTRYPAGE_CHANNEL_CONNECT, entryPageChannelWorker);
}
