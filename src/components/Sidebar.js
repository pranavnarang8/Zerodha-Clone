import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Sidebar.css";
import SearchIcon from "@mui/icons-material/Search";
import Scrips from "./Scrips";
import SettingsIcon from "@mui/icons-material/Settings";
import { openDialog } from "../features/dialogSlice";
import { db } from "../firebase";
import FlipMove from "react-flip-move";
import { selectUser } from "../features/userSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [scrips, setScrips] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    db.collection("scrips")
      .where("user", "==", user.id)
      .onSnapshot((snapshot) =>
        setScrips(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  console.log(scrips);

  return (
    <div className="sidebar">
      <div className="sidebar__search">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search eg: infy bse, nifty fut, nifty weekly, gold mcx"
          onClick={() => dispatch(openDialog())}
        />
        <p>{scrips?.length}/50</p>
      </div>
      {/* <div className="sidebar__scrips"> */}
      <FlipMove>
        {scrips?.map(
          ({ id, data: { stock, price, percent, priceUp, green } }) => {
            return (
              <Scrips
                priceMove={priceUp}
                percentMove={percent}
                price={price}
                stock={stock}
                key={id}
                green={green}
                id={id}
              />
            );
          }
        )}
      </FlipMove>
      {/* </div> */}
      <ul className="sidebar__footer">
        <li className="sidebar__selectedListItem">1</li>
        <li className="sidebar__listItem">2</li>
        <li className="sidebar__listItem">3</li>
        <li className="sidebar__listItem">4</li>
        <li className="sidebar__listItem">5</li>
        <li className="sidebar__listItem">6</li>
        <li className="sidebar__listItem">7</li>
        <li className="sidebar__listSettings">
          <SettingsIcon />
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
