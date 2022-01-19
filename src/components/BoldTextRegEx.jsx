const BoldTextRegEx = (props) => {
  let [string] = props.match.matchAll(/(?:\*)\*(.*?)\*(?:\*)/g);

  return <b key={props.i}>{string[1]}</b>;
};

export default BoldTextRegEx;
