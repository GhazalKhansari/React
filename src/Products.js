import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./products.css";
import Loading from "./Loading";
import { useSelector } from "react-redux";
const Products = () => {
  const [loading, setLoadng] = useState(false);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const basket = useSelector(state=>state.basket)
  const user = useSelector(state=>state.user)

  const getData = async () => {
    try {
      setLoadng(true);
      const { data } = await axios.get("http://kzico.runflare.run/product/");
      setLoadng(false);
      setProducts(data);
    } catch (error) {
      setLoadng(false);
      setError(error.response.data.message);
     
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Badge bg="danger">{error}</Badge>
      ) : (
        <>
          <Navbar />
          <Container>
            <Row>
              {products.slice(14).map((item, index) => {
                return (
                  <Col xs="3" key={item._id}>
                    <div className="wrapper">
                      <div className="product-card">
                        <div className="product-link">
                          <div
                            // src={item.image}
                            style={{
                              backgroundImage: `url(${item.image})`,
                              // width: "5rem",
                              // height: "8rem",
                              // margin: "0 auto",
                            }}
                            className="image"
                            // alt="Product"
                          ></div>
                          <span className="overlay"></span>
                          <span className="info">
                            <span className="title">
                              {item.name.slice(0, 25)}
                            </span>
                            <span className="price">
                              <span>$</span>
                              {item.price}
                            </span>
                          </span>
                        </div>

                        <div className="button-wrap">
                          <div>
                            <span style={{ marginLeft: "1.5rem" }}>
                              {item.rating}
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
                          <p
                            className="cartText button"
                            onClick={() => navigate(`/Product/${item._id}`)}
                          >
                            More info
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </>
      )}
    </>
  );
};
export default Products;
