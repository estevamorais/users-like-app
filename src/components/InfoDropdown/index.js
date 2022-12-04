import "./index.scss";

import { useState, useEffect } from "react";

import Message from "../Message";

const InfoDropdown = ({ info, loading, error }) => {
  const [items, setItems] = useState();
  const [toggle, setToggle] = useState();

  const handleToggleItems = () => {
    if (items.length === info.items.length) {
      setItems(info.items.slice(0, 2));
    } else {
      setItems(info.items);
    }

    setToggle(!toggle);
  };

  useEffect(() => {
    setItems(info.items.slice(0, 2));
    setToggle(false);
  }, [info]);

  return (
    <>
      {items && (
        <div
          className={`info-dropdown ${toggle ? "info-dropdown--active" : ""}`}
          aria-expanded={toggle ? "true" : "false"}
        >
          <Message message={error} loading={loading} />
          <h4 className="info-dropdown__title">{info.title}</h4>
          <ul className="info-dropdown__items">
            {items.map((item, i) => (
              <li key={i}>{`${item[0]}: ${item[1]}`}</li>
            ))}
          </ul>
          <button className="info-dropdown__button" onClick={handleToggleItems}>
            <ion-icon name="chevron-down-outline"></ion-icon>
            {toggle ? <span>see less</span> : <span>see more</span>}
          </button>
        </div>
      )}
    </>
  );
};

export default InfoDropdown;
