import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Navbar from "./Navbar";
import Loading from "./Loading";
import "./orderId.css";
import { Badge } from "react-bootstrap";

const OrderId = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState({});
  const { _id } = useParams();
  const { token } = useSelector((state) => state.user);

  const getOrder = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://kzico.runflare.run/order/${_id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setOrder(data);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);
  
  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : error ? (
        <Badge bg="danger">{error}</Badge>
      ) : (
        <div className="order-id-container">
          <article className="order-id-card">
            <header className="card-header" style={{ borderRadius: "40px" }}>
           
              My Orders / Tracking{" "}
            </header>
            <div className="card-body">
             
              <article className="card" style={{ margin: "0 1rem" }}>
                <div className="card-body row">
                  <div className="col">
                    <strong>Deliver address:</strong> <br />
                    {order.shippingAddress?.address}
                  </div>
                  <div className="col">
                    <strong>Shipping price:</strong> <br /> $ 25
                  </div>
                  <div className="col">
                    <strong>Total price:</strong> <br />$ {order.totalPrice}
                  </div>
                  <div className="col">
                    <strong>Payment method:</strong> <br />{" "}
                    {order.paymentMethod}
                  </div>
                </div>
              </article>
              <div className="track">
                <div className="step active">
                  <span className="icon">
                    <i className="fa fa-check"></i>
                  </span>
                  <span className="text">Order confirmed</span>
                </div>
                <div className="step active">
                  <span className="icon">
                    <i className="fa fa-user"></i>
                  </span>
                  <span className="text"> Picked by courier</span>
                </div>
                <div className="step">
                  <span className="icon">
                    <i className="fa fa-truck"></i>
                  </span>
                  <span className="text"> On the way </span>
                </div>
                <div className="step">
                  <span className="icon">
                    <i className="fa fa-box"></i>
                  </span>
                  <span className="text">Ready for pickup</span>
                </div>
              </div>
              <hr />
              <ul className="row" style={{ margin: "2rem 1rem" }}>
                {order.orderItems?.map((item) => {
                  return (
                    <li className="col-md-4">
                      <figure className="itemside mb-3">
                        <div className="aside">
                          <div
                            style={{
                              backgroundImage: ` url(${item.product.image})`,
                            }}
                            className="img-sm"
                          />
                        </div>
                        <figcaption className="info align-self-center">
                          <p className="title order-id-p">
                            {item.product.name} <br /> {item.product.color}
                          </p>
                          <span className="text-muted">
                            $ {item.product.price}
                          </span>
                        </figcaption>
                      </figure>
                    </li>
                  );
                })}
              </ul>
              <hr />
              <Link to={"/Orders"} className="btn btn-warning" data-abc="true">
                <i className="fa fa-chevron-left"></i> Back to orders
              </Link>
            </div>
          </article>
        </div>
      )}
    </>
  );
};

export default OrderId;
