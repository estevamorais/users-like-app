import "./index.scss";

import { useState } from "react";

import { useUsersContext } from "../../hooks/useUsersContext";

import FollowUnfollow from "../FollowUnfollow";

const Navbar = () => {
  const { following } = useUsersContext();
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        <h1 className="navbar__title">users_like.me</h1>
        {following.length > 0 && (
          <div
            className={`navbar__following ${
              toggle ? "navbar__following--active" : ""
            }`}
          >
            <button
              className="navbar__following-toggle"
              onClick={() => setToggle(!toggle)}
            >
              following{" "}
              {`${following.length} user${following.length > 1 ? "s" : ""}`}
              <ion-icon
                name={toggle ? "close-outline" : "chevron-down-outline"}
              ></ion-icon>
            </button>
            {toggle && following.length > 0 && (
              <ul className="navbar__following-list">
                {following.map((user) => (
                  <li className="navbar__following-item" key={user.id}>
                    <div className="navbar__following-item-info">
                      <img
                        className="navbar__following-item-avatar"
                        src={user.avatar}
                        alt={user.first_name}
                      />
                      <div>
                        <h4 className="navbar__following-item-name">{`${user.first_name} ${user.last_name}`}</h4>
                        <h5 className="navbar__following-item-address">{`${user.address.city}, ${user.address.country}`}</h5>
                      </div>
                    </div>
                    <FollowUnfollow user={user} size="sm" />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
