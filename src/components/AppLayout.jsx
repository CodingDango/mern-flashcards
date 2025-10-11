const AppLayout = ({children}) => (
  <div className='bg-black-xl max-h-screen grid grid-cols-[auto_1fr] grid-rows-2 overflow-x-hidden overflow-y-auto'>
    {children}
  </div>
);

export default AppLayout;