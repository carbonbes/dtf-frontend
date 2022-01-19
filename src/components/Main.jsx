import { Switch, Route, Redirect } from "react-router-dom";
import EntryContainer from "../containers/EntryContainer";
import ProfileContainer from "../containers/ProfileContainer";
import FeedPage from "../pages/FeedPage";

const Main = () => {
  return (
    <main className="main">
      <Switch>
        <Route exact path="/">
          <Redirect to="/feed" />
        </Route>
        <Route path="/feed">
          <FeedPage />
        </Route>
        <Route path="/u/:id?">
          <ProfileContainer />
        </Route>
        <Route path="/e/:id">
          <EntryContainer />
        </Route>
        <Route path="*"></Route>
      </Switch>
    </main>
  );
};

export default Main;
