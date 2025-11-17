"use client";

import AppLayout from "@/components/AppLayout";
import Main from "@/components/Main";
import { FaUser as UserIcon } from "react-icons/fa";
import Image from "next/image";
import PlaceholderAvatar from "@/components/PlaceholderAvatar";
import Button from "@/components/Button";
import { useSessionContext } from "@/context/SessionContext";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/libs/supabase/browser";

const AccountPage = () => {
  const { user } = useSessionContext();
  const supabase = createClient();

  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [error, setError] = useState(null);

  const [profile, setProfile] = useState({
    display_name: "User",
    profile_url: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const fileInput = useRef(null);

  const uploadImage = async (file) => {
    const filePath = `${user.id}/avatar`;

    const { error: uploadError } = await supabase.storage
      .from("profile-images")
      .upload(filePath, file, { upsert: true, contentType: file.type });

    if (uploadError) {
      setError(`Error uploading image ${uploadError.message}`);
      return null;
    }

    const { data } = supabase.storage
      .from("profile-images")
      .getPublicUrl(filePath);

    if (!data.publicUrl) {
      setError("Error getting public URL.");
      return;
    }

    const urlWithCacheBuster = `${data.publicUrl}?t=${new Date().getTime()}`;
    return urlWithCacheBuster;
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    if (!user?.id) return;

    const getProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      if (data && data.display_name) {
        setProfile(data);
      }

      setIsLoading(false);
    };

    getProfile();
  }, [supabase, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    if (!profileImage || !user) {
      setError("Please select a file first.");
      return;
    }

    setIsUpdatingProfile(true);

    // This will now be the unique URL with the timestamp
    const newProfileUrl = await uploadImage(profileImage);

    // Stop if the upload failed for any reason
    if (!newProfileUrl) {
      setIsUpdatingProfile(false);
      return;
    }

    const newProfile = {
      display_name: profile.display_name,
      profile_url: newProfileUrl, // Save the full, unique public URL
    };

    const { error } = await supabase
      .from("profiles")
      .update(newProfile)
      .eq("user_id", user.id);

    if (error) {
      setError("Error updating profile: " + error.message);
    }

    setProfile(newProfile);
    setPreviewUrl(null);
    setProfileImage(null);
    setIsUpdatingProfile(false);
  };

  const handleProfileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      const temporaryUrl = URL.createObjectURL(file);
      setPreviewUrl(temporaryUrl);
      setProfileImage(file);
    }
  };

  return (
    <AppLayout activeRoute={"profile"}>
      <Main isLoading={isLoading}>
        <div className="flex flex-row 2xs:justify-between items-end gap-my-sm">
          <div className="flex gap-my-md items-end">
            <h1 className=" text-3xl font-medium">My Profile</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-11">
          <div className="flex gap-10">
            <div className="flex flex-col gap-my-sm items-center bg-black rounded-xl p-my-sm border border-black-md">
              {!profile.profile_url && !previewUrl ? (
                <PlaceholderAvatar size={110} />
              ) : (
                <Image
                  width={110}
                  height={110}
                  className="rounded-full object-cover h-[110px]"
                  src={previewUrl || profile.profile_url}
                  alt="User avatar"
                />
              )}

              <Button
                onClick={() => fileInput.current.click()}
                text={"Upload photo"}
                classModifiers={"button--dark"}
                type="button"
              />
              <input
                hidden
                ref={fileInput}
                accept="image/*"
                type="file"
                onChange={handleProfileChange}
              />
            </div>
          </div>

          <div className="flex flex-col gap-my-md ">
            <label className="max-w-sm flex flex-col gap-my-xs">
              <span>Display Name</span>
              <input
                required
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    display_name: e.target.value,
                  }))
                }
                placeholder="Display name"
                className="text-input"
                value={profile.display_name}
              />
            </label>
          </div>

          <div>
            <Button
              onClick={() => console.log("please fucking help me")}
              isLoading={isUpdatingProfile}
              type="submit"
              text={"Update profile"}
              classModifiers={"button--white"}
            />
          </div>

          <div>
            {error && (
              <span className="text-red-400 text-sm bg-red-950/75 p-my-xs rounded-lg">
                {error}
              </span>
            )}
          </div>
        </form>
      </Main>
    </AppLayout>
  );
};

export default AccountPage;
