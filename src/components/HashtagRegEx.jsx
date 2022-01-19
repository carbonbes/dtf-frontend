import { Link } from "react-router-dom";

const HashtagRegEx = (props) => {
  let [string] = props.match.matchAll(/\\?(#([a-zа-яё0-9_\\]+))/gi);
  let newString1 = string[1].replace(/\{1,}/g, "");
  let newString2 = string[2].replace(/\{1,}/g, "");

  return (
    <Link to={`/tag/${newString2}`} key={props.i}>
      {newString1}
    </Link>
  );
};

export default HashtagRegEx;
