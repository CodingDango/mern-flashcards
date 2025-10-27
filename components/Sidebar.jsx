import { GiReactor as BrandIcon } from "react-icons/gi";
import { AiOutlineHome as HomeIcon } from 'react-icons/ai';
import { HiOutlineSquare3Stack3D as StackIcon } from 'react-icons/hi2';
import { PiCards as CardsIcon } from 'react-icons/pi';
import { FiSettings as SettingsIcon } from 'react-icons/fi';
import { BiLogOut as LogOutIcon } from 'react-icons/bi';
import SidebarItem from "./SidebarItem";
import UserDisplay from "./UserDisplay";

const Sidebar = ({activeRoute = ''}) => {
  const sidebarLinks = [
    {text: 'dashboard', Icon: HomeIcon, href: '/'},
    {text: 'decks', Icon: StackIcon, href: '/decks'},
    {text: 'cards', Icon: CardsIcon, href: '/cards'},
  ];

  return (
    <nav className='top-0 left-0 max-h-screen sticky w-3xs bg-black-xl py-8 px-my-md border-r border-black-md'>

      <div className="flex flex-col gap-my-md h-full">
        <div className='flex gap-my-sm items-center'>
          <BrandIcon size={32} className='text-my-primary'/>
          <span className='text-xl font-medium'>Reactor</span>
        </div>

        <section>
          <h2 className="text-black-light px-my-xs pb-my-xs">General</h2>
          <ul className="flex flex-col">
            {sidebarLinks.map((parameters, idx) => (
              <li key={idx}>
                <SidebarItem {...parameters} isActive={parameters.text === activeRoute}/>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-black-light px-my-xs pb-my-xs">Others</h2>
          <ul className="flex flex-col w-full">
            <li>
              <SidebarItem text='settings' Icon={SettingsIcon} href='#'/>
            </li>
            <li>
              <SidebarItem as="button" text='logout' Icon={LogOutIcon} href='#'/> 
            </li>
          </ul>
        </section>

        <UserDisplay name={'jane doe'} email={'example@gmail.com'}/>
      </div>
    </nav>
  );
}

export default Sidebar;