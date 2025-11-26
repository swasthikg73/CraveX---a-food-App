import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import "./LoginPopup.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const LoginPopup = ({ SetShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Sign Up");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    await axios.post(newUrl, data).then((res) => {
      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("tokenCraveX", res.data.token);
        toast.success(res.data.message);
        SetShowLogin(false);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="login-popup">
        <form onSubmit={onLogin} className="login-popup-container">
          <div className="login-popup-title">
            <h2>{currState}</h2>
            <img
              onClick={() => SetShowLogin(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>

          <div className="login-popup-inputs">
            {currState == "Login" ? (
              <></>
            ) : (
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={onChangeHandler}
                placeholder="Your name"
                required
              />
            )}
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={onChangeHandler}
              placeholder="Your email"
              required
            />
            <input
              type="text"
              name="password"
              value={data.password}
              onChange={onChangeHandler}
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit">
            {currState === "Sign Up" ? "Create account" : "Login"}
          </button>
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
          {currState === "Login" ? (
            <p>
              Create a new account?{" "}
              <span onClick={() => setCurrState("Sign Up")}>Click here</span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setCurrState("Login")}>Login here</span>
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default LoginPopup;
