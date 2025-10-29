import { useState } from 'react';

const ComboBox = ({ options, onChange, onBlur, value, name, ...rest }) => {
  const [inputValue, setInputValue] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const filteredOptions = options.filter((option) =>
    option.filterVal.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleOptionClick = (option) => {
    setInputValue(option.filterVal); // Visually update the input
    onChange(option.deckId);         // Tell the bridge the REAL value
    setShowOptions(false);
  };

  const handleBlur = () => {
    setTimeout(() => setShowOptions(false), 150);
    onBlur();
  };

  return (
    <div className="relative">
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
      <ul className="mt-1 absolute z-10 w-full bg-black-lg border border-black-md shadow-xl rounded-md">
          {filteredOptions.map((option) => (
            <li
              key={option.deckId}
              onClick={() => handleOptionClick(option)}
              className="px-4 py-2 cursor-pointer text-black"
            >
              {option.filterVal}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComboBox;