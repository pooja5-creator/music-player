import React from "react";
import { NavLink } from "react-router-dom";
import linkArr from "../LinkData";
const SideBar = ({ showSideBar, setShowSideBar }) => {
  return (
    <div className={`side_bar_container ${showSideBar ? "active" : ""}`}>
      <div className="logo">
        <span>
          <i className="fa-brands fa-spotify"></i>
        </span>
        Spotify
      </div>
      <div className="linkContainer">
        {linkArr.map((item, index) => (
          <NavLink
            to={`/${item.link}`}
            key={index}
            className={({ isActive }) => (isActive ? "active" : "links")}
          >
            {item.linkName}
          </NavLink>
        ))}
      </div>
      <div className="x-mark" onClick={() => setShowSideBar(false)}>
        <i className="fa-solid fa-xmark"></i>
      </div>
    </div>
  );
};

export default React.memo(SideBar);
