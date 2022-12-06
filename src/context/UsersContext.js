import { createContext, useState, useEffect } from "react";

export const UsersContext = createContext();

const getLocalStorageArray = (key) => {
  const array = localStorage.getItem(key);
  return array ? JSON.parse(array) : [];
};

export const UsersContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [suggested, setSuggested] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Start App
  useEffect(() => {
    setFollowing(getLocalStorageArray("following"));
    setSuggested(getLocalStorageArray("suggested"));
  }, []);

  useEffect(() => {
    if (suggested.length > 5) setSuggested(suggested.slice(0, 5));
  }, [suggested]);

  return (
    <UsersContext.Provider
      value={{
        user,
        setUser,
        suggested,
        setSuggested,
        following,
        setFollowing,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
