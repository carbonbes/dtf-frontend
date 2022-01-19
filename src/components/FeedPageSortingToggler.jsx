import { useRef } from "react";
import { useRouteMatch, useLocation, Link } from "react-router-dom";
import useDetectOutsideClick from "../hooks/useDetectOutsideClick";

const FeedPageSortingToggler = (props) => {
  let { url } = useRouteMatch();

  let location = useLocation();

  const ref = useRef();
  useDetectOutsideClick(ref, props.setDropdownVisible);

  const sortings = {
    "Популярное": "popular",
    "За день": "popular/day",
    "За неделю": "popular/week",
    "За месяц": "popular/month",
    "За год": "popular/year",
    "За всё время": "popular/all",
  };

  return (
    <div className="feed__dropdown" ref={ref}>
      {Object.entries(sortings).map((sort, index) => {
        return (
          location.pathname !== `/feed/${sort[1]}` && (
            <Link
              to={`${url}/${sort[1]}`}
              onClick={() => {
                if (location.pathname === "/feed/popular") {
                  props.setCurrentSort("hotness");
                }

                props.setDropdownVisible(false);
              }}
              key={index}
            >
              {sort[0]}
            </Link>
          )
        );
      })}
    </div>
  );
};

export default FeedPageSortingToggler;
