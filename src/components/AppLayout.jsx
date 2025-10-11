const AppLayout = ({children}) => (
  <div className='bg-black-xl w-screen min-h-screen p-my-md grid grid-cols-[auto_1fr] grid-rows-2 gap-my-md'>
    {children}
  </div>
);

export default AppLayout;