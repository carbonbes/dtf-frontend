import { MessageCircle } from "react-feather";

const EntryComments = ({ counters }) => {
  return (
    <div className="entry__footer-comments-btn">
      <MessageCircle className="comments__icon" />
      {counters.comments > 0 && (
        <span className="comments__count">{counters.comments}</span>
      )}
      {counters.comments === 0 && (
        <span className="comments__count">Обсудить</span>
      )}
    </div>
  );
};

export default EntryComments;
