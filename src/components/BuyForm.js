import React, { useState } from "react";
import "./BuyForm.css";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import { IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Button } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from "react-redux";
import { closeBuyDialog } from "../features/dialogSlice";
import { resetBuyStock, resetStock, selectStock } from "../features/stockSlice";
import { db } from "../firebase";
import { selectUser } from "../features/userSlice";

const BuyForm = ({ action }) => {
  const dispatch = useDispatch();
  const stock = useSelector(selectStock);
  const [quantity, setQuantity] = useState(stock?.quantity);
  const [buyPrice, setBuyPrice] = useState(stock?.stockPrice);
  const user = useSelector(selectUser);

  const placeOrder = () => {
    if (action === "buy") {
      db.collection("holdings").add({
        stockName: stock?.stockName,
        lastTradePrice: stock?.stockPrice,
        quantity: quantity,
        avgCost: buyPrice,
        user: user.id,
        currentValue: parseFloat(buyPrice * quantity).toFixed(2),
        pl: (parseFloat(stock?.stockPrice - buyPrice) * quantity).toFixed(2),
        netChg: parseFloat(
          (((stock?.stockPrice - buyPrice) / buyPrice) * 100).toFixed(2)
        ),
        dayChg: parseFloat(
          (((stock?.stockPrice - buyPrice) / buyPrice) * 100).toFixed(2)
        ),
      });
      dispatch(resetBuyStock());
    } else {
      db.collection("holdings").doc(stock?.id).delete();
      dispatch(resetStock());
    }

    dispatch(closeBuyDialog());
  };
  return (
    <div className="buyForm">
      <div
        className={`${
          action === "buy" ? "buyForm__header" : "buyForm__sellHeader"
        }`}
      >
        <div className="buyForm__header1">
          <h3>
            Buy {stock?.stockName} <span>NSE</span> x 1 Qty
          </h3>
          <IconButton className="buyForm__headerIcons">
            <ToggleOffIcon />
            <InfoIcon />
          </IconButton>
        </div>
        <div className="buyForm__header2">
          <input type="radio" name="BSE" value="BSE" />
          <span style={{ color: "#e2e0e0" }}>BSE: {stock?.stockPrice}</span>
          <input type="radio" name="NSE" value="NSE" defaultChecked />
          <span>NSE: {stock?.stockPrice}</span>
        </div>
      </div>
      <div className="buyForm__subHeader">
        <div className="buyForm__options">
          <p
            className={`${
              action === "buy"
                ? "buyForm__selectedBuy"
                : "buyForm__selectedSell"
            }`}
          >
            Regular
          </p>
          <p>Cover</p>
          <p>AMO</p>
          <p>Iceberg</p>
        </div>
        <Button className="buyForm__tags">
          <LocalOfferIcon style={{ fontSize: "14px" }} />
          <p>Tags</p>
        </Button>
      </div>
      <div className="buyForm__body">
        <div className="buyForm__bodyTop">
          <div>
            <input type="radio" style={{ marginRight: "5px" }} />
            <span>
              Intraday{" "}
              <span style={{ color: "#cccccc", marginLeft: "5px" }}>MIS</span>
            </span>
          </div>
          <div>
            <input type="radio" defaultChecked style={{ marginRight: "5px" }} />
            <span>
              Longterm{" "}
              <span style={{ color: "#cccccc", marginLeft: "5px" }}>CNC</span>
            </span>
          </div>
        </div>
        <div className="buyForm__bodyMain">
          <div className="buyForm__quantity">
            <label htmlFor="quantity">Qty</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="buyForm__price">
            <label htmlFor="quantity">Price</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
            />
          </div>
          <div
            className="buyForm__triggerPrice"
            style={{ opacity: "0.6", flex: "0.34" }}
          >
            <label htmlFor="quantity">Trigger Price</label>
            <input type="number" name="quantity" id="quantity" disabled />
          </div>
        </div>
        <div className="buyForm__bodyBottom">
          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input type="radio" style={{ marginRight: "5px" }} />
              <span>Market </span>
              <input
                type="radio"
                style={{ marginRight: "5px", marginLeft: "25px" }}
                defaultChecked
              />
              <span>Limit </span>
            </div>
          </div>
          <div style={{ flex: "0.34" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input type="radio" style={{ marginRight: "5px" }} />
              <span>SL </span>
              <input
                type="radio"
                style={{ marginRight: "5px", marginLeft: "25px" }}
              />
              <span>SL-M </span>
            </div>
            <Button className="buyForm__tags" style={{ paddingTop: "20px" }}>
              <p style={{ fontSize: "10px" }}>More Options</p>
              <KeyboardArrowDownIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="buyForm__footer">
        <div className="buyForm__footerLeft">
          <p>
            Margin <span>Rs. 0.00</span>
          </p>
          <p>
            Charges <span>Rs. 0.00</span>
          </p>
        </div>
        <div className="buyForm__footerRight">
          <button
            onClick={placeOrder}
            className={`${
              action === "buy" ? "buyForm__buyButton" : "buyForm__sellButton"
            }`}
          >
            {action === "buy" ? "Buy" : "Sell"}
          </button>
          <button
            onClick={() => dispatch(closeBuyDialog())}
            className="buyForm__cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyForm;
