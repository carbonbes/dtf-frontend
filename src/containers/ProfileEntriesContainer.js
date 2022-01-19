import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getUserEntriesClear,
  getUserEntriesRequest,
} from "../actions/actionCreators/userEntriesAC";
import Entries from "../components/Entries";

const mapStateToProps = (state) => ({
  isFetching: state.viewedProfileEntries.isFetching,
  entries: state.viewedProfileEntries.entries,
  profileCounters: state.viewedProfile.profileCounters,
  lastId: state.viewedProfileEntries.lastId,
  lastSortingValue: state.viewedProfileEntries.lastSortingValue,
});

const mapDispatchToProps = (dispatch) => ({
  getEntries: (data) => dispatch(getUserEntriesRequest(data)),
  clearEntries: () => dispatch(getUserEntriesClear()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Entries)
);
