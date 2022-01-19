import { ChevronDown, ChevronUp } from "react-feather";
import { useDispatch } from "react-redux";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { likeDislikeResetRequest } from "../actions/actionCreators/likeFeedEntryAC";

const FeedEntryRating = ({ id, likes, isLiked }) => {
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
      <SwitchTransition>
        <CSSTransition
          key={likes.summ}
          addEndListener={(node, done) => {
            node.addEventListener("transitionend", done, false);
          }}
          classNames="rating__count"
        >
          <span
            className={
              likes.summ > 0
                ? "rating__count rating__count_positive"
                : likes.summ === 0
                ? "rating__count rating__count_neutral"
                : likes.summ < 0
                ? "rating__count rating__count_negative"
                : null
            }
          >
            {likes.summ < 0 && "–"}
            {likes.summ}
          </span>
        </CSSTransition>
      </SwitchTransition>
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

export default FeedEntryRating;
