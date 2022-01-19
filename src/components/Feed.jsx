import { useEffect, useState } from "react";
import { Loader } from "react-feather";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";
import Entry from "./Entry";

const Feed = (props) => {
  const [loaderVisible, setLoaderVisible] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  let { sorting } = useParams();

  useEffect(() => {
    props.getFeed({
      allSite: false,
      subsiteIds: false,
      sorting: sorting === undefined ? props.sorting : sorting,
      lastId: false,
      lastSortingValue: false,
    });
    props.setFetchStatus();
  }, [props.sorting, sorting]);

  useEffect(() => {
    if (inView) {
      props.getFeed({
        allSite: false,
        subsiteIds: false,
        sorting: sorting === undefined ? props.sorting : sorting,
        lastId: props.lastId,
        lastSortingValue: false,
      });
    }
  }, [inView]);

  useEffect(() => {
    props.clearFeed();

    if (props.sorting === "date") props.readFeed();
  }, [props.sorting, sorting]);

  useEffect(() => {
    return () => {
      props.clearFeed();
    };
  }, []);

  useEffect(() => {
    if (props.currentPage > 1 && props.isFetching) {
      setLoaderVisible(true);
    }

    if (props.currentPage > 1 && !props.isFetching) {
      setLoaderVisible(false);
    }
  }, [props.currentPage, props.isFetching]);

  return (
    <>
      <div className="entry__entry-list">
        {props.entries.map((entry, index) => {
          if (props.entries.length === index + 1) {
            return (
              <div key={entry.id} ref={ref}>
                <Entry {...entry} entryType="feed" />
              </div>
            );
          } else {
            return <Entry {...entry} key={entry.id} entryType="feed" />;
          }
        })}
      </div>
      {loaderVisible && (
        <div className="feed__loader">
          <Loader />
        </div>
      )}
    </>
  );
};

export default Feed;
