import { createClient } from "@/libs/supabase/browser";
import { redirect } from "next/navigation";
import { useState } from "react";
import { IoWarningOutline as WarningIcon } from "react-icons/io5";
import Button from "./Button";

const SignOut = ({ closeModal }) => {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignOut = async () => {
    console.log('in sign out  ')

    setError(null);
    setIsLoading(true);

    const { error } = await supabase.auth.signOut();

    setIsLoading(false);

    if (error) {
      setError(error.message);
    } else {
      closeModal();
      redirect("/login");
    }
  };

  return (
    <div className="bg-black-xl border border-md rounded-xl max-w-lg p-10 w-full border-black-md">
      <div className="flex flex-col gap-my-md items-center">
        <span className="p-my-xs bg-red-400/75 rounded-full">
          <WarningIcon size={36} />
        </span>

        {error && <div className="text-red-400 text-sm bg-red-950/75 p-my-xs rounded-lg">{error}</div>}

        <div className="flex flex-col items-center gap-my-xs text-center">
          <span className="text-2xl font-medium select-none">Sign Out</span>
          <p className="text-black-light select-none">
            Are you sure you would like to sign out of your account?
          </p>
        </div>
        <div className="w-full flex justify-center gap-my-sm">
          <Button
            text={'Sign Out'}
            classModifiers={'button--white'}
            onClick={handleSignOut}
            isLoading={isLoading}
          />
          <button
            onClick={closeModal}
            className="button button--white button--ghost"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignOut;
