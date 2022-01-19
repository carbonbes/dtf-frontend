import useWordDeclensions from "../hooks/useWordDeclensions";

let subsWords = ["подписчик", "подписчика", "подписчиков"];

const declWord = (number, words) => useWordDeclensions(number, words);

const ProfileSubsCount = (props) => {
  return (
    <>
      {props.profile &&
        !props.profile.isFetching &&
        props.profile.profile.counters && (
          <div className="profile__subs-count">
            {props.profile.profile.counters.subscribers +
              " " +
              declWord(props.profile.profile.counters.subscribers, subsWords)}
          </div>
        )}

      {props && props.profile && props.profile.isFetching === true && null}
    </>
  );
};

export default ProfileSubsCount;
