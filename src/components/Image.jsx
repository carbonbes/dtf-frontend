import useCalculateAspectRatio from "../hooks/useCalculateAspectRatio";

const Image = (props) => {
  let { width } = useCalculateAspectRatio(
    props.maxWidth,
    props.srcWidth,
    props.maxHeight,
    props.srcHeight
  );

  return (
    <div
      className="img-wrapp"
      style={{
        margin: width < props.maxWidth && props.type === 1 ? "0 auto" : null,
        maxWidth:
          (props.srcWidth >= props.maxWidth &&
            (props.srcHeight > props.maxHeight ||
              props.srcHeight < props.maxHeight)) ||
          (props.srcWidth < props.maxWidth && props.srcHeight > props.maxHeight)
            ? width
            : props.srcWidth,
        maxHeight: props.maxHeight,
      }}
    >
      <img
        alt=""
        src={`https://leonardo.osnova.io/${props.image.data.uuid}/-/preview/1200/-/format/webp/`}
      />
    </div>
  );
};

export default Image;
