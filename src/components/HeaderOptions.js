import React from "react";
import "./HeaderOptions.css";

const HeaderOptions = ({ title, borderRight, Icon, paddingRight }) => {
  return (
    <div className={`headerOption ${paddingRight && "headerIcon"}`}>
      {title && (
        <div
          className={`headerOption__container ${
            borderRight && "headerOption__borderRight"
          }`}
        >
          <h4>{title}</h4>
        </div>
      )}
      {Icon && (
        <div className="headerOption__userInfo">
          <Icon className="headerOption__icons" />
        </div>
      )}
    </div>
  );
};

export default HeaderOptions;
