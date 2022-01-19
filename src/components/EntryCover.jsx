import classNames from "classnames";
import Image from "./Image";
import Video from "./Video";

const EntryCover = ({ blocks }) => {
  let covers = blocks.filter((block) => {
    return (
      (block.type === "media" || block.type === "video") && block.cover === true
    );
  });

  return (
    <>
      {covers.length > 0 &&
        covers
          .filter(
            (cover) =>
              cover.type === "media" &&
              (cover.data.items[0].image.data.type === "jpg" ||
                cover.data.items[0].image.data.type === "png" ||
                cover.data.items[0].image.data.type === "webp")
          )
          .map((cover, index) => (
            <div
              className={classNames("main__cover", {
                "main__cover_wide":
                  cover.data.items[0].image.data.width > 640 &&
                  !cover.data.with_background,
                "main__cover_thin":
                  cover.data.items[0].image.data.width < 640 &&
                  !cover.data.with_background,
                "main__cover_vertical":
                  cover.data.items[0].image.data.height >
                  cover.data.items[0].image.data.width,
                "main__cover_highlight": cover.data.with_background,
              })}
              key={index}
            >
              <Image
                image={cover.data.items[0].image}
                srcWidth={cover.data.items[0].image.data.width}
                srcHeight={cover.data.items[0].image.data.height}
                maxWidth={640}
                maxHeight={600}
                type={1}
                with_background={cover.data.with_background}
              />
            </div>
          ))}

      {covers.length > 0 &&
        covers
          .filter(
            (cover) =>
              cover.type === "media" &&
              cover.data.items[0].image.data.type === "gif"
          )
          .map((cover, index) => (
            <div
              className={classNames("main__cover", {
                main__cover_wide:
                  cover.data.items[0].image.data.width > 640 &&
                  !cover.data.with_background,
                main__cover_thin:
                  cover.data.items[0].image.data.width < 640 &&
                  !cover.data.with_background,
                main__cover_vertical:
                  cover.data.items[0].image.data.height >
                  cover.data.items[0].image.data.width,
                main__cover_highlight: cover.data.with_background,
              })}
              key={index}
            >
              <Video
                image={cover.data.items[0].image}
                srcWidth={cover.data.items[0].image.data.width}
                srcHeight={cover.data.items[0].image.data.height}
                maxWidth={640}
                maxHeight={600}
                type={1}
                with_background={cover.data.with_background}
                external_service={
                  cover.data.items[0].image.data.external_service
                }
              />
            </div>
          ))}

      {covers.length > 0 &&
        covers
          .filter((cover) => cover.type === "video")
          .map((cover, index) => (
            <div
              className={classNames("main__cover", {
                main__cover_wide:
                  cover.data.video.data.width > 640 &&
                  !cover.data.with_background,
                main__cover_thin:
                  cover.data.video.data.width < 640 &&
                  !cover.data.with_background,
                main__cover_vertical:
                  cover.data.video.data.height > cover.data.video.data.width,
                main__cover_highlight: cover.data.with_background,
              })}
              key={index}
            >
              <Video
                image={cover.data.video}
                srcWidth={cover.data.video.data.thumbnail.data.width}
                srcHeight={cover.data.video.data.thumbnail.data.height}
                maxWidth={640}
                maxHeight={600}
                type={1}
                external_service={cover.data.video.data.external_service}
              />
            </div>
          ))}

      {covers.length > 0 &&
        covers
          .filter((cover) => cover.type === "moovie")
          .map((cover, i) => (
            <div
              className={classNames("main__cover", {
                main__cover_wide:
                  cover.data.video.data.width > 640 &&
                  !cover.data.with_background,
                main__cover_thin:
                  cover.data.video.data.width < 640 &&
                  !cover.data.with_background,
                main__cover_vertical:
                  cover.data.video.data.height > cover.data.video.data.width,
                main__cover_highlight: cover.data.with_background,
              })}
              key={i}
            >
              <Video
                image={cover.data}
                srcWidth={cover.data.width}
                srcHeight={cover.data.height}
                maxWidth={640}
                maxHeight={600}
                type={1}
                external_service={cover.data.video.data.external_service}
              />
            </div>
          ))}
    </>
  );
};

export default EntryCover;
