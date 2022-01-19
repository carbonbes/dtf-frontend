import { connect } from "react-redux";
import {
  FeedRead,
  getFeedClear,
  getFeedRequest,
} from "../actions/actionCreators/feedAC";
import { globalFetchRequest } from "../actions/actionCreators/globalFetchAC";
import Feed from "../components/Feed";

const mapStateToProps = (state) => ({
  isFetching: state.feed.isFetching,
  entries: state.feed.entries,
  lastId: state.feed.lastId,
  lastSortingValue: state.feed.lastSortingValue,
  currentPage: state.feed.currentPage,
});

const mapDispatchToProps = (dispatch) => ({
  getFeed: (data) => dispatch(getFeedRequest(data)),
  clearFeed: () => dispatch(getFeedClear()),
  setFetchStatus: () => dispatch(globalFetchRequest()),
  readFeed: () => dispatch(FeedRead()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
