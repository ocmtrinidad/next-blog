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
            url={"/create-post"}
            text={"Create Post"}
          />
          <SidebarLinks
            setShowSidebar={setShowSidebar}
            url={`/user/${userId}`}
            text={"My Posts"}
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

      <div onClick={() => setShowSidebar(true)}>
        <BlueButton>Menu</BlueButton>
      </div>
    </>
  );
}
