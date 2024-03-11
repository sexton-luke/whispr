"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type UserProps = {
  id: string;
  username: string;
  avatarUrl: string;
} | null;

export default function Home() {
  // Check if there are user params in the URL
  const [user, setUser] = useState<UserProps>(null);

  useEffect(() => {
    // Check if JWT token exists in local storage
    const token = localStorage.getItem("token");
    if (token) {
      // TODO: Get user from database using token
    }
  }, []);

  const handleLogin = () => {
    // Redirect to GitHub OAuth login page
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&scope=user`;
  };

  const handleLogout = () => {
    // Clear JWT token from local storage
    localStorage.removeItem("token");
    setUser(null);
  };

  const parseQueryString = (url: string) => {
    const params = new URLSearchParams(url.slice(url.indexOf("?")));
    return Object.fromEntries(params.entries());
  };

  useEffect(() => {
    // Check if the URL contains the JWT token after the OAuth callback
    const queryParams = parseQueryString(window.location.href);
    const token = queryParams.token;
    if (token) {
      // Save JWT token to local storage
      localStorage.setItem("token", token);
      // TODO: Fetch user data using the token
      // Example: fetchUserData(token);
      // Clear the query parameters from the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-950 text-slate-200">
      <header className="App-header">Whispr</header>
      {!user && <Button onClick={handleLogin}>Login</Button>}
      {user && <Button onClick={handleLogout}>Logout</Button>}
    </main>
  );
}
