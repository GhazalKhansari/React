import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import Navbar from "./Navbar";
import "./profile.css";
import SideBar from "./SideBar";
const Profile = () => {
  const { token } = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  const [loading, setLoadng] = useState(false);
  const [error, setError] = useState("");
  const getProfile = async () => {
    try {
      setLoadng(true);
      const { data } = await axios.get(
        "http://kzico.runflare.run/user/profile",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setLoadng(false);
      setUser(data.user);
    } catch (error) {
      setLoadng(false);
      setError(error.response.data);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div>
      <Navbar />
      <SideBar />
      {loading ? (
        <Loading />
      ) : error ? (
        <Badge bg="danger">{error}</Badge>
      ) : (
        <>
          {" "}
          <div className="profile-card">
            <header>
              <img src={user.image} alt="avatar" />
              <h1>{user.username}</h1>
              <h2>{user.email?.toLowerCase()}</h2>
            </header>

            <div className="profile-bio">
              <div className="heart-icon"></div>
              <ul
                style={{ listStyle: "none", color: "white", marginTop: "4rem" }}
              >
                <li className="Profile-li">First name : {user.firstname}</li>
                <li className="Profile-li">Last name : {user.lastname}</li>
                <li className="Profile-li">Gender : {user.gender}</li>
                <li className="Profile-li">Age : {user.age}</li>
                <li className="Profile-li">City : {user.city}</li>
              </ul>
            </div>
          </div>
          <div />
        </>
      )}
    </div>
  );
};

export default Profile;
