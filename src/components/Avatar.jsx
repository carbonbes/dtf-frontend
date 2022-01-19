import { useMediaQuery } from "react-responsive";

const Avatar = (props) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <>
      {!props.profile.profile.avatar?.data.uuid && (
        <div
          className="profile__avatar"
          style={{
            marginTop: !isMobile ? "-95px" : "-77.5px",
          }}
        />
      )}

      {props.profile.profile.avatar?.data.uuid && (
        <div
          className="profile__avatar"
          style={{
            marginTop:
              !isMobile && props.profile.profile.cover
                ? "-95px"
                : isMobile && props.profile.profile.cover
                ? "-77.5px"
                : null,
            backgroundImage: `url(https://leonardo.osnova.io/${props.profile.profile.avatar.data.uuid}/-/scale_crop/300x300/-/format/webp/)`,
          }}
        />
      )}
    </>
  );
};

export default Avatar;
