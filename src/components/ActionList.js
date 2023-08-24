import React from "react";
import "./ActionList.css";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import RedeemIcon from "@mui/icons-material/Redeem";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const ActionList = () => {
  return (
    <ul className="actionList">
      <li>
        <RemoveIcon />
        <span>Exit</span>
      </li>
      <li>
        <AddIcon />
        <span>Add</span>
      </li>
      <li style={{ borderBottom: "1px solid whitesmoke" }}>
        <AlternateEmailIcon />
        <span>View Breakdown</span>
      </li>
      <li>
        <RedeemIcon />
        <span>Send as a gift</span>
      </li>
      <li>
        <FormatAlignCenterIcon />
        <span>Market Depth</span>
      </li>
      <li style={{ borderBottom: "1px solid whitesmoke" }}>
        <TrendingUpIcon />
        <span>Chart</span>
      </li>
      <li>
        <PlaylistAddIcon />
        <span>Add to marketwatch</span>
      </li>
    </ul>
  );
};

export default ActionList;
