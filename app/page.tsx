"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { httpUser } from "@/api/httpRoutes";

type UserProps = {
  id: string;
  username: string;
  avatarUrl: string;
} | null;

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<UserProps>(null);

  useEffect(() => {
    const fetchUser = async (userId: string) => {
      try {
        const response = await axios.get(httpUser(userId));
        console.log("User data:", response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Check if JWT token exists in local storage
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token || !userId) {
      router.push("/login");
    } else {
      fetchUser(userId);
    }
  }, [router]);

  const handleLogout = () => {
    // Clear JWT token from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    router.push("/login");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-950 text-slate-200">
      <header className="App-header">Whispr</header>
      <p>{user?.username}</p>
      <Avatar>
        <AvatarImage src={user?.avatarUrl} alt={user?.username} />
      </Avatar>
      <Button onClick={handleLogout}>Logout</Button>
    </main>
  );
}
