import { FaUser as UserIcon } from "react-icons/fa";

const PlaceholderAvatar = ({size}) => {
  const iconSize = size - 10;

  return (
  <div 
    style={{ width: `${size}px`, height: `${size}px` }}
    className="bg-gray-400 rounded-full overflow-hidden flex items-end justify-center shrink-0">
    <UserIcon size={iconSize}/>
  </div>
  );
};

export default PlaceholderAvatar;