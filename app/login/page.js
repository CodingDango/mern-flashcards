"use client";

import { useState } from "react";

import { GiReactor as BrandIcon } from "react-icons/gi";
import { FaArrowLeftLong as ArrowLeft } from "react-icons/fa6";
import { createClient } from "@/libs/supabase/browser";
import Image from "next/image";
import Link from "next/link";
import { getSiteUrl } from "@/utils/url";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormMode, setIsFormMode] = useState(true);
  const supabase = createClient();

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (isLoading) return;

    setError(null);
    setIsLoading(true);

    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: `${getSiteUrl()}/auth/callback`,
        shouldCreateUser: false
      },
    });

    setIsLoading(false);

    if (error) {
      setError(error.message); // Show the error to the user
      return;
    }

    setIsFormMode(false);
  };

  return (
    <div className="bg-black p-4 min-h-screen flex justify-center">
      <div className="flex gap-8 flex-col max-w-xs w-full items-center justify-center">
        {isFormMode ? (
          <form
            onSubmit={handleSignUp}
            className="flex flex-col gap-my-md  w-full text-center"
          >
            <div className="flex flex-col gap-my-md items-center mb-2">
              {/* <BrandIcon size={40} className="text-my-primary" /> */}
              <h1 className="text-3xl font-medium">Log In To Reactor</h1>
            </div>

            {error && <div className="text-red-400 text-sm bg-red-950/75 p-my-xs rounded-lg">{error}</div>}

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
                <button
                  type="submit"
                  className="button button--white brightness-85"
                  disabled
                >
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
          </form>
        ) : (
          <div className="flex flex-col gap-my-md text-center">
            <h1 className="text-3xl font-medium">Verification</h1>
            <p className="text-black-light">If you have an account, we have sent a link to {email}.</p>
            <button 
              onClick={() => setIsFormMode(true)}
              className="text-blue-400 flex gap-my-xs items-center justify-center text-sm cursor-pointer">
              <ArrowLeft size={14}/>
              Back
            </button>
            <div className="h-[1px] bg-black-md"></div>
          </div>
        )}

        <p>
          Don&apos;t have an account?{" "}
          <Link href={"/sign-up"} className="text-blue-400">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
