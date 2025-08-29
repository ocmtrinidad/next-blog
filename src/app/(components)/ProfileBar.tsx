"use client";

import Link from "next/link";
import BlueButton from "./BlueButton";
import { useState } from "react";

export default function ProfileBar({ userId }: { userId: string }) {
  const [showBar, setShowBar] = useState(false);

  return (
    <>
      {showBar && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-50 cursor-pointer"
          onClick={() => setShowBar(false)}
        />
      )}
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-fit z-50 bg-[#333333] border-r transition-transform duration-300 ${
          showBar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-2">
          {/* x button */}
          <button
            className="self-end text-white cursor-pointer p-4"
            onClick={() => setShowBar(false)}
          >
            &times;
          </button>
          <Link href={"/create-post"} className="px-4">
            <BlueButton>Create Post</BlueButton>
          </Link>
          <Link href={`/user/${userId}`} className="px-4">
            <BlueButton>My Posts</BlueButton>
          </Link>
          <Link href={"/profile"} className="px-4">
            <BlueButton>Profile</BlueButton>
          </Link>
          <Link href={"/api/auth/signout?callbackUrl=/"} className="px-4">
            <BlueButton>Logout</BlueButton>
          </Link>
        </div>
      </div>

      <div onClick={() => setShowBar(true)}>
        <BlueButton>Menu</BlueButton>
      </div>
    </>
  );
}
