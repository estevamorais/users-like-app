import "./styles/app.scss";

import { useState, useEffect } from "react";

import User from "./components/User";
import FollowUnfollow from "./components/FollowUnfollow";
import InfoDropdown from "./components/InfoDropdown";
import ItemUser from "./components/ItemUser";

const getLocalStorageArray = (key) => {
  const array = localStorage.getItem(key);
  return array ? JSON.parse(array) : [];
};

function App() {
  const [newReq, setNewReq] = useState(false);

  const [user, setUser] = useState(null);
  const [suggested, setSuggested] = useState([]);
  const [following, setFollowing] = useState([]);

  // Start App
  useEffect(() => {
    setFollowing(getLocalStorageArray("following"));
    setSuggested(getLocalStorageArray("suggested"));
    setNewReq(true);
  }, []);

  useEffect(() => {
    if (suggested.length > 5) setSuggested(suggested.slice(0, 5));
  }, [suggested]);

  // Fetch data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    (async () => {
      if (newReq) {
        setLoading(true);

        try {
          const response = await fetch(
            `https://random-data-api.com/api/v2/users?size=1}`
          );
          const json = await response.json();

          setLoading(false);
          json.info = [
            {
              title: "Personal info",
              items: [
                ["born at", json.date_of_birth],
                ["age", json.date_of_birth],
                ["gender", json.gender],
                [
                  "job",
                  `${json.employment.key_skill} at ${json.employment.title}`,
                ],
              ],
            },
            {
              title: "Contact info",
              items: [
                ["email", json.email],
                ["phone", json.phone],
                [
                  "full address",
                  `${json.address.street_address}, ${json.address.city}, ${json.address.state}, ${json.address.zip_code}, ${json.address.country}`,
                ],
              ],
            },
          ];
          setUser(json);
        } catch (err) {
          setError("There was an error trying to load the data.");
        }

        setNewReq(false);
      }
    })();
  }, [newReq]);

  return (
    <div className="app">
      {/* Navbar */}
      <div className="app__header">
        <h1 className="app__title container">Find new users like you</h1>
      </div>
      <div className="app__content">
        {user && (
          <div className="container">
            <User
              user={user}
              actions={
                <FollowUnfollow
                  user={user}
                  following={following}
                  setFollowing={setFollowing}
                  suggested={suggested}
                  setSuggested={setSuggested}
                />
              }
              nextUser={() => setNewReq(true)}
              loading={loading}
              error={error}
            ></User>
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
                    <ItemUser
                      user={user}
                      key={`suggested-${i}`}
                      actions={
                        <FollowUnfollow
                          user={user}
                          following={following}
                          setFollowing={setFollowing}
                          suggested={suggested}
                          setSuggested={setSuggested}
                          size="sm"
                        />
                      }
                    />
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
