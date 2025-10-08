import { useState } from "react";
import { GiReactor } from "react-icons/gi";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <header className='border border-neutral-800 bg-neutral-950 w-full rounded-xl flex justify-between py-my-xs px-my-sm'>
      <div className='flex gap-my-sm items-center'>
        <GiReactor size={32} className='text-my-primary'/>
        <span className='text-xl font-medium'>Reactor Deck</span>
      </div>
      
      <label 
        className='
          p-1 w-[80px] rounded-4xl border 
          border-neutral-800 cursor-pointer 
          bg-neutral-700 has-checked:bg-black
          transition-colors duration-200
          has-[>input:focus-visible]:ring-2
          has-[>input:focus-visible]:ring-my-primary
          select-none
        ' 
      >
        <input 
          type="checkbox" 
          className="absolute opacity-0"
          checked={isDarkMode}
          onChange={(e) => setIsDarkMode(e.target.checked)}
        />
        
        <span className='flex justify-between relative'>
          <span className={`
            absolute w-[32px] h-[32px] rounded-full 
            bg-white transition-transform duration-200 
            ${isDarkMode ? 'translate-x-[38px]' : 'translate-x-0'}
          `}></span>
          <span className={`transition-colors duration-200 z-1 p-my-xs rounded-full  ${isDarkMode ? 'text-neutral-400' : 'text-black'}`}>
            <IoSunny size={16} className='scale-140'/>
          </span>
          <span className={`transition-colors duration-200 z-1 p-my-xs rounded-full ${isDarkMode ? 'text-black' : 'text-neutral-400'}`}>
            <FaMoon size={16}/>
          </span>
        </span>
      </label> 

    </header>
  );
}

export default Header;