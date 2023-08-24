import React, { useState, forwardRef } from "react";
import "./Scrips.css";
import { IconButton } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import { useDispatch } from "react-redux";
import { openBuyDialog } from "../features/dialogSlice";
import { setStock } from "../features/stockSlice";
import { db } from "../firebase";

const Scrips = forwardRef(
  ({ green, priceMove, percentMove, stock, price, id, key }, ref) => {
    const [mouseOver, setMouseOver] = useState(false);
    const dispatch = useDispatch();

    const buyStock = () => {
      dispatch(
        setStock({
          stockName: stock,
          stockPrice: price,
          quantity: 1,
        })
      );
      dispatch(
        openBuyDialog({
          isOpen: true,
          action: "buy",
        })
      );
    };

    const deleteScrip = () => {
      db.collection("scrips").doc(id).delete();
    };
    return (
      <div ref={ref}>
        <div
          className="scrip"
          onMouseEnter={() => setMouseOver(true)}
          onMouseLeave={() => setMouseOver(false)}
        >
          <div className="scrip__left">
            <h3
              className={`${
                green === "green" ? "scrip__leftgreen" : "scrip__leftred"
              }`}
            >
              {stock}
            </h3>
          </div>
          <div className="scrip__right">
            <div className="scrip__rightFixed">
              <div className="scrip__rightPriceContainer">
                <p className="scrip__rightMove">{priceMove}</p>
                <p className="scrip__rightPercent">{percentMove + "%"}</p>
              </div>
              <div className="scrip__rightSymbolContainer">
                {green === "green" ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
                <p
                  className={`${
                    green === "green" ? "scrip__leftgreen" : "scrip__leftred"
                  }`}
                >
                  {price}
                </p>
              </div>
            </div>
            {mouseOver && (
              <div className="scrip__rightHover">
                <button className="scrip__buyButton" onClick={buyStock}>
                  B
                </button>
                <button className="scrip__sellButton">S</button>
                <IconButton className="scrip__actionButtons">
                  <FormatAlignCenterIcon className="scrip_action" />
                </IconButton>
                <IconButton className="scrip__actionButtons">
                  <DeleteOutlineIcon
                    className="scrip_action"
                    onClick={deleteScrip}
                  />
                </IconButton>
                <IconButton className="scrip__actionButtons">
                  <TrendingUpIcon className="scrip_action" />
                </IconButton>
                <IconButton className="scrip__actionButtons">
                  <MoreHorizIcon className="scrip_action" />
                </IconButton>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default Scrips;
