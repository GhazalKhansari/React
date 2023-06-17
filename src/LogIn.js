import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "react-toastify/dist/ReactToastify.css";
import "./login-signup.css";
import axios from "axios";
import { Badge } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const phoneNumberRegex = /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/;
  const userNameRegex = /^(?=.{8,20}$)(?![_.])[a-zA-Z0-9._]+(?<![_.])$/;
  const [Email, setEmail] = useState(true);
  const [password, setPassword] = useState(true);
  const [passwordText, setPasswordText] = useState("");
  const [userName, setUserName] = useState(true);
  const [confirmPass, setConfirmPass] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState(true);
  const [confirmPassTouched, setConfirmPassTouched] = useState(false);
  const [userNameText, setUserNameText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [phoneNumberText, setPhoneNumberText] = useState("");
  const [confirmPassText, setConfirmPassText] = useState("");
  const [error, setError] = useState("");
  const [logInUserNameOrEmail, setLogInUserNameOrEmail] = useState(false);
  const [logInUserNameOrEmailText, setLogInUserNameOrEmailText] = useState("");
  const [logInPass, setLogInPass] = useState(true);
  const [logInPassText, setLogInPassText] = useState("");
  const [logInShow, setLogInShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.user);



  const sendSignUpData = async () => {
    try {
      const { data } = await axios.post(
        "http://kzico.runflare.run/user/signup",
        {
          username: userNameText,
          email: emailText,
          password: passwordText,
          mobile: phoneNumberText,
        }
      );
      setLogInShow(true);
      toast("Your account has been successfully created.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        type: "success",
      });
    } catch (error) {
      toast(error.response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        type: "error",
      });
    }
  };
  const sendLogInData = async () => {
    try {
      const { data } = await axios.post(
        "http://kzico.runflare.run/user/login",
        {
          email: logInUserNameOrEmailText,
          password: logInPassText,
        }
      );
      toast(`Welcome ${data.user.username}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        type: "success",
      });

      dispatch({ type: "login", payload: data.user });
      localStorage.setItem("User", JSON.stringify(data.user));
      setTimeout(()=>{
        navigate("/")
      },2000)         
      
    } catch (error) {
      toast(error.response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        type: "error",
      });
    }
  };

  useEffect(()=>{
    if(token){
      navigate("*")
    }
  },[])

  return (
    <div>
      <Navbar />
      <div
        style={{
          margin: "0",
          marginTop: "1.5rem",
          padding: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          fontFamily: "'Jost', sans-serif",
          background: "#fff)",
        }}
      >
        <div className="main">
          <input
            className="login-signup-input"
            type="checkbox"
            id="chk"
            aria-hidden="true"
          ></input>
          <div className="signup">
            <form onSubmit={(e) => e.preventDefault()}>
              <label
                className="login-signup-label"
                style={{
                  marginBottom: "0",
                  marginTop: "1rem",
                  transform: logInShow ? "scale(0.6)" : "scale(1)",
                }}
                htmlFor="chk"
                aria-hidden="true"
                onClick={() => setLogInShow(false)}
              >
                Sign up
              </label>
              <input
                className="login-signup-input"
                style={{
                  border: !userName ? "1px solid red" : "1px solid #e3e5ed",
                }}
                onFocus={() => setUserName(true)}
                onBlur={(e) => {
                  if (userNameRegex.test(e.target.value)) {
                    setUserName(true);
                    setUserNameText(e.target.value);
                  } else {
                    setUserName(false);
                  }
                }}
                type="text"
                name="txt"
                placeholder="User name"
              />
              {!userName && (
                <small style={{ color: "red" }}>
                  username should contain 8-20 characters, no _ or . at the
                  beginning or the end
                </small>
              )}
              <input
                className="login-signup-input"
                style={{ border: !Email && "1px solid red" }}
                type="email"
                name="email"
                placeholder="Email"
                onFocus={() => setEmail(true)}
                onBlur={(e) => {
                  if (emailRegex.test(e.target.value)) {
                    setEmail(true);
                    setEmailText(e.target.value);
                  } else {
                    setEmail(false);
                  }
                }}
              />
              {!Email && (
                <small style={{ color: "red" }}>
                  please enter a valid email
                </small>
              )}
              <input
                className="login-signup-input"
                style={{ border: !password && "1px solid red" }}
                onBlur={(e) => {
                  if (passwordRegex.test(e.target.value)) {
                    setPassword(true);
                    setPasswordText(e.target.value);
                  } else {
                    setPassword(false);
                  }
                }}
                onFocus={() => setPassword(true)}
                type="password"
                name="pswd"
                placeholder="Password"
              />
              {!password && (
                <small
                  style={{
                    display: "inline-block",
                    padding: "0 1rem",
                    textAlign: "center",
                    color: "red",
                  }}
                >
                  Your password should at least contain:8 characters, 1 letter,
                  1 number and 1 special character
                </small>
              )}
              <input
                className="login-signup-input"
                style={{
                  border:
                    confirmPassTouched &&
                    (confirmPass ? "1px solid green" : "1px solid red"),
                }}
                onFocus={() => {
                  setConfirmPassTouched(false);
                  setConfirmPass(true);
                }}
                onBlur={(e) => {
                  setConfirmPassTouched(true);
                  if (
                    e.target.value.length &&
                    passwordText === e.target.value
                  ) {
                    setConfirmPass(true);
                    setConfirmPassText(e.target.value);
                  } else {
                    setConfirmPass(false);
                  }
                }}
                type="password"
                name="co-pswd"
                placeholder="Confirm Password"
              />
              {!confirmPass && (
                <small style={{ color: "red" }}>Passwords doesnt match!</small>
              )}
              <input
                className="login-signup-input"
                style={{ border: !phoneNumber && "1px solid red" }}
                onFocus={() => setPhoneNumber(true)}
                onBlur={(e) => {
                  if (phoneNumberRegex.test(e.target.value)) {
                    setPhoneNumber(true);
                    setPhoneNumberText(e.target.value);
                  } else {
                    setPhoneNumber(false);
                  }
                }}
                type="tel"
                name="Ph-Num"
                placeholder="Phone Number"
              />
              {!phoneNumber && (
                <small style={{ color: "red" }}>
                  please enter a valid Phone number
                </small>
              )}
              <button
                className="login-signup-button"
                onClick={() => {
                  if (
                    userNameText.length &&
                    emailText.length &&
                    passwordText.length &&
                    phoneNumberText.length &&
                    confirmPassText.length
                  ) {
                    sendSignUpData();
                  }
                }}
                style={{ color: "#fff", backgroundColor: "#283618" }}
              >
                Sign up
              </button>
            </form>
          </div>
          <div
            className="login"
            style={{
              transform: logInShow
                ? "translateY(-678px)"
                : "translateY(-180px)",
            }}
          >
            <form onSubmit={(e) => e.preventDefault()}>
              <label
                className="login-signup-label"
                htmlFor="chk"
                aria-hidden="true"
                onClick={() => setLogInShow(true)}
                style={{
                  transform: logInShow ? "scale(1)" : "scale(0.6)",
                }}
              >
                Login
              </label>
              <input
                className="login-signup-input"
                onFocus={() => setLogInUserNameOrEmail(false)}
                onBlur={(e) => {
                  if (e.target.value.trim()) {
                    setLogInUserNameOrEmail(true);
                    setLogInUserNameOrEmailText(e.target.value);
                  } else {
                    setLogInUserNameOrEmail(false);
                  }
                }}
                type="text"
                name="email"
                placeholder="Email or Username"
              ></input>

              <input
                className="login-signup-input"
                onFocus={() => setLogInPass(true)}
                onBlur={(e) => {
                  if (passwordRegex.test(e.target.value)) {
                    setLogInPass(true);
                    setLogInPassText(e.target.value);
                  } else {
                    setLogInPass(false);
                  }
                }}
                type="password"
                name="pswd"
                placeholder="Password"
              ></input>
              <button
              type="submit"
                className="login-signup-button"
                onClick={() => {
                  if (logInPass && logInUserNameOrEmail) {
                    sendLogInData();
                  } else {
                    toast("Email/username or password is wrong", {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                      type: "error",
                    });
                  }
                }}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
