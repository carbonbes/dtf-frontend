import { Paperclip } from "react-feather";

const EntryPinnedBlock = ({ isPinned }) => {
  return (
    isPinned && (
      <div className="entry__pinned-block">
        <Paperclip className="entry__pinned-icon" />
        <span>Запись закреплена</span>
      </div>
    )
  );
};

export default EntryPinnedBlock;
