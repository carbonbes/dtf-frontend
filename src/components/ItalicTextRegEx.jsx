import reactStringReplace from "react-string-replace";
import LinkRegEx from "./LinkRegEx";

const ItalicTextRegEx = (props) => {
  let [string] = props.match.matchAll(/\*(.*?)(?:\*)/gm);

  let text = reactStringReplace(
    string[1],
    /(\[.*?\]\(https?\:\/\/.*?\))/g,
    (match, i) => <LinkRegEx match={match} i={i} />
  );

  return <i key={props.i}>{text}</i>;
};

export default ItalicTextRegEx;
