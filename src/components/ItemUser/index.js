import "./index.scss";

import FollowUnfollow from "../FollowUnfollow";

const ItemUser = ({ user }) => {
  return (
    <>
      {user && (
        <li className="item-user">
          <div>
            <img
              className="item-user__avatar"
              src={user.avatar}
              alt={user.first_name}
            />
            <h4 className="item-user__name">{`${user.first_name} ${user.last_name}`}</h4>
            <h5 className="item-user__address">{`${user.address.city}, ${user.address.country}`}</h5>
          </div>
          <FollowUnfollow user={user} />
        </li>
      )}
    </>
  );
};

export default ItemUser;
