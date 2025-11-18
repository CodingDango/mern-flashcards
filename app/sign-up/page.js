"use client";

import { useState } from "react";
import { createClient } from "@/libs/supabase/browser";
import { FaLongArrowAltRight as ArrowRight } from "react-icons/fa";
import { FaArrowLeftLong as ArrowLeft } from "react-icons/fa6";
import { MdOutlineEmail as Email } from "react-icons/md";
import { ClipLoader } from "react-spinners";
import Image from "next/image";
import Link from "next/link";

const SignUpPage = () => {
  // 1. State to hold the form inputs
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null); // State to hold any error messages
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailMode, setIsEmailMode] = useState(false);
  const [isSubmitMode, setIsSubmitMode] = useState(false);

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
        shouldCreateUser: true,
      },
    });

    setIsLoading(false);

    if (error) {
      setError(error.message); // Show the error to the user
      return;
    }

    setIsSubmitMode(true);
  };

  const handleSignInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  let componentToRender = null;

  if (isEmailMode && !isSubmitMode) {
    componentToRender = (
      <>
        <form
          onSubmit={handleSignUp}
          className="w-full flex gap-my-sm flex-col"
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="text-input-large"
            placeholder="Email Address"
            type="text"
            value={email}
            required
          />
          {isLoading ? (
            <button
              type="button"
              className="button-large button--white button--disabled button--icon"
              disabled
            >
              <ClipLoader size={20} />
              Continue with Email
            </button>
          ) : (
            <button
              type="submit"
              className="button-large button--white button--icon"
            >
              <Email size={20} />
              Continue with Email
            </button>
          )}
        </form>

        <button
          type="button"
          onClick={() => setIsEmailMode(false)}
          className="text-blue-400 flex gap-my-xs items-center justify-center cursor-pointer"
        >
          <ArrowLeft size={14} />
          Other Sign Up options
        </button>
      </>
    );
  } else if (isSubmitMode) {
    componentToRender = (
      <>
        <p className="text-black-light">
          If you don&apos;t have an account yet, we have sent a link to {email}.
        </p>
        <button
          type="button"
          onClick={() => setIsSubmitMode(false)}
          className="text-blue-400 flex gap-my-xs items-center justify-center cursor-pointer"
        >
          <ArrowLeft size={14} />
          Back
        </button>
      </>
    );
  } else if (!isEmailMode && !isSubmitMode) {
    componentToRender = (
      <>
        <div className="flex gap-my-md">
          <button
            onClick={handleSignInWithGoogle}
            className="w-full button button--dark flex gap-my-xs"
          >
            <Image
              src={"/google.svg"}
              height={16}
              width={16}
              alt="Icon of google"
            />
            Google
          </button>
        </div>

        <button
          onClick={() => setIsEmailMode(true)}
          className="text-blue-400 flex gap-my-xs items-center justify-center cursor-pointer"
        >
          Continue with Email
          <ArrowRight size={14} />
        </button>
      </>
    );
  }

  return (
    <div className="bg-black p-4 min-h-screen flex justify-center items-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-full max-w-lg text-center bg-black-xl py-my-lg px-my-md sm:p-my-lg rounded-xl border border-black-md">
        {!isEmailMode ? (
          <h1 className="text-3xl font-medium">
            Let&apos;s create <br /> your account
          </h1>
        ) : (
          <h1 className="text-3xl font-medium">Sign up for Reactor</h1>
        )}

        {error && (
          <div className="text-red-400 text-sm bg-red-950/75 p-my-xs rounded-lg">
            {error}
          </div>
        )}

        {componentToRender}
      </div>
      <p>
        Already have an account?{" "}
        <Link href={"/login"} className="text-blue-400">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
