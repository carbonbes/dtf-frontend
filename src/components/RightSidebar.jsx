import { useMediaQuery } from "react-responsive";
import { useEffect, useContext } from "react";
import { ChevronUp } from "react-feather";
import { Link } from "react-router-dom";
import RightSidebarContext from "../contexts/RightSidebarContext";
import classNames from "classnames";

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

  useEffect(() => {
    if (rightSideBarVisible && isMobile)
      document.body.style.overflow = "hidden";

    if (!rightSideBarVisible && isMobile) {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [rightSideBarVisible, isMobile]);

  useEffect(() => {
    if (!isMobile) {
      setRightSideBarVisible(true);
    } else {
      setRightSideBarVisible(false);
    }
  }, [isMobile]);

  return (
    <aside
      className={classNames("right-sidebar", {
        "right-sidebar_hidden": isMobile && !rightSideBarVisible,
        "right-sidebar_visibled": rightSideBarVisible,
      })}
    >
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
    </aside>
  );
};

export default RightSidebar;
