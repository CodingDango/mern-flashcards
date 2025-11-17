import Link from "next/link";
import Image from "next/image";
import PlaceholderAvatar from "./PlaceholderAvatar";

const UserDisplay = ({ profile, email }) => {
  const name = profile?.display_name;
  const profile_img_url = profile?.profile_url;

  return (
    <div className="flex gap-my-xs items-center relative">
      <Link className="absolute inset-0 rounded-lg" href={"/profile"}></Link>
      {!profile_img_url ? (
        <PlaceholderAvatar size={40} />
      ) : (
        <Image
          width={40}
          height={40}
          className="rounded-full object-cover h-[40px]"
          src={profile_img_url}
          alt="User avatar"
        />
      )}
      <div className="overflow-x-hidden">
        <p className="line-clamp-1">{name || "User"}</p>
        <p className="text-sm text-black-light line-clamp-1 text-ellipsis">
          {email}
        </p>
      </div>
    </div>
  );
};

export default UserDisplay;
