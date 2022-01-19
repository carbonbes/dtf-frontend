import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Entry from "./Entry";

const Entries = (props) => {
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastId, setLastId] = useState(0);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    let { id } = props.match.params;

    props.getEntries({
      allSite: false,
      subsiteIds: id,
      sorting: "date",
      lastId,
      lastSortingValue: false,
    });
  }, [currentPage, props.match.params.id]);

  useEffect(() => {
    setTotalPages(
      Math.round(props.profileCounters.entries / props.entries.length)
    );
  }, [props.entries]);

  useEffect(() => {
    if (inView && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      setLastId(props.lastId);
    }
  }, [inView]);

  useEffect(() => {
    return () => {
      props.clearEntries();
    };
  }, []);

  return (
    <div className="profile__entries-list">
      {props.entries.length !== 0 &&
        props.entries.map((entry, index) => {
          if (props.entries.length === index + 1) {
            return (
              <div key={entry.id} ref={ref}>
                <Entry {...entry} entryType="profile" />
              </div>
            );
          } else {
            return <Entry {...entry} entryType="profile" key={entry.id} />;
          }
        })}
      {!props.isFetching && props.entries.length === 0 && (
        <div className="profile__entries-list-empty">Здесь еще нет публикаций</div>
      )}
    </div>
  );
};

export default Entries;
