import { useState } from 'react';

const ComboBox = ({ options, onChange, onBlur, value, name,...rest }) => {
  const [inputValue, setInputValue] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const filteredOptions = options.filter((option) =>
    option.optionValue.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleOptionClick = (option) => {
    debugger
    onChange(option.optionValue);         // Tell the bridge the REAL value
    setInputValue(option.optionValue); // Visually update the input
    setShowOptions(false);
  };

  const handleBlur = () => {
    setTimeout(() => setShowOptions(false), 300);
    onBlur();
  };

  return (
    <div className="relative text-white">
      <input
        {...rest}
        name={name}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setShowOptions(true)}
        onBlur={handleBlur}
        autoComplete="off"
        className='text-input w-full border border-black-md'
      />

      {showOptions && filteredOptions.length > 0 && (
      <ul className="mt-2 absolute z-10 w-full bg-black-xl border border-black-md shadow-xl rounded-md flex flex-col h-[147px] overflow-y-auto">
          {filteredOptions.map((option) => (
            <li
              key={option.deckId}
              onClick={() => handleOptionClick(option)}
              className="px-4 py-3 cursor-pointer hover:bg-black-lg rounded-md"
            >
              {option.optionValue}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComboBox;