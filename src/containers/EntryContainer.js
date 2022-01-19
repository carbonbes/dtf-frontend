import { connect } from "react-redux";
import EntryPage from "../pages/EntryPage";
import {
  getEntryRequest,
  getEntryClear,
} from "../actions/actionCreators/entryAC";
import { withRouter } from "react-router-dom";
import { globalFetchRequest } from "../actions/actionCreators/globalFetchAC";

const mapStateToProps = (state) => ({
  entry: state.viewedEntry.entry,
  error: state.viewedEntry.error,
});

const mapDispatchToProps = (dispatch) => ({
  getEntry: (id) => dispatch(getEntryRequest(id)),
  clearEntry: () => dispatch(getEntryClear()),
  setFetchStatus: () => dispatch(globalFetchRequest()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EntryPage)
);
