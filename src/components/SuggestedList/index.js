import "./index.scss";

import { useUsersContext } from "../../hooks/useUsersContext";

import ItemUser from "../ItemUser";

const SuggestedList = () => {
  const { suggested } = useUsersContext();

  return (
    <>
      {suggested.length > 0 && (
        <section className="suggested-list">
          <h3 className="suggested-list__title">Suggestion 4you</h3>
          <ul className="suggested-list__list">
            {suggested.map((user) => (
              <ItemUser user={user} key={user.id} />
            ))}
          </ul>
        </section>
      )}
    </>
  );
};

export default SuggestedList;
