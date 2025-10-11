import { BsThreeDots } from "react-icons/bs";
import { useOptionsMenuManagerContext } from "../context/OptionsMenuManagerContext";
import OptionsMenuItem from "./OptionsMenuItem";

export const identifierClass = "options-menu";
const defaultButton = (
  <button className="p-my-xs rounded-md hover:bg-neutral-800 cursor-pointer transition-colors duration-200">
    <BsThreeDots size={20} />
  </button>
)

const OptionsMenu = ({ 
  button = defaultButton,
  options, 
  id 
}) => {
  const value = useOptionsMenuManagerContext();
  const isOpen = value.openOptionsMenuId === id;

  return (
    <div className={`z-10 relative ${identifierClass}`}>
      <div onClick={() => value.setOpenOptionsMenuId(isOpen ? null : id)}>{button}</div>

      {isOpen && (
        <div className="absolute right-0">
          <div className="shadow-lg shadow-black-xl w-[200px] flex flex-col bg-black-lg rounded-lg p-my-xs">
            {options.map((option, idx) => (
             <OptionsMenuItem {...option}/> 
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OptionsMenu;
