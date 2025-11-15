import { createClient } from "@/libs/supabase/browser";
import { redirect } from "next/navigation";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

const SignOut = ({closeModal}) => {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signOut();
    setIsLoading(false);
    closeModal();
    redirect('/login');
  };

  return (
    <div>
      <h1>Sign Out</h1>
      <button onClick={handleSignOut} className="button button--white">
        {isLoading ? 'Signing out...' : 'Sign Out'}
      </button>
    </div>
  );
};

export default SignOut;
