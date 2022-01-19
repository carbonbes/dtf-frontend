import { UserPlus } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { subscribeRequest } from "../actions/actionCreators/subscriptionsAC";
import Skeleton from "../components/Skeleton";

const SubscribeButton = () => {
  let dispatch = useDispatch();
  let isAuth = useSelector((state) => state.auth.isAuth);
  let isFetching = useSelector((state) => state.viewedProfile.isFetching);
  let isFetchingButton = useSelector(
    (state) => state.viewedProfile.subsUnsubsFetching
  );
  let id = useSelector((state) => state.viewedProfile.profile.id);

  let isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <>
      {isFetching && !isMobile && <Skeleton width={"175px"} height={"40px"} />}

      {isFetching && isMobile && <Skeleton width={"130px"} height={"40px"} />}

      {!isFetching && (
        <button
          className="subscribe-button button button_theme-second button_size-middle button_text-bold button_font-size-normal"
          onClick={() =>
            dispatch(subscribeRequest({ action: "subscribe", id: id }))
          }
          disabled={isFetchingButton || !isAuth}
        >
          <UserPlus className="profile__button-icon" />
          <span className="profile__button-label">Подписаться</span>
        </button>
      )}
    </>
  );
};

export default SubscribeButton;
