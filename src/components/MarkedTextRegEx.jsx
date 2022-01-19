import React from "react";

const MarkedTextRegEx = (props) => {
  let [string] = props.match.matchAll(/\=\=(.*?)\=(?:\=)/g);

  return (
    <mark className="entry-page__text-block_marked" key={props.i}>
      {string[1]}
    </mark>
  );
};

export default MarkedTextRegEx;
