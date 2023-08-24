import React, { useState } from "react";
import "./TableRow.css";
import { useDispatch } from "react-redux";
import { openBuyDialog } from "../features/dialogSlice";
import { setStock } from "../features/stockSlice";

const TableRow = ({
  id,
  stockName,
  quantity,
  avgCost,
  lastTradePrice,
  currentValue,
  pl,
  netChg,
  dayChg,
}) => {
  const [display, setDisplay] = useState(false);

  const dispatch = useDispatch();
  // const list = useSelector(selectBuyDialog);

  const openSellDialog = () => {
    dispatch(
      openBuyDialog({
        isOpen: true,
        action: "sell",
      })
    );

    dispatch(
      setStock({
        stockName: stockName,
        stockPrice: lastTradePrice,
        quantity: quantity,
        id: id,
      })
    );
  };
  return (
    <tr className="tableRow">
      <td
        className="table__instrument"
        onMouseEnter={() => setDisplay(true)}
        onMouseLeave={() => setDisplay(false)}
      >
        {stockName}{" "}
        {display && (
          <div className="tableRow__hover">
            <button className="tableRow__button" onClick={openSellDialog}>
              S
            </button>
          </div>
        )}
      </td>
      <td className="table__quantity">{quantity}</td>
      <td className="table__avgCost">{avgCost}</td>
      <td className="table__LTP">{lastTradePrice}</td>
      <td className="table__currValue">{currentValue}</td>
      <td className="table__pl" style={{ color: "green" }}>
        {pl}
      </td>
      <td className="table__netChg" style={{ color: "green" }}>
        {netChg + "%"}
      </td>
      <td className="table__dayChg" style={{ color: "green" }}>
        {dayChg + "%"}
      </td>
    </tr>
  );
};

export default TableRow;
