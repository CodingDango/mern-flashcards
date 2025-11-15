"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/libs/supabase/browser";
import Image from "next/image";
import Link from "next/link";

const SignUpPage = () => {
  // 1. State to hold the form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State to hold any error messages
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (isLoading) return;

    setError(null);
    setIsLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      }
    });

    setIsLoading(false);

    if (error) {
      console.error("Sign up error:", error.message);
      setError(error.message); // Show the error to the user
      return;
    }

    console.log("Sign up successful, user needs to confirm email:", data);
    router.push("/check-email");
  };

  const handleSignInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  };

  return (
    <div className="bg-black p-4 min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSignUp}
        className="flex flex-col gap-8 max-w-xs w-full text-center"
      >
        <h1 className="text-3xl font-medium">Sign Up To Reactor</h1>

        {error && <p className="text-red-400">{error}</p>}

        <div className="w-full flex gap-my-sm flex-col">
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-input"
            placeholder="Email Address"
            type="text"
            value={email}
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-input"
            placeholder="Password"
            type="password"
            value={password}
          />
          {isLoading ? (
            <button type="submit" className="button button--white brightness-85" disabled>
              Signing Up...
            </button>
          ) : (
            <button className="button button--white">Sign Up</button>
          )}
        </div>

        <div className="grid grid-cols-[1fr_2fr_1fr] justify-between items-center">
          <div className="h-[1px] bg-black-md"></div>
          <span className="text-black-light">or continue with</span>
          <div className="h-[1px] bg-black-md"></div>
        </div>

        <div className="flex gap-my-md">
          <button 
            onClick={handleSignInWithGoogle}
            className="w-full button button--dark flex gap-my-xs">
            <Image
              src={"/google.svg"}
              height={16}
              width={16}
              alt="Icon of google"
            />
            Google
          </button>
        </div>

        <p>
          Already have an account?{" "}
          <Link href={"/login"} className="text-blue-400">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
