import React from "react";
import { Link } from "react-router-dom";

const MentionRegEx = (props) => {
  let [string] = props.match.matchAll(/\[\@(\d+)\|([^\]]+)\]/g);

  return (
    <Link to={`/u/${string[1]}`} key={props.i}>
      @{string[2]}
    </Link>
  );
};

export default MentionRegEx;
