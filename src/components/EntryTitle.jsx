import { Check } from "react-feather";

const EntryTitle = ({ title, isEditorial, className }) => {
  let titleWithoutLastWord = title.lastIndexOf(" ");
  let lastWord = title.split(" ").pop();

  return (
    <>
      {title && (
        <h1 className={className}>
          {isEditorial && (
            <>
              {title.substring(0, titleWithoutLastWord) + " "}
              {
                <span className="editor-title">
                  {lastWord}
                  <Check className="title-authors-icon" />
                </span>
              }
            </>
          )}

          {!isEditorial && title}
        </h1>
      )}

      {!title && null}
    </>
  );
};

export default EntryTitle;
