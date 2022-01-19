import { ChevronDown, ChevronUp } from "react-feather";
import { useDispatch } from "react-redux";
import { likeDislikeResetRequest } from "../actions/actionCreators/likeProfileEntryAC";

const ProfileEntryRating = ({ id, likes, isLiked }) => {
  const dispatch = useDispatch();

  return (
    <div className="footer__rating">
      <ChevronDown
        className={
          isLiked === -1
            ? "rating__dislike-icon rating__dislike-icon_pressed"
            : "rating__dislike-icon"
        }
        onClick={() =>
          dispatch(
            likeDislikeResetRequest(
              isLiked
                ? { id, type: "content", sign: 0 }
                : { id, type: "content", sign: -1 }
            )
          )
        }
      />
      {likes.summ > 0 && (
        <span className="rating__count rating__count_positive">
          {likes.summ}
        </span>
      )}
      {likes.summ === 0 && (
        <span className="rating__count rating__count_neutral">—</span>
      )}
      {likes.summ < 0 && (
        <span className="rating__count rating__count_negative">
          —{likes.counter}
        </span>
      )}
      <ChevronUp
        className={
          isLiked === 1
            ? "rating__like-icon rating__like-icon_pressed"
            : "rating__like-icon"
        }
        onClick={() =>
          dispatch(
            likeDislikeResetRequest(
              isLiked
                ? { id, type: "content", sign: 0 }
                : { id, type: "content", sign: 1 }
            )
          )
        }
      />
    </div>
  );
};

export default ProfileEntryRating;
