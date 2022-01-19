import { useContext, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ChevronDown as ChevronDownButtonIcon,
  User,
  LogIn,
  LogOut,
} from "react-feather";
import LoginModal from "./LoginModal";
import LoginModalContext from "../contexts/LoginModalContext";
import { useMediaQuery } from "react-responsive";
import Skeleton from "./Skeleton";
import { Link } from "react-router-dom";
import { logoutRequest } from "../actions/actionCreators/authAC";
import useDetectOutsideClick from "../hooks/useDetectOutsideClick";

const ProfileItem = (props) => {
  const { setLoginVisible } = useContext(LoginModalContext);

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [showDropdown, setShowDropdown] = useState(false);

  const dispatch = useDispatch();

  const dropdownRef = useRef();

  useDetectOutsideClick(dropdownRef, setShowDropdown);

  const currentAuthUserId = useSelector((state) => state.auth.profileData.id);

  const Dropdown = () => {
    return (
      showDropdown && (
        <div
          className="header__dropdown header_theme-white dropdown"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <Link
            className="header__dropdown-item dropdown__item"
            to={`/u/${currentAuthUserId}`}
          >
            <User className="dropdown__item-icon" />
            Профиль
          </Link>
          <div
            className="header__dropdown-item dropdown__item"
            onClick={() => dispatch(logoutRequest())}
          >
            <LogOut className="dropdown__item-icon" />
            Выйти
          </div>
        </div>
      )
    );
  };

  return (
    <>
      {props.auth.isAuth ? (
        <>
          {isMobile && (
            <div ref={dropdownRef}>
              <div
                className="avatar avatar__image avatar_rounded"
                style={{
                  backgroundImage: `url(https://leonardo.osnova.io/${props.auth.profileData.avatar.data.uuid}/-/scale_crop/108x108/-/format/webp/`,
                }}
                onClick={() => setShowDropdown(!showDropdown)}
              />
              <Dropdown />
            </div>
          )}

          {!isMobile && (
            <>
              <Link to={`/u/${currentAuthUserId}`}>
                <div
                  className="avatar avatar__image avatar_rounded"
                  style={{
                    backgroundImage: `url(https://leonardo.osnova.io/${props.auth.profileData.avatar.data.uuid}/-/scale_crop/108x108/-/format/webp/`,
                  }}
                />
              </Link>
              <div ref={dropdownRef}>
                <ChevronDownButtonIcon
                  className="header__dropdown-icon"
                  onClick={() => setShowDropdown(!showDropdown)}
                />
                <Dropdown />
              </div>
            </>
          )}
        </>
      ) : props.auth.isFetching ? (
        <Skeleton width={"35px"} height={"35px"} borderRadius={"8px"} />
      ) : (
        <LogIn
          className="header__login-btn"
          onClick={() => setLoginVisible(true)}
        />
      )}
      <LoginModal auth={props.auth.isAuth} />
    </>
  );
};

export default ProfileItem;
