const EntrySubtitle = ({ blocks }) => {
  let subtitle = blocks.filter((block) => {
    return block.type === "text" && block.cover === true;
  });

  return subtitle.length > 0 ? (
    <span className="main__subtitle">{subtitle[0].data.text}</span>
  ) : null;
};

export default EntrySubtitle;
