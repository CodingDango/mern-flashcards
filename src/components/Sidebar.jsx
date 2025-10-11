import { GiReactor } from "react-icons/gi";

const Sidebar = () => {
  return (
    <aside className='w-2xs  h-full bg-black-lg rounded-lg p-my-md'>
      <div className="flex flex-col gap-my-md">
        <div className='flex gap-my-sm items-center'>
          <GiReactor size={32} className='text-my-primary'/>
          <span className='text-xl font-medium'>Reactor Deck</span>
        </div>

        <section className="flex flex-col">
          <h2 className="text-black-light">General</h2>
          <button className="text-start py-my-xs">Dashboard</button>
          <button className="text-start py-my-xs">Collections</button>
          <button className="text-start py-my-xs">Flashcards</button>
        </section>

        <section className="flex flex-col gap-my-sm">
          <h2 className="text-black-light">Others</h2>
          <button className="text-start">Settings</button>
          <button className="text-start">Logout</button>
        </section>
      </div>
    </aside>
  );
}

export default Sidebar;