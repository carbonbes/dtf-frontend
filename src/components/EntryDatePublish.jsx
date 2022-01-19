import useDate from "../hooks/useDate";

const EntryDatePublish = ({ date }) => {
  let dateCreated = useDate(date);

  return (
    <div
      className="entry__date-publish"
      title={"Опубликовано " + new Date(date * 1000).toLocaleString()}
    >
      {dateCreated}
    </div>
  );
};

export default EntryDatePublish;
