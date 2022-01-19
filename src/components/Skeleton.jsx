import { useState, useEffect } from "react";

const Skeleton = (props) => {
  const [width, setWidth] = useState();

  useEffect(() => {
    setWidth(Math.ceil(Math.random() * (100 - 15)) + 15 + "%");

    return () => {
      setWidth(0);
    };
  }, []);

  return (
    <div
      style={{
        background: "#d7d7d7",
        width: props.width ? props.width : width,
        height: props.height ? props.height : "20px",
        borderRadius: props.borderRadius ? props.borderRadius : 0,
        margin: props.margin,
      }}
    />
  );
};

export default Skeleton;
