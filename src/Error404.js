import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
function Error404() {
  const [eyes, setEyes] = useState("");
  let pageX = window.screen.width;
  let pageY = window.screen.height;
  let mouseY = 0;
  let mouseX = 0;
  document.addEventListener("mousemove", function (e) {
    mouseY = e.pageY;
    let yAxis = ((pageY / 2 - mouseY) / pageY) * 300;
    mouseX = e.pageX / -pageX;
    let xAxis = -mouseX * 100 - 100;
    setEyes(`${xAxis}%,-${yAxis}%`);
  });

  return (
    <div className="box">
      <div className="box__ghost">
        <div className="symbol"></div>
        <div className="symbol"></div>
        <div className="symbol"></div>
        <div className="symbol"></div>
        <div className="symbol"></div>
        <div className="symbol"></div>
        <div className="box__ghost-container">
          <div
            className="box__ghost-eyes"
            style={{ transform: `translate(${eyes})` }}
          >
            <div className="box__eye-left"></div>
            <div className="box__eye-right"></div>
          </div>
          <div className="box__ghost-bottom">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="box__ghost-shadow"></div>
      </div>
      <div className="box__description">
        <div className="box__description-container">
          <div className="box__description-title">Whoops!</div>
          <div className="box__description-text">
            It seems like we couldn't find the page you were looking for
          </div>
        </div>
        <Link
          
          to={"/"}
          className="box__button"
        >
          Go back
        </Link>
      </div>
    </div>
  );
}
export default Error404;
