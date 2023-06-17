import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./orders.css";
import Loading from "./Loading";
import Navbar from "./Navbar";
import { Badge } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const getOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://kzico.runflare.run/order/", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setOrders(data);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
        <Navbar />
      {loading ? (
        <Loading />
      ) : error ? (
        <Badge bg="danger">{error}</Badge>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
              color: "#283618",
            }}
          >
            <h1>Order History</h1>
          </div>

          <div className="orders-container">
            <table
              className="responsive-table"
              style={{ borderRadius: "100px" }}
            >
              <thead>
                <tr>
                  <th scope="col">Order code</th>
                  <th scope="col">Items number</th>

                  <th scope="col">Payment method</th>
                  <th scope="col">Total Payment</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((item, index) => {
                  return (
                    <tr onClick={() => navigate(`/Orders/${item._id}`)}>
                      <th scope="row">
                        #{Math.floor(1000 + Math.random() * 9000)}
                      </th>

                      <td data-title="Studio">
                        {item.orderItems.reduce(
                          (sum, item) => sum + item.qty,
                          0
                        )}
                      </td>

                      <td data-title="Domestic Gross" data-type="currency">
                        {item.paymentMethod}
                      </td>
                      <td data-title="Foreign Gross" data-type="currency">
                        $ {item.totalPrice}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
      ;
    </>
  );
};
export default Orders;
