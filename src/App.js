import "./styles/app.scss";

import { useState, useEffect } from "react";

const getLocalStorageArray = (key) => {
  const array = localStorage.getItem(key);
  return array ? JSON.parse(array) : [];
};

function App() {
  const [newReq, setNewReq] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);

  // Start App
  useEffect(() => {
    setFollowingUsers(getLocalStorageArray("following"));
    setSuggestedUsers(getLocalStorageArray("suggested"));
    setNewReq(true);
  }, []);

  // Fetch data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    (async () => {
      if (newReq) {
        setLoading(false);

        try {
          const response = await fetch(
            `https://random-data-api.com/api/v2/users?size=1}`
          );
          const json = await response.json();

          setCurrentUser(json);
        } catch (err) {
          setError("There was an error trying to load the data.");
        }

        setNewReq(false);
      }
    })();
  }, [newReq]);

  return (
    <div className="app">
      <div className="app__header">
        <h1 className="app__title container">Find new users like you</h1>
      </div>
      <div className="app__content"></div>
    </div>
  );
}

export default App;
