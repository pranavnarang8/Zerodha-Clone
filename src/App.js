import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { selectBuyDialog, selectDialog } from "./features/dialogSlice";
import ScripForm from "./components/ScripForm";
import HoldingList from "./components/HoldingList";
import BuyForm from "./components/BuyForm";
import { selectStock } from "./features/stockSlice";
import { login, logout, selectUser } from "./features/userSlice";
import Login from "./components/Login";
import { auth } from "./firebase";

function App() {
  const dialog = useSelector(selectDialog);
  const buyDialog = useSelector(selectBuyDialog);
  const stock = useSelector(selectStock);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        console.log(userAuth);
        dispatch(
          login({
            email: userAuth.email,
            id: userAuth.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {!user ? (
        <Login />
      ) : (
        <div
          className={`app ${dialog && "app--inactive"} ${
            buyDialog && "app--scrollDisable"
          } `}
        >
          <Header />
          <div className="app__body">
            <Sidebar />
            <HoldingList />
          </div>
        </div>
      )}
      {dialog && <ScripForm />}
      {buyDialog && stock && <BuyForm action={buyDialog.action} />}
    </>
  );
}

export default App;
