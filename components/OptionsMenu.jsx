import { BsThreeDots } from "react-icons/bs";
import { useOptionsMenuManagerContext } from "@/context/OptionsMenuManagerContext";
import _ from 'lodash';

export const identifierClass = "options-menu";

const defaultButton = (
  <button className="p-my-xs rounded-md hover:bg-neutral-800 cursor-pointer transition-colors duration-200">
    <BsThreeDots size={20} />
  </button>
)

const OptionsMenu = ({ 
  button = defaultButton,
  mode = 'skewer',
  onSelect,
  options, 
  id,
}) => {
  const value = useOptionsMenuManagerContext();
  const isOpen = value.openOptionsMenuId === id;

  return (
    <div className={`w-full h-full z-5 relative ${identifierClass}`}>
      <div
        className="w-full h-full"
        onClick={() => value.setOpenOptionsMenuId(isOpen ? null : id)}
      >{button}</div>

      {isOpen && (
        <div className={`absolute ${ mode === 'skewer' ? 'right-0' : 'right-0 left-0 top-[110%]'}`}>
          <div className={`border border-black-md shadow-lg shadow-black-xl ${mode === 'skewer' ? 'w-[200px]' : 'w-full'} flex flex-col bg-black-lg rounded-lg p-my-xs`}>
            {options.map(({icon, text, callback, ...rest}, idx) => (
              <button
                key={idx} 
                onClick={() => {
                  onSelect && onSelect({icon, text, callback, ...rest});
                  callback && callback();
                }}
                className='
                  bg-transparent p-my-xs
                  hover:bg-black-md rounded-lg cursor-pointer'
              >
                <span className="flex items-center gap-my-xs">
                  {icon}
                  {_.startCase(text)}
                </span> 
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OptionsMenu;
