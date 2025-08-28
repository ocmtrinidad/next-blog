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
          className="fixed top-0 right-0 z-50 border cursor-pointer"
          onClick={() => setShowBar(false)}
        >
          <div className="flex flex-col gap-2 p-4 border w-fit bg-white">
            <Link href={"/create-post"}>
              <BlueButton>Create Post</BlueButton>
            </Link>
            <Link href={`/user/${userId}`}>
              <BlueButton>My Posts</BlueButton>
            </Link>
            <Link href={"/profile"}>
              <BlueButton>Profile</BlueButton>
            </Link>
            <Link href={"/api/auth/signout?callbackUrl=/"}>
              <BlueButton>Logout</BlueButton>
            </Link>
          </div>
        </div>
      )}
      <div onClick={() => setShowBar(true)}>
        <BlueButton>Menu</BlueButton>
      </div>
    </>
  );
}
