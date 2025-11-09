const AppLayout = ({ children }) => (
  <div 
    className="
      bg-black min-h-screen grid grid-cols-1
      grid-rows-[auto_1fr] lg:grid-rows-1 lg:grid-cols-[auto_1fr] 
    ">
    {children}
  </div>
);

export default AppLayout;
