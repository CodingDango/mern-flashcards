import { GiReactor } from "react-icons/gi";
import { AiOutlineHome } from 'react-icons/ai';
import { HiOutlineSquare3Stack3D } from 'react-icons/hi2';
import { PiCards } from 'react-icons/pi';
import { FiSettings } from 'react-icons/fi';
import { BiLogOut } from 'react-icons/bi';
import SidebarLink from "./SidebarLink";

const Sidebar = () => {
  return (
    <aside className='w-2xs  h-full bg-black-lg rounded-lg p-my-md'>
      <div className="flex flex-col gap-my-md h-full">
        <div className='flex gap-my-sm items-center'>
          <GiReactor size={32} className='text-my-primary'/>
          <span className='text-xl font-medium'>Reactor Deck</span>
        </div>

        <section className="flex flex-col *:p-my-xs">
          <h2 className="text-black-light">General</h2>
          
          <SidebarLink
            text='dashboard'
            icon={<AiOutlineHome size={20}/>}
            href='#'
          />

          <SidebarLink
            text='collections'
            icon={<HiOutlineSquare3Stack3D size={20}/>}
            href='#'
          />

          <SidebarLink
            text='collections'
            icon={<PiCards size={20}/>}
            href='#'
          />
        </section>

        <section className="flex flex-col *:p-my-xs">
          <h2 className="text-black-light">Others</h2>
          <SidebarLink
            text='settings'
            icon={<FiSettings size={20}/>}
            href='#'
          />
          <SidebarLink
            text='logout'
            icon={<BiLogOut size={20}/>}
            href='#'
          />
        </section>

        <div className="flex-1 flex items-end">
          <div className="flex gap-my-xs items-center">
            <div className="w-[40px] h-[40px] rounded-full bg-black-light"></div>
            <div>
              <h2 className="font-medium">Jane Doe</h2>
              <p className="text-sm text-black-light">example@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;