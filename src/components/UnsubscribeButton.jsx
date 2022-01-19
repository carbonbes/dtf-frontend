import { useDispatch, useSelector } from "react-redux";
import { subscribeRequest } from "../actions/actionCreators/subscriptionsAC";

const UnsubscribeButton = () => {
  let dispatch = useDispatch();
  let id = useSelector((state) => state.viewedProfile.profile.id);
  let isFetching = useSelector(
    (state) => state.viewedProfile.subsUnsubsFetching
  );

  return (
    <button
      className="subscribe-button button button_theme-second button_size-middle button_text-bold button_font-size-normal"
      onClick={() =>
        dispatch(subscribeRequest({ action: "unsubscribe", id: id }))
      }
      disabled={isFetching}
    >
      <span className="profile__button-label">Отписаться</span>
    </button>
  );
};

export default UnsubscribeButton;
