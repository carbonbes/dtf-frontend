import { Bookmark } from "react-feather";

const EntryFavorite = ({ counters }) => {
  return (
    <div className="entry__footer-bookmark-btn">
      <Bookmark className="bookmarks__icon" />
      {counters.favorites > 0 && (
        <span className="bookmarks__count">{counters.favorites}</span>
      )}
    </div>
  );
};

export default EntryFavorite;
