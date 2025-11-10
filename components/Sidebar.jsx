"use client";

import { GiReactor as BrandIcon } from "react-icons/gi";
import { AiOutlineHome as HomeIcon } from "react-icons/ai";
import { HiOutlineSquare3Stack3D as StackIcon } from "react-icons/hi2";
import { PiCards as CardsIcon } from "react-icons/pi";
import { FiSettings as SettingsIcon } from "react-icons/fi";
import { BiLogOut as LogOutIcon } from "react-icons/bi";
import { useRef, useEffect } from "react";

import Hamburger from "hamburger-react";
import SidebarItem from "./SidebarItem";
import UserDisplay from "./UserDisplay";

const DesktopSidebar = ({ sidebarLinks, activeRoute }) => (
  <nav className="top-0 left-0 max-h-screen sticky w-5xs bg-black-xl py-8 px-my-sm border-r border-black-md h-full">
    <div className="flex flex-col gap-my-md h-full">
      <div className="flex gap-my-xs items-end">
        <BrandIcon size={32} className="text-my-primary" />
        <span className="text-xl font-medium">Reactor</span>
      </div>

      <section>
        <h2 className="text-black-light px-my-xs pb-my-xs">General</h2>
        <ul className="flex flex-col">
          {sidebarLinks.map((parameters, idx) => (
            <li key={idx}>
              <SidebarItem
                {...parameters}
                isActive={parameters.text === activeRoute}
              />
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-black-light px-my-xs pb-my-xs">Others</h2>
        <ul className="flex flex-col w-full">
          <li>
            <SidebarItem text="settings" Icon={SettingsIcon} href="#" />
          </li>
          <li>
            <SidebarItem as="button" text="logout" Icon={LogOutIcon} href="#" />
          </li>
        </ul>
      </section>

      <UserDisplay name={"jane doe"} email={"example@gmail.com"} />
    </div>
  </nav>
);

const MobileSidebar = ({
  sidebarLinks,
  activeRoute,
  isSidebarOpen,
  setIsSidebarOpen
}) => {
  const hamburgerRef = useRef(null);
  const sidebarRef = useRef(null);

 useEffect(() => {
    if (!isSidebarOpen) {
      return;
    }

    const closeSidebarHandler = (e) => {
      if (
        sidebarRef.current &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target) &&
        !sidebarRef.current.contains(e.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", closeSidebarHandler);

    return () => {
      document.removeEventListener("mousedown", closeSidebarHandler);
    };
    
  }, [isSidebarOpen, setIsSidebarOpen]);

  return (
    <div>
      <>
        <MobileHeader {...{ isSidebarOpen, setIsSidebarOpen }} />

        {/* Filter */}
        <div
          className={`h-screen w-screen fixed inset-0 transition-colors duration-300 ${
            isSidebarOpen ? "bg-black/60 z-50" : "bg-transparent -z-1"
          }`}
        ></div>

        {/* Sidepanel */}
        <aside
          ref={sidebarRef}
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-64"
          } fixed left-0 top-0 h-screen bg-black-xl border-r border-black-md w-64 rounded-tr-2xl rounded-bl-2xl transition-transform duration-300 z-50`}
        >
          <div className="px-4 py-5 flex flex-col gap-my-md">
            <div className="flex justify-between items-center w-full">
              <BrandIcon size={32} className="text-my-primary" />

              <div ref={hamburgerRef} className="w-[32px] h-[32px]">
                <div className="-mt-2 -ml-2">
                  <Hamburger
                    toggled={isSidebarOpen}
                    toggle={setIsSidebarOpen}
                    size={28}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-my-md h-full">
              <section>
                <ul className="flex flex-col">
                  {sidebarLinks.map((parameters, idx) => (
                    <li key={idx}>
                      <SidebarItem
                        {...parameters}
                        isActive={parameters.text === activeRoute}
                      />
                    </li>
                  ))}
                  <div className="h-[1px] bg-black-md my-my-sm"></div>
                  <li>
                    <SidebarItem text="settings" Icon={SettingsIcon} href="#" />
                  </li>
                  <li>
                    <SidebarItem
                      as="button"
                      text="logout"
                      Icon={LogOutIcon}
                      href="#"
                    />
                  </li>
                </ul>
              </section>

              <UserDisplay name={"jane doe"} email={"example@gmail.com"} />
            </div>
          </div>
        </aside>
      </>
    </div>
  );
};

const MobileHeader = ({ isSidebarOpen, setIsSidebarOpen }) => (
  <nav className="w-screen bg-black-xl border-b border-black-md px-my-md py-3">
    <div className="flex justify-between items-center gap-my-lg">
      <div className="flex gap-my-md">
        <div className="w-[32px] h-[32px]">
          <div className="-mt-2 -ml-2">
            <Hamburger
              toggled={isSidebarOpen}
              toggle={setIsSidebarOpen}
              size={28}
            />
          </div>
        </div>

        <div className="flex gap-my-xs items-end">
          <BrandIcon size={32} className="text-my-primary" />
          <span className="text-xl font-medium">Reactor</span>
        </div>
      </div>
    </div>
  </nav>
);

const Sidebar = ({ activeRoute = "", isSidebarOpen, setIsSidebarOpen, isLargeScreen }) => {
  const sidebarLinks = [
    { text: "dashboard", Icon: HomeIcon, href: "/" },
    { text: "decks", Icon: StackIcon, href: "/decks" },
    { text: "cards", Icon: CardsIcon, href: "/cards" },
  ];

  return isLargeScreen ? (
    <DesktopSidebar {...{ activeRoute, sidebarLinks }} />
  ) : (
    <MobileSidebar
      {...{ activeRoute, sidebarLinks, isSidebarOpen, setIsSidebarOpen }}
    />
  );
};

export default Sidebar;