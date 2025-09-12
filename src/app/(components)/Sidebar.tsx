"use client";

import Link from "next/link";
import BlueButton from "./BlueButton";
import { useState } from "react";
import SidebarLinks from "./SidebarLinks";

export default function Sidebar({ userId }: { userId: string }) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      {showSidebar && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-50 cursor-pointer"
          onClick={() => setShowSidebar(false)}
        />
      )}
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-fit z-50 bg-[#333333] border-r transition-transform duration-300 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-2">
          {/* x button */}
          <button
            className="self-end text-white cursor-pointer p-4"
            onClick={() => setShowSidebar(false)}
          >
            &times;
          </button>
          <SidebarLinks
            setShowSidebar={setShowSidebar}
            url={"/create_post"}
            text={"Create Post"}
          />
          <SidebarLinks
            setShowSidebar={setShowSidebar}
            url={`/user/${userId}`}
            text={"My Posts"}
          />
          <SidebarLinks
            setShowSidebar={setShowSidebar}
            url={"/liked_posts"}
            text={"Liked Posts"}
          />
          <SidebarLinks
            setShowSidebar={setShowSidebar}
            url={"/profile"}
            text={"Profile"}
          />
          <Link href={"/api/auth/signout?callbackUrl=/"} className="px-4">
            <BlueButton>Logout</BlueButton>
          </Link>
        </div>
      </div>

      <div onClick={() => setShowSidebar(true)} className="flex">
        <BlueButton>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-6"
          >
            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </BlueButton>
      </div>
    </>
  );
}
