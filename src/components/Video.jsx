import useCalculateAspectRatio from "../hooks/useCalculateAspectRatio";

const Video = (props) => {
  let { width } = useCalculateAspectRatio(
    props.maxWidth,
    props.srcWidth,
    props.maxHeight,
    props.srcHeight
  );

  return (
    <div
      style={{
        margin: width < props.maxWidth && props.type === 1 ? "0 auto" : null,
        maxWidth:
          props.external_service &&
          Object.keys(props.external_service).length !== 0
            ? props.maxWidth
            : (props.srcWidth >= props.maxWidth &&
                (props.srcHeight > props.maxHeight ||
                  props.srcHeight < props.maxHeight)) ||
              (props.srcWidth < props.maxWidth &&
                props.srcHeight > props.maxHeight)
            ? width
            : props.srcWidth,
      }}
    >
      <div
        className="video-wrapp"
        style={{
          paddingTop:
            (props.image.data.height / props.image.data.width) * 100 + "%",
        }}
      >
        {(!props.external_service || props.external_service.length === 0) && (
          <video className="video" playsInline loop controls>
            <source
              src={`https://leonardo.osnova.io/${props.image.data.uuid}/-/format/mp4/`}
              type="video/mp4"
            />
          </video>
        )}

        {props.external_service &&
          props.external_service.name === "youtube" && (
            <iframe
              className="video"
              src={`https://www.youtube.com/embed/${props.image.data.external_service.id}?controls=2&showinfo=0`}
              frameBorder="0"
              allowFullScreen="1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          )}

        {props.external_service && props.external_service.name === "vimeo" && (
          <iframe
            className="video"
            src={`https://player.vimeo.com/video/${props.image.data.external_service.id}`}
            frameBorder="0"
            allowFullScreen="1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        )}

        {props.external_service && props.external_service.name === "gfycat" && (
          <video className="video" playsInline loop controls>
            <source src={props.external_service.mp4_url} type="video/mp4" />
          </video>
        )}

        {props.external_service && props.external_service.name === "giphy" && (
          <video className="video" playsInline loop controls>
            <source src={props.external_service.mp4_url} type="video/mp4" />
          </video>
        )}

        {props.external_service && props.external_service.name === "coub" && (
          <iframe
            className="video"
            src={`https://coub.com/embed/${props.external_service.id}`}
            frameBorder="0"
            allowFullScreen="1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        )}
      </div>
    </div>
  );
};

export default Video;
