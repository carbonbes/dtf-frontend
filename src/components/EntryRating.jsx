import { useRef } from "react";
import { useContext } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { voteEntryRequest } from "../actions/actionCreators/entryPageVote";
import { likeFeedEntryRequest } from "../actions/actionCreators/likeFeedEntryAC";
import { likeProfileEntryRequest } from "../actions/actionCreators/likeProfileEntryAC";
import LoginModalContext from "../contexts/LoginModalContext";

const EntryRating = (props) => {
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.auth.isAuth);

  const { setLoginVisible } = useContext(LoginModalContext);

  const ref = useRef();

  return (
    <div className="entry__footer-rating">
      <ChevronDown
        className={
          props.isLiked === -1
            ? "rating__dislike-icon rating__dislike-icon_pressed"
            : "rating__dislike-icon"
        }
        onClick={() => {
          if (isAuth) {
            dispatch(
              props.entryType === "profile"
                ? likeProfileEntryRequest({
                    id: props.id,
                    type: "content",
                    sign: props.isLiked === -1 ? 0 : 1 ? -1 : -1,
                  })
                : props.entryType === "feed"
                ? likeFeedEntryRequest({
                    id: props.id,
                    type: "content",
                    sign: props.isLiked === -1 ? 0 : 1 ? -1 : -1,
                  })
                : voteEntryRequest({
                    id: props.id,
                    type: "content",
                    sign: props.isLiked === -1 ? 0 : 1 ? -1 : -1,
                  })
            );
          }

          if (!isAuth) {
            setLoginVisible(true);
          }
        }}
      />
      <SwitchTransition>
        <CSSTransition
          key={props.likes.summ}
          classNames="rating__count"
          nodeRef={ref}
          timeout={100}
        >
          <span
            className={
              props.likes.summ > 0
                ? "rating__count rating__count_positive"
                : props.likes.summ === 0
                ? "rating__count rating__count_neutral"
                : props.likes.summ < 0
                ? "rating__count rating__count_negative"
                : null
            }
            ref={ref}
          >
            {props.likes.summ < 0 && "–"}
            {props.likes.counter}
          </span>
        </CSSTransition>
      </SwitchTransition>
      <ChevronUp
        className={
          props.isLiked === 1
            ? "rating__like-icon rating__like-icon_pressed"
            : "rating__like-icon"
        }
        onClick={() => {
          if (isAuth) {
            dispatch(
              props.entryType === "profile"
                ? likeProfileEntryRequest({
                    id: props.id,
                    type: "content",
                    sign: props.isLiked === 1 ? 0 : -1 ? 1 : 1,
                  })
                : props.entryType === "feed"
                ? likeFeedEntryRequest({
                    id: props.id,
                    type: "content",
                    sign: props.isLiked === 1 ? 0 : -1 ? 1 : 1,
                  })
                : voteEntryRequest({
                    id: props.id,
                    type: "content",
                    sign: props.isLiked === 1 ? 0 : -1 ? 1 : 1,
                  })
            );
          }

          if (!isAuth) {
            setLoginVisible(true);
          }
        }}
      />
    </div>
  );
};

export default EntryRating;
