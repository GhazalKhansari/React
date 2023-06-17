import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./navbar.css";
const Navbar = () => {
  const dispatch = useDispatch()
  const basket = useSelector((state) => state.basket);
  const navigate = useNavigate();
  const { username, token } = useSelector((state) => state.user);
  return (
    <div className="navbar-container">
      <nav className="menu">
        <ol>
          <li style={{ marginRight: "400px" }} className="menu-item">
            <div style={{ color: "white" }} onClick={() => navigate("/")}>
              Home
            </div>
          </li>
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <div className="position">
              <li className="menu-item" onClick={() => navigate("/Cart")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  style={{ width: "2rem", height: "2rem" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                {basket.length ? (
                  <span className="basket-badge">
                    {basket.reduce((count, item) => count + item.qty, 0)}
                  </span>
                ) : (
                  ""
                )}
              </li>
            </div>
            {token ? (
              <li style={{ color: "white" }} className="menu-item">
                {username}
                <ol className="sub-menu">
                  <li className="menu-item">
                    <div onClick={() => navigate("/Profile")}>Profile</div>
                  </li>
                  <li className="menu-item">
                    <div onClick={()=>navigate("/Orders")}>Orders</div>
                  </li>
                  <li className="menu-item">
                    <div onClick={() => navigate("/Setting/ChangeProfile")}>
                      Setting
                    </div>
                  </li>
                  <li className="menu-item">
                    <div onClick={()=>  dispatch({ type: "logOut" })}>Log out</div>
                  </li>
                </ol>
              </li>
            ) : (
              <li className="menu-item">
                <div
                  onClick={() => navigate("/LogIn")}
                  style={{ color: "white" }}
                >
                  Login/Signup
                </div>
              </li>
            )}
          </div>
        </ol>
      </nav>
    </div>

    // <div
    //   style={{
    //     width: "100%",
    //     height: "10vh",
    //     backgroundColor: " #283618",
    //     color: "white",
    //     position: "sticky",
    //     top: "0",
    //     zIndex: "1",
    //     padding: "0 10rem",
    //   }}
    // >
    //   <ul
    //     style={{
    //       height: "10vh",
    //       listStyle: "none",
    //       display: "flex",
    //       justifyContent: "space-between",
    //       alignItems: "center",
    //     }}
    //   >
    //     <Link to="/"><li>
    //       Home
    //     </li></Link>
    //     <div style={{ display: "flex", gap: "2.5rem" }}>
    //       <div>
    //         <Link to="/cart">
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   fill="none"
    //   viewBox="0 0 24 24"
    //   strokeWidth={1.5}
    //   stroke="white"
    //   style={{ width: "1.5rem", height: "1.5rem" }}
    // >
    //   <path
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //     d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
    //   />
    // </svg>
    //         </Link>
    //       </div>
    //       <Link to="/LogIn">
    //         <li>LogIn/SignUp</li>
    //       </Link>
    //     </div>
    //   </ul>
    // </div>
  );
};

export default Navbar;
