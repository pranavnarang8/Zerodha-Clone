import React, { useState } from "react";
import "./Login.css";
import { auth, db } from "../firebase";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const dispatch = useDispatch();

  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        console.log(authUser.user);
        db.collection("users").add({
          email: authUser.user.email,
          id: authUser.user.uid,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const login = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://play-lh.googleusercontent.com/wnNYBAH1m-XJMfduOHfEATQAhCwyKUYeHAD1Fi9-OjtxKyPKjFEmgWvbx-OX2dM65xjp"
          alt=""
        />
        <h3>Login to Kite</h3>
        <div className="login__credentials">
          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={login}>Login</button>
        <p>Forgot User ID or Password?</p>
      </div>
      <p onClick={signUp}>Don't Have an Account? Signup Now!</p>
    </div>
  );
};

export default Login;
