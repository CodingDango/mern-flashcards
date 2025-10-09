import { useState } from "react";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <label
      className="
          p-1 w-[80px] rounded-4xl border 
          border-neutral-800 cursor-pointer 
          bg-neutral-700 has-checked:bg-black
          transition-colors duration-200
          focus-within:border-my-primary
        "
    >
      <input
        type="checkbox"
        className="absolute opacity-0"
        checked={isDarkMode}
        onChange={(e) => setIsDarkMode(e.target.checked)}
      />

      <span className="flex justify-between relative">
        <span
          className={`
            absolute w-[32px] h-[32px] rounded-full 
            bg-white transition-transform duration-200 
            ${isDarkMode ? "translate-x-[38px]" : "translate-x-0"}
          `}
        ></span>
        <span
          className={`transition-colors duration-200 z-1 p-my-xs rounded-full ${
            isDarkMode ? "text-neutral-400" : "text-black"
          }`}
        >
          <IoSunny size={16} className="scale-140" />
        </span>
        <span
          className={`transition-colors duration-200 z-1 p-my-xs rounded-full ${
            isDarkMode ? "text-black" : "text-neutral-400"
          }`}
        >
          <FaMoon size={16} />
        </span>
      </span>
    </label>
  );
}

export default ThemeToggle;