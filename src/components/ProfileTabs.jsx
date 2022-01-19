import { useState } from "react";

const tabs = ["entries", "comments"];

const ProfileTabs = (props) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="profile__tabs">
      <div
        className={
          activeTab === tabs[0]
            ? "profile__tab profile__tab_active"
            : "profile__tab"
        }
        onClick={() => setActiveTab(tabs[0])}
      >
        <span>
          Статьи
          <span className="profile__tab-count">
            {props.profile.profile.counters?.entries}
          </span>
        </span>
      </div>
    </div>
  );
};

export default ProfileTabs;
