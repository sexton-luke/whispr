"use client";
import "@/app/globals.css";
import React, { useEffect } from "react";
import axios from "axios";
import Image from "next/image";

type ResponseProps = {
  username: string;
  avatarUrl: string;
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
        const url = process.env.NEXT_PUBLIC_API_AUTHENTICATE_URL || null;
        if (!url)
          throw new Error("NEXT_PUBLIC_API_AUTHENTICATE_URL is not set");

        const { data } = await axios.post(
          url,
          { code: gitHubAuthCode },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        // Store in local storage
        localStorage.setItem("token", data.token);
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
    <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-950 text-slate-200">
      <h1>Authenticating...</h1>
      {!response && <p>Loading...</p>}
      {response && (
        <>
          <Image
            src={response.avatarUrl}
            alt="Avatar"
            width={200}
            height={200}
          />
          <p>
            Welcome, {response.username}! Redirecting you to the dashboard...
          </p>
        </>
      )}
    </div>
  );
};

export default AuthenticatePage;
