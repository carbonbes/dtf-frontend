import { useEffect } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import SubsiteData from "../components/SubsiteData";
import EntryDatePublish from "../components/EntryDatePublish";
import EntryTitle from "../components/EntryTitle";
import EntryCommentsContainer from "../containers/EntryCommentsContainer";
import reactStringReplace from "react-string-replace";
import LinkRegEx from "../components/LinkRegEx";
import BoldTextRegEx from "../components/BoldTextRegEx";
import ItalicTextRegEx from "../components/ItalicTextRegEx";
import MarkedTextRegEx from "../components/MarkedTextRegEx";
import QuoteIcon from "../assets/icons/quoteicon.svg";
import HashtagRegEx from "../components/HashtagRegEx";
import EntryRating from "../components/EntryRating";
import Image from "../components/Image";
import classNames from "classnames";
import { Bookmark, MessageCircle } from "react-feather";
import { Link as LinkScrollToComments } from "react-scroll";
import Video from "../components/Video";
import Error from "../components/Error";

const TextBlock = ({ block }) => {
  let blockText = reactStringReplace(
    block.data.text,
    /((?:\*)\*.*?\*(?:\*))/g,
    (match, i) => <BoldTextRegEx match={match} i={i} key={match + i} />
  );

  blockText = reactStringReplace(blockText, /(\*.*?(?:\*))/g, (match, i) => (
    <ItalicTextRegEx match={match} i={i} key={i + match} />
  ));

  blockText = reactStringReplace(
    blockText,
    /(\=\=.*?\=(?:\=))/g,
    (match, i) => <MarkedTextRegEx match={match} i={i} key={i + match} />
  );

  blockText = reactStringReplace(
    blockText,
    /(\[.*?\]\(https?\:\/\/.*?\))/g,
    (match, i) => <LinkRegEx match={match} i={i} key={i + match} />
  );

  blockText = reactStringReplace(
    blockText,
    /(\\?\#[a-zа-яё0-9_\-\\]+)/gi,
    (match, i) => <HashtagRegEx match={match} i={i} key={match + i} />
  );

  return <span className="entry-page__text-block">{blockText}</span>;
};

const ListBlock = ({ block }) => {
  const Li = (props) => {
    let text = reactStringReplace(
      props.item,
      /((?:\*)\*.*?\*(?:\*))/g,
      (match, i) => <BoldTextRegEx match={match} i={i} key={i} />
    );

    text = reactStringReplace(
      text,
      /(\[.*?\]\(https?\:\/\/.*?\))/g,
      (match, i) => <LinkRegEx match={match} i={i} key={i + match} />
    );

    return <li>{text}</li>;
  };

  return (
    <ul className="entry-page__list-block">
      {block.data.items.map((listItem, i) => (
        <Li item={listItem} key={i} />
      ))}
    </ul>
  );
};

const HeaderBlock = ({ block }) => {
  let text = reactStringReplace(
    block.data.text,
    /(\[.*?\]\(https?\:\/\/.*?\))/g,
    (match, i) => <LinkRegEx match={match} i={i} />
  );

  if (block.data.style === "h1") {
    return (
      <h1>
        <div className="entry-page__header-block">{text}</div>
      </h1>
    );
  }

  if (block.data.style === "h2") {
    return (
      <h2>
        <div className="entry-page__header-block">{text}</div>
      </h2>
    );
  }

  if (block.data.style === "h3") {
    return (
      <h3>
        <div className="entry-page__header-block">{text}</div>
      </h3>
    );
  }

  if (block.data.style === "h4") {
    return (
      <h4>
        <div className="entry-page__header-block">{text}</div>
      </h4>
    );
  }
};

const WarningBlock = ({ block }) => {
  let text = reactStringReplace(
    block.data.text,
    /(\[.*?\]\(https?\:\/\/.*?\))/g,
    (match, i) => <LinkRegEx match={match} i={i} />
  );

  return (
    <div className="entry-page__warning-block">
      <span className="font-bolder">{block.data.title + " "}</span>
      <span>{text}</span>
    </div>
  );
};

const MediaBlock = ({ block }) => {
  if (
    block.data.items[0].image.data.type === "jpg" ||
    block.data.items[0].image.data.type === "png" ||
    block.data.items[0].image.data.type === "webp"
  ) {
    return (
      <div
        className={classNames("entry-page__img-block", {
          "entry-page__img-block_wide":
            block.data.items[0].image.data.width > 1020 &&
            !block.data.with_background,
          "entry-page__img-block_highlight": block.data.with_background,
          "entry-page__img-block_vertical":
            block.data.items[0].image.data.height >
            block.data.items[0].image.data.width,
        })}
      >
        <Image
          image={block.data.items[0].image}
          srcWidth={block.data.items[0].image.data.width}
          srcHeight={block.data.items[0].image.data.height}
          maxWidth={1020}
          maxHeight={1500}
          width_background={block.data.with_background}
        />

        {block.data.items[0].title && (
          <span className="entry-page__img-title">
            {block.data.items[0].title}
          </span>
        )}
      </div>
    );
  } else if (block.data.items[0].image.data.type === "gif") {
    return (
      <div
        className={classNames("entry-page__video-block", {
          "entry-page__video-block_wide":
            block.data.items[0].image.data.width > 1020 &&
            !block.data.with_background,
          "entry-page__video-block_highlight": block.data.with_background,
          "entry-page__video-block_vertical":
            block.data.items[0].image.data.height >
            block.data.items[0].image.data.width,
        })}
      >
        <Video
          image={block.data.items[0].image}
          srcWidth={block.data.items[0].image.data.width}
          srcHeight={block.data.items[0].image.data.height}
          maxWidth={1020}
          maxHeight={1500}
          width_background={block.data.with_background}
          external_service={block.data.items[0].image.data.external_service}
        />
      </div>
    );
  } else return null;
};

const VideoBlock = ({ block }) => {
  return (
    <div
      className={classNames("entry-page__video-block", {
        "entry-page__video-block_wide":
          (block.data.video.data.width > 1020 ||
            block.data.video.data.external_service) &&
          !block.data.video.with_background,
        "entry-page__video-block_highlight": block.data.video.with_background,
        "entry-page__video-block_vertical":
          block.data.video.data.height > block.data.video.data.width,
      })}
    >
      <Video
        image={block.data.video}
        srcWidth={block.data.video.data.thumbnail.data.width}
        srcHeight={block.data.video.data.thumbnail.data.height}
        maxWidth={1020}
        maxHeight={1500}
        external_service={block.data.video.data.external_service}
      />
    </div>
  );
};

const EntryPage = (props) => {
  useEffect(() => {
    props.getEntry(props.match.params.id);
    props.setFetchStatus();

    return () => {
      props.clearEntry();
    };
  }, [props.match.params.id]);

  useDocumentTitle(props.entry.title);

  return (
    <>
      {props.entry.length !== 0 && (
        <div className="entry entry-page">
          <div className="entry__content">
            <div className="entry__header-container entry-page__header-container">
              <div className="entry__header">
                {props.entry.author && <SubsiteData {...props.entry} />}
                {props.entry.author && <EntryDatePublish {...props.entry} />}
              </div>
            </div>
            {props.entry.blocks && (
              <>
                <EntryTitle
                  className="entry-page__main-title"
                  {...props.entry}
                />
                {props.entry.blocks.map((block, i) =>
                  block.type === "text" && block.cover ? (
                    <TextBlock block={block} key={i} />
                  ) : block.type === "warning" && block.cover ? (
                    <WarningBlock block={block} key={i} />
                  ) : block.type === "media" && block.cover ? (
                    <MediaBlock block={block} key={i} />
                  ) : block.type === "video" && block.cover ? (
                    <VideoBlock block={block} key={i} />
                  ) : block.type === "text" && !block.cover ? (
                    <TextBlock block={block} key={i} />
                  ) : block.type === "media" && !block.cover ? (
                    <MediaBlock block={block} key={i} />
                  ) : block.type === "video" && !block.cover ? (
                    <VideoBlock block={block} key={i} />
                  ) : block.type === "warning" && !block.cover ? (
                    <WarningBlock block={block} key={i} />
                  ) : block.type === "header" && !block.cover ? (
                    <HeaderBlock block={block} key={i} />
                  ) : block.type === "list" && !block.cover ? (
                    <ListBlock block={block} key={i} />
                  ) : null
                )}
                <div className="entry-page__content-info">
                  <LinkScrollToComments
                    className="entry-page__content-info-item"
                    to="comments"
                    offset={-60}
                  >
                    <MessageCircle />
                    <span>{props.entry.counters.comments}</span>
                  </LinkScrollToComments>
                  <div
                    className="entry-page__content-info-item"
                    title="В закладки"
                  >
                    <Bookmark />
                  </div>
                  <EntryRating
                    id={props.entry.id}
                    likes={props.entry.likes}
                    isLiked={props.entry.likes.isLiked}
                  />
                </div>
              </>
            )}
          </div>
          <EntryCommentsContainer />
        </div>
      )}

      {props.error.length !== 0 && (
        <div className="entry-page__error-block">
          <Error code={props.error.error.code} message={props.error.message} />
        </div>
      )}
    </>
  );
};

export default EntryPage;
