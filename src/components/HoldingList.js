import React, { useEffect, useState } from "react";
import "./HoldingList.css";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import SearchIcon from "@mui/icons-material/Search";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { Button } from "@mui/material";
import Table from "./Table";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

const HoldingList = () => {
  const [holdings, setHoldings] = useState(null);
  const user = useSelector(selectUser);

  useEffect(() => {
    db.collection("holdings")
      .where("user", "==", user.id)
      .onSnapshot((snapshot) => {
        setHoldings(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);

  return (
    <div className="holdingList">
      <div className="holdingList__header">
        <div className="holdingList__headerLeft">
          <h2>Holdings ({holdings?.length})</h2>
          <select name="" id="">
            <option>All Stocks</option>
            <option>Kite Only</option>
            <option>Mutual Funds</option>
          </select>
        </div>
        <div className="holdingList__headerRight">
          <div className="holdingList__rightSearch">
            <SearchIcon style={{ paddingLeft: "5px" }} />
            <input type="text" placeholder="Search" />
          </div>
          {/* <IconButton style={{ marginLeft: "20px" }}>
            <WorkIcon />
          </IconButton> */}
          <Button className="holdingList__rightButton">
            <WorkOutlineIcon />
            <p>Authorisation</p>
          </Button>
          <Button className="holdingList__rightButton">
            <PeopleOutlineIcon />
            <p>Family</p>
          </Button>
          <Button className="holdingList__rightButton">
            <DataUsageIcon />
            <p>Analytics</p>
          </Button>
          <Button className="holdingList__rightButton">
            <SaveAltIcon />
            <p>Download</p>
          </Button>
        </div>
      </div>
      <Table />
    </div>
  );
};

export default HoldingList;
