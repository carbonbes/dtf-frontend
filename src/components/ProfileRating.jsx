const numberWithSpaces = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const ProfileRating = (props) => {
  return (
    <>
      {props.profile.profile.rating > 0 && (
        <div className="profile__rating profile__rating_theme-green profile__rating_fw-medium">
          +{numberWithSpaces(props.profile.profile.rating)}
        </div>
      )}
      {props.profile.profile.rating === 0 && (
        <div className="profile__rating profile__rating_theme-grey profile__rating_fw-medium">
          0
        </div>
      )}
      {props.profile.profile.rating < 0 && (
        <div className="profile__rating profile__rating_theme-red profile__rating_fw-medium">
          {numberWithSpaces(props.profile.profile.rating)}
        </div>
      )}
    </>
  );
};

export default ProfileRating;
