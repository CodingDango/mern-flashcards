const AppLayout = ({children}) => (
  <div className='bg-black-xl w-screen min-h-screen p-my-md grid grid-cols-[auto_1fr] grid-rows-2'>
    {children}
  </div>
);

export default AppLayout;