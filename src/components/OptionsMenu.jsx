import { useOptionsMenuManagerContext } from "../context/OptionsMenuManagerContext";

export const identifierClass = "options-menu";

const OptionsMenu = ({ button, options, id }) => {
  const value = useOptionsMenuManagerContext();
  const isOpen = value.openOptionsMenuId === id;

  return (
    <div className={`z-10 relative ${identifierClass}`}>
      <div onClick={() => value.setOpenOptionsMenuId(isOpen ? null : id)}>{button}</div>

      {isOpen && (
        <div className="absolute right-0">
          <div className="shadow-md shadow-black w-[200px] flex flex-col bg-neutral-900 border border-neutral-800 rounded-lg p-my-xs">
            {options.map(({element, callback}, idx) => (
              <button
                key={`${id}-button-${idx}`}
                onClick={callback}
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
};

export default OptionsMenu;
