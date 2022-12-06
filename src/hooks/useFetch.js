import { useState, useEffect } from "react";
import { useUsersContext } from "./useUsersContext";

export const useFetch = () => {
  const [newReq, setNewReq] = useState(false);
  const { setUser, setError, setLoading } = useUsersContext();

  function handleGetInfo(json) {
    return [
      {
        title: "Personal info",
        items: [
          ["born at", json.date_of_birth],
          ["age", json.date_of_birth],
          ["gender", json.gender],
          ["job", `${json.employment.key_skill} at ${json.employment.title}`],
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
  }

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

          json.info = handleGetInfo(json);
          setUser(json);
        } catch (err) {
          setError("There was an error trying to load the data.");
        }

        setNewReq(false);
      }
    })();
  }, [newReq, setUser, setError, setLoading]);

  return { setNewReq };
};
