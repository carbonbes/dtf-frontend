import Skeleton from "./Skeleton";

const DateCreated = (props) => {
  let months = [
    "янв",
    "фев",
    "мар",
    "апр",
    "мая",
    "июн",
    "июл",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек",
  ];

  let dateCreated = (props) => {
    let dateCreated = new Date(props * 1000);
    let day = dateCreated.getDate();
    let month = dateCreated.getMonth();
    let year = dateCreated.getFullYear();

    return `${day} ${months[month]} ${year}`;
  };

  return (
    <>
      {props.isFetching && <Skeleton />}

      {!props.isFetching && (
        <div className="profile__date-created">
          На проекте с {dateCreated(props.dateCreated)}
        </div>
      )}
    </>
  );
};

export default DateCreated;
