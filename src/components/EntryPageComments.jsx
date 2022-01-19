import {
  useEffect,
  useContext,
  useState,
  Fragment,
  useRef,
  forwardRef,
} from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import HighlightCommentContext from "../contexts/HighlightCommentContext";
import QuoteLogo from "../assets/icons/quoteicon.svg";
import {
  ArrowUp,
  ChevronDown,
  ChevronUp,
  Edit3,
  Loader,
  Paperclip,
  Slash,
} from "react-feather";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { getCommentLikesRequest } from "../actions/actionCreators/likesCommentAC";
import reactStringReplace from "react-string-replace";
import MentionRegEx from "./MentionRegEx";
import { commentVoteRequest } from "../actions/actionCreators/entryPageCommentVoteAC";
import { scroller, Link as LinkScrollToReply } from "react-scroll";
import FocusedCommentContext from "../contexts/FocusedCommentContext";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import {
  addCommentClear,
  addCommentRequest,
} from "../actions/actionCreators/addCommentAC";
import TextareaAutosize from "react-textarea-autosize";
import useQueryParameters from "../hooks/useQueryParameters";
import useDate from "../hooks/useDate";
import useWordDeclensions from "../hooks/useWordDeclensions";
import Video from "./Video";
import Image from "./Image";
import { useSelector } from "react-redux";
import useDetectOutsideClick from "../hooks/useDetectOutsideClick";
import LoginModalContext from "../contexts/LoginModalContext";
import ReplyFormContext from "../contexts/ReplyFormContext";

const Quote = (props) => {
  let [string] = props.match.matchAll(/^\>(.*)/g);

  return (
    <>
      <span className="entry-page__comment-text-quote" key={props.i}>
        <QuoteLogo className="entry-page__comment-text-quote-icon" />
        <span>{string[1]}</span>
      </span>
      <br />
    </>
  );
};

const CustomFragment = (props) => {
  let commentText = reactStringReplace(
    props.match,
    /(\[\@\d+\|[^\]]+\])/g,
    (match, i) => <MentionRegEx i={i} match={match} key={match + i} />
  );

  return (
    <Fragment>
      {commentText}
      <br />
    </Fragment>
  );
};

const Paragraph = (props) => {
  let commentText;

  commentText = reactStringReplace(props.match, /(^\>.*)/gm, (match, i) => (
    <Quote i={i} match={match} key={match + i} />
  ));

  commentText = reactStringReplace(commentText, /(.+?\n|.+)/g, (match, i) => (
    <CustomFragment match={match} key={match + i} />
  ));

  return <p key={props.i}>{commentText}</p>;
};

const CommentText = ({ authorId, text }) => {
  let commentText = text
    .split("\n\n")
    .map((line, i) => <Paragraph i={i} match={line} key={i} />);

  return (
    <span
      className={classNames("entry-page__comment-text", {
        "entry-page__comment-text_deleted": authorId < 0,
      })}
    >
      {commentText}
    </span>
  );
};

const MediaContentComment = (props) => {
  return (
    <div className="entry-page__comment-media">
      {props.media.map((image, i) =>
        image.type === "image" &&
        (image.data.type === "jpg" ||
          image.data.type === "png" ||
          image.data.type === "webp") ? (
          <Image
            image={image}
            srcWidth={image.data.width}
            srcHeight={image.data.height}
            maxWidth={400}
            maxHeight={300}
            key={i}
          />
        ) : (image.type === "image" || image.type === "movie") &&
          (image.data.type === "gif" || image.data.type === "mp4") ? (
          <Video
            image={image}
            srcWidth={image.data.width}
            srcHeight={image.data.height}
            maxWidth={400}
            maxHeight={300}
            external_service={image.data.external_service}
            key={i}
          />
        ) : (
          image.type === "video" && (
            <Video
              image={image}
              srcWidth={image.data.width}
              srcHeight={image.data.height}
              maxWidth={400}
              maxHeight={300}
              external_service={image.data.external_service}
              key={i}
            />
          )
        )
      )}
    </div>
  );
};

const CommentLikesPopup = forwardRef((props, ref) => {
  return (
    <div className="entry-page__comment-likes-popup" ref={ref}>
      {props.likes &&
        Object.entries(props.likes).map((item) => (
          <Link
            className="entry-page__comment-likes-popup-item"
            to={`/u/${item[0]}`}
            key={item[0]}
          >
            <div
              className="entry-page__comment-likes-popup-item-avatar"
              style={{
                backgroundImage: `url(${item[1].avatar_url}-/scale_crop/50x50/-/format/webp/)`,
              }}
            />
            <span
              className={classNames(
                "entry-page__comment-likes-popup-item-nickname",
                {
                  "entry-page__comment-likes-popup-item-nickname_positive":
                    item[1].sign === 1,
                  "entry-page__comment-likes-popup-item-nickname_negative":
                    item[1].sign === -1,
                }
              )}
            >
              {item[1].name}
            </span>
          </Link>
        ))}
    </div>
  );
});

const ReplyForm = (props) => {
  const [formIsActive, setFormIsActive] = useState();

  const replyIsSending = useSelector(
    (state) => state.viewedEntryComments.replyIsSending
  );
  const replyIsSended = useSelector(
    (state) => state.viewedEntryComments.replyIsSended
  );

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const dispatch = useDispatch();

  const ref = useRef();
  const formikRef = useRef();

  useDetectOutsideClick(ref, setFormIsActive);

  const initialValues = {
    id: props.entryId,
    text: "",
    reply_to: props.replyTo || 0,
  };

  const validationSchema = Yup.object().shape({
    id: Yup.number().required(),
    text: Yup.string().trim().required(),
    reply_to: Yup.number().optional(),
  });

  useEffect(() => {
    if (replyIsSended === true && props.type === "comment") {
      props.setVisibledIdReplyForm(0);
    } else if (replyIsSending === true) {
      dispatch(addCommentClear());
    }

    return () => dispatch(addCommentClear());
  }, [replyIsSended, replyIsSending]);

  useEffect(() => {
    if (props.type === "comment") {
      setFormIsActive(true);
    }
  }, []);

  useEffect(() => {
    formikRef.current.resetForm();
  }, [replyIsSended]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(data) => {
        dispatch(addCommentRequest(data));
      }}
      innerRef={formikRef}
    >
      {({ isValid, dirty }) => (
        <Form
          className={classNames("entry-page__reply-form", {
            "entry-page__reply-form_active": formIsActive,
          })}
          ref={ref}
        >
          <Field name="text" type="text">
            {({ field }) => (
              <TextareaAutosize
                className={classNames("entry-page__reply-text-field", {
                  "entry-page__reply-text-field_active": formIsActive,
                })}
                autoFocus={props.type === "comment" ? true : false}
                placeholder={
                  props.type === "comment"
                    ? "Написать ответ..."
                    : "Написать комментарий..."
                }
                {...field}
                onClick={() => setFormIsActive(true)}
              />
            )}
          </Field>
          <div className="entry-page__reply-form-action-buttons">
            {props.type === "comment" && !isMobile && (
              <span
                className="entry-page__reply-form-cancel-btn"
                onClick={() => props.setVisibledIdReplyForm(0)}
              >
                Отмена
              </span>
            )}
            {props.type === "comment" && isMobile && (
              <Slash
                className="entry-page__reply-form-cancel-btn"
                onClick={() => props.setVisibledIdReplyForm(0)}
              />
            )}
            <button
              className="entry-page__reply-form-button button button_theme-second button_size-large button_text-bold"
              type="submit"
              disabled={!(isValid && dirty) || replyIsSending}
            >
              {props.type === "comment" ? "Ответить" : "Отправить"}
              {replyIsSending && <Loader />}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const ReplyComment = (props) => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  const { setLoginVisible } = useContext(LoginModalContext);
  const { setVisibledIdReplyForm } = useContext(ReplyFormContext);

  return (
    !props.isRemoved && (
      <div className="entry-page__reply-button">
        <span
          className="entry-page__reply-button-label"
          onClick={() => {
            if (isAuth) {
              setVisibledIdReplyForm(props.id);
            }

            if (!isAuth) {
              setLoginVisible(true);
            }
          }}
        >
          Ответить
        </span>
      </div>
    )
  );
};

const RatingComment = (props) => {
  const [isVisibledLikesPopup, setIsVisibledLikesPopup] = useState(false);
  const [isFocusedOnRating, setIsFocusedOnRating] = useState(false);

  const isAuth = useSelector((state) => state.auth.isAuth);
  const commentsLikesItems = useSelector(
    (state) => state.viewedEntryComments.commentsLikesItems[props.commentId]
  );

  const { setLoginVisible } = useContext(LoginModalContext);

  const dispatch = useDispatch();

  const ratingRef = useRef();
  const popupRef = useRef();

  const LikesPopupEnterHandler = () => {
    setIsFocusedOnRating(true);
    dispatch(getCommentLikesRequest(props.commentId));
  };

  const LikesPopupLeaveHandler = () => {
    setIsFocusedOnRating(false);
    setIsVisibledLikesPopup(false);
  };

  useEffect(() => {
    if (
      isFocusedOnRating &&
      commentsLikesItems &&
      Object.keys(commentsLikesItems).length !== 0
    ) {
      setIsVisibledLikesPopup(true);
    } else setIsVisibledLikesPopup(false);
  }, [commentsLikesItems]);

  return (
    !props.isRemoved && (
      <div className="entry-page__comment-rating-wrapp">
        <div className="entry-page__comment-rating">
          <ChevronDown
            className={classNames("entry-page__comment-voting-dislike-button", {
              "entry-page__comment-voting-dislike-button_pressed":
                props.likes.isLiked === -1,
            })}
            onClick={() => {
              if (isAuth) {
                dispatch(
                  commentVoteRequest({
                    id: props.commentId,
                    type: "comment",
                    sign: props.likes.isLiked === -1 ? 0 : 1 ? -1 : -1,
                  })
                );
              }

              if (!isAuth) {
                setLoginVisible(true);
              }
            }}
          />
          <div
            className={classNames("entry-page__comment-rating-value-wrapp", {
              "entry-page__comment-rating-value-wrapp_positive":
                props.likes.summ > 0,
              "entry-page__comment-rating-value-wrapp_neutral":
                props.likes.summ === 0,
              "entry-page__comment-rating-value-wrapp_negative":
                props.likes.summ < 0,
            })}
            onMouseEnter={LikesPopupEnterHandler}
            onMouseLeave={LikesPopupLeaveHandler}
          >
            <SwitchTransition>
              <CSSTransition
                key={props.likes.summ}
                timeout={100}
                classNames="entry-page__comment-rating-value"
                nodeRef={ratingRef}
              >
                <div
                  className={classNames("entry-page__comment-rating-value", {
                    "entry-page__comment-rating-value_positive":
                      props.likes.summ > 0,
                    "entry-page__comment-rating-value_neutral":
                      props.likes.summ === 0,
                    "entry-page__comment-rating-value_negative":
                      props.likes.summ < 0,
                  })}
                  ref={ratingRef}
                >
                  {props.likes.summ < 0 && "–"}
                  {props.likes.counter}
                </div>
              </CSSTransition>
            </SwitchTransition>
            <CSSTransition
              classNames="entry-page__comment-likes-popup"
              in={isVisibledLikesPopup}
              timeout={100}
              unmountOnExit
              nodeRef={popupRef}
            >
              <CommentLikesPopup likes={commentsLikesItems} ref={popupRef} />
            </CSSTransition>
          </div>
          <ChevronUp
            className={classNames("entry-page__comment-voting-like-button", {
              "entry-page__comment-voting-like-button_pressed":
                props.likes.isLiked === 1,
            })}
            onClick={() => {
              if (isAuth) {
                dispatch(
                  commentVoteRequest({
                    id: props.commentId,
                    type: "comment",
                    sign: props.likes.isLiked === 1 ? 0 : -1 ? 1 : 1,
                  })
                );
              }

              if (!isAuth) {
                setLoginVisible(true);
              }
            }}
          />
        </div>
      </div>
    )
  );
};

const Comment = (props) => {
  const [branchIsCollapsed, setBranchIsCollapsed] = useState(false);
  const [replyFormVisible, setReplyFormVisible] = useState(false);
  const [isUnread, setIsUnread] = useState(false);

  const { idHighlightComment, setIdHighlightComment } = useContext(
    HighlightCommentContext
  );
  const { idFocusedComment, setIdFocusedComment } = useContext(
    FocusedCommentContext
  );
  const { setVisibledIdReplyForm } = useContext(ReplyFormContext);

  const { visibledIdReplyForm } = useContext(ReplyFormContext);

  const isMobile = useMediaQuery({ maxWidth: 768 });

  let dateCreated = useDate(props.date);

  const focusCommentEnterHandler = (id) => {
    props.id == idFocusedComment && setIdFocusedComment(false);
    let idsUnreadComments = JSON.parse(
      localStorage.getItem(`ids-unread-comments_${props.entryId}`)
    );

    let index = idsUnreadComments.indexOf(id);

    if (index > -1) {
      idsUnreadComments.splice(index, 1);
      setIsUnread(false);
    }

    localStorage.setItem(
      `ids-unread-comments_${props.entryId}`,
      JSON.stringify(idsUnreadComments)
    );
  };

  const highlightCommentHandler = (id) => {
    setIdHighlightComment(id);
  };

  useEffect(() => {
    let idsUnreadComments = JSON.parse(
      localStorage.getItem(`ids-unread-comments_${props.entryId}`)
    );

    if (idsUnreadComments && idsUnreadComments.includes(props.id)) {
      setIsUnread(true);
    }
  }, []);

  return (
    <div
      className={classNames("entry-page__comment", {
        "entry-page__comment_mb-over-lvl": props.level > props.branchMaxLvl,
      })}
    >
      <div
        className={classNames("entry-page__comment-parent", {
          "entry-page__comment-parent_highlighted":
            isUnread || props.id == (idHighlightComment || idFocusedComment),
          "entry-page__comment-parent_pinned": props.isPinned,
          "entry-page__comment-parent_with-donate": props.donate,
        })}
        id={props.id}
        onMouseEnter={() => focusCommentEnterHandler(props.id)}
        data-id={props.id}
      >
        <div className="entry-page__comment-self">
          {!props.isRemoved && (
            <div className="entry-page__comment-header">
              <Link
                className={classNames("entry-page__comment-author-avatar", {
                  "entry-page__comment-author-avatar_online":
                    props.author.isOnline,
                })}
                style={{
                  backgroundImage:
                    props.author && props.author.avatar_url
                      ? `url(${props.author.avatar_url}-/scale_crop/70x70/-/format/webp/)`
                      : `url(https://leonardo.osnova.io/${props.author.avatar.data.uuid}/-/scale_crop/70x70/-/format/webp/)`,
                }}
                to={`/u/${props.author.id}`}
              />
              <div className="entry-page__comment-header-data">
                <div className="entry-page__comment-author-name-wrapp">
                  <Link
                    className={classNames("entry-page__comment-author-name", {
                      "entry-page__comment-author-name_self-author":
                        props.entryAuthorId === props.author.id,
                    })}
                    to={`/u/${props.author.id}`}
                  >
                    {props.author.name}
                  </Link>
                  {props.isPinned && (
                    <div
                      className="entry-page__comment-pinned-icon-wrapp"
                      title="Комментарий закреплен"
                    >
                      <Paperclip className="entry-page__comment-pinned-icon" />
                    </div>
                  )}
                  {props.level > 0 && (
                    <LinkScrollToReply
                      className="entry-page__reply-to"
                      to={props.replyTo.toString()}
                      duration={500}
                      smooth={true}
                      offset={isMobile ? -125 : -150}
                      onClick={() => setIdFocusedComment(props.replyTo)}
                    >
                      <ArrowUp
                        className="entry-page__reply-to-icon"
                        onMouseEnter={() =>
                          highlightCommentHandler(props.replyTo)
                        }
                        onMouseLeave={() => highlightCommentHandler(false)}
                      />
                    </LinkScrollToReply>
                  )}
                </div>
                <div className="entry-page__comment-header-additional">
                  <time
                    className="entry-page__comment-date-publish"
                    title={
                      "Отправлен " +
                      new Date(props.date * 1000).toLocaleString()
                    }
                  >
                    {dateCreated}
                  </time>
                  {props.isEdited && (
                    <div
                      className="entry-page__is-edited"
                      title={
                        "Редактирован " +
                        new Date(
                          props.lastModificationDate * 1000
                        ).toLocaleString()
                      }
                    >
                      <Edit3 />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="entry-page__comment-content">
            {props.text && (
              <CommentText
                isEdited={props.isEdited}
                authorId={props.author.id}
                text={props.text}
              />
            )}

            {props.donate && (
              <div className="entry-page__comment-donate">
                <div className="entry-page__comment-donate-mark">
                  {props.donate.count}₽
                </div>
              </div>
            )}

            {props.media && props.media.length > 0 && (
              <MediaContentComment media={props.media} />
            )}
          </div>
          <ReplyComment
            id={props.id}
            isRemoved={props.isRemoved}
            replyFormVisible={replyFormVisible}
            setReplyFormVisible={setReplyFormVisible}
          />
          <RatingComment
            isRemoved={props.isRemoved}
            likes={props.likes}
            commentId={props.id}
            commentAuthorId={props.author.id}
            currentUserId={props.currentUserId}
          />
        </div>
      </div>
      {visibledIdReplyForm === props.id && (
        <ReplyForm
          entryId={props.entryId}
          type="comment"
          replyTo={props.id}
          setReplyFormVisible={setReplyFormVisible}
          setVisibledIdReplyForm={setVisibledIdReplyForm}
        />
      )}
      {props.replies && props.replies.length > 0 && (
        <div className="entry-page__comment-childrens">
          <div
            className={classNames({
              "entry-page__collapse-button":
                !branchIsCollapsed && props.level < props.branchMaxLvl,
              "entry-page__collapse-button_hidden":
                (!branchIsCollapsed && props.level > props.branchMaxLvl) ||
                (branchIsCollapsed && props.level > props.branchMaxLvl) ||
                (branchIsCollapsed && props.level < props.branchMaxLvl),
            })}
            title="Свернуть эту вертку"
            onClick={() => setBranchIsCollapsed(!branchIsCollapsed)}
          />
          <span
            className={classNames("entry-page__expand-button", {
              "entry-page__expand-button_hidden": !branchIsCollapsed,
            })}
            onClick={() => setBranchIsCollapsed(!branchIsCollapsed)}
          >
            Развернуть ветку
          </span>
          <div
            className={classNames({
              "entry-page__comment-child":
                props.level > props.branchMaxLvl && !branchIsCollapsed,
              "entry-page__comment-child entry-page__comment-child_indent":
                props.level < props.branchMaxLvl && !branchIsCollapsed,
              "entry-page__comment-child entry-page__comment-child_collapsed":
                props.level < props.branchMaxLvl && branchIsCollapsed,
            })}
          >
            {props.replies !== [] &&
              props.replies.map((reply) => {
                return (
                  <Comment
                    {...reply}
                    branchMaxLvl={props.branchMaxLvl}
                    entryId={props.entryId}
                    entryAuthorId={props.entryAuthorId}
                    key={reply.id}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

const Comments = (props) => {
  const [idHighlightComment, setIdHighlightComment] = useState();
  const [idFocusedComment, setIdFocusedComment] = useState();
  const [visibledIdReplyForm, setVisibledIdReplyForm] = useState();
  const [branchMaxLvl, setBranchMaxLvl] = useState();

  let query = useQueryParameters();

  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    if (isMobile) setBranchMaxLvl(4);
    else setBranchMaxLvl(8);
  }, [isMobile]);

  useEffect(() => {
    let id = query.get("comment");

    let timeout = setTimeout(() => {
      scroller.scrollTo(id, {
        offset: isMobile ? -125 : -150,
        isDynamic: true,
      });

      setIdFocusedComment(id);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [query]);

  return (
    <HighlightCommentContext.Provider
      value={{ idHighlightComment, setIdHighlightComment }}
    >
      <FocusedCommentContext.Provider
        value={{ idFocusedComment, setIdFocusedComment }}
      >
        <ReplyFormContext.Provider
          value={{ visibledIdReplyForm, setVisibledIdReplyForm }}
        >
          {props.entryComments.map((comment) => {
            return (
              <Comment
                {...comment}
                branchMaxLvl={branchMaxLvl}
                entryId={props.entryId}
                entryAuthorId={props.entryAuthorId}
                key={comment.id}
              />
            );
          })}
        </ReplyFormContext.Provider>
      </FocusedCommentContext.Provider>
    </HighlightCommentContext.Provider>
  );
};

const EntryPageComments = (props) => {
  const [entryComments, setEntryComments] = useState([]);

  const isAuth = useSelector((state) => state.auth.isAuth);

  let commentWords = ["комментарий", "комментария", "комментариев"];
  let commentWordDecl = useWordDeclensions(props.comments.length, commentWords);

  const flatCommentsToTree = (comments) => {
    var map = {},
      node,
      roots = [],
      i;

    for (i = 0; i < comments.length; i += 1) {
      map[comments[i].id] = i;
      comments[i].replies = [];
    }

    for (i = 0; i < comments.length; i += 1) {
      node = comments[i];
      if (node.replyTo !== 0) {
        if (comments[map[node.replyTo]]) {
          comments[map[node.replyTo]].replies.push(node);
        } else return;
      } else {
        roots.push(node);
      }
    }
    return roots;
  };

  useEffect(() => {
    props.getComments({ subsiteId: false, contentId: props.match.params.id });
    props.connectEntryChannel(props.match.params.id);

    return () => {
      props.clearComments();
      props.disconnectEntryChannel();
    };
  }, [props.match.params.id]);

  useEffect(() => {
    setEntryComments(flatCommentsToTree(props.comments));
  }, [props.comments]);

  useEffect(() => {
    let idsUnreadComments = JSON.parse(
      localStorage.getItem(`ids-unread-comments_${props.entryId}`)
    );

    if (!idsUnreadComments) {
      localStorage.setItem(
        `ids-unread-comments_${props.entryId}`,
        JSON.stringify([])
      );
    }
  }, []);

  return (
    <div className="entry-page__comments" id="comments">
      <div className="entry-page__comments-header">
        <span className="entry-page__comments-header-label">
          {props.comments.length + " " + commentWordDecl}
        </span>
      </div>
      {isAuth && (
        <div className="entry-page__reply-form-header">
          <ReplyForm entryId={props.entryId} />
        </div>
      )}
      {entryComments && entryComments.length > 0 && (
        <Comments
          entryComments={entryComments}
          entryId={props.entryId}
          entryAuthorId={props.entryAuthorId}
        />
      )}
      {isAuth && props.comments.length > 10 && (
        <div className="entry-page__reply-form-footer">
          <ReplyForm entryId={props.entryId} />
        </div>
      )}
    </div>
  );
};

export default EntryPageComments;
