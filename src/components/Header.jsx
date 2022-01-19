import { useContext, useEffect, useRef, useState } from "react";
import {
  Menu,
  Moon,
  Sun,
  Bell,
  ChevronUp,
  ChevronDown,
  CornerUpLeft,
  Loader,
  LogIn,
} from "react-feather";
import LeftSidebarContext from "../contexts/LeftSidebarContext";
import ProfileItem from "./ProfileItem";
import classNames from "classnames";
import useDetectOutsideClick from "../hooks/useDetectOutsideClick";
import { Link } from "react-router-dom";
import useSound from "use-sound";
import notifySound from "../assets/sounds/notify.mp3";
import useDate from "../hooks/useDate";
import { useSelector } from "react-redux";

const NotifyItem = (props) => {
  let dateCreated = useDate(props.notify.date);

  return (
    <div
      className="header__notify-item"
      key={props.notify.id}
      onClick={() => props.setNotifyPopupShow(false)}
    >
      <div className="header__notify-item-img">
        <img src={props.notify.users[0].avatar_url} alt="" />
        {props.notify.type === 2 && props.notify.icon === "like_up" && (
          <ChevronUp className="header__notify-item-img-icon header__notify-item-img-icon_positive" />
        )}

        {props.notify.type === 2 && props.notify.icon === "like_down" && (
          <ChevronDown className="header__notify-item-img-icon header__notify-item-img-icon_negative" />
        )}

        {props.notify.type === 4 && props.notify.icon === "reply" && (
          <CornerUpLeft className="header__notify-item-img-icon header__notify-item-img-icon_reply" />
        )}
      </div>
      <span className="header__notify-item-content">
        {props.notify.text}
        <div className="header__notify-date-created">{dateCreated}</div>
      </span>
      <Link
        className="header__notify-item-link"
        to={`/e/${
          props.notify.url.match(/https:\/\/dtf\.ru.*\/(\d+)/)[1]
        }${props.notify.url.match(/\?comment=\d+/g)}`}
      />
    </div>
  );
};

const NotifyPopup = (props) => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    if (isAuth) {
      props.getNotifications();
    }
    
    props.notificationsCountClear();
  }, []);

  return (
    <div className="header__notify-body">
      <div className="header__notify-header">
        <span>Уведомления</span>
      </div>
      <div className="header__notify-content">
        {isAuth &&
          props.notifications.length !== 0 &&
          props.notifications.map((notify) => (
            <NotifyItem
              notify={notify}
              setNotifyPopupShow={props.setNotifyPopupShow}
              key={notify.id}
            />
          ))}

        {isAuth &&
          !props.isFetchingNotifications &&
          props.notifications.length === 0 && (
            <div className="header__notify-empty">
              <span className="header__notify-empty-icon">😞</span>
              <span className="header__notify-empty-title">
                Уведомлений пока нет
              </span>
              <span className="header__notify-empty-description">
                Пишите хорошие статьи, комментируйте, и здесь станет не так
                пусто
              </span>
            </div>
          )}

        {props.isFetchingNotifications && props.notifications.length === 0 && (
          <div className="header__notify-loader">
            <Loader />
          </div>
        )}

        {!isAuth && (
          <div className="header__notify-empty">
            <span className="header__notify-empty-icon">
              <LogIn />
            </span>
            <span className="header__notify-empty-title">
              Авторизуйтесь, чтобы просмотреть свои уведомления
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const Header = (props) => {
  const [notifyPopupShow, setNotifyPopupShow] = useState(false);

  const [playNotifySound] = useSound(notifySound, { volume: 0.015 });

  const { leftSidebarVisible, setLeftSidebarVisible } =
    useContext(LeftSidebarContext);

  const { darkTheme, setDarkTheme } = props;

  const notifyPopupRef = useRef();

  useDetectOutsideClick(notifyPopupRef, setNotifyPopupShow);

  const notifyPopupHandler = () => {
    setNotifyPopupShow(!notifyPopupShow);
  };

  useEffect(() => {
    props.getUserMe();
  }, []);

  useEffect(() => {
    playNotifySound();
  }, [props.newNotify]);

  return (
    <>
      <header className="header header_theme-light-blue">
        <Menu
          className="header__sidebar-toggle"
          onClick={() => setLeftSidebarVisible(!leftSidebarVisible)}
        />
        <span className="header__logo">WTF</span>
        <div className="header__profile-item">
          <div className="header__theme-toggle-wrapp">
            <Moon
              className={classNames("theme-toggle-moon", {
                "theme-toggle-moon_active": !darkTheme,
                "theme-toggle-moon_deactive": darkTheme,
              })}
              onClick={() => setDarkTheme(!darkTheme)}
            />
            <Sun
              className={classNames("theme-toggle-sun", {
                "theme-toggle-sun_active": darkTheme,
                "theme-toggle-sun_deactive": !darkTheme,
              })}
              onClick={() => setDarkTheme(!darkTheme)}
            />
          </div>
          <div className="header__notify-popup-btn" ref={notifyPopupRef}>
            <div
              className={classNames("header__bell-btn", {
                "header__bell-btn_pressed": notifyPopupShow,
              })}
              onClick={notifyPopupHandler}
            >
              <Bell />
              {props.notificationsCount > 0 && (
                <div className="header__notifications-count">
                  {props.notificationsCount < 100
                    ? props.notificationsCount
                    : "99+"}
                </div>
              )}
            </div>
            {notifyPopupShow && (
              <NotifyPopup
                isFetchingNotifications={props.isFetchingNotifications}
                notifications={props.notifications.notifications}
                getNotifications={props.getNotifications}
                notifyPopupShow={notifyPopupShow}
                setNotifyPopupShow={setNotifyPopupShow}
                notificationsCountClear={props.notificationsCountClear}
              />
            )}
          </div>
          <ProfileItem auth={props.auth} />
        </div>
      </header>
    </>
  );
};

export default Header;
