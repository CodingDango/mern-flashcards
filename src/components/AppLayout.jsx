const AppLayout = ({children}) => (
  <div className='bg-black min-h-screen grid grid-cols-[auto_1fr] grid-rows-1'>
    {children}
  </div>
);

export default AppLayout;