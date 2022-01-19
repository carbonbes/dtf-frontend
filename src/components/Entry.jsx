import { Link } from "react-router-dom";
import EntryComments from "./EntryComments";
import EntryCover from "./EntryCover";
import EntryDatePublish from "./EntryDatePublish";
import EntryFavorite from "./EntryFavorite";
import EntryPinnedBlock from "./EntryPinnedBlock";
import EntryRepostData from "./EntryRepostData";
import EntryReposts from "./EntryReposts";
import EntrySubtitle from "./EntrySubtitle";
import EntryTitle from "./EntryTitle";
import EntryRating from "./EntryRating";
import SubsiteData from "./SubsiteData";

const Entry = (props) => {
  return (
    <div className="entry">
      <EntryRepostData {...props} />
      <EntryPinnedBlock {...props} />
      <div className="entry__header-container">
        <div className="entry__header">
          <SubsiteData {...props} />
          <EntryDatePublish {...props} />
        </div>
      </div>
      <div className="entry__main">
        <EntryTitle className="main__title" {...props} />
        <EntrySubtitle {...props} />
        <EntryCover blocks={props.blocks} />
      </div>
      <div className="entry__footer">
        <EntryComments {...props} />
        <EntryReposts {...props} />
        <EntryFavorite {...props} />
        <EntryRating
          {...props}
          id={props.id}
          isLiked={props.likes.isLiked}
          entryType={props.entryType}
        />
      </div>
      <Link to={`/e/${props.id}`} />
    </div>
  );
};

export default Entry;
