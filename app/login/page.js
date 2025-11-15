"use client";

import { useState } from "react";

import { GiReactor as BrandIcon } from "react-icons/gi";
import { createClient } from "@/libs/supabase/browser";
import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (isLoading) return;

    setError(null);
    setIsLoading(true);

    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    setIsLoading(false);

    if (error) {
      setError(error.message); // Show the error to the user
      return;
    }

    console.log("Sign up successful, user needs to confirm email:", data);
  };

  return (
    <div className="bg-black p-4 min-h-screen flex justify-center pt-24">
      <form
        onSubmit={handleSignUp}
        className="flex flex-col gap-8 max-w-xs w-full text-center"
      >
        <div className="flex flex-col gap-my-md items-center mb-2">
          <BrandIcon size={40} className="text-my-primary" />
          <h1 className="text-3xl font-medium">Log In To Reactor</h1>
        </div>

        {error && <p className="text-red-400">{error}</p>}

        <div className="w-full flex gap-my-sm flex-col">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full text-input"
            placeholder="Email Address"
            type="email"
            required
          />
          {isLoading ? (
            <button type="submit" className="button button--white brightness-85" disabled>
              Logging in...
            </button>
          ) : (
            <button className="button button--white">Log In</button>
          )}
        </div>

        <div className="grid grid-cols-[2fr_1fr_2fr] justify-between items-center">
          <div className="h-[1px] bg-black-md"></div>
          <span className="text-black-light">or</span>
          <div className="h-[1px] bg-black-md"></div>
        </div>

        <div className="flex gap-my-md">
          <button className="w-full button button--dark flex gap-my-xs">
            <Image
              src={"/google.svg"}
              height={16}
              width={16}
              alt="Icon of google"
            />
            Continue With Google
          </button>
        </div>

        <p>
          Don't have an account?{" "}
          <Link href={"/sign-up"} className="text-blue-400">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
