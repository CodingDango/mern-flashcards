import { useOptionsMenuManagerContext } from "../context/OptionsMenuManagerContext";

export const identifierClass = 'options-menu';

const OptionsMenu = ({
  button,
  options,
  id,
}) => {
  const value = useOptionsMenuManagerContext();
  const isOpen = value.openOptionsMenuId === id;

  return (
    <div className={`z-10 relative ${identifierClass}`}>
      <div onClick={() => value.setOpenOptionsMenuId(id)}>
        {button}
      </div>
    
      {isOpen && (
        <div className="absolute">
          <div className="w-[200px] flex flex-col bg-neutral-900 border border-neutral-800 rounded-lg p-my-xs">
            {options.map((element, idx) => (
                <button 
                  key={idx} 
                  className={`rounded-lg p-my-xs text-start cursor-pointer hover:bg-neutral-800`}
                >
                  {element}
                </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default OptionsMenu;