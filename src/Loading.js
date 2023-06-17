import React from "react";
import "./loading.css";
function Loading() {
  return (
    <div className="wrapper-loading">
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="shadow"></div>
      <div className="shadow"></div>
      <div className="shadow"></div>
      <span>Loading</span>
    </div>
  );
}

export default Loading;
