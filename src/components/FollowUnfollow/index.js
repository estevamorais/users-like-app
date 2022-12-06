import { useUsersContext } from "../../hooks/useUsersContext";

import Button from "../Button";

const containsObject = (obj, list) => {
  return list.some((elem) => {
    return elem === obj;
  });
};

const spliceObject = (obj, list) => {
  if (containsObject(obj, list)) {
    const index = list.findIndex((elem) => elem === obj);
    list.splice(index, 1);
  }
  return list;
};

const FollowUnfollow = ({ user, size }) => {
  const { suggested, setSuggested, following, setFollowing } =
    useUsersContext();

  const handleFollowUnfollow = () => {
    let newFollowing = [...following];
    let newSuggested = [...suggested];

    if (!containsObject(user, following)) {
      // follow
      newFollowing.unshift(user);
      newSuggested = spliceObject(user, newSuggested);
    } else {
      // unfollow
      newSuggested.unshift(user);
      newFollowing = spliceObject(user, newFollowing);
    }

    // Save in localStorage
    localStorage.setItem("following", JSON.stringify(newFollowing));
    localStorage.setItem("suggested", JSON.stringify(newSuggested));

    // Seting users
    setFollowing(newFollowing);
    setSuggested(newSuggested);
  };

  return (
    <>
      {!containsObject(user, following) ? (
        <Button action={handleFollowUnfollow} style="info" size={size}>
          Follow
        </Button>
      ) : (
        <Button action={handleFollowUnfollow} style="danger" size={size}>
          Unfollow
        </Button>
      )}
    </>
  );
};

export default FollowUnfollow;
