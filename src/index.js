import { useState } from "react";
import ReactDOM from "react-dom";
import "./index.sass";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/configure";
import LeftSidebarContext from "./contexts/LeftSidebarContext";
import RightSidebarContext from "./contexts/RightSidebarContext";
import LoginModalContext from "./contexts/LoginModalContext";

const Main = () => {
  const [loginVisible, setLoginVisible] = useState(false);
  const [leftSidebarVisible, setLeftSidebarVisible] = useState();
  const [rightSideBarVisible, setRightSideBarVisible] = useState();

  return (
    <Provider store={store}>
      <LeftSidebarContext.Provider
        value={{ leftSidebarVisible, setLeftSidebarVisible }}
      >
        <RightSidebarContext.Provider
          value={{ rightSideBarVisible, setRightSideBarVisible }}
        >
          <LoginModalContext.Provider value={{ loginVisible, setLoginVisible }}>
            <App />
          </LoginModalContext.Provider>
        </RightSidebarContext.Provider>
      </LeftSidebarContext.Provider>
    </Provider>
  );
};

ReactDOM.render(<Main />, document.getElementById("root"));
