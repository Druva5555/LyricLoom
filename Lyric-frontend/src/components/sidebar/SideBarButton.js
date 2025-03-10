import React from "react";
import { IconContext } from "react-icons";
import { Link, useLocation } from "react-router-dom";
import "./SideBarButton.css";

export default function SideBarButton(props) {
  const location = useLocation();

  const isActive = location.pathname === props.to;

  const btnClass = isActive ? "btn-body active" : "btn-body";

  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  if (props.onClick) {
    return (
      <button className={btnClass} onClick={handleClick}>
        <IconContext.Provider value={{ size: "16px", className: "btn-icon" }}>
          {props.icon}
          <p className="btn-title">{props.title}</p>
        </IconContext.Provider>
      </button>
    );
  } else {
    return (
      <Link to={props.to}>
        <div className={btnClass}>
          <IconContext.Provider value={{ size: "16px", className: "btn-icon" }}>
            {props.icon}
            <p className="btn-title">{props.title}</p>
          </IconContext.Provider>
        </div>
      </Link>
    );
  }
}
