import { useEffect } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Avatar from "../components/Avatar";
import Cover from "../components/Cover";
import DateCreated from "../components/DateCreated";
import ProfileRating from "../components/ProfileRating";
import ProfileSubsCount from "../components/ProfileSubsCount";
import ProfileTabs from "../components/ProfileTabs";
import Skeleton from "../components/Skeleton";
import SubscribeButton from "../components/SubscribeButton";
import UnsubscribeButton from "../components/UnsubscribeButton";
import ProfileEntriesContainer from "../containers/ProfileEntriesContainer";
import Error from "../components/Error";

const ProfilePage = (props) => {
  useEffect(() => {
    props.getUser(props.match.params.id);
    props.setFetchStatus();

    return () => {
      props.clearProfileData();
    };
  }, [props.match.params.id]);

  useDocumentTitle("Профиль пользователя " + props.profile.profile.name);

  return (
    <>
      {props.profile.profile.length !== 0 && (
        <div className="profile__wrapper">
          <Cover
            cover={props.profile.profile.cover}
            isFetching={props.profile.isFetching}
          />
          <div className="profile profile_theme-white">
            <div className="profile__avatar-buttons-container">
              <Avatar {...props} />
              {props.profile.profile.id !== props.auth.profileData.id && (
                <div className="profile__buttons">
                  {props.profile.profile.isSubscribed ? (
                    <UnsubscribeButton />
                  ) : (
                    <SubscribeButton />
                  )}
                </div>
              )}
            </div>
            <div className="profile__profile-data">
              {props.profile.isFetching && <Skeleton />}
              {!props.profile.isFetching && (
                <span className="profile__name">
                  {props.profile.profile.name}
                </span>
              )}
              {props.profile.isFetching && <Skeleton />}
              {!props.profile.isFetching && (
                <div className="profile__counters">
                  <ProfileRating {...props} />
                  <ProfileSubsCount {...props} />
                </div>
              )}
              <DateCreated
                dateCreated={props.profile.profile.created}
                isFetching={props.profile.isFetching}
              />
            </div>
            <ProfileTabs {...props} />
          </div>
          <ProfileEntriesContainer />
        </div>
      )}

      {props.profile.error.length !== 0 && (
        <div className="profile__error-block">
          <Error
            code={props.profile.error.error?.code}
            message={props.profile.error.message}
          />
        </div>
      )}
    </>
  );
};

export default ProfilePage;
