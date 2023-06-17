import React, { useState } from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import "./changeProfile.css";
import CityOptions from "./CityOptions";
// import YearsOption from "./YearsOption";
// import MonthOption from "./MonthOption";
// import DaysOption from "./DaysOption";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
const ChangeProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");

  const { token } = useSelector((state) => state.user);

  const changeUserProfile = async () => {
    try {
      await axios.put(
        "http://kzico.runflare.run/user/change-profile",
        {
          firstname: firstName,
          lastname: lastName,
          gender: gender,
          age: age,
          city: city,
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
        title: "Your profile has been successfully changed",
        showConfirmButton: false,
        timer: 1500,
      });
      setFirstName("");
      setLastName("");
      setAge("");
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);

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
          <form
            name="newUser"
            className="register"
            onSubmit={(e) => e.preventDefault()}
          >
            <h1 className="change-profile-h1">Change profile</h1>

            <fieldset className="row2">
              <div className="form-group">
                <label className="change-profile-label">First Name </label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  name="userFirst"
                  className="form-control"
                />

                <label className="change-profile-label">Last Name </label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  name="userFirst"
                  className="form-control"
                />
                <label className="change-profile-label">Age </label>
                <input
                  value={age ? age : ""}
                  onChange={(e) => setAge(e.target.value)}
                  type="number"
                  name="userFirst"
                  className="form-control"
                />
                <label className="change-profile-label">City </label>
                <select
                  onChange={(e) => setCity(e.target.value)}
                  style={{ margin: "1.5rem 0 1rem " }}
                >
                  <CityOptions />
                </select>
              </div>
            </fieldset>

            <fieldset className="row3">
              <div className="form-group">
                <label className="change-profile-label">
                  Gender :
                  <input
                    onChange={(e) => setGender(e.target.value)}
                    type="radio"
                    name="userGender"
                    value="male"
                  />
                  Male
                  <input
                    onChange={(e) => setGender(e.target.value)}
                    type="radio"
                    name="userGender"
                    value="female"
                  />
                  Female
                </label>
              </div>
            </fieldset>
            <fieldset className="row4">
              <div>
                <button
                  onClick={() => {
                    if (!firstName || !lastName || !city || !gender || !age) {
                      Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Please fill all the form",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    } else if (firstName.length < 3) {
                      Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "First name must be more than 3 characters",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    } else if (lastName.length < 3) {
                      Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Last name must be more than 3 characters",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    } else if (age <= 15) {
                      Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Age must be more than 15",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    } else if (
                      firstName.length > 3 &&
                      lastName.length > 3 &&
                      city.length &&
                      gender.length &&
                      age >= 15
                    ) {
                      changeUserProfile();
                    }
                  }}
                  type="button"
                  id="registerButton"
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

export default ChangeProfile;
