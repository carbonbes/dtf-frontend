import { useState, useRef } from "react";
import { ChevronDown } from "react-feather";
import {
  useRouteMatch,
  useLocation,
  Switch,
  Route,
  NavLink,
  Redirect,
  Link,
} from "react-router-dom";
import FeedContainer from "../containers/FeedContainer";
import { CSSTransition } from "react-transition-group";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useDetectOutsideClick from "../hooks/useDetectOutsideClick";

const FeedPage = () => {
  let { url } = useRouteMatch();

  let location = useLocation();

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const ref = useRef();
  const dropdownRef = useRef();

  useDetectOutsideClick(ref, setDropdownVisible);

  const [currentSort, setCurrentSort] = useState(
    localStorage.getItem("default_sort_feed") || "hotness"
  );

  useDocumentTitle("Главная | WTF");

  const sortings = {
    Популярное: "popular",
    "За день": "popular/day",
    "За неделю": "popular/week",
    "За месяц": "popular/month",
    "За год": "popular/year",
    "За всё время": "popular/all",
  };

  return (
    <div className="feed-page">
      <div className="feed__sorting-buttons-container">
        <div className="feed__sorting-buttons">
          <div className="feed__sorting-button">
            <div className="feed__sorting-button-popular-wrapp" ref={ref}>
              <NavLink
                className="feed__sorting-button-popular"
                activeClassName="feed__sorting-button_active"
                to={
                  location.pathname !== "/feed/new"
                    ? location.pathname
                    : "/feed/popular"
                }
                isActive={(match, location) => {
                  return (
                    match ||
                    location.pathname === "/feed/popular" ||
                    location.pathname === "/feed/popular/day" ||
                    location.pathname === "/feed/popular/week" ||
                    location.pathname === "/feed/popular/month" ||
                    location.pathname === "/feed/popular/year" ||
                    location.pathname === "/feed/popular/all"
                  );
                }}
                onClick={() => {
                  if (location.pathname === "/feed/new") {
                    setCurrentSort("hotness");
                    localStorage.setItem("default_sort_feed", "hotness");
                  }
                  if (location.pathname !== "/feed/new")
                    setDropdownVisible(!dropdownVisible);
                }}
              >
                {location.pathname === "/feed/popular" && "Популярное"}
                {location.pathname === "/feed/new" && "Популярное"}
                {location.pathname === "/feed/popular/day" && "За день"}
                {location.pathname === "/feed/popular/week" && "За неделю"}
                {location.pathname === "/feed/popular/month" && "За месяц"}
                {location.pathname === "/feed/popular/year" && "За год"}
                {location.pathname === "/feed/popular/all" && "За все время"}

                {location.pathname !== "/feed/new" && <ChevronDown />}
              </NavLink>
              <CSSTransition
                classNames="feed__dropdown"
                in={dropdownVisible}
                timeout={100}
                unmountOnExit
                nodeRef={dropdownRef}
              >
                <div className="feed__dropdown" key={1} ref={dropdownRef}>
                  {Object.entries(sortings).map((sort, index) => {
                    return (
                      location.pathname !== `/feed/${sort[1]}` && (
                        <Link
                          to={`${url}/${sort[1]}`}
                          onClick={() => {
                            if (location.pathname === "/feed/popular") {
                              setCurrentSort("hotness");
                            }

                            setDropdownVisible(false);
                          }}
                          key={index}
                        >
                          {sort[0]}
                        </Link>
                      )
                    );
                  })}
                </div>
              </CSSTransition>
            </div>
          </div>
          <NavLink
            className="feed__sorting-button"
            activeClassName="feed__sorting-button_active"
            to={`${url}/new`}
            onClick={() => {
              setCurrentSort("date");
              localStorage.setItem("default_sort_feed", "date");
            }}
          >
            Свежее
          </NavLink>
        </div>
      </div>
      <Switch>
        <Route exact path="/feed">
          {currentSort === "date" && <Redirect to={`${url}/new`} />}
          {currentSort === "hotness" && <Redirect to={`${url}/popular`} />}
        </Route>
        <Route path={`${url}/new`}>
          <FeedContainer sorting="date" />
        </Route>
        <Route exact path={`${url}/popular/:sorting?`}>
          <FeedContainer sorting="hotness" />
        </Route>
      </Switch>
    </div>
  );
};

export default FeedPage;
