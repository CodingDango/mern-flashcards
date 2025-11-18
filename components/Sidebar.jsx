"use client";

import { GiReactor as BrandIcon } from "react-icons/gi";
import { AiOutlineHome as HomeIcon } from "react-icons/ai";
import { HiOutlineSquare3Stack3D as StackIcon } from "react-icons/hi2";
import { PiCards as CardsIcon } from "react-icons/pi";
import { FiSettings as SettingsIcon } from "react-icons/fi";
import { FaRegUser as UserIcon } from "react-icons/fa6";
import { BiLogOut as LogOutIcon } from "react-icons/bi";
import { useRef, useEffect, useState } from "react";

import Hamburger from "hamburger-react";
import SidebarItem from "./SidebarItem";
import UserDisplay from "./UserDisplay";
import { useSessionContext } from "@/context/SessionContext";
import { useModalContext } from "@/context/ModalContext";
import SignOut from "./SignOut";
import { createClient } from "@/libs/supabase/browser";

const DesktopSidebar = ({
  sidebarLinks,
  activeRoute,
  user,
  handleSignOut,
  profile,
}) => (
  <nav className="top-0 left-0 max-h-screen sticky w-56 bg-black-xl py-8 px-my-sm border-r border-black-md h-full">
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
            <SidebarItem
              text="profile"
              Icon={UserIcon}
              href="/profile"
              isActive={"profile" === activeRoute}
            />
          </li>
          <li>
            <SidebarItem
              as="button"
              text="logout"
              Icon={LogOutIcon}
              onClick={handleSignOut}
            />
          </li>
        </ul>
      </section>

      <UserDisplay profile={profile} email={user?.email} />
    </div>
  </nav>
);

const MobileSidebar = ({
  sidebarLinks,
  activeRoute,
  isSidebarOpen,
  setIsSidebarOpen,
  user,
  handleSignOut,
  profile,
}) => {
  const hamburgerRef = useRef(null);
  const sidebarRef = useRef(null);

  return (
    <div>
      <>
        <MobileHeader {...{ isSidebarOpen, setIsSidebarOpen }} />

        {/* Filter */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className={`h-screen w-screen fixed inset-0 transition-colors duration-300 ${
              isSidebarOpen ? "bg-black/60 z-50" : "bg-transparent -z-1"
            }`}
          ></div>
        )}

        {/* Sidepanel */}
        <aside
          ref={sidebarRef}
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed left-0 top-0 h-screen bg-black-xl border-r border-black-md w-screen sm:w-64 rounded-tr-2xl rounded-bl-2xl transition-transform duration-300 z-50`}
        >
          <div className="px-4 py-5 flex flex-col gap-my-md">
            <div className="flex justify-between items-center w-full">
              <div ref={hamburgerRef} className="w-[32px] h-[32px]">
                <div className="-mt-2 -ml-2">
                  <Hamburger
                    toggled={isSidebarOpen}
                    toggle={setIsSidebarOpen}
                    size={28}
                  />
                </div>
              </div>

              <BrandIcon size={32} className="text-my-primary" />
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
                    <SidebarItem
                      text="profile"
                      Icon={UserIcon}
                      href="/profile"
                      isActive={"profile" === activeRoute}
                    />
                  </li>
                  <li>
                    <SidebarItem
                      as="button"
                      text="logout"
                      Icon={LogOutIcon}
                      onClick={handleSignOut}
                    />
                  </li>
                </ul>
              </section>

              <UserDisplay profile={profile} email={user?.email} />
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

const Sidebar = ({
  activeRoute = "",
  isSidebarOpen,
  setIsSidebarOpen,
  isLargeScreen,
}) => {

  const session = useSessionContext();
  const supabase = createClient();
  const user = session?.user;

  const [profile, setProfile] = useState({ is_loading: true });
  const { openModal, closeModal } = useModalContext();
  const handleSignOut = () =>
    openModal(null, <SignOut {...{ closeModal }} />, true);

  useEffect(() => {
    if (!user?.id) return;

    const getProfile = async () => {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (profile) {
        setProfile(profile);
      }
    };

    getProfile();

    const channel = supabase
      .channel("realtime profiles")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "profiles",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          setProfile(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, supabase]);

  const sidebarLinks = [
    { text: "dashboard", Icon: HomeIcon, href: "/" },
    { text: "decks", Icon: StackIcon, href: "/decks" },
    { text: "cards", Icon: CardsIcon, href: "/cards" },
  ];

  return isLargeScreen ? (
    <DesktopSidebar
      {...{ handleSignOut, activeRoute, sidebarLinks, user, profile }}
    />
  ) : (
    <MobileSidebar
      {...{
        handleSignOut,
        activeRoute,
        sidebarLinks,
        isSidebarOpen,
        setIsSidebarOpen,
        user,
        profile,
      }}
    />
  );
};

export default Sidebar;
