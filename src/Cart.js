import React from "react";
import Navbar from "./Navbar";
import "./cart.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { Col, Container, Row } from "react-bootstrap";

const Cart = () => {
  const [promo, setPromo] = useState("");
  const basket = useSelector((state) => state.basket);
  const basketExtra = useSelector((state) => state.basketExtra);
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  

  return (
    <>
      <Navbar />
      {basket.length ? (
        <Container>
          <Row>
            <div className="wrap cf">
              <div className="heading cf">
                <h1>My Cart</h1>
                <Link to="/" className="continue">
                  Continue Shopping
                </Link>
              </div>

              {basketExtra.map((item, index) => {
                return (
                  <Col xs="12">
                    <div className="cart">
                      <ul className="cartWrap">
                        <li className="items even">
                          <div className="infoWrap">
                            <div className="cartSection">
                              <div
                                className="itemImg"
                                style={{
                                  backgroundImage: `url(${item.image})`,
                                  backgroundRepeat: "no-repeat",
                                  backgroundSize: "contain",
                                  backgroundPosition: "center",
                                  marginRight: "1rem",
                                }}
                              ></div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <p className="itemNumber">{item._id}</p>
                                <h3>{item.name}</h3>

                                <p>
                                  <span className="qty"></span>$ {item.price}
                                </p>
                                <div style={{ display: "flex" }}>
                                  <p
                                    className="stockStatus"
                                    style={{ fontWeight: "bolder" }}
                                  >
                                    {item.color}
                                  </p>
                                  <p
                                    className="stockStatus"
                                    style={{ color: "green" }}
                                  >
                                    <span style={{ color: "black" }}>
                                      {item.countInStock}
                                    </span>{" "}
                                    In stock
                                  </p>
                                </div>

                                <div
                                  className="btnclick"
                                  style={{
                                    width: "20%",
                                    boxShadow: "none",
                                    backgroundColor: "#fafafa",
                                  }}
                                >
                                  {item.qty === 1 ? (
                                    <svg
                                      onClick={() => {
                                        Swal.fire({
                                          title: "Are you sure?",

                                          icon: "warning",
                                          showCancelButton: true,
                                          confirmButtonColor: "#445128",
                                          cancelButtonColor: "#820000",
                                          confirmButtonText: "Yes, delete it!",
                                        }).then((result) => {
                                          if (result.isConfirmed) {
                                            const helpExtra = JSON.parse(
                                              JSON.stringify(basketExtra)
                                            );
                                            const help = JSON.parse(
                                              JSON.stringify(basket)
                                            );
                                            helpExtra.splice(index, 1);
                                            help.splice(index, 1);
                                            dispatch({
                                              type: "plus",
                                              payload: [...help],
                                            });
                                            dispatch({
                                              type: "plusExtra",
                                              payload: [...helpExtra],
                                            });
                                            Swal.fire(
                                              "Deleted!",
                                              "Your order has been deleted.",
                                              "success"
                                            );
                                          }
                                        });
                                      }}
                                      style={{
                                        color: "rgb(40, 54, 24)",
                                        width: "1.5rem",
                                        height: "1.5rem",
                                      }}
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="currentColor"
                                      className="bi bi-trash"
                                      viewBox="0 0 16 16"
                                    >
                                      <path
                                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                                        fill="#283618"
                                      ></path>
                                      <path
                                        fillRule="evenodd"
                                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                        fill="#283618"
                                      ></path>
                                    </svg>
                                  ) : (
                                    <svg
                                      onClick={() => {
                                        const helpExtra = JSON.parse(
                                          JSON.stringify(basketExtra)
                                        );
                                        const help = JSON.parse(
                                          JSON.stringify(basket)
                                        );
                                        helpExtra[index].qty -= 1;
                                        help[index].qty -= 1;
                                        dispatch({
                                          type: "plus",
                                          payload: [...help],
                                        });
                                        dispatch({
                                          type: "plusExtra",
                                          payload: [...helpExtra],
                                        });
                                      }}
                                      style={{
                                        color: "rgb(40, 54, 24)",
                                        width: "1.5rem",
                                        height: "1.5rem",
                                      }}
                                      viewBox="0 0 15 15"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="bi bi-trash"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M11 8H4V7H11V8Z"
                                        fill="#283618"
                                      ></path>
                                    </svg>
                                  )}

                                  <span>{item.qty}</span>
                                  <svg
                                    onClick={() => {
                                      if (item.qty < item.countInStock) {
                                        const helpExtra = JSON.parse(
                                          JSON.stringify(basketExtra)
                                        );
                                        const help = JSON.parse(
                                          JSON.stringify(basket)
                                        );
                                        helpExtra[index].qty += 1;
                                        help[index].qty += 1;
                                        dispatch({
                                          type: "plus",
                                          payload: [...help],
                                        });
                                        dispatch({
                                          type: "plusExtra",
                                          payload: [...helpExtra],
                                        });
                                      }
                                    }}
                                    style={{
                                      color: "rgb(40, 54, 24)",
                                      width: "1.5rem",
                                      height: "1.5rem",
                                    }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    className="bi bi-plus"
                                    viewBox="0 0 16 16"
                                  >
                                    <path
                                      d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                                      fill="#283618"
                                    ></path>
                                  </svg>
                                </div>
                              </div>
                            </div>

                            <div className="prodTotal cartSection">
                              <p>$ {item.qty * item.price}</p>
                            </div>
                            <div className="cartSection removeWrap">
                              <span
                                className="remove"
                                onClick={() => {
                                  Swal.fire({
                                    title: "Are you sure?",

                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#445128",
                                    cancelButtonColor: "#820000",
                                    confirmButtonText: "Yes, delete it!",
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      const helpExtra = JSON.parse(
                                        JSON.stringify(basketExtra)
                                      );
                                      const help = JSON.parse(
                                        JSON.stringify(basket)
                                      );
                                      helpExtra.splice(index, 1);
                                      help.splice(index, 1);
                                      dispatch({
                                        type: "plus",
                                        payload: [...help],
                                      });
                                      dispatch({
                                        type: "plusExtra",
                                        payload: [...helpExtra],
                                      });
                                      Swal.fire(
                                        // "Deleted!",
                                        // "Your order has been deleted.",
                                        // "success"
                                        {
                                          icon: "success",
                                          title: "Deleted!",
                                          titleText:
                                            "Your order has been deleted.",
                                          confirmButtonColor: "#445128",
                                        }
                                      );
                                    }
                                  });
                                }}
                              >
                                x
                              </span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </Col>
                );
              })}
              <div className="promoCode" style={{ marginLeft: "1.75rem" }}>
                <label htmlFor="promo">Have A Promo Code?</label>
                <input
                  value={promo}
                  type="text"
                  name="promo"
                  placholder="Enter Code"
                  onChange={(e) => setPromo(e.target.value.trim())}
                />
                <span
                  className="btn"
                  onClick={() => {
                    if (setPromo.length) {
                      setPromo("");
                      Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Your promo code isn't valid",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    }
                  }}
                ></span>
              </div>

              <div className="subtotal cf">
                <ul>
                  <li className="totalRow final">
                    <span className="label">Total</span>
                    <span className="value">
                      $
                      {basketExtra.reduce(
                        (total, item) => total + item.price * item.qty,
                        0
                      )}
                    </span>
                  </li>
                  <li className="totalRow">
                    <Link
                      to={token ? "/Address" : "/LogIn"}
                      className="btn continue"
                    >
                      Checkout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </Row>
        </Container>
      ) : (
        <div
          style={{
            width: "100%",
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "3rem",
            opacity: "0.3",
          }}
        >
          Your cart is empty
        </div>
      )}
    </>
  );
};

export default Cart;
