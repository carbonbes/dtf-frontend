const LinkRegEx = (props) => {
  const [string] = props.match.matchAll(/(\[(.*?)\])\((https?\:\/\/.*?)\)/g);

  return (
    <a href={string[3]} target="_blank" key={props.i}>
      {string[2]}
    </a>
  );
};

export default LinkRegEx;
