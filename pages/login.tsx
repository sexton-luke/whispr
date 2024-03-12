import "@/app/globals.css";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  const handleLogin = () => {
    // Redirect to GitHub OAuth login page
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&scope=user`;
  };
  return (
    <>
      <div className="bg-black flex min-h-screen flex-col justify-middle px-6 py-12 lg:px-8">
        <Card className="sm:mx-auto sm:w-full sm:max-w-lg bg-stone-950 mt-32 border border-stone-700">
          <CardHeader className="sm:mx-auto text-center text-stone-100 leading-9 tracking-tighter">
            <CardTitle className="text-3xl font-bold my-8">Whispr</CardTitle>
            <CardDescription className="text-stone-200 text-2xl">
              Sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center my-4">
            <Button
              onClick={handleLogin}
              className="bg-stone-100 text-black hover:bg-black hover:border-stone-700 hover:text-stone-100 group border border-stone-black transition ease-in-out duration-300 hover:-translate-y-1"
            >
              <svg
                className="h-5 w-5 fill-[#24292F] group-hover:fill-stone-100 transition ease-in-out duration-150"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-semibold leading-6 ml-1">GitHub</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
