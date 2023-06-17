import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from "./Router";

const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  const getProfile = async () => {
    try {
      const { data } = await axios.get(
        "http://kzico.runflare.run/user/profile",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      if (error.response.data.message) {
        dispatch({ type: "logOut" });
      }
    }
  };

  useEffect(() => {
    if (token) {
      getProfile();
    }
  }, []);

  return (
    <div className="App">
      <Router />
    </div>
  );
};

export default App;
