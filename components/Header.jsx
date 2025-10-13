import ThemeToggle from './ThemeToggle';
import { GiReactor } from "react-icons/gi";

const Header = () => {
  return (
    <header className='
      border border-neutral-800 bg-neutral-950 
      w-full items-center rounded-xl flex flex-col 2xs:flex-row 2xs:justify-between 
      py-my-xs px-my-sm gap-my-sm'
    >
      <div className='flex gap-my-sm items-center'>
        <GiReactor size={32} className='text-my-primary'/>
        <span className='text-xl font-medium'>Reactor Deck</span>
      </div>
      <ThemeToggle/>
    </header>
  );
}

export default Header;