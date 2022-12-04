import "./index.scss";

const ItemUser = ({ user, actions }) => {
  return (
    <li className="item-user">
      <div>
        <img className="item-user__avatar" src={user.avatar} alt="" />
        <h4 className="item-user__name">{`${user.first_name} ${user.last_name}`}</h4>
        <h5 className="item-user__address">{`${user.address.city}, ${user.address.country}`}</h5>
      </div>
      {actions}
    </li>
  );
};

export default ItemUser;
