import { GiReactor as BrandIcon } from "react-icons/gi";
import { AiOutlineHome as HomeIcon } from 'react-icons/ai';
import { HiOutlineSquare3Stack3D as StackIcon } from 'react-icons/hi2';
import { PiCards as CardsIcon } from 'react-icons/pi';
import { FiSettings as SettingsIcon } from 'react-icons/fi';
import { BiLogOut as LogOutIcon } from 'react-icons/bi';
import SidebarItem from "./SidebarItem";
import UserDisplay from "./UserDisplay";

const Sidebar = () => {

  return (
    <nav className='w-3xs h-full bg-black-lg py-8 px-my-md border-r border-black-md'>

      <div className="flex flex-col gap-my-md h-full">
        <div className='flex gap-my-sm items-center'>
          <BrandIcon size={32} className='text-my-primary'/>
          <span className='text-xl font-medium'>Reactor</span>
        </div>

        <section>
          <h2 className="text-black-light px-my-xs pb-my-xs">General</h2>
          <ul className="flex flex-col">
            <li>
              <SidebarItem text='dashboard' icon={<HomeIcon size={20}/>} href='#'/>
            </li>
            <li>
              <SidebarItem text='collections' icon={<StackIcon size={20}/>} href='#'/>
            </li>
            <li>
              <SidebarItem text='cards' icon={<CardsIcon size={20}/>} href='#'/>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-black-light px-my-xs pb-my-xs">Others</h2>
          <ul className="flex flex-col w-full">
            <li>
              <SidebarItem text='settings' icon={<SettingsIcon size={20}/>} href='#'/>
            </li>
            <li>
              <SidebarItem as="button" text='logout' icon={<LogOutIcon size={20}/>} href='#'/> 
            </li>
          </ul>
        </section>

        <div className="flex-1 flex flex-col justify-end">
          <UserDisplay name={'jane doe'} email={'example@gmail.com'}/>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;