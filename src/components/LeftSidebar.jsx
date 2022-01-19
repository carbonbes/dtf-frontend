import { useEffect, useRef, useContext } from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { Menu, AlignLeft, Zap, Clock, Moon, Sun } from "react-feather";
import useDetectOutsideClick from "../hooks/useDetectOutsideClick";
import LeftSidebarContext from "../contexts/LeftSidebarContext";
import { useMediaQuery } from "react-responsive";
import RightSidebarContext from "../contexts/RightSidebarContext";
import { useSelector } from "react-redux";

const LeftSidebar = (props) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const { leftSidebarVisible, setLeftSidebarVisible } =
    useContext(LeftSidebarContext);
  const { rightSideBarVisible, setRightSideBarVisible } =
    useContext(RightSidebarContext);

  const newEntryCount = useSelector((state) => state.feed.newEntries);

  const leftSidebarRef = useRef();

  useDetectOutsideClick(leftSidebarRef, setLeftSidebarVisible);

  const { darkTheme, setDarkTheme } = props;

  return (
    <nav
      className={
        isMobile && !leftSidebarVisible
          ? "left-sidebar left-sidebar_hidden"
          : "left-sidebar left-sidebar_visibled"
      }
    >
      <div className="left-sidebar__body" ref={leftSidebarRef}>
        <div className="left-sidebar__header">
          <Menu
            className="left-sidebar__toggle"
            onClick={() => {
              setLeftSidebarVisible(!leftSidebarVisible);
              if (rightSideBarVisible) setRightSideBarVisible(false);
            }}
          />
          <span className="left-sidebar__header-logo">WTF</span>
          <div className="left-sidebar__theme-toggle-wrapp">
            <Moon
              className={classNames(
                "theme-toggle-moon left-sidebar__theme-toggle",
                {
                  "theme-toggle-moon_active": !darkTheme,
                  "theme-toggle-moon_deactive": darkTheme,
                }
              )}
              onClick={() => setDarkTheme(!darkTheme)}
            />
            <Sun
              className={classNames(
                "theme-toggle-sun left-sidebar__theme-toggle",
                {
                  "theme-toggle-sun_active": darkTheme,
                  "theme-toggle-sun_deactive": !darkTheme,
                }
              )}
              onClick={() => setDarkTheme(!darkTheme)}
            />
          </div>
        </div>
        <div className="left-sidebar__main">
          <NavLink
            className="left-sidebar__link"
            exact
            to="/feed/popular"
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
            activeClassName="left-sidebar__link_active"
            onClick={() => {
              setLeftSidebarVisible(!leftSidebarVisible);
              if (rightSideBarVisible) setRightSideBarVisible(false);
            }}
          >
            <Zap className="left-sidebar__link-logo" />
            Популярное
          </NavLink>
          <NavLink
            className="left-sidebar__link"
            exact
            to="/feed/new"
            isActive={(match, location) => {
              return match || location.pathname === "/feed/new";
            }}
            activeClassName="left-sidebar__link_active"
            onClick={() => {
              setLeftSidebarVisible(!leftSidebarVisible);
              if (rightSideBarVisible) setRightSideBarVisible(false);
            }}
          >
            <Clock className="left-sidebar__link-logo" />
            Свежее
            {newEntryCount > 0 && (
              <span className="left-sidebar__link-badge">
                {newEntryCount < 100 ? newEntryCount : "99+"}
              </span>
            )}
          </NavLink>
          <div
            className="left-sidebar__link left-sidebar__livebar-view-toggle"
            onClick={() => {
              setLeftSidebarVisible(!leftSidebarVisible);
              setRightSideBarVisible(!rightSideBarVisible);
            }}
          >
            <AlignLeft className="left-sidebar__link-logo" />
            Комментарии
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LeftSidebar;
