import { BrowserRouter } from "react-router-dom";
import HeaderContainer from "./containers/HeaderContainer";
import LeftSidebar from "./components/LeftSidebar";
import Main from "./components/Main";
import RigthSideBarContainer from "./containers/RigthSideBarContainer";
import { useDispatch, useSelector } from "react-redux";
import NProgress from "nprogress";
import { StrictMode, useEffect, useState } from "react";
import {
  apiChannelConnect,
  apiChannelDisconnect,
} from "./actions/actionCreators/apiChannelAC";
import {
  personalChannelConnectingRequest,
  personalChannelDisonnectingRequest,
} from "./actions/actionCreators/personalChannelAC";
import { notificationsCountRequest } from "./actions/actionCreators/notificationsAC";
import {
  liveChannelConnect,
  liveChannelDisconnect,
} from "./actions/actionCreators/liveChannelAC";

function App() {
  const [darkTheme, setDarkTheme] = useState(false);

  const isAuth = useSelector((state) => state.auth.isAuth);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const userHash = useSelector(
    (state) =>
      state.auth.profileData.user_hash || state.auth.profileData.userHash
  );
  const isFetching = useSelector((state) => state.fetchStatus.isFetching);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isFetching) NProgress.start();
    if (!isFetching) NProgress.done();
  }, [isFetching]);

  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme == "dark") {
      setDarkTheme(true);
    } else {
      setDarkTheme(false);
    }
  }, []);

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [darkTheme]);

  useEffect(() => {
    dispatch(apiChannelConnect());
    dispatch(liveChannelConnect());

    return () => {
      dispatch(apiChannelDisconnect());
      dispatch(liveChannelDisconnect());
    };
  }, []);

  useEffect(() => {
    if (isAuth) {
      dispatch(notificationsCountRequest());
      dispatch(personalChannelConnectingRequest(userHash));
    } else if (isAuth === false) {
      dispatch(personalChannelDisonnectingRequest());
    }
  }, [isAuth]);

  useEffect(() => {
    if (isLogin === true || isLogin === false) {
      window.location.reload();
    }
  }, [isLogin]);

  return (
    <StrictMode>
      <BrowserRouter>
        <HeaderContainer darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
        <div className="content">
          <LeftSidebar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
          <Main />
          <RigthSideBarContainer />
        </div>
      </BrowserRouter>
    </StrictMode>
  );
}

export default App;
