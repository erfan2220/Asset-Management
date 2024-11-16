//@ts-nocheck
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import App from "../../App";
const Login = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchData = async () => {
    setLoading(true);
    try {
      console.log("Starting user validation...");

      const params = new URLSearchParams(location.search);
      const urlToken = params.get("token");
      const urlUsername = params.get("username");

      console.log("URL Params: ", { urlToken, urlUsername });

      if (urlToken && urlUsername) {
        Cookies.set("oneLoginToken", urlToken);
        Cookies.set("oneLoginUserName", urlUsername);
        console.log("Cookies set from URL params");
      }

      const token = Cookies.get("oneLoginToken");
      const username = Cookies.get("oneLoginUserName");

      console.log("Current Cookies: ", { token, username });

      if (!token || !username) {
        console.error(
          "Token or username not found in cookies. Redirecting to SSO."
        );
        window.location.href = "http://10.15.90.87:8081";
        return;
      }

      console.log("Validating token...");
      console.log("Retrieved Cookies:", { token, username });

      const response = await axios.post(
        "http://10.15.90.72:9098/user-management/auth/login-sso",
        {
          username,
          token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response Status:", response.status);

      if (response.status === 403) {
        console.error(
          "Access forbidden. Check token permissions or CORS policy."
        );
        return;
      }

      const apiData = response.data.token;
      console.log("Data fetched successfully:", apiData);

      if (apiData) {
        Cookies.set("authToken", apiData);
        Cookies.remove("oneLoginToken");
        Cookies.remove("oneLoginUserName");

        console.log("AuthToken updated:", apiData);
      }

      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error("Error during data fetch:", error);

      if (error.response) {
        console.error("Error Response:", error.response);
        if (error.response.status === 401) {
          console.error("Unauthorized access. Redirecting to SSO.");
          window.location.href = "http://10.15.90.87:8081";
        } else if (error.response.status === 403) {
          console.error(
            "Access forbidden. Ensure the token has proper permissions."
          );
        }
      }
    } finally {
      setLoading(false);
      console.log("Data fetch completed.");
    }
  };

  useEffect(() => {
    console.log("useEffect triggered");
    fetchData();
  }, []);

  return <div>{loading ? <p>Loading...</p> : <App />}</div>;
};

export default Login;


