"use client";

import { useEffect, useState } from "react";
import { useLockBodyScroll } from "@uidotdev/usehooks";

import Sidebar from "./Sidebar";

const AppLayout = ({ children, activeRoute }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // 64rem = 1024px
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (isLargeScreen) {
      setIsSidebarOpen(false);
    }
  }, [isLargeScreen]);

  return (
    <div
      className="
      w-full overflow-x-hidden
      bg-black min-h-screen grid grid-cols-1
      grid-rows-[auto_1fr] lg:grid-rows-1 lg:grid-cols-[auto_1fr] 
    "
    >
      <Sidebar
        {...{ activeRoute, isSidebarOpen, setIsSidebarOpen, isLargeScreen }}
      />

      <div inert={true ? isSidebarOpen : null} className={`overflow-hidden`}>
        {children}
      </div>

      {isSidebarOpen && <BodyScrollLocker />}
    </div>
  );
};

const BodyScrollLocker = () => {
  useLockBodyScroll();
  return null;
};

export default AppLayout;
