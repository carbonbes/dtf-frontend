import { RefreshCw } from "react-feather";

const EntryReposts = ({ counters }) => {
  return (
    <div className="entry__footer-repost-btn">
      <RefreshCw className="reposts__icon" />
      {counters.reposts > 0 && (
        <span className="reposts__count">{counters.reposts}</span>
      )}
    </div>
  );
};

export default EntryReposts;
