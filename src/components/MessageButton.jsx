import { useSelector } from "react-redux";
import { Mail } from "react-feather";
import Skeleton from "./Skeleton";
import { useMediaQuery } from "react-responsive";

const MessageButton = () => {
  let isAuth = useSelector((state) => state.auth.isAuth);
  let isFetching = useSelector((state) => state.viewedProfile.isFetching);
  let isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <>
      {isFetching && isMobile && (
        <Skeleton width={"50px"} height={"40px"} margin={"0 15px 0 0"} />
      )}

      {isFetching && !isMobile && (
        <Skeleton width={"175px"} height={"40px"} margin={"0 15px 0 0"} />
      )}

      {!isFetching && (
        <button
          className="button button_theme-default button_size-middle button_text-bold button_font-size-normal"
          disabled={!isAuth}
        >
          <Mail className="profile__button-icon" />
          <span className="profile__button-label">Написать</span>
        </button>
      )}
    </>
  );
};

export default MessageButton;
