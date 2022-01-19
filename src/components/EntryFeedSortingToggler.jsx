const EntryFeedSortingToggler = ({ sorting, setSorting }) => {
  return (
    <div className="feed__sorting-buttons">
      <div
        className={
          sorting === "hotness"
            ? "profile__sorting-buttons button"
            : "profile__sorting-buttons profile__sorting-buttons_disabled button"
        }
        onClick={() => {
          setSorting("hotness");
          localStorage.setItem("default-sort-feed", "hotness");
        }}
      >
        Популярное
      </div>

      <div
        className={
          sorting === "date"
            ? "profile__sorting-buttons button"
            : "profile__sorting-buttons profile__sorting-buttons_disabled button"
        }
        onClick={() => {
          setSorting("date");
          localStorage.setItem("default-sort-feed", "date");
        }}
      >
        Свежее
      </div>
    </div>
  );
};

export default EntryFeedSortingToggler;
