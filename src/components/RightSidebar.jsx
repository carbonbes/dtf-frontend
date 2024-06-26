import { useMediaQuery } from "react-responsive";
import { useEffect, useContext } from "react";
import { ChevronUp } from "react-feather";
import { Link } from "react-router-dom";
import RightSidebarContext from "../contexts/RightSidebarContext";
import classNames from "classnames";
import useScrollBlocked from "../hooks/useScrollBlocked";

const LiveItem = (props) => {
  const { rightSideBarVisible, setRightSideBarVisible } =
    useContext(RightSidebarContext);

  return (
    <div className="right-sidebar__comment-item">
      <Link
        className="right-sidebar__comment-item-header"
        to={`/u/${props.user.id}`}
        onClick={() => {
          if (props.isMobile) setRightSideBarVisible(!rightSideBarVisible);
        }}
      >
        <div
          className="right-sidebar__comment-item-avatar right-sidebar__comment-item-avatar_rounded"
          style={{
            backgroundImage: `url(${props.user.avatar}-/scale_crop/100x100/-/format/webp/)`,
          }}
        />
        <div className="right-sidebar__comment-item-name">
          {props.user.name}
        </div>
      </Link>
      <Link
        className="right-sidebar__comment-item-content"
        to={`/e/${props.content.id}?comment=${props.comment_id}`}
        onClick={() => {
          if (props.isMobile) setRightSideBarVisible(false);
        }}
      >
        {props.text}
      </Link>
      <Link
        className="right-sidebar__comment-item-footer"
        to={`/e/${props.content.id}`}
        onClick={() => {
          if (props.isMobile) setRightSideBarVisible(!rightSideBarVisible);
        }}
        title={props.content.title}
      >
        {props.content.title}
      </Link>
    </div>
  );
};

const RightSidebar = (props) => {
  const { rightSideBarVisible, setRightSideBarVisible } =
    useContext(RightSidebarContext);

  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ maxWidth: 1260 });

  const { setIsScrollBlocked } = useScrollBlocked({ isMobile });

  useEffect(() => {
    if (rightSideBarVisible && (isMobile || isTablet)) {
      setIsScrollBlocked(true);
    } else if (!rightSideBarVisible) {
      setIsScrollBlocked(false);
    }

    return () => {
      setIsScrollBlocked(false);
    };
  }, [rightSideBarVisible, isMobile, isTablet]);

  useEffect(() => {
    if (!isMobile && !isTablet) {
      setRightSideBarVisible(true);
    } else if (isMobile || isTablet) {
      setRightSideBarVisible(false);
    }
  }, [isMobile, isTablet]);

  return (
    <aside
      className={classNames("right-sidebar", {
        "right-sidebar_hidden": !rightSideBarVisible,
        "right-sidebar_visibled": rightSideBarVisible,
      })}
    >
      <div className="right-sidebar__body">
        <div className="right-sidebar__header">
          <span className="right-sidebar__header-label">Комментарии</span>
          <div className="right-sidebar__header-pulse" />
          <ChevronUp
            className="right-sidebar__close-btn"
            onClick={() => setRightSideBarVisible(!rightSideBarVisible)}
          ></ChevronUp>
        </div>
        <div className="right-sidebar__live-items">
          {props.liveChannel.length > 0 &&
            props.liveChannel
              .slice(0, 20)
              .map((item) => (
                <LiveItem {...item} isMobile={isMobile} key={item.id} />
              ))}
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
