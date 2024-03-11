"use client";
import React, { useEffect } from "react";
import axios from "axios";

type ResponseProps = {
  username: string;
  token: string;
};

const AuthenticatePage = () => {
  const [response, setResponse] = React.useState<ResponseProps | null>(null);
  useEffect(() => {
    // Function to extract code from query string
    const getCodeFromQueryString = () => {
      const queryParams = new URLSearchParams(window.location.search);
      const codeParam = queryParams.get("code");

      return codeParam ? codeParam : null;
    };

    // Function to make Axios request
    const fetchData = async (gitHubAuthCode: string) => {
      try {
        const url = process.env.REACT_APP_API_AUTHENTICATE_URL || null;
        if (!url) throw new Error("REACT_APP_API_AUTHENTICATE_URL is not set");

        const { data } = await axios.post(
          url,
          { code: gitHubAuthCode },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        setResponse(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error if necessary
      }
    };

    // Call the function when the component mounts
    const code = getCodeFromQueryString();
    if (code) fetchData(code);
  }, []);

  console.log("response", response);
  return (
    <div>
      <h1>Authenticating...</h1>
      <p>{response?.username ?? "Loading"}</p>
    </div>
  );
};

export default AuthenticatePage;
