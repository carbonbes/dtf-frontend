import {
  clearProfileData,
  getUserRequest,
} from "../actions/actionCreators/profileAC";
import { connect } from "react-redux";
import ProfilePage from "../pages/ProfilePage";
import { withRouter } from "react-router-dom";
import { globalFetchRequest } from "../actions/actionCreators/globalFetchAC";

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.viewedProfile,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: (id) => dispatch(getUserRequest(id)),
  clearProfileData: () => dispatch(clearProfileData()),
  setFetchStatus: () => dispatch(globalFetchRequest()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
);
