import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./checkOut.css";
import Navbar from "./Navbar";

const CheckOut = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [error, setError] = useState("");
  const [btnClick, setBtnClick] = useState(true);
  const address = useSelector((state) => state.address);
  const addressExtras = useSelector((state) => state.addressExtras);
  const basket = useSelector((state) => state.basket);
  const basketExtra = useSelector((state) => state.basketExtra);
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setOrder = async () => {
    try {
      await axios.post(
        "http://kzico.runflare.run/order/submit",
        {
          orderItems: basket,
          shippingAddress: {
            address: address.address,
            city: address.city,
            postalCode: address.postalCode,
            phone: address.phone,
          },
          paymentMethod: paymentMethod,
          shippingPrice: 25,
          totalPrice: totalPrice,
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
        title: "Your purchase has been successfully submitted",
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch({
        type: "clearBasket",
        payload: [],
      });
      dispatch({
        type: "clearBasketExtra",
        payload: [],
      });
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setError(error.response.data.message);
      Swal.fire({
        position: "center",
        icon: "error",
        title: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    setTotalPrice(
      basketExtra.reduce((total, item) => total + item.price * item.qty, 0) + 25
    );
  }, []);

  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div className="checkout-container">
          <div className="iphone">
            <header className="header">
              <h1 className="CheckOut-h1">your info</h1>
            </header>

            <form className="form">
              <div>
                <h2 className="CheckOut-h2">
                  First name : {addressExtras.firstName}
                </h2>
                <h2 className="CheckOut-h2">
                  Last name : {addressExtras.lastName}
                </h2>
                <h2 className="CheckOut-h2">Address : {address.address}</h2>
                <h2 className="CheckOut-h2">phone number : {address.phone}</h2>
                <h2 className="CheckOut-h2">
                  Country: {addressExtras.country}
                </h2>
                <h2 className="CheckOut-h2">Zip code : {address.postalCode}</h2>
                <h2 className="CheckOut-h2">City : {address.city}</h2>
                <h2 className="CheckOut-h2">State : {addressExtras.state}</h2>
              </div>

              <div>
                <button
                  className="button button--full"
                  type="button"
                  onClick={() => navigate("/Address")}
                >
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="checkout-container">
          <div
            className="iphone"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <header
              className="header"
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <h1 className="CheckOut-h1" style={{ margin: 0 }}>
                Order content
              </h1>
              <h2
                className="order-content-edit"
                onClick={() => navigate("/Cart")}
              >
                Edit
              </h2>
            </header>

            <form
              className="form"
              style={{
                height: "60%",
                overflow: "auto",
                borderTop: "1px solid gray",
                borderBottom: "1px solid gray",
                marginBottom: "1rem",
              }}
            >
              {basketExtra.map((item) => {
                return (
                  <>
                    <div
                      style={{
                        width: "27rem",
                        height: "7.5rem",
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        backgroundColor: "#fbf6f7",
                        // marginBottom: "1rem",
                        // borderBottom: "1px solid gray",
                      }}
                    >
                      <div
                        style={{
                          width: "5rem",
                          height: "5rem",
                          backgroundImage: `url(${item.image})`,
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }}
                      ></div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "50%",
                        }}
                      >
                        <b>{item.name}</b>
                        <p>{item.color}</p>

                        <span>
                          {item.qty} x $ {item.price}
                        </span>
                      </div>
                    </div>
                  </>
                );
              })}
            </form>
            <div
              style={{
                width: "100%",
                backgroundColor: "#fbf6f7",
                // paddingBottom: "2rem",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span>payment method :</span>
                  <form
                    style={{ display: "flex", gap: "0.5rem" }}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <label>
                      <input
                        checked
                        type="radio"
                        name="payment method"
                        value="Cash"
                      />
                      Cash
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="payment method"
                        value="Master card"
                      />
                      Master card
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="payment method"
                        value="Digital Currency"
                      />
                      Digital Currency
                    </label>
                  </form>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span>shipping price</span>
                  <span>$ 25</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span>Total price</span>
                  <span>$ {totalPrice}</span>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  className="button button--full"
                  type="submit"
                  style={{ width: "90%" }}
                  onClick={() => {
                    if (btnClick) {
                      setOrder();
                    }

                    setBtnClick(false);
                  }}
                >
                  <svg className="icon">
                    <use href="#icon-shopping-bag" />
                  </svg>
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
            <symbol id="icon-shopping-bag" viewBox="0 0 24 24">
              <path d="M20 7h-4v-3c0-2.209-1.791-4-4-4s-4 1.791-4 4v3h-4l-2 17h20l-2-17zm-11-3c0-1.654 1.346-3 3-3s3 1.346 3 3v3h-6v-3zm-4.751 18l1.529-13h2.222v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h6v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h2.222l1.529 13h-15.502z" />
            </symbol>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
