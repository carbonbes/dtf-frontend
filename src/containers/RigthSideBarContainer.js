import { connect } from "react-redux";
import RightSidebar from "../components/RightSidebar";

const mapStateToProps = (state) => ({
  liveChannel: state.liveChannel.liveItems,
});

export default connect(mapStateToProps, null)(RightSidebar);
