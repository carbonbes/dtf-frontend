const Cover = (props) => {
  return (
    <>
      {props.cover && props.cover.data.type === "jpg" && (
        <div
          className="profile__cover-img"
          style={{
            backgroundImage: `url(https://leonardo.osnova.io/${props.cover.data.uuid}/-/scale_crop/1920/-/format/webp/)`,
          }}
        />
      )}

      {props.cover && props.cover.data.type === "gif" && (
        <video
          className="profile__cover-video"
          src={`https://leonardo.osnova.io/${props.cover.data.uuid}/-/format/mp4/`}
          autoPlay
          playsInline
          loop
          muted
        />
      )}

      {props.isFetching && <div className="profile__default-cover" />}

      {!props.cover && null}
    </>
  );
};

export default Cover;
