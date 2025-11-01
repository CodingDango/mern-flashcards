// ComboBox.jsx

import { useOptionsMenuManagerContext } from '@/context/OptionsMenuManagerContext';
import { HiOutlineSquare3Stack3D as StackIcon } from 'react-icons/hi2';
import FilterButton from './FilterButton';

// The props are perfect. `value` is the deckId from RHF. `onChange` is the function to call.
const ComboBox = ({ id, options, onChange, onBlur, value, name, ...rest }) => {
  const {openOptionsMenuId, setOpenOptionsMenuId } = useOptionsMenuManagerContext();
  const isOpen = openOptionsMenuId === id;
  const selectedOption = options.find(option => option.value === value);

  // The text on the button should be the title of the selected option, or "Select" if nothing is chosen.
  const buttonText = selectedOption ? selectedOption.text : "Select a Deck";

  const handleOptionClick = (option) => {
    onChange(option.value);
    setOpenOptionsMenuId(null);
  };

  return (
    <div className="relative text-white">
      <FilterButton
        text={buttonText}
        icon={StackIcon}
        onClick={() => setOpenOptionsMenuId(isOpen ? null : id)}
        onBlur={onBlur} // We can pass RHF's onBlur directly now
        name={name}
      />

      {isOpen && (
        <ul
          onMouseDown={(e) => e.preventDefault()} // This stops the input from blurring before a click registers
          className="-mt-1 absolute z-1 w-full bg-black-lg border border-black-md shadow-xl rounded-b-lg flex flex-col h-[150px] overflow-y-auto"
        >
          <input type='hidden' />
          {options.map((option, idx) => (
            <li 
              key={idx}
              className='w-full'>
              <button
                key={option.value}
                onClick={() => handleOptionClick(option)} // onClick is fine now because of the fix above
                className="w-full text-start px-4 py-3 cursor-pointer hover:bg-black-md rounded-md focus-visible:bg-black-md outline-none"
              >
                <div className='flex gap-my-md items-center'>
                  {option.icon}
                  <span className='line-clamp-1 flex-1'>{option.text}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComboBox;