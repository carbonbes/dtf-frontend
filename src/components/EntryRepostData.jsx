import { RefreshCw } from "react-feather";

const EntryRepostData = ({ repost }) => {
  return (
    repost && (
      <div className="entry__repost">
        <RefreshCw className="entry__repost-icon" />
        <span className="entry__repost-label">
          {repost.author.name} сделал репост
        </span>
      </div>
    )
  );
};

export default EntryRepostData;
