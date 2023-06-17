import React, { useState } from "react";
import Navbar from "./Navbar";
import "./address.css";
import CityOptions from "./CityOptions";
import StateOptions from "./StateOptions";
import CountryOptions from "./CountryOptions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const Address = () => {
  const phoneNumberRegex = /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/;
  const [firstNameText, setFirstNameText] = useState("");
  const [firstName, setFirstName] = useState(true);
  const [lastNameText, setLastNameText] = useState("");
  const [lastName, setLastName] = useState(true);
  const [addressText, setAddressText] = useState("");
  const [address, setAddress] = useState(true);
  const [phoneNumberText, setPhoneNumberText] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(true);
  const [countryText, setCountryText] = useState("");
  const [country, setCountry] = useState(true);
  const [zipCodeText, setZipCodeText] = useState("");
  const [zipCode, setZipCode] = useState(true);
  const [cityText, setCityText] = useState("");
  const [city, setCity] = useState(true);
  const [stateText, setStateText] = useState("");
  const [state, setState] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="address-container">
        <h1 className="shipping">Shipping</h1>
        <p>Please enter your shipping details.</p>
        <hr className="address-hr" />
        <div className="form">
          <div className="fields fields--2">
            <label
              style={{ border: !firstName && "1px solid red" }}
              className="field"
            >
              <span className="field__label" htmlFor="firstname">
                First name
              </span>
              <input
                onFocus={() => setFirstName(true)}
                onBlur={(e) => {
                  if (e.target.value.trim()) {
                    setFirstName(true);
                    setFirstNameText(e.target.value);
                  } else {
                    setFirstName(false);
                  }
                }}
                className="field__input"
                type="text"
                id="firstname"
              />
            </label>
            <label
              style={{ border: !lastName && "1px solid red" }}
              className="field"
            >
              <span className="field__label" htmlFor="lastname">
                Last name
              </span>
              <input
                onFocus={() => setLastName(true)}
                onBlur={(e) => {
                  if (e.target.value.trim()) {
                    setLastName(true);
                    setLastNameText(e.target.value);
                  } else {
                    setLastName(false);
                  }
                }}
                className="field__input"
                type="text"
                id="lastname"
              />
            </label>
          </div>
          <label
            style={{ border: !address && "1px solid red" }}
            className="field"
          >
            <span className="field__label" htmlFor="address">
              Address
            </span>
            <input
              onFocus={() => setAddress(true)}
              onBlur={(e) => {
                if (e.target.value.trim()) {
                  setAddress(true);
                  setAddressText(e.target.value);
                } else {
                  setAddress(false);
                }
              }}
              className="field__input"
              type="text"
              id="address"
            />
          </label>
          <label
            style={{ border: !phoneNumber && "1px solid red" }}
            className="field"
          >
            <span className="field__label" htmlFor="phoneNumber">
              Phone number
            </span>
            <input
              onFocus={() => setPhoneNumber(true)}
              onBlur={(e) => {
                if (phoneNumberRegex.test(e.target.value)) {
                  setPhoneNumber(true);
                  setPhoneNumberText(e.target.value);
                } else {
                  setPhoneNumber(false);
                }
              }}
              className="field__input"
              type="tel"
              id="phoneNumber"
            />
          </label>
          {!phoneNumber && (
            <small style={{ color: "red" }}>
              please enter a valid Phone number
            </small>
          )}
          <label
            style={{ border: !country && "1px solid red" }}
            className="field"
          >
            <span className="field__label" htmlFor="country">
              Country
            </span>

            <select
              onFocus={() => setCountry(true)}
              onBlur={(e) => {
                if (e.target.value.trim()) {
                  setCountry(true);
                  setCountryText(e.target.value);
                } else {
                  setCountry(false);
                }
              }}
              className="field__input"
              id="country"
              name="country"
            >
              <CountryOptions />
            </select>
          </label>
          <div className="fields fields--3">
            <label
              style={{ border: !zipCode && "1px solid red" }}
              className="field"
            >
              <span className="field__label" htmlFor="zipcode">
                Zip code
              </span>
              <input
                onFocus={() => setZipCode(true)}
                onBlur={(e) => {
                  if (e.target.value.trim()) {
                    setZipCode(true);
                    setZipCodeText(e.target.value);
                  } else {
                    setZipCode(false);
                  }
                }}
                className="field__input"
                type="text"
                id="zipcode"
              />
            </label>
            <label
              style={{ border: !city && "1px solid red" }}
              className="field"
            >
              <span className="field__label" htmlFor="city">
                City
              </span>

              <select
                onFocus={() => setCity(true)}
                onBlur={(e) => {
                  if (e.target.value.trim()) {
                    setCity(true);
                    setCityText(e.target.value);
                  } else {
                    setCity(false);
                  }
                }}
                className="field__input"
                id="city"
                name="city"
              >
                <CityOptions />
              </select>
            </label>

            <label
              style={{ border: !state && "1px solid red" }}
              className="field"
            >
              <span className="field__label" htmlFor="state">
                State
              </span>
              <select
                onFocus={() => setState(true)}
                onBlur={(e) => {
                  if (e.target.value.trim()) {
                    setState(true);
                    setStateText(e.target.value);
                  } else {
                    setState(false);
                  }
                }}
                className="field__input"
                id="country-state"
                name="country-state"
              >
                <option></option>
                <StateOptions />
              </select>
            </label>
          </div>
        </div>
        <hr />
        <button
          onClick={() => {
            if (
              firstNameText.length &&
              lastNameText.length &&
              addressText.length &&
              phoneNumberText.length &&
              zipCodeText.length &&
              cityText.length &&
              stateText.length &&
              countryText.length
            ) {
              dispatch({
                type: "address",
                payload: {
                  address: addressText,
                  city: cityText,
                  postalCode: zipCodeText,
                  phone: phoneNumberText,
                },
              });
             
              dispatch({
                type: "addressExtras",
                payload: {
                  firstName: firstNameText,
                  lastName: lastNameText,
                  state: stateText,
                  country: countryText,
                },
              });
              
              
              navigate("/CheckOut");
            } else {
              toast("Please fill out the form ", {
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
          className="address-button"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Address;
