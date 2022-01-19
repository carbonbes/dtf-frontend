import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  entryPageChannelConnect,
  entryPageChannelDisconnect,
} from "../actions/actionCreators/entryPageChannelAC";
import {
  getEntryCommentsClear,
  getEntryCommentsRequest,
} from "../actions/actionCreators/entryCommentsAC";
import EntryPageComments from "../components/EntryPageComments";

const mapStateToProps = (state) => ({
  comments: state.viewedEntryComments.comments,
  entryId: state.viewedEntry.entry.id,
  entryAuthorId: state.viewedEntry.entry.author?.id,
});

const mapDispatchToProps = (dispatch) => ({
  getComments: (data) => dispatch(getEntryCommentsRequest(data)),
  clearComments: () => dispatch(getEntryCommentsClear()),
  connectEntryChannel: (id) => dispatch(entryPageChannelConnect(id)),
  disconnectEntryChannel: () => dispatch(entryPageChannelDisconnect()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EntryPageComments)
);
