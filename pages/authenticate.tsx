"use client";
import "@/app/globals.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { httpAuthenticate } from "@/api/httpRoutes";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ResponseProps = {
  username: string;
  avatarUrl: string;
  token: string;
};

const AuthenticatePage = () => {
  const router = useRouter();
  const [message, setMessage] = useState<string>("Authenticating...");
  const [response, setResponse] = useState<ResponseProps | null>(null);
  const [progress, setProgress] = useState(10);
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
        const { data } = await axios.post(
          httpAuthenticate,
          { code: gitHubAuthCode },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        // Store in local storage
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        setResponse(data);
        setMessage(`Welcome, ${data.username}!`);
        setTimeout(() => {
          setProgress(100);
        }, 1000);
      } catch (error) {
        console.error("Error fetching data:", error);
        router.push("/"); // Redirect to home page
      }
    };

    let interval: NodeJS.Timeout;

    // Function to increment the value by 10 every second
    const incrementValue = () => {
      setProgress((prevValue) => {
        if (prevValue < 100) {
          return prevValue + Math.floor(Math.random() * (15 - 10 + 1)) + 10;
        } else {
          clearInterval(interval); // Stop the interval when value reaches 100
          return 100;
        }
      });
    };

    // Call the function when the component mounts
    const code = getCodeFromQueryString();
    if (code) {
      // Start the interval to increment value every second
      interval = setInterval(() => {
        incrementValue();
      }, 1000);
      fetchData(code);

      return () => clearInterval(interval);
    }
  }, [router]);

  const getInitials = (name: string): string => {
    const words = name.split(/-|_/); // Split by hyphens or underscores
    const initials = words.map((word) => word.charAt(0).toUpperCase());
    return initials.join("");
  };

  // Once response has been received, display the user for 3 seconds, then navigate to the homepage
  const showTimedResponse = (user: ResponseProps) => {
    setTimeout(() => {
      router.push("/");
    }, 2000);
    return (
      <Avatar className="h-32 w-32">
        <AvatarImage src={user.avatarUrl} />
        <AvatarFallback>{getInitials(user.username)}</AvatarFallback>
      </Avatar>
    );
  };

  return (
    <div className="bg-black flex min-h-screen flex-col justify-middle px-6 py-12 lg:px-8">
      <Card className="sm:mx-auto sm:w-full sm:max-w-lg bg-stone-950 mt-32 border border-stone-700">
        <CardHeader className="sm:mx-auto text-center text-stone-100 leading-9 tracking-tighter">
          <CardTitle className="text-3xl font-bold my-8">Whispr</CardTitle>
          <CardDescription className="text-stone-200 text-2xl">
            {message}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center mb-12 gap-4">
          <Progress value={progress} className="w-[50%] my-4" />
          {response && showTimedResponse(response)}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthenticatePage;
