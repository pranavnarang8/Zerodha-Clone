import React from "react";
import "./Header.css";
import HeaderOptions from "./HeaderOptions";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { auth } from "../firebase";

const Header = () => {
  const signOut = (e) => {
    e.preventDefault();
    auth.signOut();
  };
  return (
    <div className="header">
      <div className="header__left">
        <div className="header__leftIndex">
          <p>
            NIFTY 50
            <span className="header__leftPrice">
              {" "}
              19781.65 <span className="header__leftGain">58.25 (0.29%)</span>
            </span>
          </p>
          <p>
            SENSEX
            <span className="header__leftPrice">
              {" "}
              66816.60 <span className="header__leftGain">230.40 (0.35%)</span>
            </span>
          </p>
        </div>
      </div>
      <div className="header__right">
        <div className="header__rightLogo">
          <img
            src="https://play-lh.googleusercontent.com/wnNYBAH1m-XJMfduOHfEATQAhCwyKUYeHAD1Fi9-OjtxKyPKjFEmgWvbx-OX2dM65xjp"
            alt=""
            onClick={signOut}
          />
        </div>
        <div className="header_rightOptions">
          <HeaderOptions title="Dashboard" />
          <HeaderOptions title="Orders" />
          <HeaderOptions title="Holdings" />
          <HeaderOptions title="Positions" />
          <HeaderOptions title="Funds" />
          <HeaderOptions title="Apps" borderRight />
          <HeaderOptions Icon={NotificationsNoneIcon} paddingRight />
          <HeaderOptions Icon={AccountCircleIcon} paddingRight />
          <HeaderOptions title="LH8353" />
        </div>
      </div>
    </div>
  );
};

export default Header;
