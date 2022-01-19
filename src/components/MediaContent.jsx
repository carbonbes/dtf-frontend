import Image from "./Image";
import Video from "./Video";

const MediaContent = (props) => {
  return props.media.map((image, i) =>
    image.type === "image" &&
    (image.data.type === "jpg" ||
      image.data.type === "png" ||
      image.data.type === "webp") ? (
      <Image
        image={image}
        width_background={props.with_background}
        maxWidth={props.maxWidth}
        maxHeight={props.maxHeight}
        key={i}
      />
    ) : (image.type === "image" || image.type === "movie") &&
      (image.data.type === "gif" || image.data.type === "mp4") ? (
      <Video
        image={image}
        external_service={image.data.external_service}
        key={i}
      />
    ) : (
      image.type === "video" &&
      image.data.external_service.name === "youtube" && (
        <Video
          image={image}
          external_service={image.data.external_service}
          key={i}
        />
      )
    )
  );
};

export default MediaContent;
