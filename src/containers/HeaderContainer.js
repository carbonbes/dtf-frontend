import { connect } from "react-redux";
import { userMeRequest } from "../actions/actionCreators/userMeAC";
import {
  notificationsCountClear,
  notificationsRequest,
} from "../actions/actionCreators/notificationsAC";
import Header from "../components/Header";

const mapStateToProps = (state) => ({
  auth: state.auth,
  isFetchingNotifications: state.notifications.isFetching,
  notifications: state.notifications,
  notificationsCount: state.notifications.countUnread,
  newNotify: state.notifications.newNotify,
});

const mapDispatchToProps = (dispatch) => ({
  getUserMe: () => dispatch(userMeRequest()),
  getNotifications: () => dispatch(notificationsRequest()),
  notificationsCountClear: () => dispatch(notificationsCountClear()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
