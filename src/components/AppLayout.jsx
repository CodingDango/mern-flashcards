const AppLayout = ({children}) => (
  <div className='bg-zinc-950 w-screen min-h-screen'>
    <div className='flex-1 flex justify-center px-my-sm py-my-lg'>
      <div className='w-full max-w-6xl'>
        <div className='flex flex-col gap-my-lg'>
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default AppLayout;