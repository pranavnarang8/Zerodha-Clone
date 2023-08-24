import React, { useState, useEffect } from "react";
import "./Table.css";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import TableRow from "./TableRow";

const Table = () => {
  const [holdings, setHoldings] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    db.collection("holdings")
      .where("user", "==", user.id)
      .onSnapshot((snapshot) =>
        setHoldings(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    // eslint-disable-next-line
  }, []);

  return (
    <div className="table">
      <table>
        <thead className="table__header">
          <tr>
            <th className="table__instrument">Instrument</th>
            <th className="table__quantity">Qty.</th>
            <th className="table__avgCost">Avg. cost</th>
            <th className="table__LTP">LTP</th>
            <th className="table__currValue">Cur. val</th>
            <th className="table__pl">P&L</th>
            <th className="table__netChg">Net chg.</th>
            <th className="table__dayChg">Day chg.</th>
          </tr>
        </thead>
        <tbody className="table__body">
          {holdings &&
            holdings.map(
              ({
                id,
                data: {
                  avgCost,
                  currentValue,
                  dayChg,
                  lastTradePrice,
                  netChg,
                  pl,
                  quantity,
                  stockName,
                },
              }) => {
                return (
                  <TableRow
                    key={id}
                    id={id}
                    stockName={stockName}
                    quantity={quantity}
                    avgCost={avgCost}
                    lastTradePrice={lastTradePrice}
                    currentValue={currentValue}
                    pl={pl}
                    netChg={netChg}
                    dayChg={dayChg}
                  />
                );
              }
            )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
