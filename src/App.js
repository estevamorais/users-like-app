import "./styles/app.scss";

import { useEffect } from "react";

import Navbar from "./components/Navbar";
import User from "./components/User";
import InfoDropdown from "./components/InfoDropdown";

import { useUsersContext } from "./hooks/useUsersContext";
import { useFetch } from "./hooks/useFetch";
import SuggestedList from "./components/SuggestedList";

function App() {
  const { user, loading, error } = useUsersContext();
  const { setNewFetch } = useFetch();

  useEffect(() => {
    setNewFetch(true);
  }, [setNewFetch]);

  return (
    <div className="app">
      <Navbar />
      <div className="app__header">
        <h1 className="app__title container">Find new users like you</h1>
      </div>
      <div className="app__content">
        {user && (
          <div className="container">
            <User user={user} loading={loading} error={error}></User>
            <div className="app__info">
              {user.info.map((info, i) => (
                <div key={`info-${i}`}>
                  <InfoDropdown info={info} loading={loading} error={error} />
                </div>
              ))}
            </div>
            <SuggestedList />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
