import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import Navbar from "./Navbar";
import SideBar from "./SideBar";

const ChangePassword = () => {
  const [currentPassText, setCurentPassText] = useState("");
  const [currentPass, setCurentPass] = useState(true);
  const [newPassText, setNewPassText] = useState("");
  const [newPass, setNewPass] = useState(true);
  const [confirmPassText, setConfirmPassText] = useState("");
  const [confirmPass, setConfirmPass] = useState(true);
  const [confirmPassTouched, setConfirmPassTouched] = useState(false);
  const { token } = useSelector((state) => state.user);
  const [error, setError] = useState("");
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const ChangePass = async () => {
    try {
      await axios.put(
        "http://kzico.runflare.run/user/change-password",
        {
          old_password: currentPassText,
          new_password: newPassText,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your password has been successfully changed",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      setError(error.response.data.message);
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <Navbar />
      <SideBar />
      <div
        className="change-profile-container"
        style={{ alignItems: "center", height: "80vh" }}
      >
        <div id="newUser" className="col-sm-4 col-sm-offset-4">
          <form name="newUser" className="register">
            <h1 className="change-profile-h1">Change password</h1>

            <fieldset className="row2">
              <div className="form-group">
                <label className="change-profile-label">Current password</label>
                <input
                  style={{ border: !currentPass && "1px solid red" }}
                  onBlur={(e) => {
                    if (passwordRegex.test(e.target.value)) {
                      setCurentPass(true);
                      setCurentPassText(e.target.value);
                    } else {
                      setCurentPass(false);
                    }
                  }}
                  onFocus={() => setNewPass(true)}
                  type="password"
                  name="userFirst"
                  className="form-control"
                />

                {!currentPass && (
                  <small
                    style={{
                      padding: "0 1rem",
                      textAlign: "center",
                      color: "red",
                      marginTop: "0.5rem",
                    }}
                  >
                    Your current password is wrong
                  </small>
                )}

                <label className="change-profile-label">New Password</label>
                <input
                  style={{ border: !newPass && "1px solid red" }}
                  onBlur={(e) => {
                    if (passwordRegex.test(e.target.value)) {
                      setNewPass(true);
                      setNewPassText(e.target.value);
                    } else {
                      setNewPass(false);
                    }
                  }}
                  onFocus={() => setNewPass(true)}
                  name="pswd"
                  type="password"
                  className="form-control"
                />
                {!newPass && (
                  <small
                    style={{
                      display: "inline-block",
                      padding: "0 1rem",
                      textAlign: "center",
                      color: "red",
                      marginTop: "0.5rem",
                    }}
                  >
                    Your password should at least contain:8 characters, 1
                    letter, 1 number and 1 special character
                  </small>
                )}
                <label className="change-profile-label">
                  Confirm new Password
                </label>
                <input
                  name="pswd"
                  type="password"
                  className="form-control"
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
                      newPassText === e.target.value
                    ) {
                      setConfirmPass(true);
                      setConfirmPassText(e.target.value);
                    } else {
                      setConfirmPass(false);
                    }
                  }}
                />
                {!confirmPass && confirmPassText.trim() && (
                  <small
                    style={{
                      display: "inline-block",
                      padding: "0 1rem",
                      textAlign: "center",
                      color: "red",
                      marginTop: "0.5rem",
                    }}
                  >
                    Passwords doesnt match!
                  </small>
                )}
              </div>
              <div>
                <button
                  onClick={() => {
                    if (
                      currentPassText.trim() === newPassText.trim() &&
                      currentPassText &&
                      newPassText
                    ) {
                      Swal.fire({
                        position: "center",
                        icon: "error",
                        title:
                          "Your new password can't be as same as your old password",
                        showConfirmButton: false,
                        timer: 2500,
                      });
                    } else if (!confirmPassText && currentPassText && newPassText) {
                      Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Passwords doesn't match!",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    } else if (
                      !currentPassText ||
                      !newPassText ||
                      !confirmPassText
                    ) {
                      Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Please fill all the form",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    } else if (
                      currentPassText.length &&
                      newPassText.length &&
                      confirmPassText.length
                    ) {
                      ChangePass();
                    }
                  }}
                  type="button"
                  id="registerButton"
                  className="done-button"
                >
                  Done
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
