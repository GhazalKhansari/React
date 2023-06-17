import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "./productId.css";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
const ProductId = () => {
  const [loading, setLoadng] = useState(false);
  const [error, setError] = useState("");
  const [product, setProduct] = useState({});
  const [button, setButton] = useState(true);
  const { _id } = useParams();
  const basket = useSelector((state) => state.basket);
  const basketExtra = useSelector((state) => state.basketExtra);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getProduct = async () => {
    try {
      setLoadng(true);
      const { data } = await axios.get(
        `http://kzico.runflare.run/product/${_id}`
      );
      setLoadng(false);
      setProduct(data);
    } catch (error) {
      setLoadng(false);
      setError(error.response.data);
      Swal.fire({
        position: "center",
        icon: "error",
        title: error,
        showConfirmButton: false,
        timer: 2000,
      });
     setTimeout(() => {
      navigate("/vhckyufjh")
     }, 2000);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <Navbar />

      {loading ? (
        <Loading />
      ) : error ? (
        <Badge bg="danger">{error}</Badge>
      ) : (
        <div className="product-card-container">
          <div
            className="container-product"
            style={{
              borderRadius: "1rem",
              boxShadow: "0 7px 25px -10px rgba(0, 0, 0, 0.33)",
            }}
          >
            <div
              className="imgBx"
              style={{ backgroundImage: `url(${product.image})` }}
            >
              {/* <img src={product.image} alt="mouse" /> */}
            </div>
            <div className="details">
              <div className="content">
                <h2>
                  {product.name}
                  <br />
                  <span>{product.category}</span>
                </h2>
                <p>{product.description}</p>
                <p className="product-colors">
                  Available Colors:
                  <span
                    className="active"
                    style={{ backgroundColor: product.color }}
                  ></span>
                  {/* <span className="red"></span>
                  <span className="orange"></span> */}
                </p>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ marginBottom: "1.5rem" }}>
                    <span
                      style={{ marginLeft: "2.5rem", marginRight: "0.5rem" }}
                    >
                      {product.rating}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      style={{
                        width: "1.5rem",
                        height: "1.5rem",
                        color: "gold",
                      }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p>
                    {product.countInStock > 0 ? product.countInStock : ""}
                    <span
                      style={{
                        color: product.countInStock ? "green" : "red",
                        marginRight: "1.5rem",
                        marginLeft: "0.5rem",
                        fontWeight: "bold",
                      }}
                    >
                      {product.countInStock ? "In stock" : "Out of stock"}
                    </span>
                  </p>
                </div>
                <h3 style={{ userSelect: "none" }}>$ {product.price}</h3>

                {!basket.filter((item) => item.product === _id).length ? (
                  <button
                    type="button"
                    style={{
                      backgroundColor: product.countInStock
                        ? "#283618"
                        : "silver",
                    }}
                    onClick={() => {
                      if (product.countInStock) {
                        const helpExtra = JSON.parse(
                          JSON.stringify(basketExtra)
                        );
                        const help = JSON.parse(JSON.stringify(basket));
                        if (
                          !help.filter((item) => item.product === _id).length
                        ) {
                          helpExtra.push({ ...product, qty: 1 });
                          dispatch({ type: "addExtra", payload: helpExtra });
                          help.push({ product: product._id, qty: 1 });
                          dispatch({ type: "add", payload: help });
                        }
                      }
                    }}
                  >
                    Buy Now
                  </button>
                ) : (
                  <div className="btnclick">
                    {basket.filter((item) => item.product === _id)[0].qty ===
                    1 ? (
                      <svg
                        onClick={() => {
                          dispatch({
                            type: "remove",
                            payload: basket.filter(
                              (item) => item.product !== _id
                            ),
                          });
                          dispatch({
                            type: "removeExtra",
                            payload: basketExtra.filter(
                              (item) => item._id !== _id
                            ),
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
                          if (
                            basket.filter((item) => item.product === _id)[0].qty
                          ) {
                            dispatch({
                              type: "minus",
                              payload: basket.map((item) => {
                                if (item.product === _id) {
                                  return { ...item, qty: item.qty - 1 };
                                }
                                return item;
                              }),
                            });
                            dispatch({
                              type: "minusExtra",
                              payload: basketExtra.map((item) => {
                                if (item._id === _id) {
                                  return { ...item, qty: item.qty - 1 };
                                }
                                return item;
                              }),
                            });
                          }
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

                    <span>
                      {basket.filter((item) => item.product === _id)[0].qty}
                    </span>
                    <svg
                      onClick={() => {
                        if (
                          basket.filter((item) => item.product === _id)[0].qty <
                          product.countInStock
                        ) {
                          dispatch({
                            type: "plus",
                            payload: basket.map((item) => {
                              if (item.product === _id) {
                                return { ...item, qty: item.qty + 1 };
                              }
                              return item;
                            }),
                          });
                          dispatch({
                            type: "plusExtra",
                            payload: basketExtra.map((item) => {
                              if (item._id === _id) {
                                return { ...item, qty: item.qty + 1 };
                              }
                              return item;
                            }),
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
                )}
                {!basket.filter((item) => item.product === _id).length ? (
                  ""
                ) : (
                  <div className="inCart">
                    {basket.filter((item) => item.product === _id)[0].qty} in
                    your
                    <Link to={"/Cart"}>
                      <b className="cartText"> cart</b>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductId;
