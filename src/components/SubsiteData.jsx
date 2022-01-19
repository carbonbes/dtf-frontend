import { Link } from "react-router-dom";

const SubsiteData = ({ subsite, author }) => {
  return (
    <>
      {subsite.type === 2 && author.type === 2 && subsite.id === author.id && (
        <div className="entry__subsite-data">
          <div
            className="entry__subsite-avatar"
            style={{
              backgroundImage: `url(https://leonardo.osnova.io/${subsite.avatar.data.uuid}/-/scale_crop/50/-/format/webp/)`,
            }}
          />
          <span className="entry__subsite-name entry__subsite-name_bold">
            {subsite.name}
          </span>
        </div>
      )}

      {(subsite.type === 2 || subsite.type === 3) &&
        (author.type === 1 || author.type === 2 || author.type === 3) &&
        author.id !== subsite.id && (
          <>
            <Link className="entry__subsite-data" to={`/u/${subsite.id}`}>
              <div
                className="entry__subsite-avatar"
                style={{
                  backgroundImage: `url(https://leonardo.osnova.io/${subsite.avatar.data.uuid}/-/scale_crop/50/-/format/webp/)`,
                }}
              />
              <span className="entry__subsite-name entry__subsite-name_bold">
                {subsite.name}
              </span>
            </Link>
            <Link className="entry__author-name_link" to={`/u/${author.id}`}>
              <span className="entry__author-name">{author.name}</span>
            </Link>
          </>
        )}

      {subsite.type === 1 && (
        <Link className="entry__subsite-data" to={`/u/${author.id}`}>
          <div
            className="entry__subsite-avatar"
            style={{
              backgroundImage: `url(https://leonardo.osnova.io/${author.avatar.data.uuid}/-/scale_crop/50/-/format/webp/)`,
            }}
          />
          <div className="entry__subsite-name-link">
            <span className="entry__subsite-name entry__subsite-name_bold">
              {author.name}
            </span>
          </div>
        </Link>
      )}
    </>
  );
};

export default SubsiteData;
