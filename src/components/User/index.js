import "./index.scss";

import Button from "../Button";
import Message from "../Message";

const User = ({ user, actions, nextUser, loading, error }) => {
  return (
    <div className="user">
      <Message message={error} loading={loading} />
      <div className="user__image">
        <div
          className="user__image-bg"
          style={{ backgroundImage: `url(${user.avatar})` }}
        ></div>
        <img
          className="user__image-avatar"
          src={user.avatar}
          alt={user.first_name}
        />
      </div>
      <div className="user__content">
        {actions}
        <h1 className="user__name">{`${user.first_name} ${user.last_name}`}</h1>
        <h2 className="user__address">{`${user.address.city}, ${user.address.country}`}</h2>
        <Button className="user__next-user" action={nextUser}>
          try the next one
        </Button>
      </div>
    </div>
  );
};

export default User;
