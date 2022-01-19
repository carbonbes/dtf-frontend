import { connect } from "react-redux";
import {
  getFeedClear,
  getFeedRequest,
} from "../actions/actionCreators/getFeedAC";
import FreshFeed from "../components/FreshFeed";

const mapStateToProps = (state) => ({
  entries: state.feed.entries,
  lastId: state.feed.lastId,
  lastSortingValue: state.feed.lastSortingValue,
});

const mapDispatchToProps = (dispatch) => ({
  getFeed: (data) => dispatch(getFeedRequest(data)),
  clearFeed: () => dispatch(getFeedClear()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FreshFeed);
