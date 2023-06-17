import React from "react";
import {  Route, Routes } from "react-router-dom";
import Cart from "./Cart";
import Address from "./Address";
import LogIn from "./LogIn";
import CheckOut from "./CheckOut";
import Orders from "./Orders";
import Error404 from "./Error404";
import Products from "./Products";
import ProductId from "./ProductId";
import ChangeProfile from "./ChangeProfile";
import ChangePassword from "./ChangePassword";
import UploadAvatar from "./UploadAvatar";
import Profile from "./Profile";
import OrderId from "./OrderId";
import { useSelector } from "react-redux";
// import ProtectedRoute from "./ProtectedRoute";
const Router = () => {
  const { token } = useSelector((state) => state.user);
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/Product/:_id" element={<ProductId />} />
      <Route path="/Address" element={token? <Address />: <Error404/>} />
      <Route path="/LogIn" element={<LogIn />} />
      <Route path="/CheckOut" element={token? <CheckOut />: <Error404/>} />
      <Route path="/Orders" element={token ? <Orders /> : <Error404/>} />
      <Route path="/Orders/:_id" element={token ? <OrderId /> : <Error404/>} />
      <Route path="/Setting/ChangeProfile" element={token ? <ChangeProfile /> : <Error404/>} />
      <Route path="/Setting/ChangePassword" element={token ? <ChangePassword /> : <Error404/>} />
      <Route path="/Setting/UploadAvatar" element={token ? <UploadAvatar /> : <Error404/>} />
      <Route path="/Profile" element={token ? <Profile /> : <Error404/>} />
      {/* <Route path="/Profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> */}
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default Router;
