import "./styles/app.scss";

import { useEffect } from "react";

import User from "./components/User";
import InfoDropdown from "./components/InfoDropdown";
import ItemUser from "./components/ItemUser";

import { useUsersContext } from "./hooks/useUsersContext";
import { useFetch } from "./hooks/useFetch";

function App() {
  const { user, suggested, loading, error } = useUsersContext();
  const { setNewReq } = useFetch();

  useEffect(() => {
    setNewReq(true);
  }, []);

  return (
    <div className="app">
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
            {suggested.length > 0 && (
              <section className="app__suggested">
                <h3 className="app__suggested-title">Suggestion 4you</h3>
                <ul className="app__suggested-list">
                  {suggested.map((user, i) => (
                    <ItemUser user={user} key={`suggested-${i}`} />
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
